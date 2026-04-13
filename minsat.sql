-- ============================================================
--  MINSAT database schema — v2
--  Compatible with backend-minsat-spring auth service
--  Generated: 2026-03-28
--
--  HOW TO USE:
--    phpMyAdmin → select database "minsat" → Import → choose this file → Go
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ── users ────────────────────────────────────────────────────
-- Active auth table used by Spring Boot backend.
-- status: 0=pending, 1=DFI, 2=DSC, 3=IN, 4=ADMIN
-- reset_token / reset_token_expiry: password-reset flow
CREATE TABLE IF NOT EXISTS `users` (
  `id`                  int            NOT NULL AUTO_INCREMENT,
  `username`            varchar(50)    NOT NULL,
  `email`               varchar(100)   NOT NULL,
  `password`            varchar(255)   DEFAULT NULL,
  `class`               enum('DFI','DSC','IN','ADMIN') NOT NULL DEFAULT 'DFI',
  `status`              tinyint        NOT NULL DEFAULT '0',
  `login_at`            datetime       DEFAULT NULL,
  `created_at`          timestamp      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token`         varchar(255)   DEFAULT NULL,
  `reset_token_expiry`  datetime       DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_reset_token` (`reset_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ── members ──────────────────────────────────────────────────
-- Legacy user table — kept for backwards compatibility, not used by Spring backend.
CREATE TABLE IF NOT EXISTS `members` (
  `id`       int          NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nom`      varchar(100) DEFAULT NULL,
  `prenom`   varchar(100) DEFAULT NULL,
  `role`     varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ── audit ────────────────────────────────────────────────────
-- Activity log. System logs will be added here in a future phase.
CREATE TABLE IF NOT EXISTS `audit` (
  `id`               int          NOT NULL AUTO_INCREMENT,
  `login`            varchar(100) DEFAULT NULL,
  `role`             varchar(100) DEFAULT NULL,
  `sessionin`        varchar(100) DEFAULT NULL,
  `ip`               varchar(100) DEFAULT NULL,
  `os`               varchar(100) DEFAULT NULL,
  `browser`          varchar(100) DEFAULT NULL,
  `dateinfo`         varchar(100) DEFAULT NULL,
  `msisdnaccinfo`    varchar(100) DEFAULT NULL,
  `datesn`           varchar(100) DEFAULT NULL,
  `serialnumber`     varchar(100) DEFAULT NULL,
  `datehistory`      varchar(100) DEFAULT NULL,
  `msisdnhistory`    varchar(100) DEFAULT NULL,
  `datedebuthistory` varchar(100) DEFAULT NULL,
  `datefinhistory`   varchar(100) DEFAULT NULL,
  `activationcode`   varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ── reference / lookup tables (read-only, loaded from HelpController) ──

CREATE TABLE IF NOT EXISTS `dagroups` (
  `DEFINITION_GROUP_ID`  int          DEFAULT NULL,
  `DEDICATED_ACCOUNT_ID` int          DEFAULT NULL,
  `DESCRIPTION`          varchar(71)  DEFAULT NULL,
  `UnitType`             varchar(19)  DEFAULT NULL,
  `Usage`                varchar(8)   DEFAULT NULL,
  `category`             varchar(51)  DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `faf` (
  `fafindicator` int         DEFAULT NULL,
  `description`  varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `offer` (
  `offer`       int         DEFAULT NULL,
  `description` varchar(51) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `responsecode` (
  `response`    varchar(85)  DEFAULT NULL,
  `description` varchar(211) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `serviceclass` (
  `sc`          int         DEFAULT NULL,
  `description` varchar(24) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `serviceclasses` (
  `sc`      int         DEFAULT NULL,
  `offre`   varchar(29) DEFAULT NULL,
  `dagroup` int         DEFAULT NULL,
  `cat`     varchar(17) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `serviceidentifier` (
  `id`        int          NOT NULL AUTO_INCREMENT,
  `Idname`    varchar(100) DEFAULT NULL,
  `Comment`   varchar(38)  DEFAULT NULL,
  `Id33`      int          DEFAULT NULL,
  `Comment34` varchar(74)  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `trafficcase` (
  `idd`         int         DEFAULT NULL,
  `description` varchar(36) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `uagroup` (
  `ua`          int         DEFAULT NULL,
  `description` varchar(46) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `usagecounters` (
  `counter`     int         DEFAULT NULL,
  `description` varchar(40) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- ── System Logs ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `system_logs` (
  `id`               INT          NOT NULL AUTO_INCREMENT,
  `timestamp`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_login`       VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  `user_role`        VARCHAR(50)  DEFAULT NULL,
  `action_type`      VARCHAR(50)  NOT NULL,
  `target_msisdn`    VARCHAR(20)  DEFAULT NULL,
  `details`          JSON         DEFAULT NULL,
  `ip_address`       VARCHAR(45)  DEFAULT NULL,
  `status`           VARCHAR(10)  NOT NULL DEFAULT 'SUCCESS',
  `air_response_code` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_sl_timestamp`   (`timestamp`),
  INDEX `idx_sl_user_login`  (`user_login`),
  INDEX `idx_sl_action_type` (`action_type`),
  INDEX `idx_sl_msisdn`      (`target_msisdn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
