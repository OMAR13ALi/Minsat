  -----------------------------------------------------------------------
                                      
  ----------------------------------- -----------------------------------

  -----------------------------------------------------------------------

ACIP UCIP AIR IP base Version 3 XML RPC Requests

#  {#section .unnumbered}

**Table of Contents**

[1 Introduction 3](#introduction)

[1.1 Feature Description
[3](#feature-description)](#feature-description)

[1.2 ACIP [3](#acip)](#acip)

[1.2.1 InstallSubscriber 3](#installsubscriber)

[1.2.2 DeleteSubscriber [3](#deletesubscriber)](#deletesubscriber)

[1.2.3 DeleteSubscriber (Deleting a subordinate subscriber)
[3](#deletesubscriber-deleting-a-subordinate-subscriber)](#deletesubscriber-deleting-a-subordinate-subscriber)

[1.2.4 DeleteSubscriber (Deleting a Master subscriber that has
subordinate accounts)
[3](#deletesubscriber-deleting-a-master-subscriber-that-has-subordinate-accounts)](#deletesubscriber-deleting-a-master-subscriber-that-has-subordinate-accounts)

[1.2.5 LinkSubordinateSubscriber
[3](#linksubordinatesubscriber)](#linksubordinatesubscriber)

[1.2.6 UpdateTemporaryBlocked (temporary blocked)
[3](#updatetemporaryblocked-temporary-blocked)](#updatetemporaryblocked-temporary-blocked)

[1.2.7 UpdateTemporaryBlocked (Unblocked)
[3](#updatetemporaryblocked-unblocked)](#updatetemporaryblocked-unblocked)

[1.2.8 GetPromotionCounters 3](#getpromotioncounters)

[1.2.9 UpdatePromotionCounters
[3](#updatepromotioncounters)](#updatepromotioncounters)

[1.2.10 GetPromotionPlans [3](#getpromotionplans)](#getpromotionplans)

[1.2.11 UpdatePromotionPlan (ADD)
[3](#updatepromotionplan-add)](#updatepromotionplan-add)

[1.2.12 UpdatePromotionPlan (SET)
[3](#updatepromotionplan-set)](#updatepromotionplan-set)

[1.2.13 UpdatePromotionPlan (DELETE)
[3](#updatepromotionplan-delete)](#updatepromotionplan-delete)

[1.2.14 UpdateAccumulators (Positive adjustment of the Accumulator)
[3](#updateaccumulators-positive-adjustment-of-the-accumulator)](#updateaccumulators-positive-adjustment-of-the-accumulator)

[1.2.15 UpdateAccumulators (Negative adjustment of the Accumulator)
3](#updateaccumulators-negative-adjustment-of-the-accumulator)

[1.2.16 UpdateAccumulators (Accumulator reset)
[3](#updateaccumulators-accumulator-reset)](#updateaccumulators-accumulator-reset)

[1.2.17 UpdateRefillBarring (BAR Refill)
[3](#updaterefillbarring-bar-refill)](#updaterefillbarring-bar-refill)

[1.2.18 UpdateRefillBarring (CLEAR Refill Bar counter)
[3](#updaterefillbarring-clear-refill-bar-counter)](#updaterefillbarring-clear-refill-bar-counter)

[1.2.19 UpdateRefillBarring (STEP - increase counter by one)
[3](#updaterefillbarring-step---increase-counter-by-one)](#updaterefillbarring-step---increase-counter-by-one)

[1.3 UCIP [3](#ucip)](#ucip)

[1.3.1 GetAccumulators [3](#getaccumulators)](#getaccumulators)

[1.3.2 UpdateBalanceAndDate
[3](#updatebalanceanddate)](#updatebalanceanddate)

[1.3.3 UpdateBalanceAndDate (serviceFeeExpiryDate,
supervisionExpiryDate, creditClearencePeriod, serviceRemovalPeriod )
[3](#updatebalanceanddate-servicefeeexpirydate-supervisionexpirydate-creditclearenceperiod-serviceremovalperiod)](#updatebalanceanddate-servicefeeexpirydate-supervisionexpirydate-creditclearenceperiod-serviceremovalperiod)

[1.3.4 UpdateBalanceAndDate (Main Relative Positive/Negative adjustment,
Dedicated Accounts Relative Positive/Negative adjustment)
[3](#updatebalanceanddate-main-relative-positivenegative-adjustment-dedicated-accounts-relative-positivenegative-adjustment)](#updatebalanceanddate-main-relative-positivenegative-adjustment-dedicated-accounts-relative-positivenegative-adjustment)

[1.3.5 UpdateBalanceAndDate (Main Relative Positive/Negative adjustment,
Dedicated Accounts Absolute Positive/Negative adjustment)
3](#updatebalanceanddate-main-relative-positivenegative-adjustment-dedicated-accounts-absolute-positivenegative-adjustment)

[1.3.6 GetBalanceAndDate [3](#getbalanceanddate)](#getbalanceanddate)

[1.3.7 GetAccountDetails [3](#getaccountdetails)](#getaccountdetails)

[1.3.8 GetAllowedServiceClasses (Licensed)
[3](#getallowedserviceclasses-licensed)](#getallowedserviceclasses-licensed)

[1.3.9 GetFaFList (Licensed)
[3](#getfaflist-licensed)](#getfaflist-licensed)

[1.3.10 GetRefillOptions (Licensed)
[3](#getrefilloptions-licensed)](#getrefilloptions-licensed)

[1.3.11 Refill (Voucherless)
[3](#refill-voucherless)](#refill-voucherless)

[1.3.12 Refill (Voucher Refill)
[3](#refill-voucher-refill)](#refill-voucher-refill)

[1.3.13 UpdateAccountDetails 3](#updateaccountdetails)

[1.3.14 UpdateFaFList (ADD) (Licensed)
[3](#updatefaflist-add-licensed)](#updatefaflist-add-licensed)

[1.3.15 UpdateFaFList (SET) (Licensed)
[3](#updatefaflist-set-licensed)](#updatefaflist-set-licensed)

[1.3.16 UpdateFaFList (DELETE) (Licensed)
[3](#updatefaflist-delete-licensed)](#updatefaflist-delete-licensed)

[1.3.17 UpdateServiceClass (Licensed)
[3](#updateserviceclass-licensed)](#updateserviceclass-licensed)

[1.3.18 UpdateCommunityList 3](#updatecommunitylist)

[1.3.19 UpdateSubscriberSegmentation
[3](#updatesubscribersegmentation)](#updatesubscribersegmentation)

[2 Appendix [3](#appendix)](#appendix)

[2.1 XML-RPC Requests [3](#xml-rpc-requests)](#xml-rpc-requests)

[2.2 ACIP XML-RPC requests
[3](#acip-xml-rpc-requests)](#acip-xml-rpc-requests)

[2.2.1 InstallSubscriber [3](#_Toc168892948)](#_Toc168892948)

[2.2.2 LinkSubordinateSubscriber [3](#_Toc168892949)](#_Toc168892949)

[2.2.3 DeleteSubscriber [3](#_Toc168892950)](#_Toc168892950)

[2.2.4 GetPromotionCounters [3](#_Toc168892951)](#_Toc168892951)

[2.2.5 UpdatePromotionCounters [3](#_Toc168892952)](#_Toc168892952)

[2.2.6 GetPromotionPlans [3](#_Toc168892953)](#_Toc168892953)

[2.2.7 UpdateAccumulators (Relative value) 3](#_Toc168892954)

[2.2.8 UpdateAccumulators (Absolute value)
[3](#_Toc168892955)](#_Toc168892955)

[2.2.9 UpdatePromotionPlan (ADD) [3](#_Toc168892956)](#_Toc168892956)

[2.2.10 UpdatePromotionPlan (SET) [3](#_Toc168892957)](#_Toc168892957)

[2.2.11 UpdatePromotionPlan (DELETE)
[3](#_Toc168892958)](#_Toc168892958)

[2.2.12 UpdateRefillBarring (refillBarAction : BAR, STEP, CLEAR)
[3](#_Toc168892959)](#_Toc168892959)

[2.2.13 UpdateTemporaryBlocked [3](#_Toc168892960)](#_Toc168892960)

[2.3 UCIP XML-RPC requests
[3](#ucip-xml-rpc-requests)](#ucip-xml-rpc-requests)

[2.3.1 GetAccumulators [3](#_Toc168892962)](#_Toc168892962)

[2.3.2 UpdateBalanceAndDate [3](#_Toc168892963)](#_Toc168892963)

[2.3.3 UpdateBalanceAndDate (serviceFeeExpiryDate,
supervisionExpiryDate, creditClearencePeriod, serviceRemovalPeriod )
[3](#_Toc168892964)](#_Toc168892964)

[2.3.4 UpdateBalanceAndDate (Dedicated Account Relative adjustment)
[3](#updatebalanceanddate-dedicated-account-relative-adjustment)](#updatebalanceanddate-dedicated-account-relative-adjustment)

[2.3.5 UpdateBalanceAndDate (Dedicated Account Absolute adjustment)
[3](#_Toc168892966)](#_Toc168892966)

[2.3.6 GetBalanceAndDate [3](#_Toc168892967)](#_Toc168892967)

[2.3.7 GetAccountDetails 3](#_Toc168892968)

[2.3.8 GetAllowedServiceClasses [3](#_Toc168892969)](#_Toc168892969)

[2.3.9 GetFaFList [3](#_Toc168892970)](#_Toc168892970)

[2.3.10 GetRefillOptions [3](#_Toc168892971)](#_Toc168892971)

[2.3.11 Refill (Voucherless) [3](#_Toc168892972)](#_Toc168892972)

[2.3.12 Refill (Voucher Refill -- requires Voucher Server)
[3](#_Toc168892973)](#_Toc168892973)

[2.3.13 UpdateAccountDetails (EOCN) [3](#_Toc168892974)](#_Toc168892974)

[2.3.14 UpdateFaFList (ADD) [3](#_Toc168892975)](#_Toc168892975)

[2.3.15 UpdateFaFList (SET) (Licensed)
[3](#_Toc168892976)](#_Toc168892976)

[2.3.16 UpdateServiceClass (Licensed)
[3](#_Toc168892977)](#_Toc168892977)

[2.3.17 UpdateCommunityList [3](#_Toc168892978)](#_Toc168892978)

[2.3.18 UpdateSubscriberSegmentation
[3](#_Toc168892979)](#_Toc168892979)

# Introduction

## Feature Description

ACIP AIR-IP 3.0 is intended for Administrative actions towards the
subscriber and their accounts. This involves Install/Update/Delete of
subscriber and his account but also Adjustments, Account Refill and
Account Enquiries and to extract account details.

UCIP AIR-IP 3.0 is intended for User actions towards the subscriber and
their accounts.

ACIP/UCIP AIR-IP 3.0 is an IP-protocol used for integration towards the
AIR server from the external administrative application.

ACIP/UCIP AIR-IP 3.0 is an XML over HTTP based protocol. An ACIP/UCIP
AIR-IP 3.0 request is sent to one of the AIR servers within the network
Test

## ACIP

**Authentication, Authorization and Security**

Authentication (Authorization) is mandatory and it is done at HTTP
level. All security is intended to be handled at transport level and
downwards. For higher security an encryption scheme like IPSec is
recommended. Using information from the HTTP header the server will
handle the authentication in a two step process.

The HTTP header must contain an Authentication field containing "Basic
user: password". The user: password is b64 encoded, in other words it is
not sent in readable text. The user: password is compared to a user:
password configured in the AIR.

Link to the b64 online code-decode :
[http://www.motobit.com/util/base64-decoder-encoder.asp](http://www.motobit.com/util/base64-decoder-encoder.asp)

ACIP requests are licensed. A license is required and has to be
installed on license server (fdslicensehost) and also all the ACIP
functions must be created and turned ON

### InstallSubscriber

> Create the using the [InstallSubscriber](#installsubscriber-1) XML

### DeleteSubscriber

> Delete the Charging account using
> [DeleteSubscriber](#deletesubscriber-1) XML request

### DeleteSubscriber (Deleting a subordinate subscriber)

> Delete the Subordinate Charging account using
> [DeleteSubscriber](#deletesubscriber-1) XML request

### DeleteSubscriber (Deleting a Master subscriber that has subordinate accounts)

> Delete one Subordinate Charging account(s) using
> [DeleteSubscriber](#deletesubscriber-1) XML request

### LinkSubordinateSubscriber

> Link the Charging Subscriber 1 (Master) to the Charging Subscriber 2
> (Subordinate) using the
> [LinkSubordinateSubscriber](#linksubordinatesubscriber-1) XML request

### UpdateTemporaryBlocked (temporary blocked)

> Temporary block command using
> [UpdateTemporaryBlocked](#updatetemporaryblocked) XML request with
> temporaryBlockedFlag set to 1

### UpdateTemporaryBlocked (Unblocked)

> Clear Temporary block using
> [UpdateTemporaryBlocked](#updatetemporaryblocked) XML request with
> temporaryBlockedFlag set to 0.

### GetPromotionCounters

> [GetPromotionCounters](#getpromotioncounters-1) XML request the get
> info for promotion counters

### UpdatePromotionCounters

> [UpdatePromotionCounters](#updatepromotioncounters-1) XML to update
> promotion counters or promotion plan progress counter

### GetPromotionPlans

> [GetPromotionPlans](#getpromotionplans-1) XML request

### UpdatePromotionPlan (ADD)

> [UpdatePromotionPlan (ADD)](#updatepromotionplan-add-1) XML command

### UpdatePromotionPlan (SET)

> [UpdatePromotionPlan (SET)](#updatepromotionplan-set-1) XML command

### UpdatePromotionPlan (DELETE)

> [UpdatePromotionPlan (DELETE)](#updatepromotionplan-delete-1) XML
> command for one promotion plan

### UpdateAccumulators (Positive adjustment of the Accumulator)

> Send a positive accumulator adjustment(s) [UpdateAccumulators
> (Relative)](#updateaccumulators-relative-value) XML request (for
> multiple accumulators the adjustment must be positive for all)

### UpdateAccumulators (Negative adjustment of the Accumulator)

> Send a negative (substraction) accumulator adjustment(s)
> [UpdateAccumulators (Relative)](#updateaccumulators-relative-value)
> XML request (for multiple accumulators the adjustment must be
> negative)

### UpdateAccumulators (Accumulator reset)

> Accumulator reset using [UpdateAccumulators
> (Absolute)](#updateaccumulators-absolute-value) XML request

### UpdateRefillBarring (BAR Refill)

> [UpdateRefillBarring](#updaterefillbarring-refillbaraction-bar-step-clear)
> XML request command with parameter refillBarAction : BAR

### UpdateRefillBarring (CLEAR Refill Bar counter)

> [UpdateRefillBarring](#updaterefillbarring-refillbaraction-bar-step-clear)
> XML request command with parameter refillBarAction : CLEAR

### UpdateRefillBarring (STEP - increase counter by one)

> [UpdateRefillBarring](#updaterefillbarring-refillbaraction-bar-step-clear)
> XML request command with parameter refillBarAction : STEP

##  UCIP

**Authentication, Authorization and Security**

Authentication (Authorization) is mandatory and it is done at HTTP
level. All security is intended to be handled at transport level and
downwards. For higher security an encryption scheme like IPSec is
recommended. Using information from the HTTP header the server will
handle the authentication in a two step process.

The HTTP header must contain an Authentication field containing "Basic
user: password". The user: password is b64 encoded, in other words it is
not sent in readable text. The user: password is compared to a user:
password configured in the AIR.

Some of the UCIP requests are licensed. For UCIP the licensed functions
must be created and turned ON.

### GetAccumulators

> [GetAccumulators](#GetAccumulators_XML_Request) XML request

### UpdateBalanceAndDate

[UpdateBalanceAndDate](#updatebalanceanddate-1)

### UpdateBalanceAndDate (serviceFeeExpiryDate, supervisionExpiryDate, creditClearencePeriod, serviceRemovalPeriod )

[UpdateBalanceAndDate](#updatebalanceanddate-servicefeeexpirydate-supervisionexpirydate-creditclearenceperiod-serviceremovalperiod-1)
(serviceFeeExpiryDate, supervisionExpiryDate, creditClearencePeriod,
serviceRemovalPeriod

### UpdateBalanceAndDate (Main Relative Positive/Negative adjustment, Dedicated Accounts Relative Positive/Negative adjustment)

> [UpdateBalanceAndDate Dedicated Accounts
> Relative](#UpdateBalanceAndDate_Relative_XML) XML request

### UpdateBalanceAndDate (Main Relative Positive/Negative adjustment, Dedicated Accounts Absolute Positive/Negative adjustment)

> [UpdateBalanceAndDate Dedicated Accounts
> Absolute](#updatebalanceanddate-dedicated-account-absolute-adjustment)
> XML request

### GetBalanceAndDate

> [GetBalanceAndDate](#getbalanceanddate-1) XML request

### GetAccountDetails

> [GetAccountDetails](#getaccountdetails-1) XML request

### GetAllowedServiceClasses (Licensed)

> [GetAllowedServiceClasses](#getallowedserviceclasses) XML request

### GetFaFList (Licensed)

> [GetFaFList](#getfaflist) XML request

### GetRefillOptions (Licensed)

> [GetRefillOptions](#getrefilloptions) XML request

### Refill (Voucherless)

> [Refill](#refill-voucherless-1) XML request

### Refill (Voucher Refill)

> [Refill](#refill-voucher-refill-requires-voucher-server) XML request

### UpdateAccountDetails

> [UpdateAccountDetails](#updateaccountdetails-eocn) XML request

### UpdateFaFList (ADD) (Licensed)

> [UpdateFaFList (ADD)](#updatefaflist-add) XML request

### UpdateFaFList (SET) (Licensed)

> [UpdateFaFList (SET)](#updatefaflist-set-licensed-1) XML request

### UpdateFaFList (DELETE) (Licensed)

> UpdateFaFList (DELETE) XML request

### UpdateServiceClass (Licensed)

> [UpdateServiceClass](#updateserviceclass-licensed-1) XML request

### UpdateCommunityList

> [UpdateCommunityList](#updatecommunitylist-1) XML request

### UpdateSubscriberSegmentation

> [UpdateSubscriberSegmentation](#updatesubscribersegmentation-1) XML
> request (the Account Group ID will be changed)

# Appendix

## XML-RPC Requests

An XML-RPC request can be executed from any Unix machine.

Steps :

An XML_RPC request is build from a HEADER and BODY

Prepare the XML-RPC with the appropriate information.

**HEADER :**

**Content-Length**: 3020 : this is the size in bytes for the text
included in the BODY. This value can increase/decrease if elements
(lines) are added/removed to/from the BODY.

If this value is too low, the telnet will be ended without sending the
full request (request incompleted)

If this value is too high, many Enter keys might be required to get the
result (or a timeout will occur)

**User-Agent** contains the Protocol version (between "**/**") and
always should be **3.0**

**Authorization : Basic** : is the encrypted password using base64 for
the user created in the AIR server that is allowed to perform the
ACIP/UCIP requests

**Example (**In **bold/red** is the mandatory data)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3020

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

**User-Agent: UGw Server/3.0/1.0**

**Authorization: Basic dXNlcjp1c2Vy**

**BODY : Example**

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>InstallSubscriber\</methodName\>

.........

\</methodCall\>

send a telnet command to the air server port 10010

**Example :**

\# telnet air1a-n5 10010

Trying 142.133.69.9\...

Connected to air1a-n5.

Escape character is \'\^\]\'.

paste the XML-RPC request and hit Enter a key until the response

##  ACIP XML-RPC requests

### [[]{#_Toc168892948 .anchor}InstallSubscriber](\l)

###  {#section-1 .unnumbered}

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1890

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 142 = Subscriber already installed \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>InstallSubscriber\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\<member\>

\<name\>serviceClassNew\</name\>

\<value\>

\<int\>201\</int\>

\</value\>

\</member\>

\# temporaryBlockedFlag : Optional \#

\<member\>

\<name\>temporaryBlockedFlag\</name\>

\<value\>

\# temporaryBlockedFlag : 0-Clear Flag; 1-Set Flag to temporary blocked
\#

\<boolean\>0\</boolean\>

\</value\>

\</member\>

\# languageIDNew : Optional \#

\<member\>

\<name\>languageIDNew\</name\>

\<value\>

\# 1 : default language \#

\<int\>1\</int\>

\</value\>

\</member\>

\# ussdEndOfCallNotificationID : Optional \#

\<member\>

\<name\>ussdEndOfCallNotificationID\</name\>

\<value\>

\# 0-199 : as defined in the tariff trees ; 255 : No USSD EOCNID
assigned \#

\<int\>255\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892949 .anchor}LinkSubordinateSubscriber](#linksubordinatesubscriber)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1590

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Succeeful \#

\# responseCode 100 = Other error (verify AF, SDP) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary Blocked \#

\# responseCode 143 = Invalid Master Subscriber \#

\# responseCode 144 = Subscriber already activated \#

\# responseCode 145 = Already linked Subordinate \#

\# responseCode 146 = Already linked as master \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>LinkSubordinateSubscriber\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063351022\</string\>

\</value\>

\</member\>

\# originOperatorID : Optional \#

\<member\>

\<name\>originOperatorID\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>masterAccountNumber\</name\>

\<value\>

\<string\> 9172139951\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892950 .anchor}DeleteSubscriber](#deletesubscriber)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1220

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode : 0 = request succeeded \#

\# responseCode : 100 = Other error (verify AF,SDP) \#

\# responseCode : 102 = Subscriber not found \#

\# responseCode : 156 = Delete failed \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>DeleteSubscriber\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originOperatorID\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892951 .anchor}GetPromotionCounters](#getpromotioncounters)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1040

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetPromotionCounters\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892952 .anchor}UpdatePromotionCounters](#updatepromotioncounters)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1530

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 126 = Account not active \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdatePromotionCounters\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# transactionCurrency : Optional but mandatory if amount shall be
updated \#

\<member\>

\<name\>transactionCurrency\</name\>

\<value\>

\<string\>2\</string\>

\</value\>

\</member\>

\# promotionRefillAmountRelative : Optional \#

\<member\>

\<name\>promotionRefillAmountRelative\</name\>

\<value\>

\<string\>10\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892953 .anchor}GetPromotionPlans](#getpromotionplans)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1210

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetPromotionPlans\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# originOperatorID : Optional \#

\<member\>

\<name\>originOperatorID\</name\>

\<value\>

\<string\>Ericsson\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892954 .anchor}UpdateAccumulators (Relative value)](#updateaccumulators-positive-adjustment-of-the-accumulator)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3760

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# Header length : 230 \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (Verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Tempoary Blocked \#

\# responseCode 126 = Account Not Active \#

\# responseCode 127 = Accumulator not available \#

\# responseCode 134 = Accumulator overflow \#

\# responseCode 135 = Accumulator undeflow \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateAccumulators\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# originOperatorID : Optional \#

\<member\>

\<name\>originOperatorID\</name\>

\<value\>

\<string\>Ericsson\</string\>

\</value\>

\</member\>

\<member\>

\<name\>accumulatorInformation\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>accumulatorID\</name\>

\<value\>\<int\>1\</int\>\</value\>

\</member\>

\# accumulatorValueRelative : Optional XOR accumulatorValueAbsolute:
ONLY ONE can be given \#

\<member\>

\<name\>accumulatorValueRelative\</name\>

\<value\>\<int\>10\</int\>\</value\>

\</member\>

\# accumulatorStartDate : Optional \#

\<member\>

\<name\>accumulatorStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070529T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\<value\>

\<struct\>

\<member\>

\<name\>accumulatorID\</name\>

\<value\>\<int\>2\</int\>\</value\>

\</member\>

\# accumulatorValueRelative : Optional XOR accumulatorValueAbsolute:
ONLY ONE can be given \#

\<member\>

\<name\>accumulatorValueRelative\</name\>

\<value\>\<int\>10\</int\>\</value\>

\</member\>

\# accumulatorStartDate : Optional \#

\<member\>

\<name\>accumulatorStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070529T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\# serviceClassCurrent : Optional \#

\<member\>

\<name\>serviceClassCurrent\</name\>

\<value\>\<int\>99\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892955 .anchor}UpdateAccumulators (Absolute value)](#updateaccumulators-accumulator-reset)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3760

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# Header length : 230 \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (Verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Tempoary Blocked \#

\# responseCode 126 = Account Not Active \#

\# responseCode 127 = Accumulator not available \#

\# responseCode 134 = Accumulator overflow \#

\# responseCode 135 = Accumulator undeflow \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateAccumulators\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\# originOperatorID : Optional \#

\<member\>

\<name\>originOperatorID\</name\>

\<value\>

\<string\>Ericsson\</string\>

\</value\>

\</member\>

\<member\>

\<name\>accumulatorInformation\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>accumulatorID\</name\>

\<value\>\<int\>1\</int\>\</value\>

\</member\>

\# accumulatorValueAbsolute : Optional XOR accumulatorValueRelative :
ONLY ONE can be given \#

\<member\>

\<name\>accumulatorValueAbsolute\</name\>

\<value\>\<int\>5\</int\>\</value\>

\</member\>

\# accumulatorStartDate : Optional \#

\<member\>

\<name\>accumulatorStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070529T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\<value\>

\<struct\>

\<member\>

\<name\>accumulatorID\</name\>

\<value\>\<int\>2\</int\>\</value\>

\</member\>

\# accumulatorValueAbsolute : Optional XOR accumulatorValueRelative :
ONLY ONE can be given \#

\<member\>

\<name\>accumulatorValueAbsolute\</name\>

\<value\>\<int\>5\</int\>\</value\>

\</member\>

\# accumulatorStartDate : Optional \#

\<member\>

\<name\>accumulatorStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070528T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\# serviceClassCurrent : Optional \#

\<member\>

\<name\>serviceClassCurrent\</name\>

\<value\>\<int\>99\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892956 .anchor}UpdatePromotionPlan (ADD)](#updatepromotionplan-add)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 2660

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode ADD \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 150 = Invalid promotion plan ID \#

\# responseCode 158 = Max number of allocated promotion plans already
reached \#

\# responseCode SET \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 150 = Invalid promotion plan ID \#

\# responseCode 151 = Promotion plan not found \#

\# responseCode Delete \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 151 = Promotion plan not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdatePromotionPlan\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# promotionPlanAction : Optional ADD, SET, DELETE#

\<member\>

\<name\>promotionPlanAction\</name\>

\<value\>

\<string\>ADD\</string\>

\</value\>

\</member\>

\# promotionPlanID : Optional \#

\<member\>

\<name\>promotionPlanID\</name\>

\<value\>

\<string\>2\</string\>

\</value\>

\</member\>

\# promotionStartDate : Mandatory for ADD and SET, N/A for DELETE \#

\<member\>

\<name\>promotionStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070501T00:00:01-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\# promotionEndDate : Mandatory for ADD and SET, N/A for DELETE \#

\<member\>

\<name\>promotionEndDate\</name\>

\<value\>

\<dateTime.iso8601\>20070515T00:00:01-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892957 .anchor}UpdatePromotionPlan (SET)](#updatepromotionplan-set)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3190

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode ADD \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 150 = Invalid promotion plan ID \#

\# responseCode 158 = Max number of allocated promotion plans already
reached \#

\# responseCode SET \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 150 = Invalid promotion plan ID \#

\# responseCode 151 = Promotion plan not found \#

\# responseCode Delete \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 151 = Promotion plan not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdatePromotionPlan\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# promotionPlanAction : Mandatory ADD, SET, DELETE \#

\<member\>

\<name\>promotionPlanAction\</name\>

\<value\>

\<string\>SET\</string\>

\</value\>

\</member\>

\# promotionPlanID : Mandatory for ADD, Optional for SET N/A for DELETE
\#

\<member\>

\<name\>promotionPlanID\</name\>

\<value\>

\<string\>2\</string\>

\</value\>

\</member\>

\# promotionOldStartDate : N/A for ADD, Mandatory for SET and DELETE \#

\<member\>

\<name\>promotionOldStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070501T00:00:01-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\# promotionOldEndDate : N/A for ADD, Mandatory for SET and DELETE \#

\<member\>

\<name\>promotionOldEndDate\</name\>

\<value\>

\<dateTime.iso8601\>20070515T00:00:01-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\# promotionStartDate : Mandatory for ADD and SET, N/A for DELETE \#

\<member\>

\<name\>promotionStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070601T00:00:01-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\# promotionEndDate : Mandatory for ADD and SET, N/A for DELETE \#

\<member\>

\<name\>promotionEndDate\</name\>

\<value\>

\<dateTime.iso8601\>20070615T00:00:01-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892958 .anchor}UpdatePromotionPlan (DELETE)](#updatepromotionplan-delete)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 2480

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode ADD \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 150 = Invalid promotion plan ID \#

\# responseCode 158 = Max number of allocated promotion plans already
reached \#

\# responseCode SET \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 150 = Invalid promotion plan ID \#

\# responseCode 151 = Promotion plan not found \#

\# responseCode Delete \#

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 149 = Invalid promotion plan end date \#

\# responseCode 151 = Promotion plan not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdatePromotionPlan\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# promotionPlanAction : Mandatory ADD, SET, DELETE \#

\<member\>

\<name\>promotionPlanAction\</name\>

\<value\>

\<string\>DELETE\</string\>

\</value\>

\</member\>

\# promotionOldStartDate : Mandatory for DELETE \#

\<member\>

\<name\>promotionOldStartDate\</name\>

\<value\>

\<dateTime.iso8601\>20070516T12:00:00+0000\</dateTime.iso8601\>

\</value\>

\</member\>

\# promotionOldEndDate : Mandatory for DELETE \#

\<member\>

\<name\>promotionOldEndDate\</name\>

\<value\>

\<dateTime.iso8601\>20070531T12:00:00+0000\</dateTime.iso8601\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892959 .anchor}UpdateRefillBarring](#updaterefillbarring-bar-refill) (refillBarAction : BAR, STEP, CLEAR)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1310

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 126 = Account not active \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateRefillBarring\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# refillBarAction : Optional CLEAR, STEP, BAR \#

\<member\>

\<name\>refillBarAction\</name\>

\<value\>

\<string\>CLEAR\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892960 .anchor}UpdateTemporaryBlocked](#updatetemporaryblocked-temporary-blocked)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1280

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Success \#

\# responseCode 100 = Other error \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 152 = Deblocking of expired account \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateTemporaryBlocked\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\<member\>

\<name\>temporaryBlockedFlag\</name\>

\<value\>

\# temporaryBlockedFlag : 0-Clear Flag; 1-Set Flag to temporary block \#

\<boolean\>1\</boolean\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

##  UCIP XML-RPC requests

### [[]{#_Toc168892962 .anchor}GetAccumulators](\l)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1290

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (Verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Tempoary Blocked \#

\# responseCode 126 = Account Not Active \#

\# responseCode 127 = Accumulator not available \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetAccumulators\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892963 .anchor}UpdateBalanceAndDate](#updatebalanceanddate)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1970

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 105 = Dedicated Account not allowed \#

\# responseCode 106 = Dedicated Account negative \#

\# responseCode 121 = Supervision period too long \#

\# responseCode 122 = Service fee period too long \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 136 = Date adjustment error \#

\# responseCode 139 = Dedicated account not defined \#

\# responseCode 153 = Dedicated account max credit limit exceeded \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateBalanceAndDate\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\# transactionCurrency : Optional but Mandatory if adjust change any
account \#

\<member\>

\<name\>transactionCurrency\</name\>

\<value\>

\<string\>USD\</string\>

\</value\>

\</member\>

\# adjustmentAmountRelative : Optional \#

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>1000\</string\>\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892964 .anchor}UpdateBalanceAndDate (serviceFeeExpiryDate, supervisionExpiryDate, creditClearencePeriod, serviceRemovalPeriod )](#updatebalanceanddate-servicefeeexpirydate-supervisionexpirydate-creditclearenceperiod-serviceremovalperiod)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 2690

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 105 = Dedicated Account not allowed \#

\# responseCode 106 = Dedicated Account negative \#

\# responseCode 121 = Supervision period too long \#

\# responseCode 122 = Service fee period too long \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 136 = Date adjustment error \#

\# responseCode 139 = Dedicated account not defined \#

\# responseCode 153 = Dedicated account max credit limit exceeded \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateBalanceAndDate\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\# transactionCurrency : Optional but Mandatory if adjust change any
account \#

\<member\>

\<name\>transactionCurrency\</name\>

\<value\>

\<string\>USD\</string\>

\</value\>

\</member\>

\# adjustmentAmountRelative : Optional \#

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>10000\</string\>\</value\>

\</member\>

\# supervisionExpiryDate : Optional \#

\<member\>

\<name\>supervisionExpiryDate\</name\>

\<value\>

\<dateTime.iso8601\>20071215T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\# serviceFeeExpiryDate : Optional \#

\<member\>

\<name\>serviceFeeExpiryDate\</name\>

\<value\>

\<dateTime.iso8601\>20071215T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\# creditClearancePeriod : Optional \#

\<member\>

\<name\>creditClearancePeriod\</name\>

\<value\>\<int\>0\</int\>\</value\>

\</member\>

\# serviceRemovalPeriod : Optional \#

\<member\>

\<name\>serviceRemovalPeriod\</name\>

\<value\>\<int\>0\</int\>\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#UpdateBalanceAndDate_Relative_XML .anchor}UpdateBalanceAndDate (Dedicated Account Relative adjustment)](\l)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3210

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 105 = Dedicated Account not allowed \#

\# responseCode 106 = Dedicated Account negative \#

\# responseCode 121 = Supervision period too long \#

\# responseCode 122 = Service fee period too long \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 136 = Date adjustment error \#

\# responseCode 139 = Dedicated account not defined \#

\# responseCode 153 = Dedicated account max credit limit exceeded \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateBalanceAndDate\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# transactionCurrency : Optional but Mandatory if adjust change any
account \#

\<member\>

\<name\>transactionCurrency\</name\>

\<value\>

\<string\>USD\</string\>

\</value\>

\</member\>

\# adjustmentAmountRelative : Optional \#

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>500\</string\>\</value\>

\</member\>

\# dedicatedAccountUpdateInformation : Optional \#

\<member\>

\<name\>dedicatedAccountUpdateInformation\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>dedicatedAccountID\</name\>

\<value\>\<int\>1\</int\>\</value\>

\</member\>

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>500\</string\>\</value\>

\</member\>

\</struct\>

\</value\>

\<value\>

\<struct\>

\<member\>

\<name\>dedicatedAccountID\</name\>

\<value\>\<int\>2\</int\>\</value\>

\</member\>

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>500\</string\>\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\# creditClearancePeriod : Optional \#

\<member\>

\<name\>creditClearancePeriod\</name\>

\<value\>\<int\>20\</int\>\</value\>

\</member\>

\# serviceRemovalPeriod : Optional \#

\<member\>

\<name\>serviceRemovalPeriod\</name\>

\<value\>\<int\>30\</int\>\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892966 .anchor}UpdateBalanceAndDate (Dedicated Account Absolute adjustment)](#updatebalanceanddate-main-relative-positivenegative-adjustment-dedicated-accounts-absolute-positivenegative-adjustment)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3200

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 105 = Dedicated Account not allowed \#

\# responseCode 106 = Dedicated Account negative \#

\# responseCode 121 = Supervision period too long \#

\# responseCode 122 = Service fee period too long \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 136 = Date adjustment error \#

\# responseCode 139 = Dedicated account not defined \#

\# responseCode 153 = Dedicated account max credit limit exceeded \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateBalanceAndDate\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\# transactionCurrency : Optional but Mandatory if adjust change any
account \#

\<member\>

\<name\>transactionCurrency\</name\>

\<value\>

\<string\>USD\</string\>

\</value\>

\</member\>

\# adjustmentAmountRelative : Optional \#

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>300\</string\>\</value\>

\</member\>

\# dedicatedAccountUpdateInformation : Optional \#

\<member\>

\<name\>dedicatedAccountUpdateInformation\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>dedicatedAccountID\</name\>

\<value\>\<int\>1\</int\>\</value\>

\</member\>

\<member\>

\<name\>adjustmentAmountRelative\</name\>

\<value\>\<string\>2500\</string\>\</value\>

\</member\>

\</struct\>

\</value\>

\<value\>

\<struct\>

\<member\>

\<name\>dedicatedAccountID\</name\>

\<value\>\<int\>2\</int\>\</value\>

\</member\>

\<member\>

\<name\>dedicatedAccountValueNew\</name\>

\<value\>\<string\>3500\</string\>\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\# creditClearancePeriod : Optional \#

\<member\>

\<name\>creditClearancePeriod\</name\>

\<value\>\<int\>60\</int\>\</value\>

\</member\>

\# serviceRemovalPeriod : Optional \#

\<member\>

\<name\>serviceRemovalPeriod\</name\>

\<value\>\<int\>90\</int\>\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892967 .anchor}GetBalanceAndDate](#getbalanceanddate)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1240

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 137 = Get Balance and Date not allowed \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetBalanceAndDate\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892968 .anchor}GetAccountDetails](#getaccountdetails)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1040

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetAccountDetails\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139951\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

### [GetAccountDetails](#getaccountdetails) with location details

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1040

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetAccountDetails\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>EXT\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>kml\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>9999\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>\<dateTime.iso8601\>20160911T14:20:21+0100\</dateTime.iso8601\>\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>553350535\</value\>

\</member\>

\<member\>

\<name\>requestedInformationFlags\</name\>

\<value\>

\<struct\>

\<member\>

\<name\>requestLocationInformationFlag\</name\>

\<value\>\<boolean\>1\</boolean\>\</value\>

\</member\>

\</struct\>

\</value\>

\</member\>

\</struct\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892969 .anchor}GetAllowedServiceClasses](#getallowedserviceclasses-licensed)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1100

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 133 = Service Class list empty \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetAllowedServiceClasses\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892970 .anchor}GetFaFList](#getfaflist-licensed)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1200

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: sunmc-n5

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 126 = Account not active \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetFaFList\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\<member\>

\<name\>requestedOwner\</name\>

\<value\>

\<int\>2\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892971 .anchor}GetRefillOptions](#getrefilloptions-licensed)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1510

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 115 = Voucher group service class error \#

\# responseCode 126 = Account not active \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>GetRefillOptions\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# voucherActivationCode : Optional \#

\<member\>

\<name\>voucherActivationCode\</name\>

\<value\>

\<string\>12345678\</string\>

\</value\>

\</member\>

\# serviceClassCurrent : Optional \#

\<member\>

\<name\>serviceClassCurrent\</name\>

\<value\>

\<int\>15\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892972 .anchor}Refill (Voucherless)](#refill-voucherless)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 3010

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 3 = \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 103 = Account barred for refill \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 105 = Dedicated account not allowed \#

\# responseCode 106 = Dedicated account negative \#

\# responseCode 107 = Voucher status used by same \#

\# responseCode 108 = Voucher status used by different \#

\# responseCode 109 = Voucher status unavailable \#

\# responseCode 110 = Voucher status expired \#

\# responseCode 111 = Voucher status stolen or missing \#

\# responseCode 112 = Voucher status damaged \#

\# responseCode 113 = Voucher status pending \#

\# responseCode 114 = Voucher type not accepted \#

\# responseCode 115 = Voucher group service class error \#

\# responseCode 117 = Service class change not allowed \#

\# responseCode 119 = Invalid voucher activation code \#

\# responseCode 120 = Invalid refill profile \#

\# responseCode 121 = Supervision period too long \#

\# responseCode 122 = Service fee period too long \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 126 = Account not active \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>Refill\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# transactionType : Optional \#

\<member\>

\<name\>transactionType\</name\>

\<value\>

\<string\>TEST\</string\>

\</value\>

\</member\>

\# transactionCode : Optional \#

\<member\>

\<name\>transactionCode\</name\>

\<value\>

\<string\>ADJ\</string\>

\</value\>

\</member\>

\# transactionAmount : Mandatory for a voucherless refill \#

\<member\>

\<name\>transactionAmount\</name\>

\<value\>

\<string\>1000\</string\>

\</value\>

\</member\>

\# transactionCurrency : Mandatory for a voucherless refill \#

\<member\>

\<name\>transactionCurrency\</name\>

\<value\>

\<string\>USD\</string\>

\</value\>

\</member\>

\# refillProfileID : Mandatory for a voucherless refill \#

\<member\>

\<name\>refillProfileID\</name\>

\<value\>

\<string\>10\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892973 .anchor}Refill (Voucher Refill -- requires Voucher Server)](#refill-voucher-refill)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 2610

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 3 = \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 103 = Account barred for refill \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 105 = Dedicated account not allowed \#

\# responseCode 106 = Dedicated account negative \#

\# responseCode 107 = Voucher status used by same \#

\# responseCode 108 = Voucher status used by different \#

\# responseCode 109 = Voucher status unavailable \#

\# responseCode 110 = Voucher status expired \#

\# responseCode 111 = Voucher status stolen or missing \#

\# responseCode 112 = Voucher status damaged \#

\# responseCode 113 = Voucher status pending \#

\# responseCode 114 = Voucher type not accepted \#

\# responseCode 115 = Voucher group service class error \#

\# responseCode 117 = Service class change not allowed \#

\# responseCode 119 = Invalid voucher activation code \#

\# responseCode 120 = Invalid refill profile \#

\# responseCode 121 = Supervision period too long \#

\# responseCode 122 = Service fee period too long \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 126 = Account not active \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>Refill\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>9172139954\</string\>

\</value\>

\</member\>

\# transactionType : Optional \#

\<member\>

\<name\>transactionType\</name\>

\<value\>

\<string\>TEST\</string\>

\</value\>

\</member\>

\# transactionCode : Optional \#

\<member\>

\<name\>transactionCode\</name\>

\<value\>

\<string\>ADJ\</string\>

\</value\>

\</member\>

\# voucherActivationCode : Mandatory for a voucher refill \#

\<member\>

\<name\>voucherActivationCode\</name\>

\<value\>

\<string\>06153297\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892974 .anchor}UpdateAccountDetails](#updateaccountdetails) (EOCN)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1440

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 128 = Invalid PIN code \#

\# responseCode 138 = No PIN code registered \#

\# responseCode 141 = Invalid language \#

\# responseCode 157 = Invalid account home region \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateAccountDetails\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# ussdEndOfCallNotificationID : Optional \#

\<member\>

\<name\>ussdEndOfCallNotificationID\</name\>

\<value\>

\<int\>99\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892975 .anchor}UpdateFaFList (ADD)](#updatefaflist-add-licensed)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 2080

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: sunmc-n5

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Success \#

\# responseCode 100 = Other error (verify running AF/SDP) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 127 = Accumulator not available \#

\# responseCode 130 = FaF number not allowed

\# responseCode 134 = Accumulator overflow \#

\# responseCode 135 = Accumulator undeflow \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateFaFList\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>ADM\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\<member\>

\<name\>fafAction\</name\>

\<value\>

\<string\>ADD\</string\>

\</value\>

\</member\>

\<member\>

\<name\>fafInformation\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>fafNumber\>\</name\>

\<value\>

\<string\>1\</string\>

\</value\>

\</member\>

\<member\>

\<name\>owner\>\</name\>

\<value\>

\<string\>Subscriber\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892976 .anchor}UpdateFaFList (SET)](#updatefaflist-set-licensed) (Licensed)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 2080

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Success \#

\# responseCode 100 = Other error (verify running AF/SDP) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 127 = Accumulator not available \#

\# responseCode 130 = FaF number not allowed

\# responseCode 134 = Accumulator overflow \#

\# responseCode 135 = Accumulator undeflow \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateFaFList\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070529T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2062261037\</string\>

\</value\>

\</member\>

\<member\>

\<name\>fafAction\</name\>

\<value\>

\<string\>SET\</string\>

\</value\>

\</member\>

\<member\>

\<name\>fafInformation\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>fafNumber\>\</name\>

\<value\>

\<string\>1\</string\>

\</value\>

\</member\>

\<member\>

\<name\>owner\>\</name\>

\<value\>

\<string\>Subscriber\</string\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892977 .anchor}UpdateServiceClass](#updateserviceclass-licensed) (Licensed)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1940

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: PAG

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 117 = Service Class change not allowed \#

\# responseCode 123 = Max credit limit exceeded \#

\# responseCode 124 = Below minimum balance \#

\# responseCode 126 = Account not active \#

\# responseCode 127 = Accumulator not available \#

\# responseCode 134 = Accumulator overflow \#

\# responseCode 135 = Accumulator underflow \#

\# responseCode 140 = Invalid old Service class \#

\# responseCode 154 = Invalid old Service Class date \#

\# responseCode 155 = Invalid new Service Class \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateServiceClass\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\# serviceClassAction : SetOriginal, SetTemporary, DeleteTemporary \#

\<member\>

\<name\>serviceClassAction\</name\>

\<value\>

\<string\>SetOriginal\</string\>

\</value\>

\</member\>

\# serviceClassNew : Optional \#

\<member\>

\<name\>serviceClassNew\</name\>

\<value\>

\<int\>100\</int\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892978 .anchor}UpdateCommunityList](#updatecommunitylist)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1760

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: sunmc-n5

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\# responseCode 147 = Invalid old community list \#

\# responseCode 148 = Invalid new community list \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateCommunityList\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>sunmcn5\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\<member\>

\<name\>communityInformationNew\</name\>

\<value\>

\<array\>

\<data\>

\<value\>

\<struct\>

\<member\>

\<name\>communityID\</name\>

\<value\>\<int\>1\</int\>\</value\>

\</member\>

\</struct\>

\</value\>

\<value\>

\<struct\>

\<member\>

\<name\>communityID\</name\>

\<value\>\<int\>2\</int\>\</value\>

\</member\>

\</struct\>

\</value\>

\</data\>

\</array\>

\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>

###  [[]{#_Toc168892979 .anchor}UpdateSubscriberSegmentation](#updatesubscribersegmentation)

POST /Air HTTP/2.0

Accept: text/xml

Connection: keep-alive

Content-Length: 1200

Content-Type: text/xml

Date: Tue, 10 Apr 2007 10:00:00 EDT

Host: sunmc-n5

User-Agent: UGw Server/3.0/1.0

Authorization: Basic dXNlcjp1c2Vy

\# responseCode 0 = Request succeeded \#

\# responseCode 100 = Other error (verify AF) \#

\# responseCode 102 = Subscriber not found \#

\# responseCode 104 = Temporary blocked \#

\<?xml version=\"1.0\"?\>

\<methodCall\>

\<methodName\>UpdateSubscriberSegmentation\</methodName\>

\<params\>

\<param\>

\<value\>

\<struct\>

\<member\>

\<name\>originNodeType\</name\>

\<value\>

\<string\>PAG\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originHostName\</name\>

\<value\>

\<string\>sunmcn5\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTransactionID\</name\>

\<value\>

\<string\>12345\</string\>

\</value\>

\</member\>

\<member\>

\<name\>originTimeStamp\</name\>

\<value\>

\<dateTime.iso8601\>20070410T11:15:21-0500\</dateTime.iso8601\>

\</value\>

\</member\>

\<member\>

\<name\>subscriberNumber\</name\>

\<value\>

\<string\>2063341022\</string\>

\</value\>

\</member\>

\<member\>

\<name\>accountGroupID\</name\>

\<value\>\<int\>2\</int\>\</value\>

\</member\>

\</struct\>

\</value\>

\</param\>

\</params\>

\</methodCall\>
