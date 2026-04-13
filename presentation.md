# MINSAT-v3
## Telecom Subscriber Management System

---

## Slide 1 — What Problem Does This Solve?

Orange Telecom customer service agents previously had no unified tool to:

- Look up a customer's account status in real time
- Process refills or service changes directly
- Track what actions were taken on a customer account — and by whom

**MINSAT-v3** centralizes all of these operations into a single internal web dashboard, connected directly to the live telecom network.

---

## Slide 2 — What Is MINSAT-v3?

MINSAT-v3 is an **internal web application** for Orange Tunisia staff.

It gives operators instant access to prepaid subscriber accounts — allowing them to view balances, manage services, process refills, and monitor activity — all from a browser, without needing technical knowledge of the underlying telecom infrastructure.

---

## Slide 3 — Who Uses It?

| Role | Description |
|------|-------------|
| **Customer Service (DSC)** | Front-line agents who handle daily subscriber requests |
| **Data & Network (DFI / IN)** | Staff who perform technical account queries |
| **Admin** | Supervisors who manage users and monitor all system activity |

Access is role-based — each user only sees what they need.

---

## Slide 4 — Key Features

### Customer Account Management
- Search any subscriber by phone number
- View real-time balance, active services, and subscription status
- See Friend & Family numbers (discounted contact list)

### Actions Operators Can Perform
- **Refill credit** — via voucher code or manual amount
- **Block / Unblock** a subscriber's account
- **Change service plan** (upgrade or downgrade)
- **Add or remove** Friend & Family entries

### History & Lookup
- View full transaction history (calls, SMS, data, refills)
- Look up vouchers by serial number or activation code
- Browse reference tables: service codes, offers, usage definitions

---

## Slide 5 — How It Works

```
Operator (Browser)
       ↓
  MINSAT Dashboard
       ↓
  Backend Service  ←→  Database (reference data, user accounts)
       ↓
  AIR Network Interface  ←→  Ericsson AIR (live subscriber database)
                         ←→  Voucher Admin System
                         ←→  HLR (phone registration status)
```

The dashboard talks to the live Ericsson telecom infrastructure in real time — no manual data export or sync needed.

---

## Slide 6 — Admin & Monitoring

Administrators have access to a dedicated **System Logs** dashboard:

- **Live statistics** — queries, updates, logins, and failures — refreshed every 30 seconds
- **Full activity log** — every action is recorded with timestamp, operator name, target number, and result
- **Filters** — search logs by user, action type, phone number, status, or date range
- **User management** — create accounts, assign roles, activate or deactivate users

This provides a complete audit trail for compliance and troubleshooting.

---

## Slide 7 — Technology at a Glance

*(For the technical audience)*

| Layer | Technology |
|-------|-----------|
| Frontend | React web app (served via Nginx) |
| Backend | Java / Spring Boot REST API |
| AIR Proxy | Dedicated Spring Boot service — speaks Ericsson's UCIP/ACIP protocol over TCP |
| Database | MySQL — subscriber reference data, user accounts, activity logs |
| Deployment | Docker Compose — all services containerized |

The system supports both **live AIR connectivity** (on-site) and a **mock AIR server** for offline development and testing.

---

## Slide 8 — Current Status

| Area | Status |
|------|--------|
| Subscriber lookup (all 23 AIR methods) | Done |
| Refill, block/unblock, service class change | Done |
| Friend & Family management | Done |
| Transaction history | Done |
| Voucher lookup | Done |
| Reference data browser | Done |
| System logs & admin dashboard | Done |
| Authentication & access control | Built, currently disabled for testing |
| Docker deployment | Done |

---

## Slide 9 — Summary

MINSAT-v3 gives Orange Tunisia's operations teams a **fast, centralized, and auditable** way to manage prepaid subscribers.

- No more manual lookups across disconnected systems
- Every action is logged — full accountability
- Role-based access keeps sensitive operations controlled
- Built to be deployed on-premise, connecting to existing telecom infrastructure

**Next step:** Enable authentication, finalize role permissions, and deploy to production environment.
