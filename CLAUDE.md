# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

MINSAT-v3 is a telecom subscriber management system. The target architecture is:

```
React Frontend (projet_orange/ → nginx:80/5173)
    ↓
Spring Boot Backend (backend-minsat-spring/ → :5000)   ← NEW (replaces Express)
    ↓                                    ↓
Spring Boot UCIP Wrapper (:8080)    Flask API History (api_history/ → :5002)
    ↓
AIR TCP Server (10.13.96.38:10010) — Ericsson AIR-IP 3.0 UCIP/ACIP protocol

Auth Service (separate, not yet built)
```

- The **Spring Boot backend** (`backend-minsat-spring/`) handles subscriber queries, voucher lookup, HLR queries, and reference data. **No auth for now** — auth will be a separate service. It calls the UCIP wrapper and Voucher Admin.
- The **Spring Boot UCIP wrapper** (`ucip-wrapper/`) is the only service that speaks AIR TCP. All AIR calls go through it. Uses hardcoded XML per method (XmlHelper + typed DTOs).
- The **Flask service** (`api_history/`) fetches transaction/subscription history from an Ericsson server and returns parsed XML data.
- The **Express backend** (`backend-minsat-main/`) is the legacy backend — being replaced by the Spring Boot backend above.
- **External services**: AIR TCP (10.13.96.38:10010), Voucher Admin (10.13.0.49:10020), HLR Telnet (10.23.69.209:7776), History API (10.13.67.20:8080).
- **MSISDN convention**: subscribers pass bare MSISDs (e.g., `69000001`); the backend prepends `216` country code before passing to the wrapper.

## ucip-wrapper Refactor (completed 2026-03-21)

The wrapper was refactored from a generic `Map<String,Object>` approach to:
- **Hardcoded XML per method** — each service class builds its own XML string using `XmlHelper` static helpers
- **Typed DTOs** on controllers — `@Valid @RequestBody` records instead of raw Maps
- **XmlHelper** replaces XmlBuilder: `mandatoryMembers()`, `member()`, `memberInt()`, `memberBool()`, `memberDate()`, `wrapMethodCall()`, `escape()`
- XML requests use `<name>` tags (responses may use `<n>` — the parser handles both)
- 22 unit tests all pass

## Commands

### Frontend (projet_orange/)
```bash
npm install
npm run dev        # Dev server at :5173
npm run build      # Production build to /dist
npm run lint       # ESLint
npm run preview    # Preview production build
```

### Spring Boot Backend (backend-minsat-spring/) ← NEW
```bash
mvn clean package           # Build JAR → target/backend-minsat-1.0.0.jar
mvn spring-boot:run         # Run on :5000
curl http://localhost:5000/health
```

### Spring Boot UCIP Wrapper (ucip-wrapper/)
```bash
mvn clean package           # Build JAR → target/ucip-wrapper-1.0.0.jar
mvn spring-boot:run         # Run on :8080
mvn test                    # All unit tests (22 passing)
curl http://localhost:8080/health
```

### Express Backend (backend-minsat-main/) — legacy, being replaced
```bash
npm install
npm run dev        # Dev with nodemon (port 5000)
npm start          # Production
```

### Flask API History (api_history/)
```bash
pip install -r requirements.txt
python app.py      # Starts Flask on :5002
```

### Full Stack (Docker)
```bash
docker compose up -d --build    # Build and start all 6 services
docker compose down
docker compose up -d --build backend    # Rebuild Spring Boot backend only
docker compose up -d --build frontend   # Rebuild React frontend only
```

Root `docker-compose.yml` runs 6 services: `mysql`, `api-history`, `air-mock`, `ucip-wrapper`, `backend` (Spring Boot), `frontend` (Nginx).

A separate `docker-compose.yaml` in `backend-minsat-main/` starts the legacy Express backend with MySQL, Vault, and phpMyAdmin — keep this stopped to avoid port conflicts.

## Key Configuration

| File | Purpose |
|------|---------|
| `ucip-wrapper/src/main/resources/application.properties` | AIR host/port/credentials, timeout |
| `backend-minsat-main/.env` | DB, JWT, mail, Vault, AIR/Voucher URLs |
| `projet_orange/.env` | `VITE_API_URL` pointing to Flask service |
| `docker-compose.yml` | Overrides AIR config via env vars for containers |

## AIR Protocol (ucip-wrapper)

The Spring Boot wrapper communicates with Ericsson AIR over **raw TCP** (not HTTP client):
- Sends HTTP/1.0 POST to port 10010 with Basic Auth and `Content-Length` = UTF-8 byte count
- XML-RPC format using `<n>` tags (not standard `<name>`)
- Auto-injects 5 mandatory fields: `originNodeType`, `originHostName`, `originTransactionID`, `originTimeStamp`, `subscriberNumber`
- Reads response until `</methodResponse>` closes
- `AirResponse` record: `(success, responseCode, responseMessage, transactionId, data, raw)`

**UCIP endpoints** (`POST /ucip/*`): balance-and-date, account-details, accumulators, faf-list, update-* variants, refill, community-list, subscriber-segmentation.

**ACIP endpoints** (`POST /acip/*`): install, delete, link-subordinate, update-temporary-blocked, promotion-counters, promotion-plans, update-accumulators, update-refill-barring.

## Database Schema (MySQL)

> Baseline as of 2026-03-21 — may evolve as features are added. Source: `minsat.sql`.

| Table | Engine | Purpose |
|-------|--------|---------|
| `users` | InnoDB | Primary auth — `class` ENUM(`DFI`,`DSC`,`IN`,`ADMIN`), `status`, `login_at` |
| `audit` | InnoDB | Activity log — tracks MSISDN lookups, voucher lookups, history queries, logins |
| `members` | InnoDB | Legacy user table (`username`, `password`, `nom`, `prenom`, `role`) |
| `dagroups` | MyISAM | Dedicated Account group definitions (`DEFINITION_GROUP_ID`, `UnitType`, `Usage`, `category`) |
| `faf` | MyISAM | Friend & Family indicator descriptions |
| `offer` | MyISAM | Offer code descriptions |
| `responsecode` | MyISAM | AIR response code lookup |
| `serviceclass` | InnoDB | Service class code descriptions |
| `serviceclasses` | MyISAM | Service class → offer / DA group / category mapping |
| `serviceidentifier` | MyISAM | Service identifier lookup (two sets: Id/Comment and Id33/Comment34) |
| `trafficcase` | MyISAM | Traffic case code descriptions |
| `uagroup` | MyISAM | Usage accumulator group descriptions |
| `usagecounters` | MyISAM | Usage counter descriptions |

**Notes:**
- `users` is the active auth table (JWT). `members` is legacy — kept for backwards compatibility.
- Reference/lookup tables (`dagroups`, `faf`, `offer`, etc.) use MyISAM with no primary keys — treat as read-only.
- `audit` auto-increments from ~1565; `serviceidentifier` from ~106; `users` from ~16.

## Frontend Structure

Pages live in `src/pages/dashboards/`:
- `GetMsisdnInformation/` — main subscriber query (aggregates all AIR calls)
- `LookupVoucher/` — voucher/serial number lookup
- `MsisdnHistory/` — transaction history (calls Flask service)
- `Help/` — reference data (SCDA codes, service IDs, offers, usage counters)
- `UserManagement/` — admin user management

Auth context is in `src/context/authContext.jsx` (currently disabled in dev mode). The Nginx config in `projet_orange/nginx.conf` handles SPA routing with `try_files $uri /index.html`.

## Session Changes (2026-03-22)

### Docker setup
Root `docker-compose.yml` now orchestrates 6 services:
| Service | Port | Purpose |
|---------|------|---------|
| `mysql` | 3307 (host) / 3306 (internal) | MySQL 8.0, initialized from `backend-minsat-main/minsat.sql` |
| `api-history` | 5002 | Flask service for transaction history |
| `air-mock` | 10010 (host) / 8080 (internal) | Python HTTP server simulating Ericsson AIR |
| `ucip-wrapper` | 8080 | Spring Boot UCIP/ACIP proxy to AIR |
| `backend` | 5000 | Spring Boot backend (subscriber queries, DB enrichment) |
| `frontend` | 5173 | React app served via Nginx |

### air-mock (`air-mock/`)
New Python HTTP server (`app.py`) simulating the Ericsson AIR TCP server for offline testing. Returns hardcoded XML-RPC responses for all UCIP/ACIP methods. To use real AIR on-site: change `AIR_HOST` in `docker-compose.yml` back to `10.13.96.38` and `AIR_PORT` to `10010`.

### MySQL on Docker
MySQL now runs as a Docker container (port 3307 on host to avoid conflicts with any local MySQL). Initialized from `backend-minsat-main/minsat.sql` via `docker-entrypoint-initdb.d`. Spring Boot backend connects via service name `mysql:3306` internally.

### SubscriberService field name fixes
Fixed 4 field name mismatches between ucip-wrapper responses and SubscriberService parsing:
- `accountValue1` → `currentBalance`
- `currency1` → `currency`
- `dedicatedAccountValue1` → `dedicatedAccountValue`
- `fafInformationList` → `friendAndFamilyList`

### Stub auth (`AuthController.java`)
`POST /users/login` and `POST /users/register` accept any credentials and return a hardcoded ADMIN user. Replace with real JWT when auth service is built.

### Update proxy (`UpdateController.java`)
5 new endpoints proxying frontend update requests to ucip-wrapper (prepends "216" to bare MSISDN):
| Frontend endpoint | Forwards to | Body fields |
|---|---|---|
| `POST /api/update/block` | `/acip/update-blocked` | `{ msisdn, blocked }` |
| `POST /api/update/service-class` | `/ucip/update-service-class` | `{ msisdn, action, serviceClassNew }` |
| `POST /api/update/refill` | `/ucip/refill` | `{ msisdn, voucherCode }` or `{ msisdn, amount, currency }` |
| `POST /api/update/faf` | `/ucip/update-faf-list` | `{ msisdn, action, entries }` |
| `POST /api/update/balance` | `/ucip/update-balance` | `{ msisdn, adjustmentAmount, currency, ... }` |

### Update UI (`GetMsisdnInformation.jsx`)
Added 4 action buttons with modal overlays (orange gradient theme, no external library):
- **🔒 Block / 🔓 Unblock** — in SUB NUMBER box, toggles barring
- **✏️ Change SC** — in SUB NUMBER box, change service class with action selector
- **💳 Refill** — in SOLDE box, voucher code or amount+currency
- **+ Add FAF / ✕ Remove** — in FAF panel, manage FAF entries

All modals show success (green banner + auto-close + data refresh) or error (red banner + stays open).
