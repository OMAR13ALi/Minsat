# AIR Programmer's Guide UCIP Version 5.

## Update 2

## CUSTOMER PRODUCT INFORMATION

1/1553-FAY 302 104/1 Uen U


**Copyright**

© Copyright Ericsson AB 2013. All rights reserved.

**Disclaimer**

No part of this document may be reproduced in any form without the written
permission of the copyright owner.

The contents of this document are subject to revision without notice due to
continued progress in methodology, design and manufacturing. Ericsson shall
have no liability for any error or damage of any kind resulting from the use
of this document.

**Trademark List**

**Ericsson** is the trademark of Telefonaktiebolaget LM Ericsson. All
other trademarks mentioned in this document are the
property of their respective owners.


## Contents










## AIR Programmer's Guide UCIP Version 5.

## AIR Programmer's Guide UCIP Version 5.

## AIR Programmer's Guide UCIP Version 5.

## AIR Programmer's Guide UCIP Version 5.

## AIR Programmer's Guide UCIP Version 5.

## AIR Programmer's Guide UCIP Version 5.

## AIR Programmer's Guide UCIP Version 5.


```
Introduction
```
## 1 Introduction

```
This section covers the introduction.
```
## 1.1 Purpose and Scope

```
The purpose of this Programmers Guide - UCIP is to describe how to handle
User Communication Integration Protocol (UCIP) in the AIR system, using the
IP-based protocol version 5.0 the Account Information and Refill server (AIR).
```
```
The following are included:
```
- UCIP in Use
- Syntax Notation
- Messages
- Elements
- Data Type Definitions
- State Behavior
- Examples
- Compatibility Mechanisms
- Transfer Mechanisms

```
The target groups for this document are as follows:
```
- Application Designer
- Application Administrator
- System Administrator

```
For more information regarding the target groups, see AIR Customer Product
Information - Overview, Reference [1].
```
## 1.2 Typographic Conventions

```
This document follows a set of typographic rules that make the document
consistent and easy to read. The typographic conventions is found in the AIR
Customer Product Information - Overview, Reference [1].
```

AIR Programmer's Guide UCIP Version 5.

```
Elements and data types that are specific for product customization are marked
with PC in the section describing the element or data type. Functions and
characteristics of a product customization is not part of the standard delivery.
Contact your local Ericsson office for more information regarding ordering and
compatibility.
```
```
All elements of a PC message are also product customizations when inside
such a message. If an element or data type is marked PC within an otherwise
standard record, is noted as such in the relevant chapters.
```
```
In order to improve readability the following applies in the rest of the document:
```
- The following applies to functions marked with (PC). The PC-tag is placed
    in the beginning and end of the description, or included in the header,
    where the complete section is dedicated to this type of function.

```
Elements and data types that are specific for product customization are marked
with the product customizations unique id in the tables for the messages
where the elements or data types are included. An example of a product
customization unique id is: PC:01234. Functions and characteristics of a
product customization is not part of the standard delivery, contact your local
Ericsson office for more information regarding ordering and compatibility.
```

```
General
```
## 2 General

```
The AIR system is used by connected systems to make enquiries on account
balance information of prepaid accounts and to refill prepaid accounts in a
mobile telephony network.
```
```
For a general description of AIR, see AIR Network Element Description,
Reference [2]..
```


```
UCIP in Use
```
## 3 UCIP in Use

```
This section covers UCIP in use.
```
## 3.1 Introduction

```
UCIP is intended for user self services such as Adjustments, Account Refill, and
Account Enquiries and to extract account details. UCIP is an IP-based protocol
used for integration towards the AIR server from the external application.
```
```
UCIP is an XML over HTTP based protocol, which makes it easy to integrate
with a central integration point within a network. The protocol supports both
session as well as event based clients. A UCIP request is sent to one of the
AIR servers within the network and for redundancy purposes it is required to
have N+1 AIR system in the network.
```
```
The elements part of this protocol will be transferred using XML-RPC
messages. An XML-RPC message is a body of an HTTP-POST request, see
Section 3.2 on page 5.
```
## 3.2 Message Description

```
The messages that are included in UCIP are listed and described in Table 1
```
_Table 1 Message description_

```
Message Description DR Generated
GetAccountDetails This message is used in order to validate
and tailor the user communication. The
GetAccountDetails message is used
to obtain the account and subscriber
information.
```
### -

```
GetAccountManagementCount
ers
```
```
This message is used to retrieve the
account management counters.
```
### -

```
GetAccountServiceFeeData
(PC:06214)
```
```
This message is used to fetch service fee
data assigned to a subscriber.
```
### -

```
GetAccumulators This message is used when the accumulator
values should be obtained. It is also used
to obtain the start and end dates related to
accumulators.
```
### -

```
GetAllowedServiceClasses This message is used to list service classes
that the subscriber is allowed to change to.
```
### -


```
AIR Programmer's Guide UCIP Version 5.
```
_Table 1 Message description_

```
Message Description DR Generated
GetBalanceAndDate This message makes it possible to
enquire the balances and expiry dates
of an account associated with a specific
subscriber identity.
```
### -

```
GetCapabilites This message makes it possible to enquire
capabilities.
```
### -

```
GetDiscountInformation
(PMR:792)
```
```
This message makes it possible to retrieve
discounts.
```
### -

```
GetFaFList This message is used to fetch and list the
Family and Friends (FaF) numbers with
attached FaF indicators.
```
### -

```
GetOffers This message is used to fetch offers and
products assigned to an account.
```
### -

```
GetRefillOptions This message is used to fetch the refill
options.
```
### -

```
GetUsageThresholdsAndCount
ers
```
```
This message is used to fetch usage
counters.
```
### -

```
Refill This message is used to apply a refill from
an administrative or external system to a
prepaid account associated with a specific
subscriber identity. It can be a voucherless
refill from for example a bank gateway, or
a voucher refill made through IVR or WEB
gateway.
```
```
AIR, Account
Database
```
```
UpdateAccountDetails This message is used to change the
account information when a user initiated
change is performed. For example, to set a
flag after the first IVR call has been made
or a change of the preferred language.
```
```
Account
Database
```
```
UpdateBalanceAndDate This message is used to make adjustments
to the account balances and expiry dates. It
is possible to do both relative adjustments
(negative or positive) or set the dates to an
absolute date for both main and dedicated
accounts.
```
```
Account
Database, AIR
```
```
UpdateCommunityList This message set or updates the list of
communities which the account belong to.
```
```
Account
Database
UpdateFaFList This message is used to update the Family
and Friends list for either the account or
subscriber.
```
```
Account
Database
```

```
UCIP in Use
```
_Table 1 Message description_

```
Message Description DR Generated
UpdateOffer This message is used to assign a new offer
or product or update an already assigned
offer to an account.
```
```
Account
Database
```
```
UpdateServiceClass This message is used to update the service
class for the subscriber.
```
```
Account
Database
UpdateSubscriberSegmentatio
n
```
```
This message is used in order set or
update the parameters which are used for
subscriber segmentation.
```
```
Account
Database
```
```
UpdateUsageThresholdsAndC
ounters
```
```
This message updates the value of usage
counters and usage thresholds.
```
### -

## 3.3 Handling Parallel Events

```
Pay attention to the risk with parallel events, even if a parameter is
optional it may be needed for validation purposes. Example: The message
UpdateBalanceAndDates has the parameter Service Class as an optional
parameter. Since the use of a dedicated account is tied to the definition of the
Service Class it is important that the Service Class is correct. If the Service
Class parameter not is sent, there is a risk that the Service Class is changed,
due to parallel sessions.
```
```
In some cases "Old" and "New" parameter is sent to avoid parallel updating.
```

- 1 Introduction Contents
- 1.1 Purpose and Scope
- 1.2 Typographic Conventions
- 2 General
- 3 UCIP in Use
- 3.1 Introduction
- 3.2 Message Description
- 3.3 Handling Parallel Events
- 4 Capability Negotiation
- 4.1 Introduction
- 4.2 Calculating Capabilities
- 4.3 Capability Level
- 4.4 Manually Set Capability
- 4.5 Capability Error Handling
- 5 Syntax Notation
- 5.1 XML-RPC Syntax
- 6 Messages
- 6.1 How to Read the Tables
- 6.2 Fault Response
- 6.3 GeneralUpdate (PC:09854)
- 6.4 GetAccountDetails
- 6.5 GetAccountManagementCounters
- 6.6 GetAccountServiceFeeData (PC:06214)
- 6.7 GetAccumulators
- 6.8 GetAllowedServiceClasses
- 6.9 GetBalanceAndDate
- 6.10 GetCapabilites
- 6.11 GetDiscountInformation (PMR792, PMR904)
- 6.12 GetFaFList
- 6.13 GetOffers
- AIR Programmer's Guide UCIP Version 5.
- 6.14 GetRefillOptions
- 6.15 GetUsageThresholdsAndCounters
- 6.16 Refill
- 6.17 UpdateAccountDetails
- 6.18 UpdateBalanceAndDate
- 6.19 UpdateCommunityList
- 6.20 UpdateFaFList
- 6.21 UpdateOffer
- 6.22 UpdateServiceClass
- 6.23 UpdateSubscriberSegmentation
- 6.24 UpdateUsageThresholdsAndCounters
- 6.25 Common Structures and Arrays
- 7 Elements
- 7.1 accountActivatedFlag
- 7.2 accountActivationFlag
- 7.3 accountGroupID
- 7.4 accountHomeRegion
- mit2 7.5 accountPrepaidEmptyLimit1 and accountPrepaidEmptyLi
- 7.6 accountPrepaidEmptyLimit
- 7.7 accountPrepaidEmptyLimitAction
- 7.8 accountTimeZone
- 7.9 accountValue1 and accountValue2
- 7.10 accumulatorEndDate
- 7.11 accumulatorID
- 7.12 accumulatorIDFirst
- 7.13 accumulatorIDLast
- 7.14 accumulatorStartDate
- 7.15 accumulatorValue
- 7.16 accumulatorValueAbsolute
- 7.17 accumulatorValueRelative
- 7.18 activationDate
- 7.19 activationStatusFlag
- 7.20 activeFlag (PMR792)
- 7.21 adjustmentAmountRelative
- 7.22 adjustmentDateRelative
- 7.23 adjustmentStartDateRelative Contents
- 7.24 adjustmentUsageCounterMonetaryValueRelative
- 7.25 adjustmentUsageCounterValueRelative
- 7.26 aggregatedBalance1 and aggregatedBalance2 (PC:05225)
- 7.27 allowCropOfCompositeDedicatedAccounts
- 7.28 allowedOptions
- 7.29 allowedServiceClassChangeDateFlag
- 7.30 associatedPartyID
- 7.31 attributeName (PMR939:1 US1)
- 7.32 attributeSource (PMR939:1 US19)
- 7.33 attributeUpdateAction (PMR939:1 US1)
- 7.34 attributeValueDate (PMR939:1 US2)
- 7.35 attributeValueNumber (PMR939:1 US19)
- 7.36 attributeValueString (PMR939:1 US1)
- 7.37 availableServerCapabilities
- 7.38 bandwidthDownlink (PMR 904)
- 7.39 bandwidthUplink (PMR 904)
- 7.40 cellIdentifier
- 7.41 changedAmount1 and changedAmount2
- 7.42 changedExpiryDate
- 7.43 changedStartDate
- 7.44 chargedForIndicator (PC:06214)
- 7.45 chargingIndicator
- 7.46 chargingResultCode
- 7.47 chargingType
- 7.48 clearedExpiryDate
- 7.49 clearedStartDate
- 7.50 clearedValue1 and clearedValue2
- 7.51 closestAccessibleDate
- 7.52 closestAccessibleDateTime (PC:10803)
- 7.53 closestAccessibleValue1 and closestAccessibleValue2
- 7.54 closestExpiryDate
- 7.55 closestExpiryDateTime (PC:10803)
- 7.56 closestExpiryValue1 and closestExpiryValue2
- 7.57 communityID
- 7.58 compositeDedicatedAccountFlag
- AIR Programmer's Guide UCIP Version 5.
- 7.59 cost1 and cost2
- 7.60 counterClearingDate
- 7.61 counterID
- 7.62 creditClearanceDate
- 7.63 creditClearancePeriod
- 7.64 currency1 and currency2
- 7.65 currentPamPeriod
- 7.66 currentTimeOffset (PMR1000:1)
- ctiveValue2 7.67 dedicatedAccountActiveValue1 and dedicatedAccountA
- 7.68 dedicatedAccountID
- 7.69 dedicatedAccountIDFirst
- 7.70 dedicatedAccountIDLast
- 7.71 dedicatedAccountRealMoneyFlag (PC:05225)
- 7.72 dedicatedAccountUnitType
- 7.73 dedicatedAccountValue1 and dedicatedAccountValue2
- 7.74 dedicatedAccountValueNew
- 7.75 deferredToDate
- 7.76 discountID (PMR792)
- 7.77 discountValue(PMR792)
- 7.78 enableFafMNPFlag
- 7.79 exactMatch
- 7.80 expiryDate
- 7.81 expiryDateCurrent
- 7.82 expiryDateExtended
- 7.83 expiryDateRelative (PC:05114)
- 7.84 expiryDateTime
- 7.85 expiryDateTimeRelative
- 7.86 expiryPamPeriodIndicator
- 7.87 externalContract
- externalData4 7.88 externalData1, externalData2, externalData3 and
- 7.89 fafAction
- 7.90 fafChangeUnbarDate
- 7.91 fafChargingNotAllowedFlag
- 7.92 fafIndicator
- 7.93 fafMaxAllowedNumbersReachedFlag
- 7.94 fafNumber Contents
- 7.95 faultCode
- 7.96 faultString
- 7.97 firstIVRCallDoneFlag
- 7.98 firstIVRCallFlag
- 7.99 firstIVRCallSetFlag
- 7.100 languageIDCurrent
- 7.101 languageIDNew
- 7.102 lastEvaluationDate
- 7.103 locationNumber
- 7.104 locationNumberNAI
- 7.105 mainAccountValueNew (PC:05163)
- 7.106 masterAccountNumber
- 7.107 masterSubscriberFlag
- 7.108 maxServiceFeePeriod
- 7.109 maxSupervisionPeriod
- 7.110 negativeBalanceBarringDate
- 7.111 negativeBarringStatusFlag
- 7.112 negotiatedCapabilities
- 7.113 newExpiryDate
- 7.114 newStartDate
- 7.115 notAllowedReason (PC:05114)
- 7.116 numberOfDecimals (PMR939:1 US19)
- 7.117 offerID
- 7.118 offerIDFirst
- 7.119 offerIDLast
- 7.120 offerProviderID
- 7.121 offerRequestedTypeFlag
- 7.122 offerState
- 7.123 offerType
- 7.124 originHostName
- 7.125 originNodeType
- 7.126 originOperatorID
- 7.127 originTimeStamp
- 7.128 originTransactionID
- 7.129 owner
- AIR Programmer's Guide UCIP Version 5.
- 7.130 pamClassID
- 7.131 pamServiceID
- 7.132 pamServicePriority
- 7.133 pamServicePriorityNew
- 7.134 pamServicePriorityOld
- 7.135 periodCounterValue
- 7.136 pinCode
- 7.137 pinCodeOriginal
- 7.138 pinCodeValidationFlag
- 7.139 productID
- 7.140 progressionRefillCounter
- 7.141 progressionRefillValue1 and progressionRefillValue2
- 7.142 promotionAnnouncementCode
- 7.143 promotionEndDate
- 7.144 promotionNotificationFlag
- 7.145 promotionPlanID
- 7.146 promotionPlanProgressed
- umulatedValue2 7.147 promotionRefillAccumulatedValue1 and promotionRefillAcc
- 7.148 promotionRefillCounter
- 7.149 promotionStartDate
- 7.150 refillAmount1 and refillAmount2
- 7.151 refillFraudCount
- 7.152 refillOptions
- 7.153 refillProfileID
- 7.154 refillType
- 7.155 refillUnbarDateTime
- 7.156 requestActiveOffersFlag (PMR 1008)
- (PC:10803) 7.157 requestAggregatedProductOfferInformationFlag
- 7.158 requestDedicatedAccountDetailsFlag
- 7.159 requestFafDetailsFlag (PC:05114)
- 7.160 requestFirstAccessibleAndExpiredBalanceAndDateFlag
- 7.161 requestInactiveOffersFlag
- 7.162 requestLocationInformationFlag
- 7.163 requestMasterAccountBalanceFlag
- 7.164 requestPamInformationFlag
- 7.165 requestAttributesFlag (PMR939:1 US1) Contents
- 7.166 requestRefillAccountAfterFlag
- 7.167 requestRefillAccountBeforeFlag
- 7.168 requestRefillDetailsFlag
- 7.169 requestSubDedicatedAccountDetailsFlag
- 7.170 requestUsageCountersAndThresholdsFlag
- 7.171 requestedOwner
- 7.172 reservationCorrelationID
- 7.173 responseCode
- 7.174 scheduleID
- 7.175 segmentationID
- 7.176 selectedOption
- 7.177 serviceClassAction
- 7.178 serviceClassChangeUnbarDate
- 7.179 serviceClassCurrent
- 7.180 serviceClassList
- 7.181 serviceClassNew
- 7.182 serviceClassOriginal
- 7.183 serviceClassTemporary
- 7.184 serviceClassTemporaryExpiryDate
- 7.185 serviceClassTemporaryNew
- 7.186 serviceClassTemporaryNewExpiryDate
- 7.187 serviceClassValidationFlag
- 7.188 serviceFeeAccumulators (PC:06214)
- 7.189 serviceFeeAmount1, serviceFeeAmount2 (PC:06214)
- 7.190 serviceFeeChargedAmount1, serviceFeeChargedAmount
- (PC:06214)
- 7.191 serviceFeeDaysExtended
- 7.192 serviceFeeDaysSurplus
- 7.193 serviceFeeDebtAmount1, serviceFeeDebtAmount
- (PC:06214)
- 7.194 serviceFeeDeductionDate (PC:06214)
- 7.195 serviceFeeDeductionPeriod (PC:06214)
- 7.196 serviceFeeExpiryDate
- 7.197 serviceFeeExpiryDateCurrent
- 7.198 serviceFeeExpiryDateRelative
- 7.199 serviceFeeID (PC:06214)
- AIR Programmer's Guide UCIP Version 5.
- 7.200 serviceFeePeriod
- 7.201 serviceFeePeriodExpiryFlag
- 7.202 serviceFeePeriodUnit (PC:06214)
- 7.203 serviceFeePeriodWarningActiveFlag
- 7.204 serviceOfferingActiveFlag
- 7.205 serviceOfferingID
- 7.206 serviceRemovalDate
- 7.207 serviceRemovalPeriod
- 7.208 specifiedPrice
- 7.209 startDate
- 7.210 startDateCurrent
- 7.211 startDateRelative
- 7.212 startDateTime
- 7.213 startDateTimeRelative
- 7.214 startPamPeriodIndicator
- 7.215 subscriberNumber
- 7.216 subscriberNumberNAI
- 7.217 supervisionDaysExtended
- 7.218 supervisionDaysSurplus
- 7.219 supervisionExpiryDate
- 7.220 supervisionExpiryDateCurrent
- 7.221 supervisionExpiryDateRelative
- 7.222 supervisionPeriod
- 7.223 supervisionPeriodExpiryFlag
- 7.224 supervisionPeriodWarningActiveFlag
- 7.225 suppressDeduction
- 7.226 temporaryBlockedFlag
- 7.227 totalBalance1 and totalBalance2 (PC:10803)
- 7.228 totalActiveBalance1 and totalActiveBalance2 (PC:10803)
- 7.229 totalCounterValue
- 7.230 transactionAmount
- 7.231 transactionAmountConverted
- 7.232 transactionCode
- 7.233 transactionCurrency
- 7.234 transactionType
- 7.235 treeDefinedFieldName (PC:10804, PMR939:1)
- 7.236 treeDefinedFieldType (PC:10804, PMR939:1) Contents
- 7.237 treeDefinedFieldValue (PC:10804, PMR939:1)
- 7.238 twoStepActivationFlag (PC:03327)
- 7.239 updateAction (PMR 1009)
- 7.240 updateUsageCounterForMultiUser
- 7.241 usageCounterID
- ryValue2 7.242 usageCounterMonetaryValue1 and usageCounterMoneta
- usageCounterMonetaryNominalValue2 (PMR905:1) 7.243 usageCounterMonetaryNominalValue1 and
- 7.244 usageCounterMonetaryValueNew
- 7.245 usageCounterValue
- 7.246 usageCounterNominalValue (PMR905:1)
- 7.247 usageCounterValueNew
- 7.248 usageThresholdID
- etaryValue2 7.249 usageThresholdMonetaryValue1 and usageThresholdMon
- 7.250 usageThresholdMonetaryValueNew
- 7.251 usageThresholdSource
- 7.252 usageThresholdValue
- 7.253 usageThresholdValueNew
- 7.254 ussdEndOfCallNotificationID
- 7.255 validateSubscriberLocation
- 7.256 validityTime (PMR792)
- 7.257 voucherActivationCode
- 7.258 voucherAgent
- 7.259 voucherGroup
- 7.260 voucherSerialNumber
- 8 Data Type Definitions
- 8.1 Data Types
- 8.2 Element formats
- 8.3 Logical Values
- 9 Capabilities
- 10 State Behavior
- 10.1 Introduction
- 10.2 Traffic Cases
- AIR Programmer's Guide UCIP Version 5.
- 11 Examples
- 11.1 GetFaFList
- 11.2 Get Allowed Service Classes
- 11.3 Get Refill Options
- 11.4 UpdateUsageThresholdsAndCounters
- 11.5 GetCapabilities
- 12 Compatibility Mechanisms
- 13 Transfer Mechanism
- 13.1 Introduction
- 13.2 Request Mechanism
- 13.3 Response Mechanism
- 13.4 Error Handling
- 13.5 Load Balancing and Fail Over
- 13.6 Authentication, Authorization and Security
- 13.7 TCP Level Compliance
- 14 Protocol Format Changes
- 14.1 Version 5.0 Update
- 14.2 Version 5.0 Update
- 14.3 Version 5.0
- 14.4 Version 4.3
- 14.5 Version 4.2
- 14.6 Version 4.1
- 14.7 Version 4.0
- 14.8 Version 3.5
- Glossary
- Reference List
- AIR Programmer's Guide UCIP Version 5.
- AIR Programmer's Guide UCIP Version 5.


```
Capability Negotiation
```
## 4 Capability Negotiation

```
This section covers the capability negotiation
```
## 4.1 Introduction

```
Capability negotiation is used to synchronize client and server on what
functions that can be used. This is done with a GetCapabilities request from
the client, the server will then answer what functions that are supported by the
server. Then the client can control that only messages with functions that are
supported in both client and server are sent. This is done by negotiating the
common value of the capabilities that can be used.
```
```
The calculation of negotiatedCapability can either be done manually, described
in Section 4.4 on page 11, or the automatically calculated each time the
client gets a availableServerCapabilities parameter in the response message,
described in Section 4.2 on page 9
```
```
Note that only functionality that are introduced in release AIR-IP 5.0 and later
requires capability negotiating. If only legacy functionality is to be used, the
negotiatedCapability parameter can be set to 0 (zero) or not be sent at all.
```
## 4.2 Calculating Capabilities

```
Before a new session the client must ask the server for its capability status.
This is handled by the GetCapabilities message.
```
```
The client sends the GetCapabilities request to the server and get a
response that includes the parameter availableServerCapabilities. The
availableServerCapabilities parameter is an array of integers and will in this
example contains three elements with the values 31, 5 and 1. The values
are calculated from Table 3.
```
```
Available server capabilities is calculated in the current way. As seen in Table 3,
all functions are represented with an index and a mask value. One index can at
most contain 31 functions. In combination with the mask value, that is a number
in the power of two, a value for the element is created. Index 1 is represented
by the first element, index 2 is represented by the second element and so on.
```
```
The first element, meaning 31 in this example, is calculated by adding the
mask number for all active function in the server with the index '1'. Table 3
shows that the functions A, B, C, D and E are all included in Index '1' and are
all active in the server, therefore the mask numbers for those functions are
added together (1+2+4+8+16 = 31).
```

AIR Programmer's Guide UCIP Version 5.0

```
In the same way the capability for the second and third elements are calculated
Function F and H are active for Index 2, The mask number for those functions
are summarized to create the second element (1+4 = 5). Only function I is
active for index 3, meaning that only the mask number 1 is used to create the
third element of the capability string for the server (1 = 1).
```
```
The client is responsible to calculate the negotiated value of the capabilities, it
is done by checking the active function on the client side and compare them
with the active functions on the server. Only if the function is active on both
client and server the function is usable.
```
```
In this example, for index 1, function A, C and D are active on both server
and client , meaning that mask 1, 4 and 8 are summarized for the first index
(1+4+8=13). None of the functions are used for index 2 ( = 0), and only function
I is active for both client and sever in for index 3 (1=1). This will create the
negotiated capability "13, 0, 1".
```
```
The negotiated capability must be included as a parameter in every request
from the client. If the condition changes in the client or the server, a new
negotiated capability is calculated by the client.
```
```
Note that in the Capability example tablethere are only 5 functions for the first
index and three element each for index 2 and 3. In a real system there are
always 31 functions for one index before start using a second index. The
maximal number of index that can be used are 31, but the actual index numbers
that can be used at the moment is specified in Section 9 on page 217
```
```
Table 2 Capability example
```
```
Inde
x
```
```
Mask Capabilities Supported by the
Server
```
```
Supported by the
Client
```
(^11) Function A **XX**
(^12) Function B **X**
(^14) Function C **XX**
(^18) Function D **XX**
116 Function E **X**
21 Function F **X**
22 Function G
24 Function H **X**
31 Function I **XX**
32 Function J **X**
34 Function K **X**


```
Capability Negotiation
```
## 4.3 Capability Level

```
The capabilities in the AIR system are divided in to two levels, "Protocol" and
"System". Protocol capabilities can be negotiated between client and server,
while System capabilities are for internal server use only. Hence the system
capability value are not part of in the availableServerCapabilities parameter in
the response message
The capability level for each function is specified in the level column in Section
9 on page 217
```
## 4.4 Manually Set Capability

```
It is possible to manually calculate and set a negotiatedCapability value for the
client to use, provided that the server support the given functionality. This can
be done if the client always run the same functionality or until the logic to handle
capability negotiation is properly in place. In this case there is no use for the
client to send a GetCapabilities request to the server. Instead the client can
send its requests with the manually calculated value in the negotiatedCapability
parameter. To be able to manually calculate the capabilities use function
capabilities listed in Section 9 on page 217
```
## 4.5 Capability Error Handling

```
This describes some scenarios that can cause an error due to capability usage.
```
- If the client sends a negotiatedCapability parameter that is not supported
    by the server, the server will send back the response code 260 (Capability
    not available)
- If the client send a request to use a function that requires a second function,
    but the second feature capability have not been negotiated. The server will
    send back the response code 261 (Invalid Capability combination)
- If a client tries to activate two functions that can not co-exist, the server will
    send back the response code 261 (Invalid Capability combination)


AIR Programmer's Guide UCIP Version 5.0


```
Syntax Notation
```
## 5 Syntax Notation

```
This section covers syntax notation.
```
## 5.1 XML-RPC Syntax

```
XML-RPC is a Remote Procedure Calling protocol and the body of an
XML-RPC request is formatted using XML. A procedure executes on the AIR
server and the value it returns is also formatted in XML. The interface to the
AIR server interface uses XML-RPC over HTTP.
```
```
For information about XML-RPC, see World Wide Web Consortium. Extensible
Markup Language (XML) 1.0, Reference [7] and XML-RPC Home Page,
Reference [8].
```
```
The HTTP connections are persistent. The users of the connections are
expected not to open more connections than they need and to reuse them.
When a connection is no longer needed it must be closed to secure that other
can use them. The number of connections needed by each client depends on
the load generated from the client and the latency in the responses from AIR.
```
```
The protocol uses thestructconstruct to achieve named values which is
necessary as some parameters are optional. The body of the response is a
single XML structure, amethodResponse, this can contain a singleparams.
Theparamscontains a singleparamwhich in turn contains a singlevalue.
```
```
ThemethodResponsecould also contain afaultcontaining afaultCode
and afaultString. See Section 5.1.3 on page 15 for an example of a fault
response.
```
```
Note: methodResponsecan not contain both afaultand aparams.
```
```
For an example of a request, see Section 5.1.1 on page 13.
```
```
For an example of a response, see Section 5.1.2 on page 14.
```
**5.1.1 Example Request**

```
Example of a successful request:
```
```
<?xml version="1.0"?>
<methodCall>
<methodName>Request.getName</methodName>
<params>
<param>
<value>
<struct>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
<member>
<name>RequestNumber</name>
<value><string>00471627612</string></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>
```
**5.1.2 Example Response**

```
This section holds examples.
```
```
Example of a successful response 1:
```
```
<?xml version="1.0"?>
<methodResponse>
<params>
<param>
<value>
<struct>
<member>
<name>agent</name>
<value><string>PrePaidServices</string></value>
</member>
</struct>
</value>
</param>
</params>
</methodResponse>
```
```
Example of a successful response 2:
```
```
<?xml version="1.0"?>
<methodResponse>
<params>
<param>
<value>
<struct>
<member>
<name>responseCode</name>
<value><i4>0</i4></value>
</member>
<member>
<name>languageIDCurrent</name>
<value><i4>3</i4></value>
</member>
<member>
<name>AccumulatorInformation</name>
<value>
```

```
Syntax Notation
```
```
<array>
<data>
<value>
<struct>
<member>
<name>
accumulatorID
</name>
<value>
<i4>2</i4>
</value>
</member>
<member>
<name>
accumulatorValue
</name>
<value><i4>3</i4></value>
</member>
</struct>
</value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodResponse>
```
**5.1.3 Example Fault Response**

```
This section holds examples of fault response.
```
```
Example of a fault response:
```
```
<?xml version="1.0"?>
<methodResponse>
<fault>
<value>
<struct>
<member>
<name>faultCode</name>
<value><int>1001</int></value>
</member>
<member>
<name>faultString</name>
<value><string>Mandatory field missing.</string></value>
</member>
</struct>
```

AIR Programmer's Guide UCIP Version 5.0

```
</value>
</fault>
</methodResponse>
```

```
Messages
```
## 6 Messages

```
This section holds all request messages that are sent towards the AIR server
and all response messages that are replied to the interworking network entity
from where the request originated. The messages are described in separate
sections.
```
## 6.1 How to Read the Tables

```
Both in requests and responses each parameter is listed with condition stating
whether the parameter is mandatory or optional.
```
```
In requests a column named Type state these condition. An optional parameter
can in the request be omitted if not used, but lacking a mandatory parameter
will result in an error response.
```
```
For responses there are two columns in the tables, indicating error condition
marked as ‘‘Error’’ and successful request marked as ‘‘Normal’’. An optional
parameter that has no value or no new value might be omitted, this is decided
by the application using the protocol.
```
```
Both in requests and responses there is an optional column called “Subtype”
where additional information is given concerning the relation between
parameters. Example: Two parameters might both be optional, but if one of
them is given it is mandatory to give the other since they together form a
function. Likewise it can be that parameters are mutually exclusive.
```
```
For a description of the notation for each data element see Table 3.
```
```
For a description of the notation for the Subtype, see Table 4.
```
```
Table 3 Data element notation
```
```
Notation Description
M Mandatory data element.
O Optional data element.
N/A Not Applicable data element.
```
```
Table 4 Subtype notation
```
```
Notation Description
XOR The parameters are mutually exclusive, only one
of them can be given, even if the parameters
are mandatory. XOR takes precedence over
'mandatory'.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Notation Description
AND If one of the parameters is given, it is mandatory
to give the other.
OR At least one of the parameters must be given
```
```
Note: Elements connected to the requests and responses are listed and
described in Section 7 on page 123.
```
**6.1.1 Several layers of logic**

```
If there are several layers (columns) of logic then the logic is applied from left
to right. Any parameters that are grouped within a layer are considered as
one entity in the next layer. A grouped entity is considered present if at least
one parameter within the group is present, and is absent otherwise. The rules
received from all layers must be fulfilled.
```
```
Example:
```
```
Table 5 General
```
```
param1 O
param2 O
param3 O
```
### OR

### AND

```
If param1 is present either param2 or param3 must also be present.
```
```
In the same way, if either param2 or param3 is present param1 must also
be present.
```
```
Both param2 and param3 can be present at the same if param1 is present.
```
```
Table 6 Double XOR
```
```
param1 O
param2 O
```
### XOR

```
param3 O
param4 O
```
### XOR

### OR

```
param5 O
```
### XOR

```
Either param5 is present or one of the following combinations param1 and
param3; param1 and param4; param2 and param3; param2 and param4 are
present.
```
```
If param5 is present neither param1, param2, param3 or param4 can exist.
```

```
Messages
```
**6.1.2 Capability ID**

```
For all tables describing data elements there is a column called “Capability ID”.
This give the relation between individual data element and its corresponding
capability ID.
```
```
Table 7 Data element notation
```
```
Notation Description
CAP:<n> Show corresponding capability ID <n> as defined
in Section 9 on page 217
```
- Base data element that do not have a capability
    ID relation.
N/A Not Applicable data element.

**6.1.3 PC tags**

```
If a parameter is marked with PC:xxxxx this means that the parameter belongs
to a Product Customization (PC) and should only be sent or received if the
PC is activated, independent if the parameter has an M or O in its type field.
A PC tag can also mean other restrictions related to the PC compared to the
standard implementation.
```
## 6.2 Fault Response

```
A fault response message is returned when the server cannot process a
request. This is valid when the request is not possible to parse, the operation is
unknown by the server, mandatory fields are missing or fields containing illegal
data types or value ranges. It is also valid when the AIR server is overloaded.
In the latter scenario the client can resend the request to the same or another
AIR server. The fault response follows the XML-RPC fault construct and is a
valid return message for all requests that are supported by UCIP, see Table 8.
```
```
Table 8 Fault response message
```
```
Element Reference Type
faultCode Section 7.95 on page 151 M
faultString Section 7.96 on page 152 M
```
## 6.3 GeneralUpdate (PC:09854)

```
The message GeneralUpdate is used by external system to adjust offers,
account balances, accumulators, service class and more in a single transaction.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
On the main account it is possible to adjust the balance and expiry dates
both negative and positive (relative) direction and it is also possible to adjust
the expiry dates with absolute dates. The dedicated accounts balances, start
dates and expiry dates could be adjusted in negative and positive direction or
with absolute values.
```
```
Note:
```
- It is not possible to do both a relative and an absolute balance or
    date set for the same data type (example: it is possible to either set
    an absolute OR a relative adjustment to the service fee expiry date).
- It is only allowed to do unified actions to multiple accumulators.
    This means that absolute and relative adjustments has to be
    ordered in separate requests. When using relative adjustment,
    negative or positive adjustments of accumulator values has to be
    ordered in separate requests.

```
It is not allowed to combine any of these types of actions in the
same request.
```
- The complete list of community numbers must be given when
    changing communities.

```
For a community ID that is not used, a "filler" community e.g.
9999999 needs to be given.
```
```
Example: The subscriber has communities 3,10,5. Now 10 is
removed and 5 changed to 7. The array below would look like:
communityInformationCurrent: 3,10,5; communityInformationNew:
3,9999999,7 (9999999 = "filler").
```
- It is not possible to do both a relative and an absolute balance or
    date set for the same data type (example: it is possible to either set
    an absolute OR a relative adjustment to the service fee expiry date).
- With this message Sub-DA:s can be created but not updated.
- If pre-activation is wanted then messageCapabilityFlag.accountA
    ctivationFlag should be included set to 1.

**6.3.1 Request**

```
Table 9 GeneralUpdate
```
```
Element Capability ID Reference TypeSubt
ype
originNodeType - Section
7.125 on
page 161
```
### M N/A


```
Messages
```
**Element Capability ID Reference TypeSubt
ype**

originHostName - Section
7.124 on
page 160

### M N/A

originTransactionID - Section
7.128 on
page 162

### M N/A

originTimeStamp - Section
7.127 on
page 161

### M N/A

subscriberNumberNAI - Section
7.216 on
page 195

### O N/A

messageCapabilityFlag - Section
6.25.28 on
page 102

### O N/A

subscriberNumber - Section
7.215 on
page 194

### M N/A

originOperatorID - Section
7.126 on
page 161

### O N/A

transactionCurrency - Section
7.233 on
page 201

```
O Mand
ator
yin
case
the
adjus
tment
chan
ges
mone
tary
value
(dedi
cated
acco
unt
is of
type
mone
y)
```

AIR Programmer's Guide UCIP Version 5.0

```
Element Capability ID Reference TypeSubt
ype
adjustmentAmountRela
tive
```
- Section
    7.21 on
    page 129

### O

```
mainAccountValueNew
(PC:05163)
```
- Section
    7.105 on
    page 154

### O

### XOR

```
transactionType - Section
7.234 on
page 201
```
### O N/A

```
transactionCode - Section
7.232 on
page 200
```
### O N/A

```
serviceClassAction - Section
7.177 on
page 185
```
### O N/A

```
serviceClassCurrent - Section
7.179 on
page 186
```
### O N/A

```
serviceClassNew - Section
7.181 on
page 186
```
### O N/A

```
serviceClassTemporary - Section
7.183 on
page 187
```
### O N/A

```
serviceClassTemporary
ExpiryDate
```
- Section
    7.184 on
    page 187

### O N/A

```
serviceClassTemporary
New
```
- Section
    7.185 on
    page 187

### O N/A

```
serviceClassTemporary
NewExpiryDate
```
- Section
    7.186 on
    page 187

### O N/A

```
accountGroupID - Section
7.3 on
page 124
```
### O N/A

```
serviceOfferings - Section
6.25.43 on
page 114
```
### O N/A


```
Messages
```
```
Element Capability ID Reference TypeSubt
ype
communityInformationC
urrent
```
- Section
    6.25.16 on
    page 86

### O

```
communityInformationN
ew
```
- Section
    6.25.16 on
    page 86

### O

### AND,

```
in
case
the
requ
est
is an
upda
te of
alre
ady
assi
gned
comm
unity
dedicatedAccountUpdat
eInformation
```
- Section
    6.25.23 on
    page 95

### O N/A

```
offerUpdateInformation
List
```
- Section
    6.25.32 on
    page 107

### O N/A

```
accumulatorUpdateInfor
mation
```
- Section
    6.25.4 on
    page 79

### O N/A

```
negotiatedCapabilities - Section
7.112 on
page 156
```
### O N/A

**6.3.2 Response**

```
Table 10 GeneralUpdate Response
```
```
Element Capability ID Reference Normal Erro
r
responseCode N/A Section 6.3.2.1
on page 24
```
### MM

```
originTransactionI
D
```
- Section 7.126
    on page 161

### MO

```
originOperatorID - Section 7.128
on page 162
```
### OO

```
currency1 - Section 7.64 on
page 141
```
### O

```
(1)
N/A
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Normal Erro
r
currency2 - Section 7.64 on
page 141
```
### O

```
(2)
N/A
```
```
negativeBalanceB
arringDate
```
- Section 7.110
    on page 155

### O N/A

```
accountFlagsAfter - Section 6.25.3
on page 79
```
### O N/A

```
accountFlagsBefo
re
```
- Section 6.25.3
    on page 79

### O N/A

```
dedicatedAccount
ChangeInformatio
n
```
- Section 6.25.19
    on page 89

### O N/A

```
accountValue1 - Section 7.9 on
page 126
```
### O N/A

```
accountValue2 - Section 7.9 on
page 126
```
### O N/A

```
offerInformationLi
st
```
- Section 6.25.30
    on page 104

### O N/A

```
negotiatedCapabil
ities
```
- Section 7.112
    on page 156

### OO

```
availableServerCa
pabilities
```
- Section 7.37 on
    page 134

### OO

```
(1) Mandatory in case accountValue1 present.
(2) Mandatory in case accountValue2 present.
```
**6.3.2.1 Response codes**

```
The following response codes could be included in an GeneralUpdate response:
```
```
0, 100, 102, 104, 105, 106, 117, 123, 124, 126, 139, 140, 147, 148, 153, 154,
155, 163, 164, 165, 167, 204, 209, 212, 214, 215, 223, 224, 225, 226, 227, 230,
237, 238, 247 (PMR1000:1), 248, 249 (PMR1000:1), 257, 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176
```
## 6.4 GetAccountDetails

```
The GetAccountDetails message is used to obtain account information in order
to validate and tailor the user communication. Information on subscriber and
account level is returned in the message. Information is only returned in case
it has previously been set on the account. Example, serviceFeeExpiryDate is
```

```
Messages
```
```
only returned if the account has been activated (and thus has been assigned
an end date for service fee).
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```
```
Note: If the locationNumber is not found, the Visitor Location Register (VLR)
is returned.
```
**6.4.1 Request**

```
Table 11 GetAccountDetails
```
```
Element Capability
ID
```
```
Reference Type
```
```
originNodeType - Section 7.125 on page
161
```
### M

```
originHostName - Section 7.124 on page
160
```
### M

```
originTransactionID - Section 7.128 on page
162
```
### M

```
originTimeStamp - Section 7.127 on page
161
```
### M

```
subscriberNumberNAI - Section 7.216 on page
195
```
### O

```
subscriberNumber - Section 7.215 on page
194
```
### M

```
messageCapabilityFlag - Section 6.25.28 on page
102
```
### O

```
requestedInformationFlag
s
```
- Section 6.25.38 on page
    112

### O

```
requestPamInformationFl
ag
```
- Section 7.164 on page
    173

### O

```
requestActiveOffersFlag
(PMR 1008)
```
- Section 7.156 on page
    170

### O

```
requestAttributesFlag
(PMR939:1 US1)
```
### CAP:1,

### CAP:16

```
Section 7.165 on page
174
```
### O

```
negotiatedCapabilities - Section 7.112 on page
156
```
### O


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.4.2 Response**

```
Table 12 GetAccountDetails Response
```
```
Element Capability ID Reference Norm
al
```
```
Subty
pe
```
```
Erro
r
```
```
responseCode N/A Section
6.4.2.1 on
page 30
```
### M N/A M

```
originTransactionI
D
```
- Section
    7.128 on
    page 162

### O N/A O

```
firstIVRCallFlag - Section
7.98 on
page 152
```
### O N/A N/A

```
languageIDCurren
t
```
- Section
    7.100 on
    page 153

### M N/A N/A

```
serviceClassCurre
nt
```
- Section
    7.179 on
    page 186

### M N/A N/A

```
serviceClassOrigi
nal
```
- Section
    7.182 on
    page 186

### O N/A

```
serviceClassTemp
oraryExpiryDate
```
- Section
    7.184 on
    page 187

### O

### AND

### N/A

```
ussdEndOfCallNot
ificationID
```
- Section
    7.254 on
    page 207

### O N/A N/A

```
accountGroupID - Section 7.3
on page
124
```
### O N/A N/A

```
serviceOfferings - Section
6.25.43 on
page 114
```
### O N/A N/A

```
communityInforma
tionCurrent
```
- Section
    6.25.16 on
    page 86

### O N/A N/A

```
temporaryBlocked
Flag
```
- Section
    7.226 on
    page 197

### O N/A N/A


```
Messages
```
**Element Capability ID Reference Norm
al**

```
Subty
pe
```
```
Erro
r
```
accountActivatedF
lag

- Section 7.1
    on page
    123

### O N/A N/A

activationDate - Section
7.18 on
page 128

### O N/A N/A

accountFlags - Section
6.25.2 on
page 78

### O N/A N/A

masterSubscriber
Flag

- Section
    7.107 on
    page 155

### O N/A N/A

masterAccountNu
mber

- Section
    7.106 on
    page 154

### M N/A O

refillUnbarDateTi
me

- Section
    7.155 on
    page 169

### O N/A N/A

promotionAnnoun
cementCode

- Section
    7.142 on
    page 165

### O N/A N/A

promotionPlanID - Section
7.145 on
page 166

### O N/A

promotionStartDa
te

- Section
    7.149 on
    page 167

### O N/A

promotionEndDat
e

- Section
    7.143 on
    page 165

### O

### AND

### N/A

supervisionExpiry
Date

- Section
    7.219 on
    page 196

### O N/A N/A

creditClearanceD
ate

- Section
    7.62 on
    page 141

### O N/A N/A

serviceRemovalD
ate

- Section
    7.206 on
    page 192

### O N/A N/A


AIR Programmer's Guide UCIP Version 5.0

```
Element Capability ID Reference Norm
al
```
```
Subty
pe
```
```
Erro
r
serviceFeeExpiry
Date
```
- Section
    7.196 on
    page 190

### O N/A N/A

```
serviceClassChan
geUnbarDate
```
- Section
    7.178 on
    page 185

### O N/A N/A

```
serviceFeePeriod - Section
7.200 on
page 191
```
### O N/A N/A

```
supervisionPeriod - Section
7.222 on
page 196
```
### O N/A N/A

```
serviceRemovalP
eriod
```
- Section
    7.207 on
    page 193

### O N/A N/A

```
creditClearancePe
riod
```
- Section
    7.63 on
    page 141

### O N/A N/A

```
currency1 - Section
7.64 on
page 141
```
### O N/A

```
accountValue1 - Section 7.9
on page
126
```
### O

### AND

### N/A

```
aggregatedBalanc
e1 (PC:05225)
```
- Section
    7.26 on
    page 130

### O N/A N/A

```
currency2 - Section
7.64 on
page 141
```
### O N/A

```
accountValue2 - Section 7.9
on page
126
```
### O

### AND

### N/A

```
accountHomeReg
ion
```
- Section 7.4
    on page
    124

### O N/A N/A

```
pinCode (PC:0185
3)
```
- Section
    7.136 on
    page 164

### O N/A N/A


```
Messages
```
**Element Capability ID Reference Norm
al**

```
Subty
pe
```
```
Erro
r
```
aggregatedBalanc
e1 (PC:05225)
(1)

- Section
    7.26 on
    page 130

### O N/A N/A

aggregatedBalanc
e2 (PC:05225)

```
(2)
```
- Section
    7.26 on
    page 130

### O N/A N/A

pamInformationLi
st

- Section
    6.25.34 on
    page 109

### O N/A N/A

maxServiceFeePe
riod

- Section
    7.108 on
    page 155

### O N/A N/A

maxSupervisionP
eriod

- Section
    7.109 on
    page 155

### O N/A N/A

negativeBalanceB
arringDate

- Section
    7.110 on
    page 155

### O N/A N/A

accountFlagsBefo
re

- Section
    6.25.3 on
    page 79

### O N/A N/A

offerInformationLi
st

- Section
    6.25.30 on
    page 104

### O N/A N/A

accountTimeZone
(PC:07061)

- Section 7.8
    on page
    125

### O N/A N/A

negotiatedCapabil
ities

- Section
    7.112 on
    page 156

### O N/A O

availableServerCa
pabilities

- Section
    7.37 on
    page 134

### O N/A O

cellIdentifier CAP:12 Section
7.40 on
page 135

### O N/A N/A

locationNumber CAP:12 Section
7.103 on
page 154

### O N/A N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Subty
pe
```
```
Erro
r
accountPrepaidE
mptyLimit1
```
```
CAP:13 Section 7.5
on page
125
```
### O

```
(1)
N/A N/A
```
```
accountPrepaidE
mptyLimit2
```
```
CAP:13 Section 7.5
on page
125
```
### O

```
(2)
N/A N/A
```
```
refillFraudCount
(PC:12475)
```
```
CAP:23 Section
7.151 on
page 168
```
### O N/A N/A

```
(1) If included currency1 must also be included in the response.
(2) If included currency2 must also be included in the response.
```
**6.4.2.1 Response codes**

```
The following response codes could be included in a GetAccountDetails
response:
```
```
0, 1, 2, 100, 102, 197, 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176
```
## 6.5 GetAccountManagementCounters

```
The message GetAccountManagementCounters will return account
management counters.
```
**6.5.1 Request**

```
Table 13 GetAccountManagementCounters
```
```
Element Capability ID Reference Type
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransactionID - Section 7.128 on
page 162
```
### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumberNA
I
```
- Section 7.216 on
    page 195

### O


```
Messages
```
```
Element Capability ID Reference Type
subscriberNumber - Section 7.215 on
page 194
```
### M

```
negotiatedCapabilitie
s
```
- Section 7.112 on
    page 156

### O

**6.5.2 Response**

```
Table 14 GetAccountManagementCounters Response
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
responseCode N/A Section 6.5.2.1
on page 31
```
### MM

```
originTransactionID - Section 7.128 on
page 162
```
### MO

```
counterInformation - Section 6.25.17
on page 86
```
### M N/A

```
negotiatedCapabilitie
s
```
- Section 7.112 on
    page 156

### OO

```
availableServerCapa
bilities
```
- Section 7.37 on
    page 134

### OO

**6.5.2.1 Response codes**

```
The following response codes could be included in a GetAccountManagemen
tCounters response:
```
```
0, 100, 102, 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.6 GetAccountServiceFeeData (PC:06214)

```
The GetAccountServiceFeeData message is used to fetch service fee data
tied to an account.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
**6.6.1 Request**

```
Table 15 GetAccountServiceFeeData
```
```
Element Capability ID Reference Type
```
```
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumb
erNAI
```
- Section 7.216 on
    page 195

### O

```
subscriberNumb
er
```
- Section 7.215 on
    page 194

### M

```
negotiatedCapab
ilities
```
- Section 7.112 on
    page 156

### O

**6.6.2 Response**

```
Table 16 GetAccountServiceFeeData Response
```
```
Element Capability ID Reference Norm
al
```
```
Subty
pe
```
```
Error
```
```
responseCode N/A Section 6.6.2.1
on page 33
```
### M N/A M

```
originTransact
ionID
```
- Section 7.128
    on page 162

### M N/A M

```
currency1 - Section 7.64
on page 141
```
### O N/A

```
currency2 - Section 7.64
on page 141
```
### O N/A

```
serviceFeeDat
aList
```
- Section
    6.25.40 on
    page 113

### O

### AND

```
(1)
```
### N/A

```
negotiatedCap
abilities
```
- Section 7.112
    on page 156

### O N/A O

```
availableServe
rCapabilities
```
- Section 7.37
    on page 134

### O N/A O

```
(1) currency2 is mandatory if amount2 is returned in serviceFeeDataList
```

```
Messages
```
**6.6.2.1 Response codes**

```
The following response codes could be included in a GetAccountServiceFeeData
response:
```
### 0, 100, 102, 260.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.7 GetAccumulators

```
The message GetAccumulators is used to obtain accumulator values and
(optional) start and end dates related to those accumulators.
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```
**6.7.1 Request**

```
Table 17 GetAccumulators
```
```
Element Capability ID Reference Type
```
```
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransactionID - Section 7.128 on
page 162
```
### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumberN
AI
```
- Section 7.216 on
    page 195

### O

```
subscriberNumber - Section 7.215 on
page 194
```
### M

```
messageCapabilityF
lag
```
- Section 6.25.28 on
    page 102

### O

```
accumulatorSelectio
n
```
- Section 6.25.6 on
    page 80

### O

```
chargingRequ
estInformation
(PC:02741)
```
- Section 6.25.12 on
    page 84

### O

```
negotiatedCapabiliti
es
```
- Section 7.112 on
    page 156

### O


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.7.2 Response**

```
Table 18 GetAccumulators Response
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
responseCode N/A Section 6.7.2.1
on page 34
```
### MM

```
originTransactionID - Section 7.128 on
page 162
```
### MO

```
languageIDCurrent - Section 7.100 on
page 153
```
### MO

```
serviceClassCurrent - Section 7.179 on
page 186
```
### M N/A

```
accumulatorInformat
ion
```
- Section 6.25.5 on
    page 80

### O N/A

```
temporaryBlockedF
lag
```
- Section 7.226 on
    page 197

### O N/A

```
chargingResultInfor
mation (PC:02741)
```
- Section 6.25.13
    on page 85

### OO

```
accountFlagsAfter - Section 6.25.3 on
page 79
```
### O N/A

```
accountFlagsBefore - Section 6.25.3 on
page 79
```
### O N/A

```
negotiatedCapabiliti
es
```
- Section 7.112 on
    page 156

### OO

```
availableServerCap
abilities
```
- Section 7.37 on
    page 134

### OO

**6.7.2.1 Response codes**

```
The following response codes could be included in a GetAccumulators
response:
```
### 0, 100, 102, 123, 124, 126, 127, 260, 999.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.8 GetAllowedServiceClasses

```
The GetAllowedServiceClasses message is used to fetch a list of service
classes the subscriber is allowed to change to.
```

```
Messages
```
**6.8.1 Request**

```
Table 19 GetAllowedServiceClasses
```
```
Element Capability ID Reference Type
```
```
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumb
erNAI
```
- Section 7.216 on
    page 195

### O

```
subscriberNumb
er
```
- Section 7.215 on
    page 194

### M

```
serviceClassCurr
ent
```
- Section 7.179 on
    page 186

### O

```
negotiatedCapab
ilities
```
- Section 7.112 on
    page 156

### O

**6.8.2 Response**

```
Table 20 GetAllowedServiceClasses Response
```
```
Element Capability ID Reference Normal Error
responseCode N/A Section 6.8.2.1
on page 36
```
### MM

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### MM

```
serviceClassCur
rent
```
- Section 7.179 on
    page 186

### M N/A

```
serviceClassList - Section 7.180 on
page 186
```
### O N/A

```
negotiatedCapab
ilities
```
- Section 7.112 on
    page 156

### OO

```
availableServerC
apabilities
```
- Section 7.37 on
    page 134

### OO


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.8.2.1 Response codes**

```
The following response codes could be included in a GetAllowedServiceClasses
response:
```
### 0, 100, 102, 133, 260, 999.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.9 GetBalanceAndDate

```
The message GetBalanceAndDate is used to perform a balance enquiry on the
account associated with a specific subscriber identity. Also lifecycle dates are
presented. Information is given on both main and dedicated accounts.
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```
```
For a product private (instantiated) DA, the GetBalanceAndDate request should
be used to only get their instance ID (productID). To get the capabilities which
the DA share with the Offer, use the GetOffers request.
```
**6.9.1 Request**

```
Table 21 GetBalanceAndDate
```
```
Element Capability ID Reference Type
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransactionID - Section 7.128 on
page 162
```
### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumberN
AI
```
- Section 7.216 on
    page 195

### O

```
subscriberNumber - Section 7.215 on
page 194
```
### M

```
messageCapabilityFl
ag
```
- Section 6.25.28 on
    page 102

### O

```
dedicatedAccountSel
ection
```
- Section 6.25.22 on
    page 94

### O


```
Messages
```
```
Element Capability ID Reference Type
chargingRequestInfo
rmation
```
- Section 6.25.12 on
    page 84

### O

```
requestSubDedicate
dAccountDetailsFlag
(
1)
```
- Section 7.169 on
    page 175

### O

```
requestFirstAccessibl
eAndExpiredBalance
AndDateFlag
```
- Section 7.160 on
    page 171

### O

```
requestActiveOffersF
lag (PMR 1008)
```
- Section 7.156 on
    page 170

### O

```
requestAttributesFlag
(PMR939:1 US1)
```
```
CAP:1, CAP:16 Section 7.165 on
page 174
```
### O

```
negotiatedCapabilitie
s
```
- Section 7.112 on
    page 156

### O

```
requestAggregatedP
roductOfferInformatio
nFlag
(2)(3)
(PC:10803)
```
```
CAP:15 Section 7.157 on
page 170
```
### O

```
(1) will also include requestFirstAccessibleAndExpiredBalanceAndDate if set
(2) All DAs to aggregate in the response must be of the same unit type. If the DAs are not of
same unit type, response code 167 is returned.
(3) This parameter can be used together with requestFirstAccessibleAndExpi
redBalanceAndDateFlag to control inclusion of closestExpiryDateTime ,
closestExpiryValue , closestAccessibleDateTime and
closestAccessibleValue.
```
**6.9.2 Response**

```
Table 22 GetBalanceAndDate Response
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
```
```
responseCode N/A Section 6.9.2.1
on page 39
```
### M N/A M

```
originTransactio
nID
```
- Section 7.128
    on page 162

### M N/A O

```
serviceClassCur
rent
```
- Section 7.179
    on page 186

### M N/A N/A


AIR Programmer's Guide UCIP Version 5.0

```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
currency1 - Section 7.64
on page 141
```
### O N/A

```
accountValue1 - Section 7.9 on
page 126
```
### O N/A

```
aggregatedBala
nce1 (PC:05225)
```
- Section 7.26
    on page 130

### O

### AND

```
(
1)
```
### N/A

```
currency2 - Section 7.64
on page 141
```
### O N/A

```
accountValue2 - Section 7.9 on
page 126
```
### O N/A

```
aggregatedBala
nce2 (PC:05225)
```
- Section 7.26
    on page 130

### O

### AND

```
(
2)
```
### N/A

```
dedicatedAccou
ntInformation
```
- Section
    6.25.18 on
    page 87

### O N/A N/A

```
supervisionExpir
yDate
```
- Section 7.219
    on page 196

### O N/A N/A

```
serviceFeeExpir
yDate
```
- Section 7.196
    on page 190

### O N/A N/A

```
creditClearance
Date
```
- Section 7.63
    on page 141

### O N/A N/A

```
serviceRemoval
Date
```
- Section 7.207
    on page 193

### O N/A N/A

```
languageIDCurr
ent
```
- Section 7.100
    on page 153

### M N/A O

```
temporaryBlocke
dFlag
```
- Section 7.226
    on page 197

### O N/A N/A

```
chargingResultIn
formation
```
- Section
    6.25.13 on
    page 85

### O N/A O

```
accountFlagsAft
er
```
- Section 6.25.3
    on page 79

### O N/A N/A

```
accountFlagsBe
fore
```
- Section 6.25.3
    on page 79

### O N/A N/A

```
offerInformationL
ist
```
- Section
    6.25.30 on
    page 104

### O N/A N/A

```
negotiatedCapa
bilities
```
- Section 7.112
    on page 156

### O N/A O


```
Messages
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
availableServer
Capabilities
```
- Section 7.37
    on page 134

### O N/A O

```
accountPrepaid
EmptyLimit1
```
```
CAP:13 Section 7.5 on
page 125
```
### O

```
(3)
N/A N/A
```
```
accountPrepaid
EmptyLimit2
```
```
CAP:13 Section 7.5 on
page 125
```
### O

```
(4)
N/A N/A
```
```
aggregatedBala
nceInformation
(5)
(PC:10803)
```
```
CAP:15 Section 6.25.7
on page 81
```
### O N/A N/A

```
(1) currency1 is also mandatory in case dedicatedAccountValue1 is returned
(2) currency2 is also mandatory in case dedicated AccountValue2 is returned
(3) currency1 is also mandatory in case accountPrepaidEmptyLimit1 is returned
(4) currency2 is also mandatory in case accountPrepaidEmptyLImit2 is returned
(5) This parameter is mandatory if the parameter requestAggregatedP
roductOfferInformationFlag is included in the request. The struct
offerInformationList will not be included in the response.
```
**6.9.2.1 Response codes**

```
The following response codes could be included in a GetBalanceAndDate
response:
```
```
0, 100, 102, 123, 124, 126, 137, 139, 197, 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.10 GetCapabilites

```
The message GetCapabilities is used to fetch available capabilities. See
Section 9 on page 217 for available capabilities
```
**6.10.1 Request**

```
GetCapabilities request do not contain any parameter values.
```
```
Note: Even if the method requires no parameters, the <params> element
must still be present in the request.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
**6.10.2 Response**

```
Table 23 GetCapabilities Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.10.2.1
on page 40
```
### MM

```
availableServerCa
pabilities
```
- Section 7.37 on
    page 134

### M N/A

**6.10.2.1 Response codes**

```
The following response codes could be included in a GetCapabilities response:
```
### 0, 100.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.11 GetDiscountInformation (PMR792, PMR904)

```
The message GetDiscountInformation retrieves discounts. Any number of
discount IDs can be specified for retrieval. If no IDs are requested all the
discounts will be returned.
```
**6.11.1 Request**

```
Table 24 GetDiscountInformation Request
```
```
Element Capability ID Reference Type Subt
ype
originNodeType CAP:14 Section 7.125 on
page 161
```
### M

```
originHostName CAP:14 Section 7.124 on
page 160
```
### M

```
originTransactionID CAP:14 Section 7.128 on
page 162
```
### M

```
originTimeStamp CAP:14 Section 7.127 on
page 161
```
### M

```
subscriberNumberNAI CAP:14 Section 7.216 on
page 195
```
### O

```
subscriberNumber CAP:14 Section 7.215 on
page 194
```
### M


```
Messages
```
```
Element Capability ID Reference Type Subt
ype
cellIdentifier CAP:14 Section 7.40 on
page 135
```
### O

```
locationNumber CAP:14 Section 7.103 on
page 154
```
### O

```
locationNumberNAI CAP:14 Section 7.104 on
page 154
```
### O

```
discountSelection CAP:14 Section 6.25.24
on page 100
```
### O

```
negotiatedCapabilities CAP:14 Section 7.112 on
page 156
```
### O

**6.11.2 Response**

```
Table 25 GetDiscountInformation Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.11.2.1
on page 41
```
### MM

```
originTransactionI
D
```
```
CAP:14 Section 7.128 on
page 162
```
### MO

```
discountInformatio
n
```
```
CAP:14 Section 6.25.25
on page 100
```
### OO

```
negotiatedCapabilit
ies
```
```
CAP:14 Section 7.112 on
page 156
```
### OO

```
availableServerCa
pabilities
```
```
CAP:14 Section 7.37 on
page 134
```
### OO

**6.11.2.1 Response codes**

```
The following response codes could be included in a GetDiscountInformation
response:
```
```
0, 100, 102, 104, 242, 999
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 6.12 GetFaFList

```
The GetFaFList message is used to fetch the list of Family and Friends
numbers with attached FaF indicators.
```
**6.12.1 Request**

```
Table 26 GetFaFList
```
```
Element Capability ID Reference Type
originNodeType - Section 7.125 on page
161
```
### M

```
originHostName - Section 7.125 on page
161
```
### M

```
originTransactionID - Section 7.128 on page
162
```
### M

```
originTimeStamp - Section 7.127 on page
161
```
### M

```
subscriberNumberNAI - Section 7.216 on page
195
```
### O

```
subscriberNumber - Section 7.215 on page
194
```
### M

```
requestedOwner - Section 7.171 on page
176
```
### M

```
negotiatedCapabilities - Section 7.112 on page
156
```
### O

**6.12.2 Response**

```
Table 27 GetFaFList Response
```
```
Element Capability ID Reference Normal Erro
r
responseCode N/A Section 6.12.2.1
on page 43
```
### MM

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### MO

```
fafInformationList - Section 6.25.27
on page 102
```
### O N/A

```
fafChangeUnbarD
ate
```
- Section 7.90 on
    page 149

### O N/A


```
Messages
```
```
Element Capability ID Reference Normal Erro
r
fafMaxAllowedNu
mbersReachedFl
ag
```
- Section 7.93 on
    page 150

### OO

```
fafChargingNotAll
owedFlag
```
- Section 7.91 on
    page 150

### O N/A

```
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### OO

```
availableServerC
apabilities
```
- Section 7.37 on
    page 134

### OO

**6.12.2.1 Response codes**

```
The following response codes could be included in a GetFaFList response:
```
```
0, 100, 102, 126, 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176
```
## 6.13 GetOffers

```
The message GetOffers will return a list of offers currently assigned to an
account. The detail level of the returned list can be specified in the request
using various flags.
```
```
To get subDedicatedAccounts, both requestSubDedicatedAccountDetailsFlag
and requestDedicatedAccountDetailsFlag must be set to "1".
```
```
For product private (instantiated) DA:s, the GetOffers request should be used
to get the capabilities which the DA share with the Offer. Such data are start
and expiry date, dateTime, state, offer type, PAM service and offerProviderID.
```
**6.13.1 Request**

```
Table 28 GetOffers Request
```
```
Element Capability ID Reference TypeSubtype
originNodeType - Section 7.125 on
page 161
```
### M N/A

```
originHostName - Section 7.124 on
page 160
```
### M N/A

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### M N/A


AIR Programmer's Guide UCIP Version 5.0

```
Element Capability ID Reference TypeSubtype
originTimeStamp - Section 7.127 on
page 161
```
### M N/A

```
subscriberNumber
NAI
```
- Section 7.216 on
    page 195

### O N/A

```
subscriberNumber - Section 7.215 on
page 194
```
### M N/A

```
offerSelection - Section 6.25.31
on page 106
```
### O

```
productSelection - Section 6.25.35
on page 109
```
### O

### XOR

```
requestInactiveOff
ersFlag
```
- Section 7.161 on
    page 172

### O N/A

```
offerRequestedTy
peFlag
```
- Section 7.121 on
    page 159

### O N/A

```
requestDedicated
AccountDetailsFla
g
```
- Section 7.158 on
    page 170

### O N/A

```
requestSubDedica
tedAccountDetails
Flag
```
- Section 7.169 on
    page 175

### O N/A

```
requestFafDetails
Flag (PC:05114)
```
- Section 7.159 on
    page 171

### O N/A

```
requestFirstAcces
sibleAndExpiredB
alanceAndDateFla
g
```
- Section 7.160 on
    page 171

### O N/A

```
requestUsageCou
ntersAndThreshol
dsFlag
```
- Section 7.170 on
    page 175

### O N/A

```
requestAttributes
Flag (PMR939:1
US1)
```
```
CAP:1, CAP:16 Section 7.165 on
page 174
```
### O N/A


```
Messages
```
```
Element Capability ID Reference TypeSubtype
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### O N/A

```
requestAggregate
dProductOfferInfo
rmationFlag
(1)(2)(3)
(
PC:10803)
```
```
CAP:15 Section 7.157 on
page 170
```
### O N/A

```
(1) All DAs to aggregate in the response must be of the same unit type. If the DAs are not of
same unit type, response code 167 is returned.
(2) This parameter can be used together with requestFirstAccessibleAndExpi
redBalanceAndDateFlag to control inclusion of closestExpiryDateTime ,
closestExpiryValue , closestAccessibleDateTime and
closestAccessibleValue.
(3) This parameter can be used together with other flags in the request, but they will not control
any output on the aggregated information.
```
**6.13.2 Response**

```
If FaF information is requested, it will be supplied in theofferInformatio
nstruct. If dedicated account information is requested it will be supplied in the
dedicatedAccountInformationstruct at low detail level.
```
```
Table 29 GetOffers Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.13.2.1
on page 46
```
### MM

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### MO

```
offerInformation - Section 6.25.29
on page 103
```
### O N/A

```
currency1
```
### (1) -

```
Section 7.64 on
page 141
```
### O N/A

```
currency2
```
### (1) -

```
Section 7.64 on
page 141
```
### O N/A

```
negotiatedCapab
ilities
```
- Section 7.112 on
    page 156

### OO


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
availableServerC
apabilities
```
- Section 7.37 on
    page 134

### OO

```
offerInformation
(2)
(PC:10803)
```
```
CAP:15 Section 6.25.29
on page 103
```
### O N/A

```
(1) This parameter is mandatory if the dedicated account returned in the response, contains
a monetary value thus is of the type money
(2) This parameter is mandatory if the parameter requestAggregatedProductOffe
rInformationFlag is included in the request.
```
**6.13.2.1 Response codes**

```
The following response codes could be included in a GetOffers response:
```
```
0, 100, 102, 165, 214, 247, 260, 264 (PMR905:1).
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.14 GetRefillOptions

```
This message GetRefillOptions is used to fetch the refill options.
```
```
Note: In case Service Class is given it takes precedence before subscriber
number. It is thus possible to request refill options for a Service Class
which is not yet active for the given subscriber number.
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```
**6.14.1 Request**

```
Table 30 GetRefillOptions
```
```
Element Capability ID Reference Type
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransactionID - Section 7.128 on
page 162
```
### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumberNA
I
```
- Section 7.216 on
    page 195

### O


```
Messages
```
```
Element Capability ID Reference Type
subscriberNumber - Section 7.215 on
page 194
```
### M

```
serviceClassCurrent - Section 7.179 on
page 186
```
### O

```
voucherActivationCo
de
```
- Section 7.257 on
    page 208

### M

```
messageCapabilityFl
ag
```
- Section 6.25.28 on
    page 102

### O

```
negotiatedCapabilitie
s
```
- Section 7.112 on
    page 156

### O

**6.14.2 Response**

```
Table 31 GetRefillOptions Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.14.2.1
on page 47
```
### MM

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### MO

```
serviceClassCurr
ent
```
- Section 7.179 on
    page 186

### M N/A

```
refillOptions - Section 7.152 on
page 168
```
### M N/A

```
accountFlagsAfte
r
```
- Section 6.25.3 on
    page 79

### O N/A

```
accountFlagsBef
ore
```
- Section 6.25.3 on
    page 79

### O N/A

```
negotiatedCapab
ilities
```
- Section 7.112 on
    page 156

### OO

```
availableServerC
apabilities
```
- Section 7.37 on
    page 134

### OO

**6.14.2.1 Response codes**

```
The following response codes could be included in a GetRefillOptions response:
```
```
0, 100, 102, 103, 107, 108, 109, 110, 111, 112, 113, 115, 119, 126, 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 6.15 GetUsageThresholdsAndCounters

```
The messageGetUsageThresholdsAndCountersis used to fetch the
active usage counters and thresholds for a subscriber.
```
**6.15.1 Request**

```
Table 32 GetUsageThresholdsAndCounters Request
```
```
Element Capability ID Reference Norm
al
originNodeType - Section 7.125 on
page 161
```
### M

```
originHostName - Section 7.124 on
page 160
```
### M

```
originTransactionID - Section 7.128 on
page 162
```
### M

```
originTimeStamp - Section 7.127 on
page 161
```
### M

```
subscriberNumberN
AI
```
- Section 7.216 on
    page 195

### O

```
subscriberNumber - Section 7.215 on
page 194
```
### M

```
originOperatorID - Section 7.126 on
page 161
```
### O

```
associatedPartyID - Section 7.30 on page
132
```
### O

```
negotiatedCapabilitie
s
```
- Section 7.112 on
    page 156

### O

**6.15.2 Response**

```
Table 33 GetUsageThresholdsAndCounters Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.15.2.1
on page 49
```
### MM

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### MO

```
originOperatorID - Section 7.126 on
page 161
```
### OO


```
Messages
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
currency1 - Section 7.64 on
page 141
```
### O N/A

```
currency2 - Section 7.64 on
page 141
```
### O N/A

```
usageCounterUsa
geThresholdInfor
mation
```
- Section 6.25.52 on
    page 119

### O N/A

```
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### OO

```
availableServerCa
pabilities
```
- Section 7.37 on
    page 134

### OO

**6.15.2.1 Response codes**

```
The following response codes could be included in an GetUsageThresholdsAn
dCounters response:
```
### 0, 100, 102, 260, 264 (PMR905:1).

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.16 Refill

```
The message Refill is used to apply a refill from an administrative system to
a prepaid account associated with a specific subscriber identity. It can be a
voucherless refill where an amount is added to account, according to the refill
profile rules. It can also be a voucher refill made for an example by customer
care on request from the subscriber.
```
```
The requestSubDedicatedAccountDetailsFlag parameter will only affect
whether sub dedicated account details are included in the accountBeforeRefill
and accountAfterRefill structs. The refillInformation struct is not affected by
requestSubDedicatedAccountDetailsFlag and will always contain details on
affected sub dedicated accounts.
```
```
Note: In order to differentiate a voucherless refill from a voucher refill, it is not
allowed to send the N/A-marked parameters in the different refills. The
different types of refill are mutual exclusive. Example: It is not allowed
to give transactionAmount in a voucher refill.
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
**6.16.1 Request**

```
Table 34 Refill
```
```
Element Capability ID Reference Type
Vouc
herl
ess
refill
```
```
Vouc
her
refill
```
```
originNodeType - Section 7.125
on page 161
```
### MM

```
originHostName - Section 7.124
on page 160
```
### MM

```
originTransactionID - Section 7.128
on page 162
```
### MM

```
originTimeStamp - Section 7.127
on page 161
```
### MM

```
subscriberNumberN
AI
```
- Section 7.216
    on page 195

### OO

```
subscriberNumber - Section 7.215
on page 194
```
### MM

```
originOperatorID - Section 7.126
on page 161
```
### OO

```
externalData1 - Section 7.88
on page 149
```
### OO

```
externalData2 - Section 7.88
on page 149
```
### OO

```
externalData3 - Section 7.88
on page 149
```
### OO

```
externalData4 - Section 7.88
on page 149
```
### OO

```
transactionType - Section 7.234
on page 201
```
### OO

```
transactionCode - Section 7.232
on page 200
```
### OO

```
messageCapabilityFl
ag
```
- Section
    6.25.28 on
    page 102

### OO

```
requestRefillAccount
BeforeFlag
```
- Section 7.167
    on page 174

### OO

```
requestRefillAccoun
tAfterFlag
```
- Section 7.166
    on page 174

### OO


```
Messages
```
**Element Capability ID Reference Type**

```
Vouc
herl
ess
refill
```
```
Vouc
her
refill
```
requestRefillDetailsF
lag

- Section 7.168
    on page 175

### OO

requestSubDedicate
dAccountDetailsFlag

- Section 7.169
    on page 175

### OO

transactionAmount - Section 7.230
on page 199

### M N/A

transactionCurrency - Section 7.233
on page 201

### M N/A

refillProfileID - Section 7.153
on page 168

### M N/A

voucherActivationCo
de

- Section 7.257
    on page 208

### N/A M

selectedOption - Section 7.176
on page 185

### OO

locationNumber - Section 7.103
on page 154

### N/A O

locationNumberNAI - Section 7.104
on page 154

### N/A O

refillType - Section 7.154
on page 169

### OO

cellIdentifier - Section 7.40
on page 135

### OO

validateSubscriberLo
cation

- Section 7.255
    on page 207

### N/A O

negotiatedCapabilitie
s

- Section 7.112
    on page 156

### OO

treeDefinedField
(PMR939:1)

### CAP:7, CAP:11,

### CAP:16

```
Section
6.25.48 on
page 116
```
### OO

requestAttributesFla
g (PMR939:2 US90)

```
CAP:18 Section 7.165
on page 174
```
### OO


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.16.2 Response**

```
Table 35 Refill Response
```
```
Element Capability ID Reference Norm
al
```
```
Subt
yp
e
```
```
Erro
r
```
```
responseCode N/A Section
6.16.2.1 on
page 54
```
### M N/A M

```
originTransactionID - Section
7.128 on
page 162
```
### M N/A O

```
originOperatorID - Section
7.126 on
page 161
```
### O N/A O

```
masterAccountNum
ber
```
- Section
    7.106 on
    page 154

### O N/A N/A

```
languageIDCurrent - Section
7.100 on
page 153
```
### O N/A O

```
promotionAnnounce
mentCode
```
- Section
    7.142 on
    page 165

### O N/A N/A

```
voucherAgent - Section
7.258 on
page 208
```
### O N/A N/A

```
voucherSerialNumb
er
```
- Section
    7.260 on
    page 208

### O N/A N/A

```
voucherGroup - Section
7.259 on
page 208
```
### O N/A N/A

```
transactionCurrency - Section
7.233 on
page 201
```
### O N/A

```
transactionAmount - Section
7.230 on
page 199
```
### O

### AND

### N/A

```
transactionAmountC
onverted
```
- Section
    7.231 on
    page 200

### O N/A N/A


```
Messages
```
```
Element Capability ID Reference Norm
al
```
```
Subt
yp
e
```
```
Erro
r
```
```
currency1 - Section 7.64
on page 141
```
### O

```
(1)
N/A N/A
```
```
currency2 - Section 7.64
on page 141
```
### O N/A N/A

```
refillInformation - Section
6.25.36 on
page 110
```
### O N/A N/A

```
accountBeforeRefill - Section
6.25.1 on
page 76
```
### O N/A N/A

```
accountAfterRefill - Section
6.25.1 on
page 76
```
### O N/A N/A

```
refillFraudCount - Section
7.151 on
page 168
```
### N/A N/A O

```
selectedOption - Section
7.176 on
page 185
```
### O N/A N/A

```
segmentationID - Section
7.175 on
page 185
```
### O N/A N/A

```
refillType - Section
7.154 on
page 169
```
### M N/A N/A

```
negotiatedCapabiliti
es
```
- Section
    7.112 on
    page 156

### O N/A O

```
availableServerCap
abilities
```
- Section 7.37
    on page 134

### O N/A O

```
accountPrepaidEmp
tyLimit1
```
```
CAP:13 Section 7.5
on page 125
```
### O

```
(2)
N/A N/A
```
```
accountPrepaidEmp
tyLimit2
```
```
CAP:13 Section 7.5
on page 125
```
### O

```
(3)
N/A N/A
```
```
treeDefinedField
(PC:10804)
```
```
CAP:7 Section
6.25.48 on
page 116
```
### O N/A N/A

_(1) Mandatory in case the refill changed the value on any account
(2) currency1 is also mandatory in case accountPrepaidEmptyLimit1 is returned
(3) currency2 is also mandatory in case accountPrepaidEmptyLImit2 is returned_


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.16.2.1 Response codes**

```
The following response codes could be included in a Refill response:
```
### 0, 1, 2, 100, 102, 103, 104, 105, 107, 108, 109, 110, 111, 112, 113, 114,

### 115, 117, 119, 120, 121, 122, 123, 126, 136, 153, 160, 161, 165, 167, 176

### (PC:06479), 177 (PC:06479), 178 (PC:06479), 179 (PC:06479), 214, 225, 248,

### 256 (PMR939:2 US77), 260, 262 (PMR939:2 US77), 999.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.17 UpdateAccountDetails

```
The message UpdateAccountDetails is used to update the account information.
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```
**6.17.1 Request**

```
Table 36 UpdateAccountDetails
```
```
Element Capability ID Reference Type
Gene
ral
```
### USSD

### EOCN

```
originNodeType - Section 7.125
on page 161
```
### MM

```
originHostName - Section 7.124
on page 160
```
### MM

```
originTransactionID - Section 7.128
on page 162
```
### MM

```
originTimeStamp - Section 7.127
on page 161
```
### MM

```
subscriberNumberN
AI
```
- Section 7.216
    on page 195

### OO

```
subscriberNumber - Section 7.215
on page 194
```
### MM

```
originOperatorID - Section 7.126
on page 161
```
### OO

```
accountPrepaidEmp
tyLimitAction
```
```
CAP:13 Section 7.7 on
page 125
```
### MO

```
messageCapabilityF
lag
```
- Section 6.25.28
    on page 102

### OO


```
Messages
```
```
Element Capability ID Reference Type
Gene
ral
```
### USSD

### EOCN

```
languageIDNew - Section 7.101
on page 153
```
### O

### N/A

```
firstIVRCallDoneFla
g
```
- Section 7.97 on
    page 152

### O N/A

```
externalData1 - Section 7.88 on
page 149
```
### O N/A

```
externalData2 - Section 7.88 on
page 149
```
### O N/A

```
accountHomeRegio
n
```
- Section 7.4 on
    page 124

### O N/A

```
pinCodeOriginal
(PC:01853)
```
- Section 7.137
    on page 164

### O

```
(1)
N/A
```
```
pinCodeValidationFl
ag (PC:01853)
```
- Section 7.138
    on page 164

### O N/A

```
pinCode (PC:01853) - Section 7.136
on page 164
```
### O N/A

```
ussdEndOfCallNotifi
cationID
```
- Section 7.254
    on page 207

### N/A M

```
languageIDCurrent - Section 7.100
on page 153
```
### O N/A

```
accountTimeZone
(PC:07061)
```
- Section 7.8 on
    page 125

### O N/A

```
negotiatedCapabiliti
es
```
- Section 7.112
    on page 156

### O N/A

```
transactionCurrency CAP:13 Section 7.233
on page 201
```
### O

```
(2)
N/A
```
```
accountPrepaidEmp
tyLimit
```
```
CAP:13 Section 7.6 on
page 125
```
### O

```
(3)
O
```
```
(1) Mandatory in case pinCodeValidationFlag is set true
(2) Mandatory in case accountPrepaidEmptyLimit is included in the request
(3) Mandatory if accountPrepaidEmptyLimitAction=SET
```
**6.17.2 Response**

```
Table 37 UpdateAccountDetails Response
```
```
Element Capability ID Reference Normal Error
responseCode N/A Section 6.17.2.1
on page 56
```
### MM


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Normal Error
originTransacti
onID
```
- Section 7.128 on
    page 162

### MO

```
originOperator
ID
```
- Section 7.126 on
    page 161

### OO

```
serviceClassC
urrent
```
- Section 7.179 on
    page 186

### O

```
(1)
N/A
```
```
accountFlagsA
fter
```
- Section 6.25.3 on
    page 79

### O N/A

```
accountFlagsB
efore
```
- Section 6.25.3 on
    page 79

### O N/A

```
negotiatedCap
abilities
```
- Section 7.112 on
    page 156

### OO

```
availableServe
rCapabilities
```
- Section 7.37 on
    page 134

### OO

```
currency1 CAP:13 Section 7.64 on
page 141
```
### O N/A

```
currency2 CAP:13 Section 7.64 on
page 141
```
### O N/A

```
accountPrepai
dEmptyLimit1
```
```
CAP:13 Section 7.5 on
page 125
```
### O

```
(2)
N/A
```
```
accountPrepai
dEmptyLimit2
```
```
CAP:13 Section 7.5 on
page 125
```
### O

```
(3)
N/A
```
```
(1) Only returned for a request of type General.
(2) currency1 is also mandatory in case accountPrepaidEmptyLimit1 is returned
(3) currency2 is also mandatory in case accountPrepaidEmptyLImit2 is returned
```
**6.17.2.1 Response codes**

```
The following response codes could be included in an UpdateAccountDetails
response:
```
```
0, 100, 102, 104, 126 (PC:10198), 128, 138, 141, 157, 204, 241 (PC:07061),
260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.18 UpdateBalanceAndDate

```
The message UpdateBalanceAndDate is used by external system to adjust
balances, start dates and expiry dates on the main account and the dedicated
accounts. On the main account it is possible to adjust the balance and expiry
dates both negative and positive (relative) direction and it is also possible to
```

```
Messages
```
```
adjust the expiry dates with absolute dates. The dedicated accounts balances,
start dates and expiry dates could be adjusted in negative and positive direction
or with absolute values.
```
```
Note: It is not possible to do both a relative and an absolute balance or date
set for the same data type (example: it is possible to either set an
absolute OR a relative adjustment to the service fee expiry date).
```
```
It is also possible to set the Service removal and Credit clearance periods
on account.
```
```
Note: If pre-activation is wanted then messageCapabilityFlag.accountActivati
onFlag should be included set to 1.
```
**6.18.1 Request**

```
Table 38 UpdateBalanceAndDate
```
```
Element Capability ID Reference TypeSubt
ype
originNodeType - Section
7.125 on
page 161
```
### M N/A

```
originHostName - Section
7.124 on
page 160
```
### M N/A

```
originTransactionID - Section
7.128 on
page 162
```
### M N/A

```
originTimeStamp - Section
7.127 on
page 161
```
### M N/A

```
subscriberNumberNAI - Section
7.216 on
page 195
```
### O N/A

```
messageCapabilityFlag - Section
6.25.28 on
page 102
```
### O N/A

```
subscriberNumber - Section
7.215 on
page 194
```
### M N/A

```
originOperatorID - Section
7.126 on
page 161
```
### O N/A

```
transactionCurrency - Section
7.233 on
page 201
```
### O

```
(1)
```

AIR Programmer's Guide UCIP Version 5.0

```
Element Capability ID Reference TypeSubt
ype
adjustmentAmountRela
tive
```
- Section
    7.21 on
    page 129

### O

```
mainAccountValueNew
(PC:05163)
```
- Section
    7.105 on
    page 154

### O

### XOR

```
dedicatedAccountUpdat
eInformation
```
- Section
    6.25.23 on
    page 95

### O N/A

```
allowCropOfComposite
DedicatedAccounts
```
- Section
    7.27 on
    page 131

### O N/A

```
supervisionExpiryDateR
elative
```
- Section
    7.221 on
    page 196

### O

```
supervisionExpiryDate - Section
7.219 on
page 196
```
### O

### XOR

```
serviceFeeExpiryDateR
elative
```
- Section
    7.198 on
    page 190

### O

```
serviceFeeExpiryDate - Section
7.196 on
page 190
```
### O

### XOR

```
creditClearancePeriod - Section
7.63 on
page 141
```
### O N/A

```
serviceRemovalPeriod - Section
7.207 on
page 193
```
### O N/A

```
transactionType - Section
7.234 on
page 201
```
### O N/A

```
transactionCode - Section
7.232 on
page 200
```
### O N/A

```
externalData1 - Section
7.88 on
page 149
```
### O N/A


```
Messages
```
```
Element Capability ID Reference TypeSubt
ype
externalData2 - Section
7.88 on
page 149
```
### O N/A

```
serviceFeeExpiryDateC
urrent
```
- Section
    7.197 on
    page 190

### O N/A

```
supervisionExpiryDateC
urrent
```
- Section
    7.220 on
    page 196

### O N/A

```
serviceClassCurrent - Section
7.179 on
page 186
```
### O N/A

```
cellIdentifier - Section
7.40 on
page 135
```
### O N/A

```
negotiatedCapabilities - Section
7.112 on
page 156
```
### O N/A

```
(1) Mandatory in case the adjustment changes monetary value (dedicated account is of type
money)
```
**6.18.2 Response**

```
Table 39 UpdateBalanceAndDate Response
```
```
Element Capability ID Reference Normal Erro
r
responseCode N/A Section 6.18.2.1
on page 60
```
### MM

```
originTransactionI
D
```
- Section 7.126
    on page 161

### MO

```
originOperatorID - Section 7.128
on page 162
```
### OO

```
currency1 - Section 7.64 on
page 141
```
### O

```
(1)
N/A
```
```
currency2 - Section 7.64 on
page 141
```
### O

```
(2)
N/A
```
```
negativeBalanceB
arringDate
```
- Section 7.110
    on page 155

### O N/A

```
accountFlagsAfter - Section 6.25.3
on page 79
```
### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Normal Erro
r
accountFlagsBefo
re
```
- Section 6.25.3
    on page 79

### O N/A

```
dedicatedAccount
ChangeInformatio
n
```
- Section 6.25.19
    on page 89

### O N/A

```
accountValue1 - Section 7.9 on
page 126
```
### O N/A

```
accountValue2 - Section 7.9 on
page 126
```
### O N/A

```
negotiatedCapabil
ities
```
- Section 7.112
    on page 156

### OO

```
availableServerCa
pabilities
```
- Section 7.37 on
    page 134

### OO

```
(1) Mandatory in case accountValue1 present.
(2) Mandatory in case accountValue2 present.
```
**6.18.2.1 Response codes**

```
The following response codes could be included in an UpdateBalanceAndDate
response:
```
```
0, 100, 102, 104, 105, 106, 121, 122, 123, 124, 126, 136, 139, 153, 163, 164,
167, 204, 212, 226, 227, 230, 247 (PMR1000:1), 249 (PMR1000:1), 257, 260,
999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176
```
## 6.19 UpdateCommunityList

```
The message UpdateCommunityList set or updates the list of communities
which the account belong to.
```
```
The complete list of community numbers must be given when changing
communities.
```
```
Example: The subscriber has communities 3,10,5. Now 10 is removed and 5
changed to 7. The array below would look like: communityInformationCurrent:
3,10,5; communityInformationNew: 3,7.
```
```
To remove all communities for a subscriber the community
in the communitInformationNew list must be empty (""). The
communityInformationNew parameter itself must be included but empty. No
community ids are allowed to be included.
```

```
Messages
```
```
Example: The subscriber has communities 3,10,5. Now all should be removed.
The array below would look like: communityInformationCurrent: 3,10,5;
communityInformationNew: ""
```
**6.19.1 Request**

```
Table 40 UpdateCommunityList
```
```
Element Capability ID Reference TypeSubty
pe
originNodeType - Section 7.125 on
page 161
```
### M N/A

```
originHostName - Section 7.124 on
page 160
```
### M N/A

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### M N/A

```
originTimeStamp - Section 7.127 on
page 161
```
### M N/A

```
subscriberNumber
NAI
```
- Section 7.216 on
    page 195

### O N/A

```
subscriberNumber - Section 7.215 on
page 194
```
### M N/A

```
originOperatorID - Section 7.126 on
page 161
```
### O N/A

```
communityInforma
tionCurrent
```
- Section 6.25.16 on
    page 86

### O

```
communityInforma
tionNew
```
- Section 6.25.16 on
    page 86

### M

### AND,

```
in case
the
request
is an
update
of alrea
dy assi
gned
comm
unity
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.19.2 Response**

```
Table 41 UpdateCommunityList Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.19.2.1
on page 62
```
### MM

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### MO

```
originOperatorID - Section 7.126 on
page 161
```
### OO

```
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### OO

```
availableServerCa
pabilities
```
- Section 7.37 on
    page 134

### OO

**6.19.2.1 Response codes**

```
The following response codes could be included in an UpdateCommunityList
response:
```
### 0, 100, 102, 104, 147, 148, 260, 999.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.20 UpdateFaFList

```
The message UpdateFaFList is used to update the Family and Friends list
for either the account or subscriber.
```
```
Note: Charged FaF number change is not supported on account level. It is
only supported on subscription level.
```
```
The fieldfafIndicatorinfafInformationis mandatory for
non-charging operations, and it is optional for charged operations.
```
**6.20.1 Request**

```
Table 42 UpdateFaFList
```
```
Element Capability ID Reference Type SubT
ype
originNodeType - Section 7.125 on
page 161
```
### M N/A


```
Messages
```
```
Element Capability ID Reference Type SubT
ype
originHostName - Section 7.124 on
page 160
```
### M N/A

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### M N/A

```
originTimeStamp - Section 7.127 on
page 161
```
### M N/A

```
subscriberNumber
NAI
```
- Section 7.216 on
    page 195

### O N/A

```
subscriberNumber - Section 7.215 on
page 194
```
### M N/A

```
originOperatorID - Section 7.126 on
page 161
```
### O N/A

```
fafAction - Section 7.89 on
page 149
```
### M N/A

```
fafInformation - Section 6.25.26 on
page 100
```
### M

```
fafInformationList - Section 6.25.27 on
page 102
```
### M

### XOR

```
selectedOption - Section 7.176 on
page 185
(1)
```
### O

```
chargingRequestIn
formation
```
- Section 6.25.12 on
    page 84

### O

### AND

```
enableFafMNPFla
g
```
- Section 7.78 on
    page 146

### O N/A

```
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### O N/A

```
(1) The values are configurable by the operator with the recommended values as specified for
allowedOptions in Section 7.28 on page 131.
```
**6.20.2 Response**

```
Table 43 UpdateFaFList Response
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
responseCode N/A Section
6.20.2.1 on
page 64
```
### M N/A M

```
originTransaction
ID
```
- Section 7.128
    on page 162

### M N/A O


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
originOperatorID - Section 7.126
on page 161
```
### O N/A O

```
allowedOptions - Section 7.28 on
page 131
```
### O N/A N/A

```
fafMaxAllowedNu
mbersReachedFl
ag
```
- Section 7.93 on
    page 150

### OO

```
fafChangeUnbarD
ate
```
- Section 7.90 on
    page 149

### O

### XOR

### N/A

```
notAllowedReaso
n (PC:05114)
```
- Section 7.115
    on page 157

### N/A N/A O

```
chargingResultInf
ormation
```
- Section 6.25.13
    on page 85

### O N/A O

```
negotiatedCapab
ilities
```
- Section 7.112
    on page 156

### O N/A O

```
availableServerC
apabilities
```
- Section 7.37 on
    page 134

### O N/A O

**6.20.2.1 Response codes**

```
The following response codes could be included in an UpdateFaFList response:
```
### 0, 100, 102, 104, 123, 124, 126, 127, 129, 130, 134, 135, 159, (PC:06653

### 205, 206), 260, 999.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.21 UpdateOffer

```
The UpdateOffer message will assign a new offer or update an existing offer to
an account.
```
```
If theUpdateOfferrequest is sent and the offerID is not found for the account,
then the update request is considered to be an assignment request. If the
offer is configured to allow multiple products a new product for the specified
offer will be assigned.
```
```
The following principles apply when assigning a new offer:
```
- It is not allowed to have a start date (and time) beyond the expiry date
    (and time).


```
Messages
```
- It is not allowed to have an expiry date (and time) set to an earlier date (and
    time) than the current date (and time).
- If no absolute or relative start date (and time) is provided, then no date (and
    time) will be assigned as offer start date (and time).
- If no expiry date (or expiry date and time) is provided, then an infinite expiry
    date is used which means that the offer never expires.

The following principles apply when updating an offer:

- An offer (except type Timer) will be active if the start date has been reached
    and the expiry date is still in the future.
- An offer of type Timer will only become active through triggering by a traffic
    event. A Timer offer is always installed in a disabled state.
- An offer will expire if the expiry date (or expiry date and time) is before
    the current date (and time).
- It is not allowed to modify the start date (or start date and time) of an active
    or enabled (in the case of type Timer) offer.
- It is not allowed to modify the start date and time of an offer of type Timer if
    the start date and time has already passed.
- It is not allowed to modify the expiry date (or expiry date and time) to an
    earlier date (or date and time) than the current date (or date and time).
- It is not allowed to modify the expiry date (or expiry date and time) of an
    expired offer.
- It is not allowed to modify the start date (or start date and time) beyond the
    expiry date (or expiry date and time).

When doing an update, if a date (or date and time) is given in relative days (or
days and time expressed in seconds), then the new date (or date and time) will
be the current defined date (or date and time) plus the relative days (or days
and time expressed in seconds). This applies to both start date (or date and
time) and expiry date (or date and time).

The parameter offerProviderID states the needed provider ID when creating a
provider account offer. The parameter offerProviderID states the new provider
ID when updating a provider account offer.

**Note:** OfferType it is mandatory for Timer Offer


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.21.1 Request**

```
Table 44 UpdateOffer
```
```
Element Capability
ID
```
```
Reference Type Subtype
```
```
originNodeType - Section
7.125 on
page 161
```
### M N/A

```
originHostName - Section
7.124 on
page 160
```
### M N/A

```
originTransactio
nID
```
- Section
    7.128 on
    page 162

### M N/A

```
originTimeStamp - Section
7.127 on
page 161
```
### M N/A

```
subscriberNumb
erNAI
```
- Section
    7.216 on
    page 195

### O N/A

```
subscriberNumb
er
```
- Section
    7.215 on
    page 194

### M N/A

```
transactio
nCurrency
(PMR1000:1)
```
```
CAP:6 Section
7.233 on
page 201
```
### O

```
(1)
```
```
originOperatorID - Section
7.126 on
page 161
```
### O N/A

```
offerID - Section
7.117 on
page 158
```
### M N/A


```
Messages
```
```
Element Capability
ID
```
```
Reference Type Subtype
```
```
startDate - Section
7.209 on
page 193
```
### O

```
startDateRelative - Section
7.211 on
page 193
```
### O

```
startPamPeriodI
ndicator
```
- Section
    7.214 on
    page 194

### M

```
currentTimeOffs
et (PMR1000:1)
```
```
CAP:6 Section 7.66
on page 142
```
### O

### O

### XOR

```
expiryDate - Section 7.80
on page 147
```
### O

```
expiryDateRelat
ive
```
- Section 7.83
    on page 148

### O

```
expiryPamPeriod
Indicator
```
- Section 7.86
    on page 148

### O

### XOR

### OR

```
startDateTime - Section
7.212 on
page 194
```
### O

```
startDateTimeRe
lative
```
- Section
    7.213 on
    page 194

### O

### XOR

```
expiryDateTime - Section 7.84
on page 148
```
### O

```
expiryDateTime
Relative
```
- Section 7.85
    on page 148

### O

### XOR

### OR

### XOR

```
pamServiceID - Section
7.131 on
page 163
```
### O

```
offerType - Section
7.123 on
page 160
```
### O

```
(2)
```
```
offerProviderID - Section
7.120 on
page 158
```
### O

```
dedicatedAc
countUpdat
eInformation
(PMR1000:1)
```
```
CAP:6 Section
6.25.23 on
page 95
```
### O

```
attributeUpdate
InformationList
(PMR939:1 US1)
```
### CAP:1,

### CAP:16

```
Section
6.25.11 on
page 84
```
### O

```
updateAction
(PMR 1009)
```
```
CAP:2 Section
7.239 on
page 203
```
### M

```
productID (PMR
1009)
```
### CAP:2,

### CAP:6

```
Section
7.139 on
page 164
```
### O

### XOR

1/1553-FAY 302 104/1 Uen U | 2013-12-06 67


```
AIR Programmer's Guide UCIP Version 5.0
```
```
(1) Mandatory in case the balance of monetary value is included
(2) offerType is mandatory if the updated offer is a Timer Offer
```
**6.21.2 Response**

```
Table 45 UpdateOffer Response
```
```
Element Capability ID Reference Normal Erro
r
responseCod
e
```
```
N/A Section
6.21.2.1 on
page 69
```
### MM

```
originTransac
tionID
```
- Section 7.128
    on page 162

### MO

```
originOperato
rID
```
- Section 7.126
    on page 161

### OO

```
currency1
(PMR1000:1)
```
```
CAP:6 Section 7.64
on page 141
```
### O N/A

```
currency2
(PMR1000:1)
```
```
CAP:6 Section 7.64
on page 141
```
### O N/A

```
offerID - Section 7.117
on page 158
```
### M

```
(1)
N/A
```
```
startDate - Section 7.209
on page 193
```
### M

```
(1)
N/A
```
```
expiryDate - Section 7.80
on page 147
```
### M

### (1) OR

### N/A

```
startDateTim
e
```
- Section 7.212
    on page 194

### M

```
(1)
N/A
```
```
expiryDateTi
me
```
- Section 7.84
    on page 148

### M

### (1) OR

### XOR

### N/A

```
pamServiceI
D
```
- Section 7.131
    on page 163

### O N/A

```
offerType - Section 7.123
on page 160
```
### O N/A

```
offerState - Section 7.122
on page 159
```
### O N/A

```
offerProviderI
D
```
- Section 7.120
    on page 158

### O N/A

```
productID - Section 7.139
on page 164
```
### O N/A


```
Messages
```
```
Element Capability ID Reference Normal Erro
r
dedicatedAc
countChang
eInformation
(PMR1000:1)
```
```
CAP:6 Section
6.25.19 on
page 89
```
### O N/A

```
negotiatedCa
pabilities
```
- Section 7.112
    on page 156

### OO

```
availableServ
erCapabilities
```
- Section 7.37
    on page 134

### OO

```
attributeInfo
rmationList
(PMR939:1
US19)
```
```
CAP:16 Section
6.25.9 on
page 82
```
### O

```
(2)
N/A
```
```
(1) O if CAP:2 is active
(2) This structure is only included if a single value is removed and replaced with a default value or
if all personal values for a set is removed and replaced with default value(s).
```
**6.21.2.1 Response codes**

```
The following response codes could be included in a UpdateOffer response:
```
```
0, 100, 102, 104, 136, 165, 214, 215, 223, 224, 225, 226, 227, 230, 237, 238,
247 (PMR 1009), 248, 256 (PMR939:1 US1), 257, 258 (PMR939:1 US1), 259
(PMR939:1 US1), 260, 262 (PMR939:1 US19), 263 (PMR939 US18), 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.22 UpdateServiceClass

```
This message UpdateServiceClass is used to update the service class (SC) for
the subscriber. It is also possible to set a temporary SC with an expiry date.
When temporary Service Class date is expired the Account will fallback to the
original Service Class defined for the account.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
**6.22.1 Request**

```
Table 46 UpdateServiceClass
```
```
Element Capability Type
ID
```
```
Reference
New
Ordin
ary &
Temp
orary
SC
```
```
New
ordi
nary
SC
```
```
New
temp
orary
SC
```
```
Remo
ve
Temp
orary
SC
```
```
originNode
Type
```
- Section
    7.125 on
    page 161

### MMMM

```
originHost
Name
```
- Section
    7.124 on
    page 160

### MMMM

```
originTrans
actionID
```
- Section
    7.128 on
    page 162

### MMMM

```
originTime
Stamp
```
- Section
    7.127 on
    page 161

### MMMM

```
subscriber
NumberNA
I
```
- Section
    7.216 on
    page 195

### OOOO

```
subscriber
Number
```
- Section
    7.215 on
    page 194

### MMMM

```
originOper
atorID
```
- Section
    7.126 on
    page 161

### OOOO

```
serviceClas
sAction
```
- Section
    7.177 on
    page 185

### MMMM

```
serviceClas
sCurrent
```
- Section
    7.179 on
    page 186

### O O N/A N/A

```
serviceClas
sNew
```
- Section
    7.181 on
    page 186

### M M N/A N/A

```
serviceClas
sTemporar
y
```
- Section
    7.183 on
    page 187

### O N/A O M


```
Messages
```
```
Element Capability Type
ID
```
```
Reference
New
Ordin
ary &
Temp
orary
SC
```
```
New
ordi
nary
SC
```
```
New
temp
orary
SC
```
```
Remo
ve
Temp
orary
SC
```
```
serviceClas
sTemporar
yExpiryDat
e
```
- Section
    7.184 on
    page 187

### O N/A O N/A

```
serviceClas
sTemporar
yNew
```
- Section
    7.185 on
    page 187

### M N/A M N/A

```
serviceClas
sTemporar
yNewExpir
yDate
```
- Section
    7.186 on
    page 187

### O N/A O N/A

```
serviceClas
sValidation
Flag
```
- Section
    7.187 on
    page 187

### OOOO

```
externalDat
a1
```
- Section 7.88
    on page 149

### OOOO

```
externalDat
a2
```
- Section 7.88
    on page 149

### OOOO

```
chargingR
equestInfor
mation
```
- Section
    6.25.12 on
    page 84

### OOOO

```
negotiated
Capabilities
```
- Section
    7.112 on
    page 156

### OOOO

**6.22.2 Response**

```
Table 47 UpdateServiceClass Response
```
```
Element Capability ID Reference Normal Error
responseCod
e
```
```
N/A Section
6.22.2.1 on
page 72
```
### MM

```
originTransa
ctionID
```
- Section 7.128
    on page 162

### MO


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Normal Error
originOperat
orID
```
- Section 7.126
    on page 161

### OO

```
notAllowedR
eason
```
- Section 7.115
    on page 157

### N/A O

```
chargingRes
ultInformatio
n
```
- Section
    6.25.13 on
    page 85

### OO

```
accountFlags
After
```
- Section 6.25.3
    on page 79

### O N/A

```
accountFlags
Before
```
- Section 6.25.3
    on page 79

### O N/A

```
negotiatedCa
pabilities
```
- Section 7.112
    on page 156

### OO

```
availableSer
verCapabiliti
es
```
- Section 7.37
    on page 134

### OO

**6.22.2.1 Response codes**

```
The following response codes could be included in an UpdateServiceClass
response:
```
```
0, 100, 102, 104, 117, 123, 124, 126, 127, 134, 135, 140, 154, 155, 257, 260,
999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176
```
## 6.23 UpdateSubscriberSegmentation

```
The message UpdateSubscriberSegmentation is used in order set or update
the accountGroupID and serviceOffering parameters which are used for
subscriber segmentation. ServiceFee information is included in the response
as (PC:06214).
```
**6.23.1 Request**

```
Table 48 UpdateSubscriberSegmentation
```
```
Element Capability ID Reference Type Subtyp
e
originNodeType - Section 7.125 on
page 161
```
### M N/A


```
Messages
```
```
Element Capability ID Reference Type Subtyp
e
originHostName - Section 7.124 on
page 160
```
### M N/A

```
originTransaction
ID
```
- Section 7.128 on
    page 162

### M N/A

```
originTimeStamp - Section 7.127 on
page 161
```
### M N/A

```
subscriberNumbe
rNAI
```
- Section 7.216 on
    page 195

### O N/A

```
subscriberNumbe
r
```
- Section 7.215 on
    page 194

### M N/A

```
originOperatorID - Section 7.126 on
page 161
```
### O N/A

```
accountGroupID - Section 7.3 on
page 124
```
### O

```
serviceOfferings - Section 6.25.43 on
page 114
```
### O

### OR

```
negotiatedCapab
ilities
```
- Section 7.112 on
    page 156

### O N/A

**6.23.2 Response**

```
Table 49 UpdateSubscriberSegmentation Response
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
responseCode N/A Section 6.23.2.1
on page 74
```
### MM

```
originTransactio
nID
```
- Section 7.128 on
    page 162

### MM

```
originOperatorID - Section 7.126 on
page 161
```
### OO

```
serviceOffe
ringsResult
(PC:06214)
```
- Section 6.25.44
    on page 114

### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
currency1
(PC:06214)
```
- Section 7.64 on
    page 141

### O N/A

```
currency2
(PC:06214)
```
- Section 7.64 on
    page 141

### O N/A

```
serviceFeeIn
formationList
(PC:06214)
```
- Section 6.25.42
    on page 113

### O

### AND

```
(
1)
```
### N/A

```
negotiatedCapa
bilities
```
- Section 7.112 on
    page 156

### OO

```
availableServer
Capabilities
```
- Section 7.37 on
    page 134

### OO

```
(1) currency2 is mandatory if amount2 is returned in serviceFeeInformationList
```
**6.23.2.1 Response codes**

```
The following response codes could be included in an UpdateSubscriberSeg
mentation response:
```
```
0, 100, 102, 124 (PC:06214), 260, 999.
```
```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.24 UpdateUsageThresholdsAndCounters

```
The messageUpdateUsageThresholdsAndCountersis used to
personalize a usage threshold for a subscriber by setting a value other
than the default value, either an individual value for a subscriber or an
individual value for a provider shared by all consumers. The other main
usage is to reset a usage counter. A counter can also be changed to any
value, either by specifying a new counter value or by adding or subtracting
a specified value to the current counter value. When the parameter
updateUsageCounterForMultiUseris included in the message the usage
counters specified inusageCounterUpdateInformationwill be reset for all
subscribers connected to the account or for the provider and all consumers. In
this case theusageCounterUsageThresholdInformationin the response
will only contain information about the subscriber or associatedPartyID the
request was directed to.
```

```
Messages
```
**6.24.1 Request**

```
Table 50 UpdateUsageThresholdsAndCounters Request
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
originNodeType - Section 7.125 on
page 161
```
### M N/A

```
originHostName - Section 7.124 on
page 160
```
### M N/A

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### M N/A

```
originTimeStamp - Section 7.127 on
page 161
```
### M N/A

```
subscriberNumber
NAI
```
- Section 7.216 on
    page 195

### O N/A

```
subscriberNumber - Section 7.215 on
page 194
```
### M N/A

```
originOperatorID - Section 7.126 on
page 161
```
### O N/A

```
transactionCurren
cy
```
- Section 7.233 on
    page 201

### O N/A

```
updateUsageCoun
terForMultiUser
```
- Section 7.240 on
    page 203

### O N/A

```
usageCounterUpd
ateInformation
```
- Section 6.25.51 on
    page 118

### O

```
usageThresholdU
pdateInformation
```
- Section 6.25.55 on
    page 121

### O

### OR

```
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### O

### N/A

**6.24.2 Response**

```
Table 51 UpdateUsageThresholdsAndCounters Response
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
responseCode N/A Section 6.24.2.1
on page 76
```
### MM

```
originTransactionI
D
```
- Section 7.128 on
    page 162

### MO


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Error
```
```
originOperatorID - Section 7.126 on
page 161
```
### OO

```
currency1 - Section 7.64 on
page 141
```
### O N/A

```
currency2 - Section 7.64 on
page 141
```
### O N/A

```
usageCounterUsa
geThresholdInfor
mation
```
- Section 6.25.52 on
    page 119

### M N/A

```
negotiatedCapabil
ities
```
- Section 7.112 on
    page 156

### OO

```
availableServerCa
pabilities
```
- Section 7.37 on
    page 134

### OO

**6.24.2.1 Response codes**

```
The following response codes could be included in an UpdateUsageThresh
oldsAndCounters response:
```
### 0, 100, 102, 104, 216, 217, 219, 220, 221, 243, 244, 245, 247, 260.

```
For a description of the responseCode parameter and the different values, see
Section 7.173 on page 176.
```
## 6.25 Common Structures and Arrays

```
This section covers common structures and arrays.
```
**6.25.1 accountAfterRefill and accountBeforeRefill**

```
The accountBeforeRefill and accountAfterRefill are enclosed in a <struct> of
their own. accountBeforeRefill and accountAfterRefill contains financial and
lifecycle data that might be affected during a refill.
```
```
The accountBeforeRefill struct carries data on account BEFORE the refill is
applied. This information can be requested in order to be able to display the
start values before refill, in order to give the user the ability to verify the start
conditions of the account when doing the refill.
```
```
The accountAfterRefill struct carries data on account AFTER the refill is applied.
This information in the response and gives the result on the account after refill
and promotions are added.
```

```
Messages
```
- In accountBeforeRefill the serviceClassTemporaryExpiryDate and
    serviceClassOriginal are returned only if the account has a temporary
    service class.
- In accountAfterRefill the serviceClassTemporaryExpiryDate and
    serviceClassOriginal are always returned when the account is assigned
    a temporary service class.
- The promotionPlanID is returned in accountBeforeRefill if a promotion
    plan ID exists for the account. In accountAfterRefill it is only returned if a
    promotion plan progression has been made.
- The serviceFeeExpiryDate is only returned in accountAfterRefill when
    service fee date is changed. In accountBeforeRefill it is always returned if
    it exists in the account database.
- The supervisionExpiryDate is only returned in accountAfterRefill when
    supervision date is changed. In accountBeforeRefill it is always returned if
    it exists in the account database.
- The creditClearanceDate is only returned in accountAfterRefill if
    supervision period or credit clearance removal period is changed. In
    accountBeforeRefill it is always returned if it exists in the account database.
- The serviceRemovalDate is only returned in accountAfterRefill if service
    fee date or service removal period is changed. In accountBeforeRefill it is
    always returned if it exists in the account database.

_Table 52 accountBeforeRefill and accountAfterRefill_

```
Element Capability ID Reference Norm
al
```
```
Erro
r
serviceClassTemporary
ExpiryDate
```
- Section
    7.184 on
    page 187

### O N/A

```
serviceClassOriginal - Section
7.182 on
page 186
```
### O N/A

```
serviceClassCurrent - Section
7.179 on
page 186
```
### M N/A

```
accountFlags - Section
6.25.2 on
page 78
```
### O N/A

```
promotionPlanID - Section
7.145 on
page 166
```
### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
serviceFeeExpiryDate - Section
7.196 on
page 190
```
### O N/A

```
supervisionExpiryDate - Section
7.219 on
page 196
```
### O N/A

```
creditClearanceDate - Section
7.63 on
page 141
```
### O N/A

```
serviceRemovalDate - Section
7.206 on
page 192
```
### O N/A

```
accountValue1 - Section 7.9
on page 126
```
### M N/A

```
accountValue2 - Section 7.9
on page 126
```
### O N/A

```
dedicatedAccountInfor
mation
```
- Section
    6.25.18 on
    page 87

### O N/A

```
usageAccumulatorInfor
mation
```
- Section
    6.25.49 on
    page 117

### O N/A

```
serviceOfferings - Section
6.25.43 on
page 114
```
### O N/A

```
communityIdList - Section
6.25.15 on
page 86
```
### O N/A

```
offerInformationList - Section
6.25.30 on
page 104
```
### O N/A

**6.25.2 accountFlags**

```
The accountFlags parameters contains life cycle state flags of the account,
indicating the actual status of the account. It is enclosed in a <struct> of its own.
```
```
Table 53 accountFlags
```
```
Element Capability ID Reference Type
activationStatusFlag - Section 7.19 on
page 128
```
### O


```
Messages
```
```
Element Capability ID Reference Type
negativeBarringStat
usFlag
```
- Section 7.111 on
    page 156

### O

```
supervisionPeriodW
arningActiveFlag
```
- Section 7.224 on
    page 197

### O

```
serviceFeePeriodW
arningActiveFlag
```
- Section 7.203 on
    page 191

### O

```
supervisionPeriodE
xpiryFlag
```
- Section 7.223 on
    page 196

### O

```
serviceFeePeriodEx
piryFlag
```
- Section 7.201 on
    page 191

### O

```
twoStepActivationFl
ag (PC:03327)
```
- Section 7.238 on
    page 202

### O

**6.25.3 accountFlagsAfter and accountFlagsBefore**

```
The accountFlagsAfter and accountFlagsbefore parameters contains life cycle
state flags of the account, indicating the actual status of the account after and
before. It is enclosed in a <struct> of its own.
```
```
Table 54 accountFlagsAfter and accountFlagsbefore
```
```
Element Capability ID Reference Type
activationStatusFlag - Section 7.19 on
page 128
```
### O

```
negativeBarringStat
usFlag
```
- Section 7.111 on
    page 156

### O

```
supervisionPeriodW
arningActiveFlag
```
- Section 7.224 on
    page 197

### O

```
serviceFeePeriodW
arningActiveFlag
```
- Section 7.203 on
    page 191

### O

```
supervisionPeriodE
xpiryFlag
```
- Section 7.223 on
    page 196

### O

```
serviceFeePeriodEx
piryFlag
```
- Section 7.201 on
    page 191

### O

**6.25.4 accumulatorUpdateInformation**

```
The AccumulatorUpdateInformation is enclosed in a <struct> of its own. Structs
are placed in an <array>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 55 accumulatorUpdateInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
accumulatorID - Section 7.11 on
page 126
```
### M N/A

```
accumulatorValue
Relative
```
- Section 7.17 on
    page 128

### O

```
accumulatorValue
Absolute
```
- Section 7.16 on
    page 127

### O

### XOR

```
accumulatorStartD
ate
```
- Section 7.14 on
    page 127

### O N/A

**6.25.5 accumulatorInformation**

```
The accumulatorInformation is enclosed in a <struct> of its own. Structs are
placed in an <array>
```
```
Table 56 accumulatorInformation
```
```
Element Capability ID Reference Type
accumulatorID - Section 7.11 on page
126
```
### M

```
accumulatorValue - Section 7.15 on page
127
```
### M

```
accumulatorStartDat
e
```
- Section 7.14 on page
    127

### O

```
accumulatorEndDate - Section 7.10 on page
126
```
### O

**6.25.6 accumulatorSelection**

```
The accumulatorSelection parameter is used to select which usage
accumulators that will be returned. If no accumulator IDs are specified in
the request all installed usage accumulators are returned. The request
contains first and last identities for a sequence of usage accumulators. If
a single accumulator shall be returned, accumulatorIDFirst could be used
alone, or the same identity could be used for both accumulatorIDFirst and
accumulatorIDLast. Overlapping sequences is allowed, the response will only
contain one instance per accumulator. Structs are placed in an <array> with
maximum 255 entries.
```

```
Messages
```
```
Note: Explicit requests use accumulatorIDFirst alone and if the requested
accumulator does not exist response code 127 will be returned. For
an implicit request which uses a range of accumulators between
accumulatorIDFirst and accumulatorIDLast the response code
127 will not be returned if no accumulators are found in the range
(even if the same identity is used for both accumulatorIDFirst and
accumulatorIDLast).
An explicit request overrides an implicit request.
```
```
Example:
1, 2 and 3 are accumulator IDs in the example. For the three first
examples two structs are used in the array, the first an explicit request
with accumulatorIDFirst = 1 and the second an implicit request with
accumulatorIDFirst = 2 and accumulatorIDLast = 3. In the last example
one struct is used with an implicit request with accumulatorIDFirst = 1
and accumulatorIDLast = 3.
1,2-3: 1 does not exist -> not ok, response code 127 and no
accumulators are returned
1,2-3: 3 does not exist -> ok, accumulator 1 and 2 are returned
1,2-3: 2-3 do not exist -> ok, accumulator 1 is returned
1-3: 1-3 do not exist -> ok, no accumulators are returned
```
```
Table 57 accumulatorSelection
```
```
Element Capability ID Reference Type
accumulatorIDFi
rst
```
- Section 7.12 on page
    126

### M

```
accumulatorIDL
ast
```
- Section 7.13 on page
    127

### O

**6.25.7 aggregatedBalanceInformation (PC:10803)**

```
The structaggregatedBalanceInformationcontains aggregated
information of product resources.
```
```
Table 58 aggregatedBalanceInformation
```
```
Element Capability ID Reference Type
dedicatedAccou
ntID
```
- Section 7.68 on page
    143

### M

```
totalBalance1 - Section 7.227 on page
198
```
### O

```
totalBalance2 - Section 7.227 on page
198
```
### O

```
totalActiveBalan
ce1
```
- Section 7.228 on page
    199

### O


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Type
totalActiveBalan
ce2
```
- Section 7.228 on page
    199

### O

```
dedicatedAccou
ntUnitType
```
- Section 7.72 on page
    144

### O

```
closestExpiryDa
teTime
```
- Section 7.55 on page
    139

### O

```
closestExpiryVal
ue1
```
- Section 7.56 on page
    139

### O

```
closestExpiryVal
ue2
```
- Section 7.56 on page
    139

### O

```
closestAccessibl
eDateTime
```
- Section 7.52 on page
    138

### O

```
closestAccessibl
eValue1
```
- Section 7.53 on page
    138

### O

```
closestAccessibl
eValue2
```
- Section 7.53 on page
    138

### O

**6.25.8 aggregatedOfferInformation (PC:10803)**

```
TheaggregatedOfferInformationcontains aggregated information of
product resources connected to offer instances.
```
```
Table 59 aggregatedOfferInformation
```
```
Element Capability ID Reference Type
aggregatedBala
nceInformation
```
```
CAP:15 Section 6.25.7 on page
81
```
### O

**6.25.9 attributeInformationList**

```
The struct attributeInformationList contains information about attributes.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
Note: Attributes are not supported for products (offer instances).
attributeInformationList will be returned as response to
GetAccountDetails, GetBalanceAndDate, GetOffers and Refill
(PMR939:2 US90) if requested with requestAttributesFlag and if any
attributes exist that have a value. attributeInformationList will also
be included as response to DeleteOffer and DeleteSubscriber if any
attributes is removed. For UpdateOffer reponse, attributeInformationList
will include all attributes that have values.
```

```
Messages
```
```
Table 60 attributeInformationList
```
```
Element Capability ID Reference Type Subtyp
e
attributeName
(PMR939:1 US1)
```
```
CAP:1, CAP:16 Section 7.31 on
page 132
```
### M N/A

```
attributeValueSt
ring (PMR939:1
US1)
```
```
CAP:1, CAP:16 Section 7.36 on
page 134
```
### O

```
attributeValueD
ate (PMR939:1
US2)
```
```
CAP:16 Section 7.34 on
page 133
```
### O

```
attributeValueDe
cimal (PMR939:1
US19)
```
```
CAP:16 Section 6.25.10
on page 83
```
### O

### XOR

```
(1)
```
```
attributeSource
(PMR939:1
US19)
```
```
CAP:16 Section 7.32 on
page 132
```
### O N/A

```
(1) One of these values will be included.
```
**6.25.10 attributeValueDecimal (PMR939:1 US19)**

```
The struct attributeValueDecimal contains information about a decimal value.
```
```
It is enclosed in a <struct> of its own. The structure contains one
parameterattributeValueNumbercontaining the significant digits and a
numberOfDecimalspart telling how many decimals that are used.
```
```
Example: If attributeValueNumber is 123456789 and numberOfDecimals is 6
these together forms the decimal number 123.456789.
```
```
Example: If attributeValueNumber is 123 and numberOfDecimals is 5 these
together forms the decimal number 0.00123.
```
```
Example: If attributeValueNumber is 789 and numberOfDecimals is 0 these
together forms the decimal number 789.0.
```
```
Table 61 attributeValueDecimal
```
```
Element Capability ID Reference Type Subtyp
e
attributeValueNu
mber (PMR939:1
US19)
```
```
CAP:16 Section 7.35 on
page 133
```
### M N/A

```
numberOfDecim
als (PMR939:1
US19)
```
```
CAP:16 Section 7.116 on
page 157
```
### M N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.25.11 attributeUpdateInformationList**

```
The struct attributeUpdateInformationList contains information about the
changes made to attributes.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
Table 62 attributeUpdateInformationList
```
```
Element Capability ID Reference Type Subtype
attributeName
(PMR939:1
US1)
```
```
CAP:1, CAP:16 Section 7.31
on page 132
```
### M N/A

```
attributeUp
dateAction
(PMR939:1
US1)
```
```
CAP:1, CAP:16 Section 7.33
on page 133
```
### M N/A

```
attributeV
alueString
(PMR939:1
US1)
```
```
CAP:1, CAP:16 Section 7.36
on page 134
```
### O

```
attributeV
alueDate
(PMR939:1
US2)
```
```
CAP:16 Section 7.34
on page 133
```
### O

```
attributeVa
lueDecimal
(PMR939:1
US19)
```
```
CAP:16 Section
6.25.10 on
page 83
```
### O

### XOR

```
(1)
```
```
(1) Note: One of the values needs to be included for ADD, SET or DELETE. For action CLEAR
neither of these values are to be included.
```
**6.25.12 chargingRequestInformation**

```
The chargingRequestInformation parameter contains request information for a
charged end user communication event.
```
```
It is enclosed in a <struct> of its own.
```
```
Table 63 chargingRequestInformation
```
```
Element Capability ID Reference Type
chargingType - Section 7.47 on page
137
```
### O


```
Messages
```
```
Element Capability ID Reference Type
chargingIndicato
r
```
- Section 7.45 on page
    136

### O

```
reservationCorr
elationID
```
- Section 7.172 on page
    176

### O

**6.25.13 chargingResultInformation**

```
The chargingResultInformation parameter contains result information for a
charged end user communication event. It is enclosed in a <struct> of its own.
```
```
Note: For GetBalanceAndDate Response the currency1 and currency2 are
sent separately and are not included in chargingResultInformation.
```
```
Table 64 chargingResultInformation
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
cost1 - Section 7.59 on
page 140
```
### OO

```
currency1 - Section 7.64 on
page 141
```
### OO

```
cost2 - Section 7.59 on
page 140
```
### OO

```
currency2 - Section 7.64 on
page 141
```
### OO

```
chargingResultCod
e
```
- Section 7.46 on
    page 136

### O N/A

```
reservationCorrelat
ionID
```
- Section 7.172 on
    page 176

### O N/A

```
chargingResultInfor
mationService
```
- Section 6.25.14 on
    page 85

### OO

**6.25.14 chargingResultInformationService**

```
The chargingResultInformationService parameter contains result information
regarding a service for a charged end user communication event. It is enclosed
in a <struct> of its own.
```
```
Note: That chargingResultInformationService is currently only used in
updateFaFList Response.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 65 chargingResultInformationService
```
```
Element Capability ID Reference Normal Error
cost1 - Section 7.59 on
page 140
```
### OO

```
cost2 - Section 7.59 on
page 140
```
### OO

**6.25.15 communityIdList**

```
communityIdList represents the community the subscriber belongs to.
```
```
The communityIdList is a list of communityID placed in an <array> with
maximum 3 entries.
```
```
Note: To change or remove communities, see Section 6.19 on page 60
```
```
Table 66 communityIdList
```
```
Element Capability ID Reference Type
communityID - Section 7.57 on page
140
```
### M

**6.25.16 communityInformationCurrent and communityInformationNew**

```
communityInformationCurrent represents the community the subscriber
currently belongs to.
```
```
communityInformationNew represents the community which is to be assigned
to the subscriber.
```
```
The communityInformationCurrent and communityInformationNew are lists of
communityID placed in an <array> with maximum 3 entries.
```
```
Note: To change or remove communities, see Section 6.19 on page 60
```
```
Table 67 communityInformationCurrent and communityInformationNew
```
```
Element Capability ID Reference Type
communityID - Section 7.57 on page
140
```
### M

**6.25.17 counterInformation**

```
The struct counterInformation contains counter values and clearing date for
account management.
```

```
Messages
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
Table 68 counterInformation
```
```
Element Capability ID Reference Type
counterID - Section 7.61 on page
140
```
### M

```
totalCounterValue - Section 7.229 on page
199
```
### M

```
periodCounterValue - Section 7.135 on page
163
```
### M

```
counterClearingDate - Section 7.60 on page
140
```
### M

**6.25.18 dedicatedAccountInformation**

```
The struct dedicatedAccountInformation contains balances and dates for
dedicated accounts. For get requests thesubDedicatedAccountInfo
rmationparameter will only be included if specifically indicated with the
requestSubDedicatedAccountDetailsFlag.
```
```
AdedicatedAccountInformationstruct with no value or date parameters
constitutes a composite dedicated account with no assigned sub dedicated
account.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
Table 69 dedicatedAccountInformation
```
```
Element
Capability ID
Reference
Type
Subtype
dedicatedAccountID
```
-
Section 7.68 on page 143
M
N/A
dedicatedAccountValue1
-
Section 7.73 on page 144
O
OR
dedicatedAccountValue2
-
Section 7.73 on page 144
O
expiryDate


AIR Programmer's Guide UCIP Version 5.0

### -

```
Section 7.80 on page 147
O
N/A
startDate
```
-
Section 7.209 on page 193
O
N/A
pamServiceID
-
Section 7.131 on page 163
O
N/A
offerID
-
Section 7.117 on page 158
O
    (1)
N/A
productID (PMR1000:1)
CAP:6
Section 7.139 on page 164
O
N/A
dedicatedAccountRealMoneyFlag (PC:05225)
-
Section 7.71 on page 143
O
N/A
closestExpiryDate
-
Section 7.54 on page 139
O
AND
closestExpiryValue1
-
Section 7.56 on page 139
O
    (2)
OR
closestExpiryValue2
-
Section 7.56 on page 139
O
    (2)
closestAccessibleDate
-
Section 7.51 on page 138
O
AND
closestAccessibleValue1
-
Section 7.53 on page 138


```
Messages
```
### O

```
(3)
OR
closestAccessibleValue2
```
-
Section 7.53 on page 138
O
    (3)
subDedicatedAccountInformation
-
Section 6.25.46 on page 115
O
N/A
dedicatedAccountActiveValue1
-
Section 7.67 on page 142
O
N/A
dedicatedAccountActiveValue2
-
Section 7.67 on page 142
O
N/A
dedicatedAccountUnitType
-
Section 7.72 on page 144
O
N/A
compositeDedicatedAccountFlag
-
Section 7.58 on page 140
O
N/A
_(1) Only included if the dedicatedAccountInformation array itself is not wrapped by an offer
structure.
(2) May only be included if closestExpiryDate is included.
(3) May only be included if closestAccessibleDate is included._

**6.25.19 dedicatedAccountChangeInformation**

```
The struct dedicatedAccountChangeInformation contains information of
changes done to balances and dates for dedicated accounts.
```
```
AdedicatedAccountChangeInformationstruct with no value or date
parameters constitutes a composite dedicated account with no assigned sub
dedicated account.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```

AIR Programmer's Guide UCIP Version 5.0

```
Table 70 dedicatedAccountChangeInformation
```
```
Element Capab Type
ility ID
```
```
Reference
DA Composite-DA Instan
ce DA
(PMR
1000:
1)
```
```
Subt
yp
e
```
```
dedicated
AccountID
```
- Section
    7.68 on
    page 143

### M M M N/A

```
productID
(PMR1000
:1)
```
```
CAP:6 Section
7.139 on
page 164
```
### N/A

### N/A O N/A

```
dedicated
AccountVa
lue1
```
- Section
    7.73 on
    page 144

### OO O

```
dedicated
AccountVa
lue2
```
- Section
    7.73 on
    page 144

### OO O

### OR

```
expiryDate - Section
7.80 on
page 147
```
### O O N/A N/A

```
startDate - Section
7.209 on
page 193
```
### O O N/A N/A

```
pamServic
eID
```
- Section
    7.131 on
    page 163

### O O N/A N/A

```
offerID - Section
7.117 on
page 158
```
### O O N/A N/A

```
dedicated
AccountRe
alMoneyFl
ag (PC:05
225)
```
- Section
    7.71 on
    page 143 O O O

### N/A


```
Messages
```
```
Element Capab Type
ility ID
```
```
Reference
DA Composite-DA Instan
ce DA
(PMR
1000:
1)
```
```
Subt
yp
e
```
```
closestExp
iryDate
```
- Section
    7.54 on
    page 139

### N/A O N/A

```
closestExp
iryValue1
```
- Section
    7.56 on
    page 139

### N/A O

```
(1)
N/A
```
```
closestExp
iryValue2
```
- Section
    7.56 on
    page 139

### N/A O

```
(1)
N/A
```
### OR

### AND

```
closestAcc
essibleDat
e
```
- Section
    7.51 on
    page 138

### N/A O N/A N/A

```
closestAcc
essibleVal
ue1
```
- Section
    7.53 on
    page 138

### N/A O

```
(2)
N/A
```
```
closestAcc
essibleVal
ue2
```
- Section
    7.53 on
    page 138

### N/A O

```
(2)
N/A
```
### OR

### AND

```
dedicated
AccountAc
tiveValue1
```
- Section
    7.67 on
    page 142

### N/A O N/A

```
dedicated
AccountAc
tiveValue2
```
- Section
    7.67 on
    page 142

### N/A O N/A

### OR

```
subDedica
tedAccoun
tChangeInf
ormation
```
- Section
    6.25.45 on
    page 114

### N/A O N/A

### N/A

```
dedicated
AccountUn
itType
```
- Section
    7.72 on
    page 144

### OO O

### N/A

```
(1) May only be included if closestExpiryDate is included.
(2) May only be included if closestAccessibleDate is included.
```
**6.25.20 dedicatedAccountDeleteInformation**

```
The struct dedicatedAccountDeleteInformation contains balances and dates
for dedicated accounts.
```

AIR Programmer's Guide UCIP Version 5.0

```
AdedicatedAccountDeleteInformationstruct with no value or date
parameters constitutes a composite dedicated account with no assigned sub
dedicated account.
```
```
It contains the balances and dates before the dedicated account was deleted.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
If the dedicatedAccountDeleteInformation contains a productID, which means
that the DA is a private (instantiated) DA, the following parameters will be
excluded from the structure: expiryDate, startDate, pamServiceID, offerID,
subDedicatedAccountInformation.
```
```
Table 71 dedicatedAccountDeleteInformation
```
```
Element
Capability ID
Reference
Type
Subtype
dedicatedAccountID
```
-
Section 7.68 on page 143
M
N/A
productID (PMR1000:1)
CAP:6
Section 7.139 on page 164
O
N/A
dedicatedAccountValue1
-
Section 7.73 on page 144
O
OR
dedicatedAccountValue2
-
Section 7.73 on page 144
O
expiryDate
-
Section 7.80 on page 147
O
N/A
startDate
-
Section 7.209 on page 193
O
N/A
pamServiceID
-
Section 7.131 on page 163


```
Messages
```
### O

### N/A

```
offerID
```
-
Section 7.117 on page 158
O
    (1)
N/A
dedicatedAccountRealMoneyFlag (PC:05225)
-
Section 7.71 on page 143
N/A
N/A
subDedicatedAccountInformation
-
Section 6.25.46 on page 115
O
N/A
dedicatedAccountUnitType
-
Section 7.72 on page 144
O
N/A
_(1) Only included if the dedicatedAccountDeleteInformation array itself is not wrapped by an
offer structure, Section 6.25.20 on page 91._

**6.25.21 dedicatedAccountRefillInformation**

```
The dedicatedAccountRefillInformation is enclosed in a <struct> of its own.
Structs are placed in an <array>.
```
```
Table 72 dedicatedAccountRefillInformation
```
```
Element Capability
ID
```
```
Reference Norm
al:
Refill
```
```
Norm
al:
Prom
otion
Part
```
```
Subtyp
e
```
```
Error
```
```
dedicatedA
ccountID
```
- Section 7.68
    on page 143

### M M N/A N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability
ID
```
```
Reference Norm
al:
Refill
```
```
Norm
al:
Prom
otion
Part
```
```
Subtyp
e
```
```
Error
```
```
refillAmoun
t1
```
- Section
    7.150 on
    page 167

### O O N/A

```
refillAmoun
t2
```
- Section
    7.150 on
    page 167

### O O N/A

```
expiryDate
Extended
```
- Section 7.82
    on page 147

### O O N/A

```
clearedVal
ue1
```
- Section 7.50
    on page 138

### O N/A N/A

```
clearedVal
ue2
```
- Section 7.50
    on page 138

### O N/A

### OR

### N/A

```
offerId - Section
7.117 on
page 158
```
### O O N/A N/A

```
subDedicat
edAccount
RefillInform
ation
```
- Section
    6.25.47 on
    page 116

### O O N/A N/A

```
dedicatedA
ccountUnit
Type
```
- Section 7.72
    on page 144 O

### O N/A N/A

**6.25.22 dedicatedAccountSelection**

```
The dedicatedAccountSelection parameter is used to select which dedicated
accounts that will be returned. If no dedicated account IDs are specified in the
request all installed dedicated accounts are returned. The request contains first
and last identities for a sequence of dedicated accounts. If a single dedicated
account shall be returned, dedicatedAccountIDFirst could be used alone,
or the same identity could be used for both dedicatedAccountIDFirst and
dedicatedAccountIDLast. Overlapping sequences is allowed, the response will
only contain one instance per dedicated account. Structs are placed in an
<array> with maximum 255 entries.
```

```
Messages
```
```
Note: Explicit requests use dedicatedAccountIDFirst alone and if the
requested dedicated account does not exist response code 139
will be returned. For an implicit request which uses a range
of dedicated accounts between dedicatedAccountIDFirst and
dedicatedAccountIDLast the response code 139 will not be returned if
no dedicated accounts are found in the range (even if the same identity
is used for both dedicatedAccountIDFirst and dedicatedAccountIDLast).
An explicit request overrides an implicit request.
```
```
Example:
1, 2 and 3 are dedicated account IDs in the example. For the three
first examples two structs are used in the array, the first an explicit
request with dedicatedAccountIDFirst = 1 and the second an implicit
request with dedicatedAccountIDFirst = 2 and dedicatedAccountIDLast
= 3. In the last example one struct is used with an implicit request with
dedicatedAccountIDFirst = 1 and dedicatedAccountIDLast = 3.
1,2-3: 1 does not exist -> not ok, response code 139 and no dedicated
accounts are returned
1,2-3: 3 does not exist -> ok, dedicated account 1 and 2 are returned
1,2-3: 2-3 do not exist -> ok, dedicated account 1 is returned
1-3: 1-3 do not exist -> ok, no dedicated accounts are returned
```
```
Table 73 dedicatedAccountSelection
```
```
Element Capability ID Reference Type
dedicatedAccou
ntIDFirst
```
- Section 7.69 on page
    143

### M

```
dedicatedAccou
ntIDLast
```
- Section 7.70 on page
    143

### O

**6.25.23 dedicatedAccountUpdateInformation**

```
The struct dedicatedAccountUpdateInformation contains information for
updating balances and expiry date for dedicated accounts.
```
```
When adding value to a composite dedicated account thededicatedAcc
ountUpdateInformationcan be repeated several times with the same
dedicatedAccountIDto create several sub dedicated accounts.
```
```
IfAllowCropOfCompositeDedicatedAccountsis set to true, it is allowed
to adjust the dates of the composite dedicated to be inside the dates of the sub
dedicated accounts. The sub dedicated accounts will in this case be adjusted
to match the dates of the composite dedicated account. Sub dedicated account
outside the new dates will be deleted. Sub dedicated accounts only partly
outside the new dates of the composite dedicated account will have its dates
updated but the value will not be changed.
```
```
The different types in the table represents the data to send to perform different
services. ‘‘Update value and balance on a Prime-DA’’ describes the data
```

AIR Programmer's Guide UCIP Version 5.0

```
needed for updating a non composite dedicated account, a dedicated account
without sub dedicated accounts. ‘‘Add value to Composite-DA’’ describes the
data needed to add value to a composite dedicated account. The value will be
added to an existing sub dedicated account if the dates match an existing one,
otherwise a new sub dedicated account will be created. ‘‘Change information
on a Composite-DA’’ describes the data needed to update the information on
composite dedicated account level and not on the sub dedicated account level
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>
```

```
Messages
```
_Table 74 dedicatedAccountUpdateInformation_

```
Type
```
```
Subtype
```
```
Element
```
```
Capability ID
```
```
Reference
```
```
Update value andbalance ona Prime-DA
```
```
Addvalue toComposite-DA
```
```
Change information onComposite-DA
```
```
Update ofDAinstance(PMR1000:1)
```
```
dedicatedAccountID
```
### -

```
Section 7.68 onpage 143
```
### M

### M

### M

### M

### N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
**Type**

**Subtype**

**Element**

**Capability ID**

**Reference**

```
Update value andbalance ona Prime-DA
```
```
Addvalue toComposite-DA
```
```
Change information onComposite-DA
```
```
Update ofDAinstance(PMR1000:1)
```
```
productID(PMR1000:1)
```
### CAP:6

```
Section 7.139 onpage 164
```
### N/A

### N/A

### N/A

### O

```
adjustmentAmountRelative
```
### -

```
Section 7.21 onpage 129
```
### OM

```
(1)
```
### N/A

### O

```
dedicatedAccountValueNew
```
### -

```
Section 7.74 onpage 145
```
### O

### N/A

### N/A

### O

### XOR

```
adjustmentDateRelative
```
### -

```
Section 7.22 onpage 129
```
### O

### N/A

### O

### N/A

```
expiryDate
```
### -

```
Section 7.80 onpage 147
```
### OO

```
(2)
```
### O

### N/A

```
expiryPamPeriodIndicator
```
### -

```
Section 7.86 onpage 148
```
### O

### O

### O

### N/A

### XOR

```
startDate
```
### -

```
Section 7.209 onpage 193
```
### OO

```
(3)
```
### O

### N/A

```
adjustmentStartDateRelative
```
### -

```
Section 7.23 onpage 129
```
### O

### N/A

### O

### N/A

```
startPamPeriodIndicator
```
### -

```
Section 7.214 onpage 194
```
### O

### O

### O

### N/A

### XOR

### OR

```
dedicatedAccountUnitType
```
```
(4)
```
### -

```
Section 7.72 onpage 144
```
### O

### O

### N/A

### O

```
expiryDateCurren(5)t
```
### -

```
Section 7.81 onpage 147
```
### O

### O

### O

### N/A

```
startDateCurrent
```
```
(
```
```
6)
```
### -

```
Section 7.210 onpage 193
```
### O

### O

### O

### N/A

```
pamServiceID
```
### -

```
Section 7.131 onpage 163
```
### O

### O

### O

### N/A

```
updateAction(PMR 1009)
```
### CAP:2

```
Section 7.239 onpage 203
```
### O

### N/A

### N/A

### N/A

### XOR


```
Messages
```
_(1) The adjustment amount can only be positive.(2) Default: DateInfinite(3) Default: DateBeginningOfTime(4) Contains the unit of the dedicated account values and is mandatory if the function "multi unit" is active, in other case it is optional.(5) Must be the same value as stored on the dedicated account for the operation to be successful.(6) Must be the same value as stored on the dedicated account for the operation to be successful._


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.25.24 discountSelection (PMR792)**

```
The discountSelection parameter contains the identifiers for the services the
discounts are requested for. It is enclosed in a struct of its own. Structs are
placed in an array.
```
```
If no discountIDs are requested in the request message, information about all
the discount IDs will be returned in response.
```
```
Table 75 discountSelection
```
```
Element Capabilit
yId
```
```
Reference Type
```
```
discountID CAP:14 Section 7.76 on
page 146
```
### O

**6.25.25 discountInformation (PMR792, PMR904)**

```
The discountInformation parameter contains discount information about
requested services. It is enclosed in a struct of it own. The structs are placed
in an array.
```
```
The following table holds information about the discountInformation parameter:
```
```
Table 76 discountInformation
```
```
Element Capabilit
yId
```
```
Reference Type
```
```
discountID CAP:14 Section 7.76 on
page 146
```
### M

```
activeFlag CAP:14 Section 7.20 on
page 128
```
### M

```
discountValue CAP:14 Section 7.77 on
page 146
```
### M

```
bandwidthDownlink (PMR:904) CAP:17 Section 7.38 on
page 134
```
### O

```
bandwidthUplink (PMR:904) CAP:17 Section 7.39 on
page 134
```
### O

```
validityTime CAP:14 Section 7.256 on
page 208
```
### O

**6.25.26 fafInformation**

```
The fafInformation is enclosed in a <struct> of its own and contains information
about family and friends function.
```

```
Messages
```
_Table 77 fafInformation_

```
Type
UpdateF
aFList
```
```
Element Capa
bilit
yID
```
```
Reference
GetF
aFL
ist Acti
o
n
ADD
```
```
Acti
o
n
SET
```
```
Acti
on
DELE
T
E
```
```
GetO
ff
er
s
Dele
teOff
er SubType
fafNumb
er
```
- Section
    7.94 on
    page 151

### MMMM

### O

### (PC:

### 06

### 65

### 3)

### M M N/A

```
owner - Section
7.129 on
page 162
```
### M M M M M M N/A

```
expiryD
ate (PC:
05114)
```
- Section
    7.80 on
    page 147

### OOOOOO

```
expiryD
ateRelat
ive (PC:
05114)
```
- Section
    7.83 on
    page 148

### N/A N/AO N/A N/A N/A

### XOR

```
fafIndica
tor
(1)
```
- Section
    7.92 on
    page 150

### OOM

```
(2)
```
### O O O N/A

```
offerID
(PC:051
14)
```
- Section
    7.117 on
    page 158

### O O O O N/A N/A N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Type
UpdateF
aFList
```
```
Element Capa
bilit
yID
```
```
Reference
GetF
aFL
ist Acti
o
n
ADD
```
```
Acti
o
n
SET
```
```
Acti
on
DELE
T
E
```
```
GetO
ff
er
s
Dele
teOff
er SubType
startDat
e (PC:0
5114)
```
- Section
    7.209 on
    page 193

### OOOOOO

```
startDat
eRelativ
e (PC:0
5114)
```
- Section
    7.211 on
    page 193

### N/A N/AO N/A N/A N/A

### XOR

```
exactMa
tch
```
- Section
    7.79 on
    page 146

### O O O N/A N/A N/A N/A

```
(1) The field fafIndicator in fafInformation is mandatory for non charged
operations and it is optional for charged operations. For charged operations the
fafIndicator should be configured in the Account Management Selection tree.
(2) The SET Action only applies to non charged operations.
```
**6.25.27 fafInformationList**

```
The fafInformationList is a list of fafInformation placed in an <array>.
```
```
See also Section 6.25.26 on page 100.
```
**6.25.28 messageCapabilityFlag**

```
ThemessageCapabilityFlagparameter indicates the possible actions
that may be performed on the account due to an operation initiated over this
protocol. It is enclosed in a <struct> of its own.
```
```
Table 78 messageCapabilityFlag
```
```
Element Capability ID Reference Type
promotionNotificatio
nFlag
```
- Section 7.144 on
    page 166

### O

```
firstIVRCallSetFlag - Section 7.99 on
page 152
```
### O

```
accountActivationF
lag
```
- Section 7.2 on page
    123

### O


```
Messages
```
**6.25.29 offerInformation**

```
The structofferInformationcontains dates (or dates and time)
for offers, and optionally the dedicated accounts assigned to each
offer. The dedicated accounts will only be included if specifically
indicated with therequestDedicatedAccountDetailsFlag. The
fafInformationListwill only be included specifically indicated with the
requestFafDetailsFlag.
```
```
In case of removal of offers it contains the dates (or dates and time) before the
offers were removed.
```
```
It is enclosed in a <struct> of its own. The structs are placed in an <array>
```
```
Table 79 offerInformation
```
```
Element Capability
ID
```
```
Reference Normal Subtype
```
```
offerID - Section 7.117
on page 158
```
### M N/A

```
startDate - Section 7.209
on page 193
```
### O

```
expiryDate - Section 7.80 on
page 147
```
### O

```
startDateTi
me
```
- Section 7.212
    on page 194

### O

```
expiryDate
Time
```
- Section 7.84 on
    page 148

### O

### XOR

```
pamServic
eID
```
- Section 7.131
    on page 163

### O N/A

```
dedicated
AccountInf
ormation
```
- Section 6.25.18
    on page 87

### O N/A

```
fafInform
ationList
(PC:0511
4)
```
- Section 6.25.27
    on page 102

### O N/A

```
offerType - Section 7.123
on page 160
```
### O N/A

```
offerState - Section 7.122
on page 159
```
### O N/A

```
offerProvid
erID
```
- Section 7.120
    on page 158

### O N/A

```
productID - Section 7.139
on page 164
```
### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability
ID
```
```
Reference Normal Subtype
```
```
usageCou
nterUsage
ThresholdI
nformation
```
- Section 6.25.52
    on page 119

### O N/A

```
attributeInf
ormationLi
st (PMR93
9:1 US1)
```
### CAP:1,

### CAP:16

```
Section 6.25.9
on page 82
```
### O N/A

```
aggregate
dOfferInfor
mation
(1)
(
PC:10803)
```
```
CAP:15 Section 6.25.8
on page 82
```
### O N/A

```
(1) If parameter requestedAggregatedProductOfferInformationFlag is
included in the request, the struct offerInformation will, on aggregated information,
only contain information common to all the offer instances.
```
**6.25.30 offerInformationList**

```
The structofferInformationListcontains dates (or dates and time) for
offers.
```
```
In case of removal of offers it contains the dates (or dates and time) before the
offers were removed.
```
```
It is enclosed in a <struct> of its own. The structs are placed in an <array>
```
```
Table 80 offerInformationList
```
```
Element Capability
ID
```
```
Reference Normal Subtype
```
```
offerID - Section
7.117 on
page 158
```
### M N/A

```
startDat
e
```
- Section
    7.209 on
    page 193

### O

```
expiryDa
te
```
- Section 7.80
    on page 147

### O

```
startDat
eTime
```
- Section
    7.212 on
    page 194

### O

```
expiryDa
teTime
```
- Section 7.84
    on page 148

### O

### XOR


```
Messages
```
**Element Capability
ID**

```
Reference Normal Subtype
```
pamServ
iceID

- Section
    7.131 on
    page 163

### O N/A

offerTyp
e

- Section
    7.123 on
    page 160

### O N/A

offerStat
e

- Section
    7.122 on
    page 159

### O N/A

offerPro
viderID

- Section
    7.120 on
    page 158

### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability
ID
```
```
Reference Normal Subtype
```
```
productI
D
```
- Section
    7.139 on
    page 164

### O N/A

```
usageCo
unterUs
ageThre
sholdInf
ormation
```
- Section
    6.25.52 on
    page 119

### O

```
(1)
N/A
```
```
dedicate
dAccoun
tChange
Informati
on (PMR
1000:1)
```
```
CAP:6 Section
6.25.19 on
page 89
```
### O

```
(2)
```
```
dedicat
edAcco
untInfo
rmation
(PMR10
00:1)
```
```
CAP:6 Section
6.25.18 on
page 87
```
### O

### (3) XOR

```
attribute
Informa
tionList
(PMR93
9:1 US1)
```
### CAP:1,

### CAP:16,

### CAP:18

```
Section
6.25.9 on
page 82
```
### O

```
(4)
N/A
```
```
(1) This parameter will not be returned as response for GeneralUpdate (PC:09854)
(2) This parameter will only contain DA instances connected to a product (offer instance). Used
when data is changed.
(3) This parameter will only contain DA instances connected to a product (offer instance). Used
when data is read.
(4) Note: This parameter will be returned as response to GetAccountDetails, GetBalanceAndDate
and Refill (PMR939:2 US90) if requested with requestOfferAttributesFlag and if the offer has
any attributes exist that have a value. It will be included as response for DeleteSubscriber if an
offer with attributes is removed. This parameter is not returned in GeneralUpdate response
(PC:09854). Attributes are not supported for products (offer instances).
```
**6.25.31 offerSelection**

```
The struct offerSelection is used to define offer identifiers to retrieve.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
If no offer IDs are specified in the request all installed active offers are returned.
The request contains first and last identities for a sequence of Offers. If a single
offer shall be returned, offerIDFirst could be used alone, or the same identity
```

```
Messages
```
```
could be used for both offerIDFirst and offerIDLast. Overlapping sequences is
allowed, the response will only contain one instance.
```
```
Note: Explicit requests use offerIDFirst alone and if the requested offer does
not exist response code 165 will be returned. For an implicit request
which uses a range of offers between offerIDFirst and offerIDLast
the response code 165 will not be returned if no offers are found in
the range (even if the same identity is used for both offerIDFirst and
offerIDLast).
An explicit request overrides an implicit request.
```
```
Example:
1, 2 and 3 are offer IDs in the example. For the three first examples
two structs are used in the array, the first an explicit request with
offerIDFirst = 1 and the second an implicit request with offerIDFirst =
2 and offerIDLast = 3. In the last example one struct is used with an
implicit request with offerIDFirst = 1 and offerIDLast = 3.
1,2-3: 1 does not exist -> not ok, response code 165 and no offers
are returned
1,2-3: 3 does not exist -> ok, offer 1 and 2 are returned
1,2-3: 2-3 do not exist -> ok, offer 1 is returned
1-3: 1-3 do not exist -> ok, no offers are returned
```
```
Table 81 offerSelection
```
```
Element Capability ID Reference Type
offerIDFirst - Section 7.118 on page
158
```
### M

```
offerIDLast - Section 7.119 on page
158
```
### O

**6.25.32 offerUpdateInformationList (PC:09854)**

```
The structofferUpdateInformationListcontains dates (or dates and
time) for offers.
```
```
Note: The same principles as for UpdateOffer applies.
```
```
It is enclosed in a <struct> of its own. The structs are placed in an <array>
```
```
Table 82 offerUpdateInformationList
```
```
Element Capabili
ty ID
```
```
Reference Norma
l
```
```
Subtype
```
```
offerID - Section 7.117
on page 158
```
### M N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capabili
ty ID
```
```
Reference Norma
l
```
```
Subtype
```
```
startDate - Section 7.209
on page 193
```
### O

```
startDateRelativ
e
```
- Section 7.211
    on page 193

### O

```
startPamPeriodI
ndicator
```
- Section 7.214
    on page 194

### M

```
currentTimeOffs
et
```
```
CAP:6 Section 7.66 on
page 142
```
### O

### O

### XOR

```
expiryDate - Section 7.80 on
page 147
```
### O

```
expiryDateRela
tive
```
- Section 7.83 on
    page 148

### O

```
expiryPamPerio
dIndicator
```
- Section 7.86 on
    page 148

### O

### XOR

### OR

```
startDateTime - Section 7.212
on page 194
```
### O

```
startDateTimeR
elative
```
- Section 7.213
    on page 194

### O

### XOR

```
expiryDateTime - Section 7.84 on
page 148
```
### O

```
expiryDateTime
Relative
```
- Section 7.85 on
    page 148

### O

### XOR

### OR

### XOR

```
pamServiceID - Section 7.131
on page 163
```
### O

```
offerType - Section 7.123
on page 160
```
### O

```
dedicatedAccou
ntUpdateInform
ation
```
```
CAP:6 Section 6.25.23
on page 95
```
### O

```
updateAction CAP:2 Section 7.239
on page 203
```
### M

```
productID CAP:2 Section 7.139
on page 164
```
### O

### XOR

**6.25.33 pamInformation**

```
The pamInformation is enclosed in a <struct> of its own and contains
information used for periodic account management.
```
```
For GetAccountDetails response the contents is included in the following table:
```

```
Messages
```
```
Table 83 pamInformation in GetAccountDetails response
```
```
Element Capability ID Reference Type
pamServiceID - Section 7.131 on
page 163
```
### M

```
pamClassID - Section 7.130 on
page 162
```
### M

```
scheduleID - Section 7.174 on
page 184
```
### M

```
currentPamPeriod - Section 7.65 on
page 141
```
### M

```
deferredToDate - Section 7.75 on
page 145
```
### O

```
lastEvaluationDat
e
```
- Section 7.102 on
    page 154

### O

```
pamServicePriorit
y
```
- Section 7.132 on
    page 163

### O

**6.25.34 pamInformationList**

```
The pamInformationList is a list of pamInformation placed in an <array>.
```
```
See also Section 6.25.33 on page 108
```
**6.25.35 productSelection**

```
The struct productSelection is used to define product identifiers to retrieve
for a given offer.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
If no product ID is specified in the request all installed products for the given
offer is returned. If a single product shall be returned, the offerID for the offer is
specified together with the product identity in productID.
```
```
Note: Explicit requests use offerID and productID, if the requested offer does
not exist response code 165 will be returned. If the requested offer
exists but the requested product do not exists response code 247 will
be returned.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 84 productSelection
```
```
Element Capability ID Reference Type
offerID - Section 7.117 on
page 158
```
### M

```
productID - Section 7.139 on
page 164
```
### O

**6.25.36 refillInformation**

```
The refillInformation is enclosed in a <struct> of its own. The refill values
are described in two structs: the refillvalue Total and Promotion. Total will
contain the actual values applied to account (including market segmentation
and promotion), while the Promotion struct only contain promotion part given
(if any). In order to detail what is the refill part, the promotion part must be
deducted from the total refill values.
```
```
Note: The serviceClassCurrent and serviceClassTemporaryExpiryDate
parameters has a relation that is described below:
```
- In case only serviceClassCurrent is returned it means that the
    service class was changed due to the refill. A permanent service
    class change was done.
- In case both serviceClassCurrent and serviceClassTemporaryExp
    iryDate are returned it means that the account was assigned a
    temporary service class (with expiry date)
- In case only serviceClassTemporaryExpiryDate is returned, this
    mean that the expire date of an already assigned temporary service
    class was extended. Thus the assigned temporary service class
    will be kept
- If neither of them is return it means that service class was not
    changed (independent if is temporary or not)

```
Table 85 refillInformation
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
refillValueTotal - Section
6.25.37 on
page 111
```
### M N/A

```
refillValuePromotion - Section
6.25.37 on
page 111
```
### O N/A

```
serviceClassCurrent - Section 7.179
on page 186
```
### O N/A


```
Messages
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
serviceClassTemporaryExpi
ryDate
```
- Section 7.184
    on page 187

### O N/A

```
promotionPlanProgressed - Section 7.146
on page 166
```
### O N/A

```
supervisionDaysSurplus - Section 7.218
on page 195
```
### O N/A

```
serviceFeeDaysSurplus - Section 7.192
on page 189
```
### O N/A

```
promotionRefillAccumulate
dValue1
```
- Section 7.147
    on page 167

### O N/A

```
promotionRefillAccumulate
dValue2
```
- Section 7.147
    on page 167

### O N/A

```
promotionRefillCounter - Section 7.148
on page 167
```
### O N/A

```
progressionRefillValue1 - Section 7.141
on page 165
```
### O N/A

```
progressionRefillValue2 - Section 7.141
on page 165
```
### O N/A

```
progressionRefillCounter - Section 7.140
on page 165
```
### O N/A

**6.25.37 refillValueTotal and refillValuePromotion**

```
The refillValueTotal and refillValuePromotion are enclosed in a <struct> of their
own. It contains the resulting values that will be applied to the account, both
for the added amounts and dates. The refill is divided on main and dedicated
accounts.
```
```
For refillValueTotal the refill values are the total values, including market
segmentation and promotions.
```
```
For refillValuePromotion the refill values are only the resulting promotion values
that will be applied to the account (these are included in the “Total”).
```
```
Table 86 refillValueTotal and refillValuePromotion
```
```
Element Capability ID Reference Refi
ll
```
```
Erro
r
refillAmount1 - Section 7.150
on page 167
```
### M N/A

```
refillAmount2 - Section 7.150
on page 167
```
### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Refi
ll
```
```
Erro
r
supervisionDaysExtended - Section 7.217
on page 195
```
### O N/A

```
serviceFeeDaysExtended -A Section 7.191
on page 189
```
### O N/A

```
dedicatedAccountRefillInfo
rmation
```
- Section 6.25.21
    on page 93

### O N/A

```
usageAccumulatorInformat
ion
```
- Section 6.25.49
    on page 117

### O N/A

**6.25.38 requestedInformationFlags**

```
TherequestedInformationFlagsparameter indicates the elements to be
returned or not returned in a response. It is enclosed in a <struct> of its own.
```
```
Table 87 requestedInformationFlags
```
```
Element Capability ID Reference Type
requestMasterAcc
ountBalanceFlag
```
- Section 7.163 on
    page 173

### O

```
allowedServiceCl
assChangeDateF
lag
```
- Section 7.29 on
    page 131

### O

```
requestLocationIn
formationFlag
```
```
CAP:12 Section 7.162 on
page 172
```
### O

**6.25.39 serviceFeeData (PC:06214)**

```
TheserviceFeeDataparameter contains the values of the service fee data.
It is enclosed in a <struct> of its own.
```
```
Table 88 serviceFeeData
```
```
Element Capability ID Reference Type
serviceFeeID - Section 7.199 on
page 190
```
### M

```
serviceFeeDed
uctionDate
```
- Section 7.194 on
    page 189

### O

```
serviceFeeDebt
Amount1
```
- Section 7.193 on
    page 189

### M

```
serviceFeeDebt
Amount2
```
- Section 7.193 on
    page 189

### O


```
Messages
```
```
Element Capability ID Reference Type
serviceFeeAcc
umulations
```
- Section 7.188 on
    page 188

### M

```
chargedForIndi
cator
```
- Section 7.44 on
    page 136

### M

**6.25.40 serviceFeeDataList (PC:06214)**

```
The serviceFeeDataList is a list of serviceFeeData placed in an <array>.
```
```
See also Section 6.25.39 on page 112.
```
**6.25.41 serviceFeeInformation (PC:06214)**

```
TheserviceFeeInformationparameter contains the values of the service
fee data information. It is enclosed in a <struct> of its own.
```
```
Table 89 serviceFeeInformation
```
```
Element Capability ID Reference Type
serviceFeeID - Section 7.199 on
page 190
```
### M

```
serviceFeeAmo
unt1
```
- Section 7.189 on
    page 188

### M

```
serviceFeeAmo
unt2
```
- Section 7.189 on
    page 188

### O

```
serviceFeeChar
gedAmount1
```
- Section 7.190 on
    page 188

### M

```
serviceFeeChar
gedAmount2
```
- Section 7.190 on
    page 188

### O

```
serviceFeeDed
uctionDate
```
- Section 7.194 on
    page 189

### O

```
serviceFeeDed
uctionPeriod
```
- Section 7.195 on
    page 190

### M

```
serviceFeePeri
odUnit
```
- Section 7.202 on
    page 191

### M

**6.25.42 serviceFeeInformationList (PC:06214)**

```
The serviceFeeInformationList is a list of serviceFeeInformation placed in an
<array>.
```
```
See also Section 6.25.41 on page 113.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
**6.25.43 serviceOfferings**

```
TheserviceOfferingsparameter contains the values of the service
offerings defined on an account. It has to be matched to the definitions of the
tariff tree. It is enclosed in a <struct> of its own. The structs are placed in
an <array> with maximum 31 entries.
```
```
Table 90 serviceOfferings
```
```
Element Capability ID Reference Type
serviceOfferingI
D
```
- Section 7.205 on
    page 192

### M

```
serviceOffering
ActiveFlag
```
- Section 7.204 on
    page 192

### M

**6.25.44 serviceOfferingsResult (PC:06214)**

```
The serviceOfferingsResult parameter contains a list of updated
serviceOfferingIDs. The serviceOfferingsResult is a list of <struct> placed in
an <array>.
```
```
Table 91 serviceOfferings
```
```
Element Capability ID Reference Type
serviceOfferingI
D
```
- Section 7.205 on
    page 192

### M

**6.25.45 subDedicatedAccountChangeInformation**

```
The struct subDedicatedAccountChangeInformation contains information about
the changes made to a sub dedicated account.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```

```
Messages
```
```
Table 92 subDedicatedAccountChangeInformation
```
```
Element Capability Type
ID
```
```
Reference
New
Sub-
DA
```
```
Chan
ged
Sub-
DA
```
```
Merg
ed-S
ub-D
A
```
```
Dele
ted
Sub-
DA
```
```
Subt
ype
```
```
changedAm
ount1
```
- Section
    7.41 on
    page 135

### N/A O O

```
(1)
O
```
```
changedAm
ount2
```
- Section
    7.41 on
    page 135

### N/A O O O

### OR

```
dedicatedA
ccountValu
e1
```
- Section
    7.73 on
    page 144

### OOON/A

```
dedicatedA
ccountValu
e2
```
- Section
    7.73 on
    page 144

### OOON/A

### OR

```
changedEx
piryDate
```
- Section
    7.42 on
    page 135

### N/A O O N/A N/A

```
newExpiryD
ate
```
- Section
    7.113 on
    page 156

### O O O N/A N/A

```
clearedExpi
ryDate
```
- Section
    7.48 on
    page 137

### N/A N/A N/A O N/A

```
changedSta
rtDate
```
- Section
    7.43 on
    page 136

### N/A O O N/A N/A

```
newStartDa
te
```
- Section
    7.114 on
    page 157

### O O O N/A N/A

```
clearedStar
tDate
```
- Section
    7.49 on
    page 137

### N/A N/A N/A O N/A

```
(1) Includes the value of the matching Sub-DA as well as the requested change.
```
**6.25.46 subDedicatedAccountInformation**

```
The struct subDedicatedAccountInformation contains balances and dates for
sub dedicated accounts.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 93 subDedicatedAccountInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
```
```
Erro
r
dedicatedAccoun
tValue1
```
- Section 7.73 on
    page 144

### O N/A

```
dedicatedAccoun
tValue2
```
- Section 7.73 on
    page 144

### O

### OR

### N/A

```
startDate - Section 7.209 on
page 193
```
### O N/A N/A

```
expiryDate - Section 7.80 on
page 147
```
### O N/A N/A

**6.25.47 subDedicatedAccountRefillInformation**

```
The subDedicatedAccountRefillInformation is enclosed in a <struct> of its own.
Structs are placed in an <array>.
```
```
Table 94 subDedicatedAccountRefillInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subtype Erro
r
startDate
```
### (1) -

```
Section 7.209
on page 193
```
### O N/A N/A

```
expiryDate
```
### (2) -

```
Section 7.80 on
page 147
```
### O N/A N/A

```
refillAmount1 - Section 7.150
on page 167
```
### O N/A

```
refillAmount2 - Section 7.150
on page 167
```
### O

### OR

### N/A

```
clearedValue1 - Section 7.50 on
page 138
```
### O N/A

```
clearedValue2 - Section 7.50 on
page 138
```
### O

### OR

### XOR

### N/A

```
(1) Contains the cleared startDate if the sub dedicated account was cleared.
(2) Contains the cleared expiryDate if the sub dedicated account was cleared.
```
**6.25.48 treeDefinedField**

```
The following parameters can be received in aRefillrequest (PMR939:1 and
PC:10797) or set in aRefillresponse (PC:10804).
```
```
The structtreeDefinedFieldcontains information about the Tree Defined
Field values.
```

```
Messages
```
```
Table 95 treeDefinedField
```
```
Element Capability ID Reference Type
treeDefinedFieldNam
e
```
### CAP:7

### CAP:11

### CAP:16

```
Section 7.235 on
page 201
```
### M

```
(1)
```
```
treeDefinedFieldTyp
e
```
### CAP:7

### CAP:11

### CAP:16

```
Section 7.236 on
page 202
```
### M

```
(1)
```
```
treeDefinedFieldValu
e
```
### CAP:7

### CAP:11

### CAP:16

```
Section 7.237 on
page 202
```
### M

```
(1)
```
```
(1) Optional in the Refill Response (PC:10804)
```
**6.25.49 usageAccumulatorInformation**

```
The usageAccumulatorInformation is enclosed in a <struct> of its own. Structs
are placed in an <array>.
```
```
Table 96 usageAccumulatorInformation
```
```
Element Capability ID Reference Norm
al
```
```
Erro
r
accumulatorID - Section 7.11 on
page 126
```
### M N/A

```
accumulatorValue - Section 7.15 on
page 127
```
### M N/A

**6.25.50 usageCounterDeleteInformation**

```
TheusageCounterDeleteInformationspecifies usage counter data
for a deleted usage counter. Depending on the usage counted the counter
value is represented either in theusageCounterValueparameter or the
usageCounterMonetaryValue1parameter. It is enclosed in a <struct> of its
own. Structs are placed in an <array>.
```
```
Table 97 usageCounterDeleteInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subtype
```
```
usageCounterID - Section 7.241 on
page 203
```
### M N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Capability ID Reference Norm
al
```
```
Subtype
```
```
usageCounterV
alue
```
- Section 7.245 on
    page 204

### O

```
usageCounterM
onetaryValue1
```
- Section 7.242 on
    page 204

### O

```
usageCounterM
onetaryValue2
```
- Section 7.242 on
    page 204

### O

### OR

### XOR

```
usageThresholdI
nformation
```
- Section 6.25.54
    on page 120

### O N/A

```
associatedPartyI
D
```
- Section 7.30 on
    page 132

### O N/A

```
productID - Section 7.139 on
page 164
```
### O N/A

**6.25.51 usageCounterUpdateInformation**

```
TheusageCounterUpdateInformationspecifies usage counter data.
Depending on the usage counted the counter value is represented either in the
usageCounterValueparameter or theusageCounterMonetaryValue1
parameter. It is enclosed in a <struct> of its own. Structs are placed in an
<array>.
```
```
Table 98 usageCounterUpdateInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subtype
```
```
usageCounterID - Section 7.241 on
page 203
```
### M N/A

```
usageCounterV
alueNew
```
- Section 7.247 on
    page 205

### O

```
adjustmentUsag
eCounterValueR
elative
```
- Section 7.25 on
    page 130

### O

```
usageCounterM
onetaryValueNe
w
```
- Section 7.244 on
    page 204

### O

```
adjustmentUsag
eCounterMoneta
ryValueRelative
```
- Section 7.24 on
    page 130

### O

### XOR


```
Messages
```
```
Element Capability ID Reference Norm
al
```
```
Subtype
```
```
associatedPartyI
D
```
- Section 7.30 on
    page 132

### O N/A

```
productID - Section 7.139 on
page 164
```
### O N/A

**6.25.52 usageCounterUsageThresholdInformation**

```
TheusageCounterUsageThresholdInformationelement contains all
active usage counters with their thresholds for a subscriber. TheproductID
can be zero in a response indicating that a personal usage threshold value
exists for the usage counter and there may exist zero or more additional product
local usage counters which have not been used yet.
```
```
It is enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
Table 99 usageCounterUsageThresholdInformation
```
```
Element Capabili
ty ID
```
```
Reference Norm
al
```
```
Subtype
```
```
usageCounterID - Section 7.241
on page 203
```
### M N/A

```
usageCounterValue - Section 7.245
on page 204
```
### O

```
usageCounterNomin
alValue (PMR905:1)
```
```
CAP:22 Section 7.246
on page 205
```
### O

```
usageCounterMonet
aryValue1
```
- Section 7.242
    on page 204

### O

```
usageCounterMone
taryNominalValue1
(PMR905:1)
```
```
CAP:22 Section 7.243
on page 204
```
### O

```
usageCounterMonet
aryValue2
```
- Section 7.242
    on page 204

### O

```
usageCounterMone
taryNominalValue2
(PMR905:1)
```
```
CAP:22 Section 7.243
on page 204
```
### O

### OR

### XOR

```
usageThresholdInfor
mation
```
- Section
    6.25.54 on
    page 120

### O N/A

```
associatedPartyID - Section 7.30
on page 132
```
### O N/A

```
productID - Section 7.139
on page 164
```
### O N/A


```
AIR Programmer's Guide UCIP Version 5.0
```
**6.25.53 usageThresholds**

```
TheusageThresholdsis used to specify which usage thresholds to perform
an operation on. It is enclosed in a <struct> of its own. Structs are placed in
an <array>.
```
```
Table 100 usageThresholds
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
usageThresholdID - Section 7.248 on
page 205
```
### M N/A

```
associatedPartyID - Section 7.30 on
page 132
```
### O N/A

**6.25.54 usageThresholdInformation**

```
TheusageThresholdInformationelement carries all information about
a usage threshold. Depending on the usage counted the threshold value is
represented either in theusageThresholdValueparameter or theusage
ThresholdMonetaryValue1 or usageThresholdMonetaryValue2
parameter. TheusageThresholdSourceparameter can not be updated but
is included in responses. TheusageThresholdInformationelement is
enclosed in a <struct> of its own. Structs are placed in an <array>.
```
```
Table 101 usageThresholdInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subtype
```
```
usageThresholdI
D
```
- Section 7.248 on
    page 205

### M N/A

```
usageThreshold
Value
```
- Section 7.252 on
    page 206

### O

```
usageThreshold
MonetaryValue1
```
- Section 7.249 on
    page 205

### O

```
usageThreshold
MonetaryValue2
```
- Section 7.249 on
    page 205

### O

### OR

### XOR

```
usageThreshold
Source
```
- Section 7.251 on
    page 206

### O

### N/A

```
associatedPartyI
D
```
- Section 7.30 on
    page 132

### O

```
(1)
N/A
```
```
(1) May only be included for DeleteUsageThresholds but NOT for GetUsageThresholdsAndCou
nters and UpdateUsageThresholdsAndCounters responses.
```

```
Messages
```
**6.25.55 usageThresholdUpdateInformation**

```
TheusageThresholdUpdateInformationelement is enclosed in a
<struct> of its own. Structs are placed in an <array>.
```
```
Table 102 usageThresholdUpdateInformation
```
```
Element Capability ID Reference Norm
al
```
```
Subt
ype
usageThresholdID - Section 7.248 on
page 205
```
### M N/A

```
usageThresholdV
alueNew
```
- Section 7.253 on
    page 207

### O

```
usageThresholdM
onetaryValueNew
```
- Section 7.250 on
    page 206

### O

### XOR

```
associatedPartyID - Section 7.30 on
page 132
```
### O

### N/A


AIR Programmer's Guide UCIP Version 5.0


```
Elements
```
## 7 Elements

```
The elements in UCIP holds parameters used in the request messages that are
sent towards the AIR server. The elements also holds the response messages
that are replied to the interworking network entity from where the request
originated. The elements are described in separate sections.
```
## 7.1 accountActivatedFlag

```
TheaccountActivatedFlagflag is sent when the account got activated as
a result of the User Communication session.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 103
```
```
Table 103 Element Value Range - accountActivatedFlag
```
```
Value Range Description
1 (true) Account got activated as a result of the
User Communication session.
```
## 7.2 accountActivationFlag

```
TheaccountActivationFlagparameter is used to indicate if pre-activated
accounts may be or will not be activated due to the request. The possibility
to activate a pre-activated account by this flag is configured in the account
databases service class configuration. This results in that even if the flag is set
to true the account may not be activated.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 104
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 104 Element Value Range - accountActivationFlag
```
```
Value Range Description
0 (false) (default value) Pre-activated accounts will not be
activated due to the request.
```
```
Account can however be activated if
service fee and supervision expiry dates
are set as a result of this request. In this
case neither the initial balance nor the
life-cycle dates from the pre-activation
configuration will not be given.
1 (true) Pre-activated accounts may be activated
due to the request.
```
```
If service fee and supervision expiry
dates are explicitly received in the request
these days will used and initial balance
will be applied (but no additional days
from the pre-activation configuration will
be given). If service fee and supervision
expiry dates are not explicitly set in the
request initial life-cycle days and initial
balance will be applied.
```
## 7.3 accountGroupID

```
TheaccountGroupIDparameter contains the Account Group identity for
the account. An account can be placed in an Account Group which makes
it possible to group subscribers together without considering their Service
Classes.
```
```
Data Type: <int> or <i4>
```
```
Element Range: 0 – 2147483647, where 0 indicate clearing of account group
(when set to 0 the account does not belong to any account group)
```
## 7.4 accountHomeRegion

```
TheaccountHomeRegionparameter contains the home region for the
account.
```
```
Data Type: <int> or <i4>
```
```
Element Range: 0 to 999 where 0 means no home region set.
```

```
Elements
```
7.5 accountPrepaidEmptyLimit1 and accountPrepaidEm

ptyLimit2

```
TheaccountPrepaidEmptyLimit1andaccountPrepaidEmptyLimit2p
arameters contain the lowest allowed balance on an account. 1 indicates an
account balance in the first currency and 2 an account balance in the second
one.
Data Type: <string>
Element Format: Price
Element value range: -999 999 999 999 to 999 999 999 999
```
## 7.6 accountPrepaidEmptyLimit

```
AccountPrepaidEmptyLimit is used to set a lowest allowed balance on an
account.
Data Type: <string>
Element Format: Price
Element value range: -999 999 999 999 to 999 999 999 999
```
## 7.7 accountPrepaidEmptyLimitAction

```
TheaccountPrepaidEmptyLimitActionparameter contains the requested
action for changing the Account Prepaid Empty Limit.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 105
```
```
Table 105 Element Value Range - accountPrepaidEmptyLimitAction
```
```
Value Range Description
SET Update the Account Prepaid Empty
Limit.
DELETE Delete the Account Prepaid Empty
Limit.
```
## 7.8 accountTimeZone

```
This parameter contains theaccountsTimeZonein the following formats,
EST, EST5EDT or America/Whitehorse (Olson Database).
```
```
Data Type: <string>
```
```
The later of the three is required to get country specific daylight saving time
start and stop dates. The supported time zones are the ones defined in the
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
JavaTM framework (Olson Database). More information about the supported
ways of defining TimeZones can be found in the JavaDoc.
```
## 7.9 accountValue1 and accountValue2

```
Theaccountvalue1 and accountValue2parameters contains the
account value for the subscriber's master account. This is not taking in
consideration any ongoing chargeable events. 1 indicates an account value in
the first currency to be announced and 2 an account value in the second one.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: -999 999 999 999 to 999 999 999 999
```
## 7.10 accumulatorEndDate

```
TheaccumulatorEndDateparameter indicates the date on which the
accumulator will be reset to the initial value again.
```
```
XML-RPC Data
```
```
Type: <dateTime.iso8601>
```
```
Element Value Range: DateToday to DateMax or DateInfinite
```
## 7.11 accumulatorID

```
TheaccumulatorIDparameter contains the accumulator identity.
```
```
XML-RPC Data
```
```
Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```
## 7.12 accumulatorIDFirst

```
TheaccumulatorIDFirstparameter contains the first accumulator identity
in a sequence of usage accumulators or the only accumulator identity if a single
usage accumulator shall be obtained.
```
```
XML-RPC Data
```
```
Type: <int> or <i4>
```

```
Elements
```
```
Element Value Range: 1 to 2147483647
```
## 7.13 accumulatorIDLast

```
TheaccumulatorIDLastparameter contains the last accumulator identity in
a sequence of usage accumulators.
```
```
XML-RPC Data
```
```
Type: <int> or <i4>
```
```
Element Value Range: 1 to 2147483647
```
## 7.14 accumulatorStartDate

```
TheaccumulatorStartDateparameter indicates the date on which the
accumulator was last reset.
```
```
XML-RPC Data
```
```
Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateToday
```
```
Element Value Range: DateMin to DateMax (PC:11935)
```
## 7.15 accumulatorValue

```
TheaccumulatorValueparameter contains an accumulator value.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -2147483648 to 2147483647
```
## 7.16 accumulatorValueAbsolute

```
TheaccumulatorValueAbsoluteparameter contains an accumulator value
used for an absolute update.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -2147483648 to 2147483647
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.17 accumulatorValueRelative

```
TheaccumulatorValueRelativeparameter contains an accumulator value
used for a relative update.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -2147483648 to 2147483647
```
## 7.18 activationDate

```
TheactivationDateparameter contains the activation date of an account.
Subordinate subscribers will contain the activation date of the master account.
```
```
XML-RPC Data
```
```
Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateToday
```
## 7.19 activationStatusFlag

```
This parameter is used to indicate if an account is activated or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 135
```
```
Table 106 Element Value Range - activationStatusFlag
```
```
Value Range Description
0 (false) (default value) Account is not activated
1 (true) Account is activated
```
## 7.20 activeFlag (PMR792)

```
ThediscountActiveFlagindicates whether returned value is an active
discount or a planned discount. For an active call/session AIR will respond with
both active and planned discount values simultaneously in the protocol."
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 107
```

```
Elements
```
```
Table 107 discountActiveFlag Values
```
```
Value Range Description
0 Indicates planned discount
1 Indicates active discount
```
## 7.21 adjustmentAmountRelative

```
TheadjustmentAmountRelativeparameter contains the amount of the
adjustment (positive or negative) to be applied to the account. It can be applied
to both dedicated accounts and main account, but only unit type of money can
be applied to main account.
```
```
If the amount is to be applied to a dedicated account, then if the unit type is
Money, this parameter can contain both an integer part and a decimal part.
There is no decimal separator, the decimal part is given directly to the right of
the integer part. The number of digits in the decimal part is configured in the
currency configuration. The integer part range is: 0-9223372036854. The
decimal part can consist of 0 to 6 digits, that is, maximum value is 999999. If
the maximum value of the integer part is reached, the maximum decimal part is
775807.
```
```
If the amount is to be applied to main account, then this parameter will have
value range -999 999 999 999 to 999 999 999 999.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: -9 223 372 036 854 775 807 to 9 223 372 036 854
775 807
```
## 7.22 adjustmentDateRelative

```
TheadjustmentDateRelativeparameter is used to make a relative
adjustment to the current expiry date. The adjustment can be positive or
negative. It is expressed in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -32767 to -1 and 1 to 32767
```
7.23 adjustmentStartDateRelative

```
TheadjustmentStartDateRelativeparameter is used to make a relative
adjustment to the current start date. The adjustment can be positive or
negative. It is expressed in number of days.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Date Type: <int> or <i4>
```
```
Element Value Range: -999 to -1 and 1 to 999
```
## 7.24 adjustmentUsageCounterMonetaryValueRelative

```
TheadjustmentUsageCounterMonetaryValueRelativeparameter
indicates the adjustment value of a monetary usage counter.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: -999 999 999 999 to 999 999 999 999
```
## 7.25 adjustmentUsageCounterValueRelative

```
TheadjustmentUsageCounterValueRelativeparameter contains the
adjustment value of a non-monetary usage counter.
```
```
Data Type: <string>
```
```
Element Format: SignedNumeric
```
```
Element Size: -9 223 372 036 854 775 807 to 9 223 372 036 854 775 807
```
## 7.26 aggregatedBalance1 and aggregatedBalance2 (PC:05225)

```
TheaggregatedBalance1 and aggregatedBalance2parameters
contains the aggregated balance for the subscriber. This is
not taking in consideration any ongoing chargeable events.
aggregatedBalance1indicates an aggregated balance in the first currency
to be announced andaggregatedBalance2the aggregated balance
in the second currency. Aggregated balance is used to display the total
balance of real money on the subscribers account. Real money can be seen
as money added to the account by the subscriber and does not include
various bonuses or promotions. Subscribers aggregated balance is the
sum of main account value and the dedicated accounts marked with the
dedicatedAccountRealMoneyFlagflag.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: -999 999 999 999 to 999 999 999 999
```

```
Elements
```
## 7.27 allowCropOfCompositeDedicatedAccounts

```
TheallowCropOfCompositeDedicatedAccountsparameter is used to
indicate if it shall be allowed to crop a composite dedicated account
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 108
```
```
Table 108 Element Value Range - allowCropOfCompositeDedicatedAccounts
```
```
Value Range Description
0 (false) (default value) Do not allow crop
1 (true) Allow crop
```
## 7.28 allowedOptions

```
ThisallowedOptionsparameter contains the value of an allowed option. The
values are configurable with the recommended values as listed in Table 109.
```
```
Note: The allowedOption can be repeated up to 8 times for UpdateFaFList
Response.
```
```
Data Type: array of <int> or <i4>
```
```
Element Value Range: 1 to 999
```
```
Table 109 Recommended values for allowedOptions
```
```
Value Description
```
(^1) Both incoming and outgoing direction
allowed.
(^2) Incoming direction allowed.
(^3) Outgoing direction allowed.

## 7.29 allowedServiceClassChangeDateFlag

```
TheallowedServiceClassChangeDateFlagparameter is used to indicate
if theserviceClassChangeUnbarDateparameter shall be returned or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 110
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 110 Element Value Range - allowedServiceClassChangeDateFlag
```
```
Value Range Description
0 (false) (default value) Do not return
1 (true) Return
```
## 7.30 associatedPartyID

```
TheassociatedPartyIDparameter contains the subscriber identity of
the consumer or provider. The default format of the parameter is the same
numbering format as used by the account database, this also includes support
of leading zeroes.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 1 to 28
```
## 7.31 attributeName (PMR939:1 US1)

```
TheattributeNamecontains the name of the attribute.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 to 128
```
## 7.32 attributeSource (PMR939:1 US19)

```
Contains the source from where the attribute is fetched.
```
```
Default (parameter is not included) means the attribute is stored on the entity
provisioned for a subscriber.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 111
```
```
Table 111 Element Value Range - attributeSource
```
```
Value Range Description
```
(^1) Default value from definition
2-255 Reserved for future use


```
Elements
```
## 7.33 attributeUpdateAction (PMR939:1 US1)

```
TheattributeUpdateActionparameter contains the requested action for
an attribute.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 112
```
```
Table 112 Element Value Range - attributeUpdateAction
```
```
Value
Range
```
```
Capability
ID
```
```
Description
```
### ADD CAP:1,

### CAP:16

```
Add an entry to the set (for attributes storing a set
of values).
DELET
E
```
### CAP:1,

### CAP:16

```
Delete an entry from the set (for attributes storing a
set of values).
CLEAR CAP:1,
CAP:16
```
```
Clear all entries from the set (for attributes storing
a set of values) or removes the value for a single
value attribute.
SET CAP:16 Sets the value for a single value attribute. Previous
value, if existing, will be overwritten.
```
```
The following attribute update actions are allowed for an attribute storing a set
of values: ADD, DELETE, CLEAR.
```
```
The following attribute update actions are allowed for an attribute storing a
single value: SET, CLEAR
```
## 7.34 attributeValueDate (PMR939:1 US2)

```
TheattributeValueDatecontains the date value of an attribute.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.35 attributeValueNumber (PMR939:1 US19)

```
TheattributeValueNumbercontains up to 15 significant digits that together
with thenumberOfDecimalsparameter forms a decimal number.
```
```
There is no decimal sign included in this parameter.
```
```
Data Type: <string>
```
```
Element Format: SignedNumeric
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Value Range: -999 999 999 999 999 to 999 999 999 999 999.
```
## 7.36 attributeValueString (PMR939:1 US1)

```
TheattributeValueStringcontains the string value of an attribute.
```
```
Data Type: <string>
```
```
Element format: Extended alphanumeric (PMR939:1 US25).
```
```
Element Size: 1 to 128.
```
```
See valid characters for the extended alphanumeric parameter in Table 187
and Table 186.
```
## 7.37 availableServerCapabilities

```
The availableServerCapablities parameter is used to indicate the available
capabilities at the server node. The capabilities are presented as a series
of elements, where each element contains an integer value between 0 and
```
2147483647. The value 0 indicates that none of the capabilities in the element
are active, and the value 2147483647 indicates that all of the capabilities in the
element are active. If only one element is present and is set to 0, no functions
after release AIR-IP 5.0 are active, only legacy functionality can be used.

```
See Section 9 on page 217 for supported capabilities.
```
```
Data Type: array of <int> or <i4>
```
```
Element Value Range: 0 to 2147483647
```
## 7.38 bandwidthDownlink (PMR 904)

```
This parameter contains the downlink bandwidth in absolute values (bits per
second).
```
```
Data Type: <string>
```
```
Element Value Range: 1 - 4294967295
```
## 7.39 bandwidthUplink (PMR 904)

```
This parameter contains the uplink bandwidth in absolute values (bits per
second).
```
```
Data Type: <string>
```

```
Elements
```
```
Element Value Range: 1 - 4294967295
```
## 7.40 cellIdentifier

```
ThecellIdentifierparameter output the CellGlobal Identity (CGI) or
Service Area Identity (SAI). The cellIdentifier can be sent as an input parameter
through UCIP. If not sent as parameter, cellIdentifier is retrieved from the HLR
using ATI request.
```
```
ThecellIdentifierparameter can also be a return parameter through
UCIP.
```
```
Data Type: <string>
```
```
Table 113 Element Value Range - cellIdentifier
```
```
Element Size Capability ID Element Format
1to19 - Numeric
10 to 19 (PMR 792) CAP:14 CGI/SAI
```
## 7.41 changedAmount1 and changedAmount2

```
ThechangedAmount1 and changedAmount2parameters define changed
values on a main or dedicated account. changedAmount1 indicates a changed
amount in the first currency to be announced and changedAmount2 a changed
amount in the second currency.
```
```
If the unit type is other than money the changedAmount1 contains the amount
of the valid units and changedAmount2 is omitted.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: -9 223 372 036 854 775 807 to 9 223 372 036 854
775 807
```
## 7.42 changedExpiryDate

```
ThechangedExpiryDateparameter contains the number of days the expiry
date for a dedicated account has been changed as a result of the operation.
The value is given in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range:
̄
-65535 to 65535
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.43 changedStartDate

```
ThechangeStartDateparameter contains the number of days the start
date for a dedicated account has been changed as a result of the operation.
The value is given in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range:
̄
-65535 to 65535
```
## 7.44 chargedForIndicator (PC:06214)

```
The chargedForIndicator parameter contains an indication whether fee is
charged for or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 114
```
```
Table 114 Element Value Range - chargedForIndicator
```
```
Value Range Description
0 (false) Not charged for
1 (true) Charged for
```
## 7.45 chargingIndicator

```
ThechargingIndicatorparameter contains an indicator for rating
differentiation.
```
```
Data Type:<int> or <i4>
```
```
Element Value Range: 0 to 65535
```
## 7.46 chargingResultCode

```
ThechargingResultCodeparameter contains information related to a
charged event.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 115.
```
```
Table 115 Element Value Range - chargingResultCode
```
```
Value Range Description
0 or not present Successful
```

```
Elements
```
```
Value Range Description
```
(^1) No charge (free counter stepped)
(^2) No charge (free counter not stepped)

## 7.47 chargingType

```
ThechargingTypeparameter contains information how the request is to be
charged and which mechanism to use.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See table below.
```
```
Table 116 Element Value Range - chargingType
```
```
Value Range Description
1 Check order and make reservation
2 Perform order and make deduction
3 Perform order and commit reservation
4 Rollback reservation
5 Get allowed options
6 Rate and check (reserved for future
use)
```
## 7.48 clearedExpiryDate

```
TheclearedExpiryDateparameter contains the previous expiry date for a
cleared dedicated account.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.49 clearedStartDate

```
TheclearedStartDateparameter contains the previous start date for a
cleared dedicated account.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateBeginningOfTime
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.50 clearedValue1 and clearedValue2

```
TheclearedValue1 and clearedValue2parameters contains units
cleared for the subscriber's dedicated account when the dedicated account is
removed. A dedicated account might for an example be removed at a service
class change, or when the account is deleted.
```
```
1 indicates that the units cleared is in the first currency to be announced and 2
that the units cleared is in the second one.
```
```
If the unit type is other than money the clearedValue1 contains the amount of
the valid units and clearedValue2 is omitted.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: -9 223 372 036 854 775 807 to 9 223 372 036 854
775 807
```
## 7.51 closestAccessibleDate

```
TheclosestAccessibleDateparameter contains the date when the next
sub dedicated account(s) will be accessible. This parameter is only valid for
composite dedicated accounts.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateToday to DateMax
```
## 7.52 closestAccessibleDateTime (PC:10803)

```
TheclosestAccessibleDateTimeparameter contains the date and time
for the product offer instance with the nearest accessible time at the moment.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateToday to DateMax
```
## 7.53 closestAccessibleValue1 and closestAccessibleValue2

```
These parameters states the balance of the sub dedicated account(s) with
the closest start date. This parameter is only valid for composite dedicated
accounts.
```
```
1 indicates the balance of the first currency to be announced and 2 the balance
of the second one.
```

```
Elements
```
```
If the unit type is other than money theclosestAccessibleValue1contains
the sum of the valid units andclosestAccessibleValue2is omitted.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: -9 223 372 036 854 775 807 to 9 223 372 036 854
775 807
```
## 7.54 closestExpiryDate

```
TheclosestExpiryDateparameter contains the date when the next sub
dedicated account(s) will expire, this include both active and inactive sub
dedicated accounts. This parameter is only valid for composite dedicated
accounts.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateToday to DateMax
```
## 7.55 closestExpiryDateTime (PC:10803)

```
TheclosestExpiryDateTimeparameter contains the date and time for the
product offer instance with the nearest expiry time at the moment.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateToday to DateMax or DateInfinite
```
## 7.56 closestExpiryValue1 and closestExpiryValue2

```
These parameters states the balance of the sub dedicated account(s) with
the closest expiry date, this include both active and in active sub dedicated
accounts. This parameter is only valid for composite dedicated accounts.
```
```
1 indicates the balance of the first currency to be announced and 2 the balance
of the second one.
```
```
If the unit type is other than money the closestExpiryValue1 contains the
amount of the valid units and closestExpiryValue2 is omitted.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: -9 223 372 036 854 775 807 to 9 223 372 036 854
775 807
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.57 communityID

```
ThecommunityIDparameter contains identity of the community the subscriber
belong to.
```
```
Data Type: <int> or <i4>
Element Value Range: 1 to 9 999 999
```
## 7.58 compositeDedicatedAccountFlag

```
This flag indicates that a dedicated account is a composite dedicated account.
It is used to identify a composite dedicated account that does not have any
sub dedicated accounts
```
```
Data Type: <boolean>
```
```
Element Value Range: 1
```
## 7.59 cost1 and cost2

```
Thecost1 and cost2parameters contains the cost for an event.
```
```
cost1indicates a cost in the first currency to be announced andcost2a
cost in the second one.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: -999 999 999 999 to 999 999 999 999
```
## 7.60 counterClearingDate

```
ThecounterClearingDateparameter contains a date when a period
counter, for a charged end user communication event, was last reset.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateToday
```
## 7.61 counterID

```
ThecounterIDparameter contains an identifier of the counter used for a
charged end user communication eventinformation related to a charged event.
```
```
Data Type: <int> or <i4>
```

```
Elements
```
```
Element Value Range: See Table 117
```
```
Table 117 counterID value range
```
```
Value Range Element
201 Charged Service Class change
202 Charged FaF addition
203 Charged balance enquiry
```
## 7.62 creditClearanceDate

```
ThecreditClearanceDateparameter contains the date when the credit
clearance period will expire.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateToday to DateMax
```
## 7.63 creditClearancePeriod

```
ThecreditClearancePeriodparameter contains the period until credit
clearance.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 1023
```
## 7.64 currency1 and currency2

```
Thecurrency1 and currency2parameters contains the currencies to
be presented to the end user.
```
```
currency1indicates the first currency to be announced andcurrency2the
second one.
```
```
Data Type: <string>
```
```
Element Format: Currency
```
## 7.65 currentPamPeriod

```
ThecurrentPamPeriodparameter contains the periodic account
management period that is currently used for the subscriber.
```
```
Data Type: <string>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element size: 1 to 30
```
```
Element Value Range: Allowed characters are a-z. A-Z, 0-9, - (hyphen) and /
(slash).
```
## 7.66 currentTimeOffset (PMR1000:1)

```
ThecurrentTimeOffsetparameter indicates whether the default time or
current time should be used in time stamp.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 118
```
```
Table 118 Element Value Range - currentTimeOffset
```
```
Value Range Description
0 (false) Time stamp will not be set (default
value apply if applicable)
1 (true) Time stamp will be set to current
system time
```
7.67 dedicatedAccountActiveValue1 and dedicatedAccou

ntActiveValue2

```
ThededicatedAccountActiveValue1 and dedicatedAccountAc
tiveValue2parameters contains a dedicated account balance that can
be consumed right now. This is not taking in consideration any ongoing
chargeable events. The active value is only valid for composite dedicated
account as they can have resources that becomes accessible later.
dedicatedAccountActiveValue1indicates that the balance is in the first
currency to be announced anddedicatedAccountActiveValue2indicated
that the balance is in the second one.
```
```
If the unit type is other than money thededicatedAccountActiveValue1c
ontains the sum of the valid units anddedicatedAccountActiveValue2is
omitted.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: 0 to 9 223 372 036 854 775 807
```

```
Elements
```
## 7.68 dedicatedAccountID

```
ThededicatedAccountIDparameter contains the identity of the dedicated
account in order to be able to distinguish between the various dedicated
accounts in an array of dedicated accounts.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```
## 7.69 dedicatedAccountIDFirst

```
ThededicatedAccountIDFirstparameter contains the identity of the first
dedicated account in a sequence of dedicated accounts, or the only dedicated
account identity if a single dedicated account shall be obtained.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 to 2147483647
```
## 7.70 dedicatedAccountIDLast

```
ThededicatedAccountIDLastparameter contains the identity of the last
dedicated account in a sequence of dedicated accounts.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 to 2147483647
```
## 7.71 dedicatedAccountRealMoneyFlag (PC:05225)

```
If the dedicated account is used to hold money received from various promotions
or bonuses, thededicatedAccountRealMoneyFlagwill be set to false.
```
```
If the dedicated account is used to hold money that the subscriber
have received through the purchase of, for instance, a voucher then the
dedicatedAccountRealMoneyFlagwill be set to true.
```
```
Dedicated accounts which have thededicatedAccountRealMoneyFlagset
to true, will be summarized in theaggregatedBalanceparameter.
```
```
ThededicatedAccountRealMoneyFlagis only valid in dedicated accounts
where thededicatedAccountUnitTypeparameter has the valueMoney.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 119
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 119 Element Value Range - dedicatedAccountRealMoneyFlag
```
```
Value Range Description
0 (false) The money in the dedicated account
are received from bonus promotions
and so on
1 (true) The money in the dedicated account
are purchased by the subscriber
```
## 7.72 dedicatedAccountUnitType

```
ThededicatedAccountUnitTypeparameter contains the unit of the
dedicated account values and is mandatory if the function "multi unit" is active,
in other case it is optional.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 120
```
```
Table 120 Reserved Values for Indicating Unit of a Dedicated Account.
```
```
Value Range Description
0 The account contains time.
1 The account contains money.
2 The account contains total octets
(Not used, reserved for future use).
3 The account contains input octets
(Not used, reserved for future use).
4 The account contains output octets
(Not used, reserved for future use).
```
(^5) The account contains service specific
units.
6 The account contains volume.

## 7.73 dedicatedAccountValue1 and dedicatedAccountValue2

```
ThededicatedAccountValue1anddedicatedAccountValue2para
meters contain the total balance of the dedicated account, this includes
all currently active and not yet active balances of the dedicated account if
applicable. This is not taking in consideration any ongoing chargeable events.
dedicatedAccountValue1indicates that the balance is in the first currency
to be announced anddedicatedAccountValue2indicated that the balance
is in the second one.
```

```
Elements
```
```
If the unit type is not money thededicatedAccountValue1contains the sum
of the valid units anddedicatedAccountValue2is omitted.
```
```
WhendedicatedAccountUnitTypeis Money, the parameter can contain
both an integer part and a decimal part. There is no decimal separator, the
decimal part is given directly to the right of the integer part. The number of
digits in the decimal part is configured in the currency configuration. The integer
part range is: 0-9223372036854. The decimal part can consist of 0 to 6 digits,
that is maximum value is 999999. If the maximum value of the integer part is
reached the maximum decimal part is 775807.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: 0 to 9 223 372 036 854 775 807
```
## 7.74 dedicatedAccountValueNew

```
ThededicatedAccountValueNewparameter contains value to assign to a
dedicated account. This is not taking in consideration any ongoing chargeable
events.
```
```
WhendedicatedAccountUnitTypeis Money the parameter can contain
both an integer part and a decimal part. There is no decimal separator, the
decimal part is given directly to the right of the integer part. The number of
digits in the decimal part is configured in the currency configuration. The integer
part range is: 0-9223372036854. The decimal part can consist of 0 to 6 digits,
that is maximum value is 999999. If the maximum value of the integer part is
reached the maximum decimal part is 775807.
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: 0 to 9 223 372 036 854 775 807
```
## 7.75 deferredToDate

```
ThedeferredToDateparameter contains the deferred to date for the Periodic
Account Management service.
```
```
IfdeferredToDateis set in the past in a request, the deferred to date will
be removed.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.76 discountID (PMR792)

```
ThediscountIDcontains the identifier of the service to be returned in the
response.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 - 65535
```
## 7.77 discountValue(PMR792)

```
ThediscountValuecontains the discount percentage.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 - 100
```
## 7.78 enableFafMNPFlag

```
TheenableFafMNPFlagis sent if the check of FaF number towards NPDB
should be performed. This flag applies only when fafAction is ADD.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 121
```
```
Table 121 Element Value Range - enableFafMNPFlag
```
```
Value Range Description
0 (false) No check of FaF number towards NPDB
will be performed.
1 (true) Check of FaF number towards NPDB will
be performed
```
## 7.79 exactMatch

```
The exactMatch parameter indicating if the faf number should be matched
partial or exact. If the parameter is not present the default behavior is to match
partial.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 122
```

```
Elements
```
```
Table 122 Element Value Range - exactMatch
```
```
Value Range Description
0 (default) Match faf number partially
1 Match faf number exactly
```
## 7.80 expiryDate

```
TheexpiryDateparameter contains the expiry date for a dedicated account.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.81 expiryDateCurrent

```
TheexpiryDateCurrentparameter contains the current expiry date for a
dedicated account. The parameter may also be used to define expiry date for
other entities depending on the context where it is used. Used for validation.
No validation is performed if omitted.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.82 expiryDateExtended

```
TheexpiryDateExtendedparameter contains number of days the
expiry date for a dedicated account has been extended as a result of the
refillValueTotal and refillValuePromotion. The part is given in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 65535
```
```
Table 123 Element Value - expiryDateExtended
```
```
Description Value
Expiry date has not been changed.
ExpiryDateExtended is not sent.
```
```
not present
```
```
Expiry date shortered.
ExpiryDateExtended is not sent.
```
```
not present
```
```
Expiry date has been changed to no
expiry date.
```
### 0

```
Expiry date has been extended. 1 - 65535
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.83 expiryDateRelative (PC:05114)

```
TheexpiryDateRelativeparameter is used to make a relative adjustment
to an expiry date. The adjustment can be positive or negative. It is expressed
in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -999 to -1 and 1 to 999
```
## 7.84 expiryDateTime

```
TheexpiryDateTimeparameter contains the expiry date and time.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.85 expiryDateTimeRelative

```
TheexpiryDateTimeRelativeparameter is used to make a relative
adjustment to the current expiry date and time. The adjustment can be positive
or negative. It is expressed in number of seconds. The parameter may also be
used to define expiry date and time for other entities depending on the context
where it is used.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -99999999 to 99999999
```
## 7.86 expiryPamPeriodIndicator

```
TheexpiryPamPeriodIndicatorparameter indicates the Periodic Account
Management period when the offer or DA becomes invalid. (PMR1000:1 start)
When the offer has the capability of storing date and time the time stamp will be
set to 00:00:00 or 23:59:59 depending on system configuration. (PMR1000:1
end)
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 to 100 or 2147483647 where 2147483647 means
no expiry.
```
## 7.87 externalContract

```
TheexternalContractparameter is used to indicate if the account resides
in Charging Compound or in an external system in a convergent solution.
```

```
Elements
```
```
Data Type: <boolean>
```
```
Table 124 Element Value Range - externalContract
```
```
Value Range Description
0 (false) Not an external contract, that is,
the account resides in Charging
Compound
1 (true) An external contract, the account
resides outside Charging Compound.
```
7.88 externalData1, externalData2, externalData3 and

externalData4

```
These parameters are used as a spare parameter for customizations to include
in data records.
```
```
Data Type: <string>
```
```
Element Size: 1 to 128
```
## 7.89 fafAction

```
ThefafActionparameter contains the requested action for changing the
Family and Friends list.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 125
```
```
Table 125 Element Value Range - fafAction
```
```
Value Range Description
ADD Add entry to the FaF list.
SET Update elements in an entry in the
FaF list.
```
```
(1)
```
```
DELETE Delete entry in the FaF list.
(1) Does not change the fafNumber.
```
## 7.90 fafChangeUnbarDate

```
ThefafChangeUnbarDateparameter contains the date when a family and
friends change is allowed again. If sent, a family and friends change (addition
or deletion) is not allowed.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateTomorrow to DateMax
```
## 7.91 fafChargingNotAllowedFlag

```
ThefafChargingNotAllowedFlagparameter is used to indicate that
charged Family and Friends (FaF) administration is not allowed for the current
service class
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 126
```
```
Table 126 Element Value Range - fafChargingNotAllowedFlag
```
```
Value Range Description
0 (false) (default value) Charged FaF administration is
allowed for service class
1 (true) Charged FaF administration is not
allowed for service class
```
## 7.92 fafIndicator

```
ThefafIndicatorparameter is used for differentiated rating for traffic events
to and from numbers in the Family and Friends (FaF) number list.
```
```
Data Type: (PC:06653 array of) <int> or <i4>
```
```
Element Value Range: 1 to 65535
```
## 7.93 fafMaxAllowedNumbersReachedFlag

```
ThefafMaxAllowedNumbersReachedFlagis a flag indicating that it's not
allowed to add more FaF numbers to the FaF-list for this subscriber.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 127
```

```
Elements
```
```
Table 127 Element Value Range - fafMaxAllowedNumbersReachedFlag
```
```
Value Range Description
0 (false) (default value) Maximum number of allowed FaF
numbers is not reached
1 (true) Maximum number of allowed FaF
numbers is reached.
```
7.94 fafNumber

```
ThefafNumberparameter contains a Family and Friends number.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 1 to 81
```
## 7.95 faultCode

```
ThefaultCodeparameter is used to signify that a request failed due to illegal
request data or internal processing errors. This does not cover business level
logic faults, which instead are covered in the responseCode parameter, see
Section 7.173 on page 176.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 128.
```
```
Table 128 Element Value Range - faultCode
```
```
faultCode Description
1000 Illegal request message
1001 Mandatory field missing
1002 Illegal data type
1003 Data out of bounds
1004 Unknown operation
1005 Internal server error
1006 This fault code is reserved for future use
1007 Overload rejection
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.96 faultString

```
ThefaultStringparameter is used describe the reason why the request
failed due to illegal request data or internal processing errors. It is used together
with the faultCode parameter, see Section 7.95 on page 151.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
## 7.97 firstIVRCallDoneFlag

```
ThefirstIVRCallDoneFlagis sent to indicate that the first IVR call has
been done. The element is only included if it is set to 1 (true).
```
```
Data Type:<boolean>
```
```
Element Value Range: See Table 129.
```
```
Table 129 Element Value Range - firstIVRCallDoneFlag
```
```
Value Range Description
1 (true) First IVR call has been done.
```
## 7.98 firstIVRCallFlag

```
ThefirstIVRCallFlagflag is sent to inform the client that the current IVR
session is the first IVR call. The element is only included if it is set to 1 (true).
```
```
Data Type:<boolean>
```
```
Element Value Range: See Table 130
```
```
Table 130 Element Value Range - firstIVRCallFlag
```
```
Value Range Description
1 (true) The current IVR session is the first
IVR call.
```
## 7.99 firstIVRCallSetFlag

```
ThefirstIVRCallSetFlagis used to indicate if the first IVR call done flag
shall be set or not.
```
```
Data Type:<boolean>
```
```
Element Value Range: See Table 131
```

```
Elements
```
```
Table 131 Element Value Range - firstIVRCallSetFlag
```
```
Value Range Description
0 (false) Do not set first IVR call done flag.
1 (true) Set first IVR call done flag.
```
## 7.100 languageIDCurrent

```
ThelanguageIDCurrentparameter contains the subscriber's preferred
language.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 132
```
```
Table 132 Element Value Range - languageIDCurrent
```
```
Value Range Elements
```
(^1) Operator specific language 1
(^2) Operator specific language 2
(^3) Operator specific language 3
(^4) Operator specific language 4

## 7.101 languageIDNew

```
ThelanguageIDNewparameter contains the subscriber's new preferred
language.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 133
```
```
Table 133 Element Value Range - languageIDNew
```
```
Value Range Element
1 Operator specific language 1
2 Operator specific language 2
```
(^3) Operator specific language 3
(^4) Operator specific language 4


```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.102 lastEvaluationDate

```
ThelastEvaluationDateparameter contains the date of the last periodic
account management evaluation.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax
```
## 7.103 locationNumber

```
ThelocationNumberparameter contains the location of the subscriber. The
default numbering format in the parameter is the same numbering format that is
used for subscriber numbers in the Account Database. If an another format is
used then it must be indicated by ‘‘Location Number NAI’’
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 1 to 20
```
## 7.104 locationNumberNAI

```
ThelocationNumberNAI(Nature of Address Indicator) parameter identifies
the format of the ‘‘location Number’’.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 171
```
## 7.105 mainAccountValueNew (PC:05163)

```
ThemainAccountValueNewparameter contains a value to assign to a main
account. This is not taking in consideration any ongoing chargeable events.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.106 masterAccountNumber

```
ThemasterAccountNumberparameter contains the subscriber identity of the
master subscriber in a multi user account. The format of the parameter is the
```

```
Elements
```
```
same numbering format as used by the account database, this also includes
support of leading zeros.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 1 to 28
```
## 7.107 masterSubscriberFlag

```
ThemasterSubscriberFlagflag is sent to indicate that the user is the
master subscriber of the account.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 134
```
```
Table 134 Element Value Range - masterSubscriberFlag
```
```
Value Range Description
1 (true) The user is the master subscriber of the
account.
```
## 7.108 maxServiceFeePeriod

```
ThemaxServiceFeePeriodparameter contains the maximum allowed
duration of the service fee period in number of days until the period expires.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0-32767
```
## 7.109 maxSupervisionPeriod

```
ThemaxSupervisionPeriodparameter contains the maximum allowed
duration of the supervision period in number of days until the period expires.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0-32767
```
## 7.110 negativeBalanceBarringDate

```
ThenegativeBalalanceBarringDateparameter contains the date when a
subscriber is scheduled to be barred, or was barred, due to negative balance.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax
```
## 7.111 negativeBarringStatusFlag

```
This parameter is used to indicate if an account is barred due to negative
balance or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 135
```
```
Table 135 Element Value Range - negativeBarringStatusFlag
```
```
Value Range Description
0 (false) (default value) Account is not barred due to negative
balance
1 (true) Account is barred due to negative
balance
```
## 7.112 negotiatedCapabilities

```
The negotiatedCapabilities parameter is used to indicate the negotiated
capabilities between the client and server node. The capabilities are presented
as a series of elements, where each element contains an integer value between
0 and 2147483647. The value 0 indicates that none of the capabilities in
the element are active, and the value 2147483647 indicates that all of the
capabilities in the element are active. See Section 9 on page 217 for the
supported capabilities.
```
```
Data Type: array of <int> or <i4>
```
```
Element Value Range: 0 to 2147483647
```
## 7.113 newExpiryDate

```
ThenewExpiryDateparameter contains the new expiry date for a dedicated
account.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```

```
Elements
```
## 7.114 newStartDate

```
ThenewStartDateparameter contains the new start date for a dedicated
account.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateBeginningOfTime
```
## 7.115 notAllowedReason (PC:05114)

```
ThenotAllowedReasonparameter contains the reason why a request
was not allowed. The meaning of the actual values are configurable with
recommended values as listed below.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 136
```
```
Table 136 Element Value Range - notAllowedReason
```
```
Value Range Description
```
(^1) Wrong number format (for example:
number not starting with xxxx).
(^2) Wrong number of digits.
3 Number part of black list.
4 Too many changes already performed
for this period.
5 On total maximum of allowed FaF
numbers.
6 On maximum of allowed FaF
numbers for this number type.
7 FaF number already exist.
8 Service Class change not allowed.
9 Offer for FaF number not allowed in
destination Service Class.
10 FaF indicator not allowed in Service
Class.

## 7.116 numberOfDecimals (PMR939:1 US19)

```
ThenumberOfDecimalsparameter forms together withattributeValue
Numbera decimal number.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
ThenumberOfDecimalscontains information about where to put the decimal
sign counted in positions from the right.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 15
```
## 7.117 offerID

```
TheofferIDparameter contains the identity of an offer.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```
## 7.118 offerIDFirst

```
TheofferIDFirstparameter contains the identity of the first offer in a
sequence of offers, or the only offer identity if a single offer shall be obtained.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```
## 7.119 offerIDLast

```
TheofferIDLastparameter contains the identity of the last offer in a
sequence of offers, or the only offer identity if a single offer shall be obtained.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```
## 7.120 offerProviderID

```
TheofferProviderIDparameter contains the subscriber number as
represented in the SDP database for the provider.
```
```
This parameter is connected to a provider account offer.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 1 to 28
```

```
Elements
```
## 7.121 offerRequestedTypeFlag

```
TheofferRequestedTypeFlagparameter specifies the type or types of
offers to return in a GetOffers request. If omitted, only Account offers are
returned.
```
```
Example string: For '10xxxxxx' digit 1 is set and for '01xxxxxx' digit 2 is set.
```
```
Data Type: <string>
```
```
Element format: Numeric
```
```
Element value range: Must be 8 digits See Table 137
```
```
Table 137 Element value range - offerRequestedTypeFlag
```
```
Digit Number Description
1 Account
```
```
0 = Do not return Account offers
```
```
1 = Return Account offers
2 Multi User Identification
```
```
0 = Do not return Multi User Identification offers
```
```
1 = Return Multi User Identification offers
```
(^3) Timer
0 = Do not return high resolution offers for Timer
charging
1 = Return high resolution offers for Timer charging
(^4) Provider Account
0 = Do not return Provider Account offers
1 = Return Provider Account offers
5 Shared Account
0 = Do not return Shared Account offers
1 = Return Shared Account offers
6-8 For future use

## 7.122 offerState

```
TheofferStateparameter specifies the actual offer state to return in a
GetOfferrequest.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <int> or <i4>
```
```
Element Size: 0 to 99
```
```
Element Value Range:
```
```
Table 138 Element Value Range - offerState
```
```
Value Range Description
```
(^0) Enabled offer state
1 Disabled offer state
2-99 Reserved for future use

## 7.123 offerType

```
TheofferTypeparameter identifies the offer type.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 0 to 7
```
```
Element Value Range:
```
```
Table 139 Element Value Range - offerType
```
```
Value Range Description
0 Account Offer (default value for responses)
1 Multi User Identification Offer
2 Timer
3 Provider Account Offer
4 Shared Account Offer
5-7 For future use
```
## 7.124 originHostName

```
TheoriginHostNameparameter contains an identifier string for the host
where the operation originated from. The host name shall be unique within the
network for a given network element type.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 to 255
```

```
Elements
```
## 7.125 originNodeType

```
TheoriginNodeTypeparameter contains the origin node type that is set by
AIR or provided by an external network element. It contains the type of the
logical node from where the operation originated. External network elements
are not allowed to use the reserved names on network element types, (except
EXT).
```
```
Data Type: <string>
```
```
Element Size: 1 to 8
```
```
Element Format: Alphanumeric
```
```
Element Value Range: See Table 140
```
```
Table 140 Element Value Range - originNodeType
```
```
Network Element
type
```
```
Description
```
```
EXT External system
AIR Account information and refill
ADM Administrative system
UGW USSD gateway
IVR Interactive voice response system
OGW On-line gateway
SDP Service data point
```
```
Note: These names on network element types, (except EXT) are not allowed
for settings from an external network element.
```
## 7.126 originOperatorID

```
TheoriginOperatorIDparameter is the identity of the system user or the
session from where the operation was initiated. It might be used for security
management or logging purposes for an example.
```
```
Data Type: <string>
```
```
Element Size: 1 to 255
```
```
Element Format: Alphanumeric
```
## 7.127 originTimeStamp

```
TheoriginTimeStampparameter contains the date and time of sending the
request by the entity that initiated the operation.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: See Table 184
```
## 7.128 originTransactionID

```
TheoriginTransactionIDparameter reference to a single operation,
generated by the system it was initiated from.
```
```
Note: Each operation must have a unique value
```
```
The value in theoriginTransactionIDparameter must be unique per
operation and can be a sequence number. An operation in this case is for
example a refill.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Value Range: 0 to 9999 9999 9999 9999 9999
```
## 7.129 owner

```
Thisownerparameter is used to indicate if the data is attached to the account
or subscriber.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 141.
```
```
Table 141 Element Value Range - owner
```
```
Value Range Description
Subscriber The data is attached to a subscriber
Account The data is attached to an Account.
```
## 7.130 pamClassID

```
ThepamClassIDparameter specifies the periodic account management class
used by the periodic account management service.
```
```
Data Type: <int> or <i4>
```
```
Element size: 0 to 9999
```

```
Elements
```
## 7.131 pamServiceID

```
ThepamServiceIDparameter specifies the id of the periodic account
management service.
```
```
Data Type: <int> or <i4>
```
```
Element size: 0 to 99
```
## 7.132 pamServicePriority

```
ThepamServicePriorityparameter indicates the priority between PAM
services at PAM evaluation. Lower value gives higher priority.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 65535
```
## 7.133 pamServicePriorityNew

```
ThepamServicePriorityNewparameter indicates the new priority between
PAM services at PAM evaluation, if priority is updated.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 65535
```
## 7.134 pamServicePriorityOld

```
ThepamServicePriorityOldparameter indicates the old priority between
PAM services at PAM evaluation, if priority is updated.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 65535
```
## 7.135 periodCounterValue

```
TheperiodCounterValueparameter contains the value of period counter
used for charged end user communication events.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 127
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.136 pinCode

```
ThepinCodeparameter contains the pin code for the subscriber.
```
```
Data Type: <string>
```
```
Element size: 1 to 8
```
```
Element Format: Numeric
```
```
Element Value Range: 0 to 99999999
```
## 7.137 pinCodeOriginal

```
ThepinCodeOriginalparameter contains the pin code the subscriber
currently has assigned to the account.
```
```
Data Type: <string>
```
```
Element size: 1 to 8
```
```
Element Format: Numeric
```
```
Element Value Range: 0 to 99999999
```
## 7.138 pinCodeValidationFlag

```
ThepinCodeValidationFlagparameter indicate whether the old (original)
PIN code should be validated first before assigning a new PIN code.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 142.
```
```
Table 142 Element Value Range - pinCodeValidationFlag
```
```
Value Description
0 (false) (default value) Do not validate original PIN code
1 (true) Validate original PIN code
```
## 7.139 productID

```
TheproductIDparameter contains the identity of a product.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 143
```

```
Elements
```
```
Table 143 Element Value Range - productID
```
```
Value Description
0 Zero can only be received in a response where it
indicates that a personal usage threshold value
exists for the usage counter and there may exist
zero or more additional product local usage
counters which have not been used yet.
1 - 2147483647 The identity of the product.
```
## 7.140 progressionRefillCounter

```
TheprogressionRefillCounterparameter contains the value of the
accumulated number of refills for promotion plan progression.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 255
```
## 7.141 progressionRefillValue1 and progressionRefillValue2

```
TheprogressionRefillValue1 and progressionRefillValue2para
meters specifies the accumulated value of refills for promotion plan progression.
progressionRefillValue1indicates a value in the first currency to be
announced andprogressionRefillValue2a value in the second currency.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.142 promotionAnnouncementCode

```
ThepromotionAnnouncementCodeparameter identifies the promotional
code for the announcement to be played. The message in question is
applicable for refill promotions.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 99
```
## 7.143 promotionEndDate

```
ThepromotionEndDateparameter specifies the end date of the associated
promotion plan.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <dateTime.iso8601>
```
```
Element value range: See Table 184.
```
## 7.144 promotionNotificationFlag

```
ThepromotionNotificationFlagparameter is used to indicate if the
promotion notification code shall be cleared or not after delivery in response.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 144
```
```
Table 144 Element Value Range - promotionNotificationFlag
```
```
Value Range Description
0 (false) (default value) Promotion notification code will not be
cleared after delivery in response.
1 (true) Promotion notification code will be
cleared after delivery in response.
```
## 7.145 promotionPlanID

```
ThepromotionPlanIDparameter contains the identity of one of the current
promotion plans of a subscriber.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 to 4
```
## 7.146 promotionPlanProgressed

```
ThepromotionPlanProgressedparameter indicate if the result of the refill
was a progression of promotion plan.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 145.
```
```
Table 145 Element Value Range - promotionPlanProgressed
```
```
Value Range Description
0 (false) (default value) No progress
1 (true) Progression of promotion
```

```
Elements
```
7.147 promotionRefillAccumulatedValue1 and

promotionRefillAccumulatedValue2

```
ThepromotionRefillAccumulatedValue1 and promotionRefil
lAccumulatedValue2parameters specifies the accumulated value of
account refills made within the current promotion plan of a subscriber.
promotionRefillAccumulatedValue1indicates a value in the first
currency to be announced andpromotionRefillAccumulatedValue2a
value in the second currency.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.148 promotionRefillCounter

```
ThepromotionRefillCounterparameter contains the accumulated
number of account refills within the current promotion plan of a subscriber.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 255
```
## 7.149 promotionStartDate

```
ThepromotionStartDateparameter specifies the start date of the
associated promotion plan.
```
```
Data Type: <dateTime.iso8601>
```
```
Element value range: See Table 184.
```
## 7.150 refillAmount1 and refillAmount2

```
TherefillAmount1 and refillAmount2parameters contains refill value
towards the main account.refillAmount1indicates a refill amount in the
first currency to be announced andrefillAmount2a refill amount in the
second one.
```
```
If the unit type is other than money therefillAmount1contains the amount
of the valid units andrefillAmount2is omitted.
```
```
Data Type: <string>
```
```
Element Format: Unit
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Value Range: 0 to 9 223 372 036 854 775 807
```
## 7.151 refillFraudCount

```
TherefillFraudCountparameter, when sent in the Refill response,
shall contain the number of fraudulent refill attempts left, before the account
becomes barred from refill.
```
```
(PC:12475) TherefillFraudCountparameter, when sent in the
GetAccountDetails response, shall contain the number of fraudulent refill
attempts made by the account. (PC:12475)
```
```
Note: The refillFraudCount parameter shall only be returned in the
GetAccountDetails response when PC:12475 is active. Also the
information sent in the refillFraudCount parameter shall differ for the
standard Refill response and for the GetAccountDetails response
(PC:12475) as mentioned in the description above.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 255
```
## 7.152 refillOptions

```
ThisrefillOptionsparameter contains the value of a refill option.
```
```
Note: The refillOptions can be repeated several times for GetRefillOptions
Response.
```
```
Data Type: array of <int> or <i4>
```
```
Element Value Range: 1 to 999
```
## 7.153 refillProfileID

```
TherefillProfileIDparameter contains a refill profile that will be
converted into a segmentation identity by the AIR server.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 to 4
```

```
Elements
```
## 7.154 refillType

```
TherefillTypeparameter specifies the kind of refill, it is part of both the refill
request and refill response.
```
```
Data Type: <int> or <i4>
```
```
TherefillTypeparameter in a request specifies the wanted type of refill; this
parameter can be validated or ignored depending of the configuration.
```
```
Table 146 Element Value Range - refillType in request
```
```
Value Range Description
```
(^1) Value Refill
(^2) Account Refill
(^3) Premium Refill
4-99 Reserved for future use
100-999 Operator defined
TherefillTypeparameter in a response specifies the refill type that was
actually executed.
_Table 147 Element Value Range - refillType in response_
**Value Range Description**
0 Undefined
1 Value Refill
2 Account Refill
3 Premium Refill
4-99 Reserved for future use
100-999 Operator defined

## 7.155 refillUnbarDateTime

```
TherefillUnbarDateTimeparameter specifies the date and time when a
refill barred subscriber is unbarred and is allowed to do a new refill.
```
```
Data Type: <dateTime.iso8601>
```
```
Element value range: See Table 184.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.156 requestActiveOffersFlag (PMR 1008)

```
TherequestActiveOffersFlagparameter is used to indicate the state of
the offers that should be included in a response.
```
```
Data Type: <boolean>
```
```
Table 148 Element Value Range - requestActiveOffersFlag
```
```
Value Range Description
0 (false) (default value) The response will contain the active
as well as the inactive (or disabled)
offers for the subscriber.
1 (true) The response will not contain the
inactive (or disabled) offers for the
subscriber. Only active offers will be
returned
```
7.157 requestAggregatedProductOfferInformationFlag

(PC:10803)

```
TherequestAggregatedProductOfferInformationFlagparameter is
used to indicate that aggregated offer information should be included in the
response.
```
```
Data Type: <boolean>
```
```
Table 149 Element Value Range - requestAggregatedProductOfferInformati
onFlag
```
```
Value Range Description
0 (false) (default value) The response will not include
aggregated offer information.
1 (true) The response will include aggregated
offer information.
```
## 7.158 requestDedicatedAccountDetailsFlag

```
TherequestDedicatedAccountDetailsFlagparameter is
used to indicate the requested detail level of the content in the
dedicatedAccountInformation.
```
```
Data Type: <boolean>
```

```
Elements
```
```
Table 150 Element Value Range - requestDedicatedAccountDetailsFlag
```
```
Value Range Description
0 (false) (default value) The response will not include the
associateddedicatedAccountInf
ormationstructs.
1 (true) The response will include the
associateddedicatedAccountInf
ormationstructs.
```
## 7.159 requestFafDetailsFlag (PC:05114)

```
TherequestFafDetailsFlagparameter is used to indicate that FaF details
should be included in the response.
```
```
Data Type: <boolean>
```
```
Table 151 Element Value Range - requestFafDetailsFlag
```
```
Value Range Description
0 (false) (default value) The response will not contain FaF
details.
1 (true) The response will contain FaF details.
```
## 7.160 requestFirstAccessibleAndExpiredBalanceAndDateFlag

```
TherequestFirstAccessibleAndExpiredBalanceAndDateFlagp
arameter is used to indicate the requested detail level of the content in the
dedicatedAccountInformation.
```
```
Data Type: <boolean>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 152 Element Value Range - requestFirstAccessibleAndExpiredBal
anceAndDateFlag
```
```
Value Description
0 (false) (default value) The response will not include the
associated closestExpiryDate,
closestExpiryValue1, closestExpi
ryValue2, closestAccessibleDate,
closestAccessibleValue1,closestAcc
essibleValue2.
1 (true) The response will include the
associated closestExpiryDate,
closestExpiryValue1, closestExpi
ryValue2, closestAccessibleDate,
closestAccessibleValue1,closestAcc
essibleValue2.
```
## 7.161 requestInactiveOffersFlag

```
TherequestInactiveOffersFlagparameter is used to indicate the state
of the offers that should be included in a response.
```
```
Data Type: <boolean>
```
```
Table 153 Element Value Range - requestInactiveOffersFlag
```
```
Value Range Description
0 (false) (default value) The response will not contain the
inactive (or disabled) offers for the
subscriber. Only active offers will be
returned
1 (true) The response will contain all offers
for the subscriber (including expired
offers within their removal protection
period).
```
## 7.162 requestLocationInformationFlag

```
TherequestLocationInformationFlagparameter is used to retrieve
location information.
```
```
Data Type: <boolean>
```

```
Elements
```
```
Table 154 Element Value Range - requestLocationInformationFlag
```
```
Value
Range
```
```
Description
```
```
0 (false)
(default
value)
```
```
Do not return.
```
```
1 (true) Return.
```
## 7.163 requestMasterAccountBalanceFlag

```
TherequestMasterAccountBalanceFlagparameter is used to indicate
if thecurrency1,accountValue1,aggregatedBalance1,currency2,
accountvalue2andaggregatedBalance2parameters shall be returned or
not.
```
```
Data Type: <boolean>
```
```
Table 155 Element Value Range - requestMasterAccountBalanceFlag
```
```
Value
Range
```
```
Description
```
```
0 (false)
(default
value)
```
```
Do not return.
```
```
1 (true) Return.
```
## 7.164 requestPamInformationFlag

```
TherequestPamInformationFlagparameter is a flag sent to indicate if
periodic account management information is to be included in the response.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 156
```
```
Table 156 Element Value Range - requestPamInformationFlag
```
```
Value Description
1 (true) Periodic Account Management information is to
be included in the response, if existing.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
7.165 requestAttributesFlag (PMR939:1 US1)

```
TherequestAttributesFlagparameter is used to indicate if the attribute
stored for the offer is to be included in a response.
```
```
Data Type: <boolean>
```
```
Table 157 Element Value Range - requestAttributesFlag
```
```
Value Range Description
0 (false) (default value) The response will not contain
attributes.
1 (true) The response will contain attributes,
if existing.
```
## 7.166 requestRefillAccountAfterFlag

```
TherequestRefillAccountAfterFlagparameter contains which optional
information that is requested.
```
```
Data Type: <boolean>
```
```
Table 158 Element Value Range - requestRefillAccountAfterFlag
```
```
Value Description
0 (false) Request account details after refill is not applied.
1 (true) Request account details after refill is applied (as described in
(1)
)
(1) Structured data, see Section 6.25.1 on page 76.
```
## 7.167 requestRefillAccountBeforeFlag

```
TherequestRefillAccountBeforeFlagparameter contains which
optional information that is requested.
```
```
Data Type: <boolean>
```
```
Table 159 Element Value Range - requestRefillAccountBeforeFlag
```
```
Value Description
0 (false) Request account details before refill is not applied.
1 (true) Request account details before refill is applied (as described
in
(1)
)
(1) Structured data, see Section 6.25.1 on page 76.
```

```
Elements
```
## 7.168 requestRefillDetailsFlag

```
TherequestRefillDetailsFlagparameter contains which optional
information that is requested.
```
```
Data Type: <boolean>
```
```
Table 160 Element Value Range - requestRefillDetailsFlag
```
```
Value Description
0 (false) Request refill information is not applied
1 (true) Request refill information is applied (as described in
(1)
)
(1) Structured data, see Section 6.25.36 on page 110.
```
## 7.169 requestSubDedicatedAccountDetailsFlag

```
TherequestSubDedicatedAccountDetailsFlagparameter
is used to indicate the requested detail level of the content in the
dedicatedAccountInformation.
```
```
Data Type: <boolean>
```
```
Table 161 Element Value Range - requestSubDedicatedAccountDetailsFlag
```
```
Value Description
0 (false) (default value) The response will not
include the associated
subDedicatedAccountInformation
structs.
1 (true) The response will include the associa
ted subDedicatedAccountInformation
structs.
```
## 7.170 requestUsageCountersAndThresholdsFlag

```
TherequestUsageCountersAndThresholdsFlagparameter is used to
indicate the requested detail level of the content in theofferInformation.
```
```
Data Type: <boolean>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Table 162 Element Value Range - requestUsageCountersAndThresholdsFlag
```
```
Value Description
0 (false) (default value) The response will not include the
associated offerInformation structs.
1 (true) The response will include the
associated offerInformation structs.
```
## 7.171 requestedOwner

```
TherequestedOwnerparameter is a flag sent to indicate if the data is
attached to the account or subscriber.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 163
```
```
Table 163 Element Value Range - requestedOwner
```
```
Value Range Description
```
(^1) Subscriber
(^2) Account
(^3) Subscriber and account

## 7.172 reservationCorrelationID

```
ThereservationCorrelationIDparameter contains the id needed to
correlate a reservation.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 2147483647
```
## 7.173 responseCode

```
TheresponseCodeparameter is sent back after a message has been
processed and indicates success or failure of the message.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 164
```

```
Elements
```
_Table 164 Element Value Range - responseCode_

```
Value
range
```
```
Capability ID Description
```
```
0 - Successful
1 - Ok but supervision period
exceeded
2 - Ok but service fee period
exceeded
100 - Other Error
101 - Not used
102 - Subscriber not found
103 - Account barred from refill
104 - Temporary blocked
105 - Dedicated account not allowed
106 - Dedicated account negative
107 - Voucher status used by same
108 - Voucher status used by different
109 - Voucher status unavailable
110 - Voucher status expired
111 - Voucher status stolen or missing
112 - Voucher status damaged
113 - Voucher status pending
114 - Voucher type not accepted
115 - Refill not accepted
117 - Service class change not allowed
119 - Invalid voucher activation code
120 - Invalid refill profile
121 - Supervision period too long
122 - Service fee period too long
123 - Max credit limit exceeded
124 - Below minimum balance
126 - Account not active
127 - Accumulator not available
128 - Invalid PIN code
129 - Faf number does not exist
```

AIR Programmer's Guide UCIP Version 5.0

```
Value
range
```
```
Capability ID Description
```
```
130 - Faf number not allowed, (see
notAllowedReason for further
information)
133 - Service class list empty
134 - Accumulator overflow
135 - Accumulator underflow
136 - Date adjustment error
137 - Get balance and date not allowed
138 - No PIN code registered
139 - Dedicated account not defined
140 - Invalid old Service Class
141 - Invalid language
142 - Subscriber already installed
143 - Invalid master subscriber
144 - Subscriber already activated
145 - Already linked subordinate
146 - Already linked as master
147 - Invalid old community list
148 - Invalid new community list
149 - Invalid promotion plan end date
150 - Invalid promotion plan. The
promotion plan allocation was
invalid.
151 - Promotion plan not found
152 - Deblocking of expired account
153 - Dedicated account max credit
limit exceeded
154 - Invalid old SC date
155 - Invalid new service class
156 - Delete subscriber failed due
to for example references to
consumers exist at the provider.
157 - Invalid account home region
158 - Not used
```

```
Elements
```
**Value
range**

```
Capability ID Description
```
159 - Charged FaF not active for
service class

160 - Operation not allowed from
current location

161 - Failed to get location information

163 - Invalid dedicated account period

164 - Invalid dedicated account start
date

165 - Offer not found

166 - Not used

167 - Invalid unit type

168 - Not used

176
(PC:0
6479)

- Refill denied, First IVR call not
    made

### 177

### (PC:0

### 6479)

- Refill denied, Account not active

### 178

### (PC:0

### 6479)

- Refill denied, Service fee period
    expired

### 179

### (PC:0

### 6479)

- Refill denied, Supervision period
    expired

190 - The PAM service id provided in
the request already exist

191 - The PAM service id provided in
the request was out of range, or
did not exist

192 - The old PAM class id provided in
the request was incorrect or did
not match the existing PAM class
id for the account

193 - The PAM class id or new PAM
class id provided in the request
was incorrect


AIR Programmer's Guide UCIP Version 5.0

```
Value
range
```
```
Capability ID Description
```
```
194 - The old schedule id provided in
the request was incorrect or did
not match the existing schedule
id for the account
195 - The schedule id or new schedule
id provided in the request was
incorrect
196 - Invalid deferred to date
197 - Periodic account management
evaluation failed
198 - Too many PAM services given in
the sequence or the number of
services on the account would
be exceeded
199 - The PAM period, provided or
calculated, could not be found in
the schedule
200 - The PAM class id or new PAM
class id provided in the request
does not exist
201 - The schedule id or new schedule
id provided in the request did not
exist or no valid period found
202 - Invalid PAM indicator
203 - Subscriber installed but marked
for deletion
204 - Inconsistency between given
current value and Account
Database state
205
(PC:0
6653)
```
- Max number of FaF indicators
    exceeded

### 206

### (PC:0

### 6653)

- FaF indicator already exists

```
207 - Invalid accumulator end date
208 - Invalid accumulator service class
209 - Invalid dedicated account expiry
date
```

```
Elements
```
**Value
range**

```
Capability ID Description
```
210 - Invalid dedicated account service
class

211 - Delete dedicated account failed

212 - Crop of composite dedicated
account not allowed

213 - Sub dedicated account not
defined

214 - One or several of the provided
offers are not defined or there is
a mismatch between provided
offer type and the offer type
definition. Also used in case the
offer type is not supported for the
requested update.

215 - Too many offers of the type
Multi User Identification given in
the sequence or the Multi User
Identification offer is already
activated for the subscriber.

216 - Usage threshold not found in
definition

217 - Usage counter not found in
definition

218 - The usage threshold does not
exist on the account

219 - Usage counter value out of
bounds

220 - The supplied value type does not
match the definition

221 - No subordinate subscribers
connected to the account

222 - Dedicated account can not be
deleted because of it is in use

223 - Service failed because new offer
date provided in the request was
incorrect.(PC:08204)

224 - The old offer date provided in the
request did not match the current
date.(PC:08204)


AIR Programmer's Guide UCIP Version 5.0

```
Value
range
```
```
Capability ID Description
```
```
225 - The offer start date can not be
changed because the offer is
already active.(PC:08204)
226 - Invalid PAM Period Relative
Dates Start PAM Period Indicator
227 - Invalid PAM Period Relative
Dates Expiry PAM Period
Indicator
230 - Not allowed to convert to other
type of lifetime
(1)
```
```
232 - Not allowed to delete PAM
service ID in use. The PAM
Service ID is used by an Offer,
DA, or sub-DA's Relative Dates.
233 - Invalid PAM Service Priority
234 - Old PAM service priority provided
in the request was incorrect or
did not match the existing PAM
service priority for the account.
235 - Not allowed to connect the PAM
Class to the PAM Service. The
account already has a bill cycle
service. Only one bill cycle per
account is allowed.
236 - PAM Service Priority is already
used for some other PAM
service.
237 - Not allowed to add a Provider
ID to another offer type than
provider account offer.
238 - Not allowed to create a provider
account offer without providing a
Provider ID.
239
(PC:0
7061)
```
- The request failed because the
    given time restriction does not
    exist.
240
(PC:0
7061)
- The request failed because the
end time was before the start
time.


```
Elements
```
**Value
range**

```
Capability ID Description
```
### 241

### (PC:0

### 7061)

- The timezone could not be found
    in the timezone mapping table.

### 242

### (PMR

### 792)

```
CAP:14 Discount not defined
```
243 - Missing associated party ID for
provider owned personal usage
counter.

244 - Associated party ID not allowed
for provider owned common
usage counter.

245 - Provider owned common usage
counter can not have personal
usage threshold.

246 - The common usage threshold
does not exist on the account.

247 - Product not found

248 - Shared account offer is not
allowed on a subordinate
subscriber.

249 - The product id specified was
invalid, or a product id was
expected but not supplied.

250 - Communication ID change failed.
Insufficient funds.

251 - Communication ID change failed.
AIA/MSISDN mismatch.

252 - Communication ID change failed.
Invalid combination of values.

253 - Communication ID change failed.
Previous MSISDN Change
pending.

254 - Communication ID change failed.
New MSISDN not available.

255 - Operation not allowed on
subordinate subscriber


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Value
range
```
```
Capability ID Description
```
### 256

### (PMR

### 939:1

### US1)

### CAP:1, CAP:16, CAP:18

### (PMR939:2 US90)

```
Attribute name does not exist
```
```
257 CAP:9 Operation not allowed since End
of Provisioning is set
258
(PMR
939:1
US1)
```
```
CAP:1, CAP:16 Attribute value does not exist
```
### 259

### (PMR

### 939:1

### US1)

```
CAP:1, CAP:16 Attribute value already exists
```
```
260 - Capability not available
261 - Invalid Capability combination
262
(PMR
939:1
US19)
```
### CAP:16, CAP:18 (PMR939:2

### US90)

```
Attribute update action not
allowed for this attribute
```
### 263

### (PMR

### 939

### US18)

```
CAP:16 Attribute value is not possible to
override for the subscriber
```
### 264

### (PMR

### 905:1)

```
CAP:22 The result of the operation would
be a nominal value that is out of
bounds.
999 - Other Error No Retry
(1) The Lifecycle type is not supported; for example a DA created with Relative Dates will not
accept Absolute dates.
```
```
Note: Error values starts at 100, while lower values denotes a successful
execution.
```
## 7.174 scheduleID

```
ThescheduleIDparameter contains the schedule that is used by the periodic
account management service.
```
```
Data Type: <int> or <i4>
```
```
Element size: 0 to 9999
```

```
Elements
```
## 7.175 segmentationID

```
ThesegmentationIDparameter contains a value that was used for the
branching in the refill trees.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 to 4
```
## 7.176 selectedOption

```
ThisselectedOptionparameter contains the value of the selected option.
The values are configurable by the operator. The value is primarily used for
Option Refill.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 to 999
```
## 7.177 serviceClassAction

```
TheserviceClassActionparameter is used to indicate which action to take
when updating the service class.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 165.
```
```
Table 165 Element Value Range - serviceClassAction
```
```
Value Range Description
Set Update ordinary (original) and
temporary Service classes
SetOriginal Update ordinary (original) Service
class
SetTemporary Update temporary Service class
DeleteTemporary Remove temporary Service class
```
## 7.178 serviceClassChangeUnbarDate

```
TheserviceClassChangeUnbarDateparameter contains the date when a
charged service class change will be unbarred, that is allowed again. If sent,
a charged service class change is not allowed. Today's date and dates older
than today's date will not be sent.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateTomorrow to DateMax.
```
## 7.179 serviceClassCurrent

```
TheserviceClassCurrentparameter contains the service class currently
used by the subscriber. This might be a temporary Service Class, which is
controlled by a temporary Service Class expiry date (separate parameter).
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 9999
```
## 7.180 serviceClassList

```
TheserviceClassListparameter contains the list of new service classes
which the subscriber is allowed to change to.
```
```
Data Type: array of <int> or <i4>
```
```
Element Value Range: 0 to 9999
```
## 7.181 serviceClassNew

```
TheserviceClassNewparameter contains the new service class for the refill.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 9999
```
## 7.182 serviceClassOriginal

```
TheserviceClassOriginalparameter contains the identity of the original
service class when a temporary service class is active for an account. In case
serviceClassOriginalis returned then theserviceClassCurrentwill
contain the temporary service class currently active for the account. When a
temporary service class is active and a Return Service Class ID is specified,
theserviceClassOriginalparameter will contain the identity of the return
service class instead of the original service class. The account will then return to
the specified Return Service Class ID when the temporary service class expires.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 9999
```

```
Elements
```
## 7.183 serviceClassTemporary

```
TheserviceClassTemporaryparameter contains the service class to be
used by the subscriber. A temporary service class has precedence before
the normally assigned service class, as long as the temporary service class
date expiry date is not passed.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 9999
```
## 7.184 serviceClassTemporaryExpiryDate

```
TheserviceClassTemporaryExpiryDateparameter contains the expiry
date of a temporary service class of an account. A temporary service class
has precedence before the normally assigned service class, as long as the
temporary service class date expiry date is not passed.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: See Table 184
```
## 7.185 serviceClassTemporaryNew

```
TheserviceClassTemporaryNewparameter contains the new temporary
service class when changing an already assigned temporary service class.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 9999
```
## 7.186 serviceClassTemporaryNewExpiryDate

```
TheserviceClassTemporaryNewExpiryDateparameter contains the
new temporary service class expiry date when changing an already assigned
expiry date.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: See Table 184
```
## 7.187 serviceClassValidationFlag

```
TheserviceClassValidationFlagparameter is used to indicate if
validation regarding if a service class update is made within the range of
allowed service classes shall be performed or not.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 166.
```
```
Table 166 Element Value Range - serviceClassValidationFlag
```
```
Value Range Description
0 (false) (default value) Do not perform validation.
1 (true) Perform validation.
```
## 7.188 serviceFeeAccumulators (PC:06214)

```
TheserviceFeeAccumulatorsparameter contains the number of
accumulations which have been done since the last successful deduction.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 255
```
## 7.189 serviceFeeAmount1, serviceFeeAmount2 (PC:06214)

```
TheserviceFeeAmount1 and serviceFeeAmount2parameter
contains the periodic fee for the service.serviceFeeAmount1indicates
serviceFeeAmount in the first currency to be announced and
serviceFeeAmount2the amount in the second currency.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
7.190 serviceFeeChargedAmount1, serviceFeeChargedA

mount2 (PC:06214)

```
TheserviceFeeChargedAmount1 and serviceFeeChargedAm
ount2serviceFeeChargedAmount1 and serviceFeeChargedAmount2
parameter contains the amount actually deducted. In case of pre-rate
charging this could be different from the defined serviceFeeAmount.
serviceFeeChargedAmount1indicates serviceFeeChargedAmount in the
first currency to be announced andserviceFeeChargedAmount2in the
second currency.
```
```
Data Type: <string>
```
```
Element Format: Price
```

```
Elements
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.191 serviceFeeDaysExtended

```
TheserviceFeeDaysExtendedparameter gives the number of days the
service fee period has been extended as a result of the refill. The part is given
in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 2147483647
```
## 7.192 serviceFeeDaysSurplus

```
TheserviceFeeDaysSurplusparameter contains the number of days that
was not possible to add (including any promotional part) as the date has exceed
the maximum period allowed. The accounts actual supervision date will be set
equal to the maximum allowed date.
```
```
Data Type:<int> or <i4>
```
```
Element Value Range: 0 to 2147483647
```
7.193 serviceFeeDebtAmount1, serviceFeeDebtAmount2

## (PC:06214)

## (PC:06214)

```
TheserviceFeeDebtAmount1 and serviceFeeDebtAmount2parameter
contains the outstanding debt on the account for a fee. serviceFeeDe
btAmount1indicates a value in the first currency to be announced and
serviceFeeDebtAmount2a value in the second currency.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.194 serviceFeeDeductionDate (PC:06214)

```
TheserviceFeeDeductionDateparameter contains the date when the last
successful deduction was done. If no deduction date exists then the parameter
will not be returned.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to Date Today
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.195 serviceFeeDeductionPeriod (PC:06214)

```
TheserviceFeeDeductionPeriodparameter contains the number of
days/months (see Section 7.202 on page 191) the service fee is valid after
deduction.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 to 255
```
## 7.196 serviceFeeExpiryDate

```
TheserviceFeeExpiryDateparameter contains the expiry date of the
service fee period.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: See Table 184.
```
## 7.197 serviceFeeExpiryDateCurrent

```
TheserviceFeeExpiryDateCurrentparameter contains the current expiry
date of the service fee period. Used for validation. No validation is performed if
omitted.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.198 serviceFeeExpiryDateRelative

```
TheserviceFeeExpiryDateRelativeparameter is used to make a relative
adjustment to the current service fee expiry date. The adjustment can be
positive or negative. It is expressed in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -32767 to -1 and 1 to 32767
```
## 7.199 serviceFeeID (PC:06214)

```
TheserviceFeeIDparameter contains the identity of the service fee definition
in service class.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 255
```

```
Elements
```
## 7.200 serviceFeePeriod

```
TheserviceFeePeriodparameter contains the number of days until the
service fee period expires.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -32767 to 32767
```
## 7.201 serviceFeePeriodExpiryFlag

```
This parameter is used to indicate if the service fee period date has expired or
not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 167
```
```
Table 167 Element Value Range - serviceFeePeriodExpiryFlag
```
```
Value Range Description
0 (false) (default value) Service fee period date has not
expired
1 (true) Service fee period date has expired
```
## 7.202 serviceFeePeriodUnit (PC:06214)

```
TheserviceFeePeriodUnitparameter contains the unit of the
serviceFeeDeductionPeriod.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 168
```
```
Table 168 Element Value Range - serviceFeePeriodPeriodUnit
```
```
Value Range Description
Days Period in days
Months Period in months
```
## 7.203 serviceFeePeriodWarningActiveFlag

```
This parameter is used to indicate if the service fee period date expiration
warning is active or not.
```
```
Data Type: <boolean>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Value Range: See Table 169
```
```
Table 169 Element Value Range - serviceFeePeriodWarningActiveFlag
```
```
Value Range Description
0 (false) (default value) Service fee period date expiration
warning not active
1 (true) Service fee period date expiration
warning active
```
## 7.204 serviceOfferingActiveFlag

```
TheserviceOfferingActiveFlagindicates if a specific service offering
pointed out by theserviceOfferingIDparameter is active or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 170
```
```
Table 170 Element Value Range - serviceOfferingActiveFlag
```
```
Value Range Description
0 (false) The service offering is not active.
1 (true) The service offering is active.
```
## 7.205 serviceOfferingID

```
TheserviceOfferingIDparameter contains the identity of a current service
offering defined on an account.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 1 to 31
```
## 7.206 serviceRemovalDate

```
TheserviceRemovalDateparameter contains the date when the account
will be removed after the service removal period has expired.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: See Table 184
```

```
Elements
```
## 7.207 serviceRemovalPeriod

```
TheserviceRemovalPeriodparameter contains the period until service
removal.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 1023
```
## 7.208 specifiedPrice

```
ThespecifiedPriceparameter contains a price that shall be used to charge
for the operation, instead of using the the rating function normally used.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.209 startDate

```
ThestartDateparameter contains the date when a dedicated account, FaF
entry or offer will be considered as active. The parameter may also be used to
define start date for other entities depending on the context where it is used.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateBeginningOfTime.
```
## 7.210 startDateCurrent

```
ThestartDateCurrentparameter contains the current start date for a
dedicated account. The parameter may also be used to define start date for
other entities depending on the context where it is used. Used for validation.
No validation is performed if omitted.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateBeginningOfTime
```
## 7.211 startDateRelative

```
ThestartDateRelativeparameter is used to make a relative adjustment
to the current start date. The adjustment can be positive or negative. It is
expressed in number of days.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -999 to -1 and 1 to 999
```
## 7.212 startDateTime

```
ThestartDateTimeparameter contains the start date and time for an offer.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateBeginningOfTime
```
## 7.213 startDateTimeRelative

```
ThestartDateTimeRelativeparameter is used to make a relative
adjustment to the current start date and time for an offer. The adjustment can
be positive or negative. It is expressed in number of seconds. The parameter
may also be used to define start date and time for other entities depending on
the context where it is used.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -99999999 to 99999999
```
## 7.214 startPamPeriodIndicator

```
ThestartPamPeriodIndicatorparameter indicates the Periodic Account
Management period when the offer and DA becomes valid. (PMR1000:1 start)
If the offer has the capability of date and time the time stamp will default to
00:00:00.(PMR1000:1 end)
```
```
(PMR1000:1 start) Update of the PAM period indicator on an existing offer will
keep the current time stamp unchanged. Time stamp can however be changed
by including currentTimeOffset (see Section 7.66 on page 142) (PMR1000:1
end)
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 99 where 0 means that the start date of an offer
or a DA is the current date.
```
## 7.215 subscriberNumber

```
ThesubscriberNumberparameter contains the subscriber identity of the
subscriber related to the operation. The default format of the parameter is the
same numbering format as used by the account database, this also includes
```

```
Elements
```
```
support of leading zeroes. If another format is used then it must be indicated by
subscriberNumberNAIparameter.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 1 to 28
```
## 7.216 subscriberNumberNAI

```
ThesubscriberNumberNAIparameter contains the Nature of Address
Indicator identifies the format of thesubscriberNumberparameter.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 171
```
```
Table 171 Element Value Range - subscriberNumberNAI
```
```
Value Range Element
0 National number (with prefix)
1 International number
2 National significant number (without prefix)
```
```
Note: The value range and definition is specified according to the GSM
technical specification, see GSM Technical Specification, Reference
[5].
```
## 7.217 supervisionDaysExtended

```
ThesupervisionDaysExtparameter contains number of days the
supervision period has been extended as a result of the refill. The part is given
in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 2147483647
```
## 7.218 supervisionDaysSurplus

```
ThesupervisionDaysSurplusparameter contains the number of days that
was not possible to add (including any promotional part) as the date has exceed
the maximum period allowed. The accounts actual supervision date will be set
equal to the maximum allowed date.
```
```
Data Type:<int> or <i4>Element Value Range: 0 to 2147483647
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.219 supervisionExpiryDate

```
ThesupervisionExpiryDateparameter contains the expiry date of the
supervision period.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: See Table 184
```
## 7.220 supervisionExpiryDateCurrent

```
ThesupervisionExpiryDateCurrentparameter contains the current
expiry date of the supervision period. Used for validation. No validation is
performed if omitted.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax or DateInfinite
```
## 7.221 supervisionExpiryDateRelative

```
ThesupervisionExpiryDateRelativeparameter is used to make a
relative adjustment to the current supervision expiry date. The adjustment can
be positive or negative. It is expressed in number of days.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -32767 to -1 and 1 to 32767
```
```
Note: A value of zero (0) will be rejected with a fault code 100.
```
## 7.222 supervisionPeriod

```
ThesupervisionPeriodparameter contains the number of days until the
supervision period expires.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: -32767 to 32767
```
## 7.223 supervisionPeriodExpiryFlag

```
This parameter is used to indicate if the supervision period date has expired or
not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 172
```

```
Elements
```
```
Table 172 Element Value Range - supervisionPeriodExpiryFlag
```
```
Value Range Description
0 (false) (default value) Service fee period date has not
expired
1 (true) Service fee period date has expired
```
## 7.224 supervisionPeriodWarningActiveFlag

```
This parameter is used to indicate if the supervision period date expiration
warning is active or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 175
```
```
Table 173 Element Value Range - supervisionPeriodWarningActiveFlag
```
```
Value Range Description
0 (false) (default value) Supervision period date expiration
warning not active
1 (true) Supervision period date expiration
warning active
```
## 7.225 suppressDeduction

```
ThesuppressDeductionparameter indicates if the calculated cost is to be
withdrawn from the account or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 174
```
```
Table 174 Element Value Range - suppressDeduction
```
```
Value Range Description
0 (false) (default value) Not suppressed deduction
1 (true) Suppressed deduction
```
## 7.226 temporaryBlockedFlag

```
ThetemporaryBlockedFlagparameter is a flag indicating whether the
subscriber and operator has access to subscriber and account data. A
temporary blocked subscriber does not have access to the account, and any
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
messages requesting changes in the account or subscriber data are rejected.
Therefore in case temporary blocked is set, a temporary blocked indication is
set in the response code of the response message and the action is rejected.
It is always possible to read data, but the only way to change data again is to
unblock the subscriber.
```
```
In case temporary blocked flag is not returned in the response messages, then
the subscriber is not blocked.
```
```
Data Type:<boolean>
```
```
Element Value Range: See Table 175
```
```
Table 175 Element Value Range - temporaryBlockedFlag
```
```
Value Range Description
0 (false) (default value) Unblocked
1 (true) Temporary blocked
```
## 7.227 totalBalance1 and totalBalance2 (PC:10803)

```
ThetotalBalance1 and totalBalance2parameters contain the
aggregated balance.totalBalance1indicates an aggregated balance in the
first currency andtotalBalance2the aggregated balance in the second
currency.
```
```
If the unit type is other thanMoneythetotalBalance1contain the sum of
the valid units and thetotalBalance2is omitted.
```
```
WhendedicatedAccountUnitTypeis of the unit typeMoneythe parameter
can contain both an integer part and a decimal part. There is no decimal
separator, the decimal part is given directly to the right of the integer part.
```
```
The number of digits in the decimal part is configured in the currency
configuration. The integer part range is:0 - 9 223 372 036 854. The
decimal part can consist of 0 to 6 digits, which maximum value is 999999 .If
the maximum value of the integer part is reached, the maximum decimal part is
775807
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: 0 to 9 223 372 036 854 775 807
```

```
Elements
```
## 7.228 totalActiveBalance1 and totalActiveBalance2 (PC:10803)

```
ThetotalActiveBalance1 and totalActiveBalance2parameters
contain the aggregated balance that can be consumed right now.
totalActiveBalance1indicates an aggregated balance in the first currency
andtotalActiveBalance2the aggregated balance in the second currency.
```
```
If the unit type is other thanMoneythetotalActiveBalance1contain the
sum of the valid units and thetotalActiveBalance2is omitted.
```
```
WhendedicatedAccountUnitTypeis of the unit typeMoneythe parameter
can contain both an integer part and a decimal part. There is no decimal
separator, the decimal part is given directly to the right of the integer part.
```
```
The number of digits in the decimal part is configured in the currency
configuration. The integer part range is:0 - 9 223 372 036 854. The
decimal part can consist of 0 to 6 digits, which maximum value is 999999 .If
the maximum value of the integer part is reached, the maximum decimal part is
775807
```
```
Data Type: <string>
```
```
Element Format: Unit
```
```
Element Value Range: 0 to 9 223 372 036 854 775 807
```
## 7.229 totalCounterValue

```
ThetotalCounterValueparameter contains the value of the total counter
used for charged end user communication events.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: 0 to 127
```
## 7.230 transactionAmount

```
ThetransactionAmountparameter specifies the nominal value of the refill.
A transaction parameter includes data regarding a requested change.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.231 transactionAmountConverted

```
ThetransactionAmountConvertedparameter is the ‘Transaction Amount
Refill’ that has been converted into the currency of the account. No result of
market segmentation data, division table data or refill promotions have been
added to the parameter value.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.232 transactionCode

```
ThetransactionCodeparameter is used to specify the operation in
more detail. It will associate a description of a certain operation along with
transactionType. Reserved values must not be used when MINSAT is
used as Administrative System.
```
```
Table 176 Reserved values to not be used when using MINSAT as
Administrative System.
```
```
Value
SCC
FAF
CBE
ADJ
TC
TV
REBATE
DEBIT
DEDUCTIONGSM
DEDUCTIONPERIODIC
```
```
XML-RPC Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1–30
```

```
Elements
```
## 7.233 transactionCurrency

```
ThetransactionCurrencyparameter contains an ID to point out what
currency is used for the transaction. A transaction parameter includes data
regarding a requested change.
```
```
transactionCurrencyis mandatory if the account adjustment affects
a dedicated account or an usageCounter with a monetary value, thus
is of type Money. transactionCurrencyis also mandatory when a
UpdateAccountDetails or InstallSubscriber request includes the parameter
accountPrepaidEmptyLimit.
```
```
Data Type: <string>
```
```
Element Format: Currency
```
## 7.234 transactionType

```
ThetransactionTypeparameter is used to specify the operation in
more detail. It will associate a description of a certain operation along with
transactionCode. Reserved values must not be used when MINSAT is
used as Administrative System.
```
```
Table 177 Reserved values to not be used when using MINSAT as
Administrative System.
```
```
Value
EUC
PIN
TT
GSM
```
```
XML-RPC Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 to 30
```
## 7.235 treeDefinedFieldName (PC:10804, PMR939:1)

```
ThetreeDefinedFieldNameparameter holds the defined name of the TDF.
```
```
Data Type:<string>
```
```
Element Format:Alphanumeric
```
```
Element Value Range (Refill Response):1-200(PC:10804)
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Value Range (Refill Request):1-15(PMR939:1)
```
7.236 treeDefinedFieldType (PC:10804, PMR939:1)

```
ThetreeDefinedFieldTypeparameter holds the defined type of the TDF.
```
```
Element Type:<string>
```
```
Element Format:Alphanumeric
```
```
Element Value Range: "Boolean", "String", "Long" and "Amount" (Amount is
only available in Refill Response (PC:10804))
```
## 7.237 treeDefinedFieldValue (PC:10804, PMR939:1)

```
ThetreeDefinedFieldValueparameter contains the defined value of the
TDF.
```
```
Element Type:<string>
```
```
Element Format:Alphanumeric
```
```
Element Value Range: Depends ontreeDefinedFieldType
```
```
Element Value Range: see .Table 178
```
```
Table 178 Element Value Range - treeDefinedFieldValue
```
```
treeDefinedFieldType Element Value Range
Boolean "true", "false"
String Allowed characters: All
Long Numerical
```
```
Value Range (Refill Request): 1-15
(PMR939:1)
```
```
Value Range (Refill Response): 1-19
(PC:10804)
Amount (Only available in Refill
Response (PC:10804))
```
```
Decimal value and currency code to
hold a monetary amount.
```
## 7.238 twoStepActivationFlag (PC:03327)

```
ThetwoStepActivationFlagparameter is used to indicate if two step
activation is enabled or not.
```

```
Elements
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 179
```
```
Table 179 Element Value Range - twoStepActivationFlag
```
```
Value Range Description
0 (false) (default value) Two step activation is not enabled.
1 (true) Two step activation is enabled.
```
## 7.239 updateAction (PMR 1009)

```
TheupdateActionparameter is used to indicate which action to take on
the resource.
```
```
Data Type: <string>
```
```
Element Value Range: See Table 180.
```
```
Table 180 Element Value Range - updateAction
```
```
Value Range Description
EXPIRE Expire the resource immediately.
```
## 7.240 updateUsageCounterForMultiUser

```
TheupdateUsageCounterForMultiUserparameter indicates that the
request should be performed for all subscribers in a multi user account or for
the provider and all consumers. It is only possible to perform a reset on multiple
subscribers.
```
```
Data Type: <int> or <i4>
```
```
Element Format: Numeric
```
```
Element Value range: Always 1
```
## 7.241 usageCounterID

```
TheusageCounterIDparameter identifies the ID of a usage counter.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```

```
AIR Programmer's Guide UCIP Version 5.0
```
7.242 usageCounterMonetaryValue1 and usageCounterM

onetaryValue2

```
TheusageCounterMonetaryValue1 and usageCounterMonetaryValu
e2parameters contains the value of a monetary usage counter. The parameter
usageCounterMonetaryValue1indicates a usage counter amount in the
first currency to be announced andusageCounterMonetaryValue2a usage
counter amount in the second one.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
7.243 usageCounterMonetaryNominalValue1 and

usageCounterMonetaryNominalValue2 (PMR905:1)

```
TheusageCounterMonetaryNominalValue1 and usage
CounterMonetaryNominalValue2parameters contains the
value of a monetary usage counter, without any factor. The
parameterusageCounterMonetaryNominalValue1indicates a
usage counter amount in the first currency to be announced and
usageCounterMonetaryNominalValue2a usage counter amount in the
second one.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.244 usageCounterMonetaryValueNew

```
TheusageCounterMonetaryValueNewparameters contains the updated
value of a monetary usage counter.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.245 usageCounterValue

```
TheusageCounterValueparameter contains the value of a non-monetary
usage counter.
```

```
Elements
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 0 to 9 223 372 036 854 775 807
```
## 7.246 usageCounterNominalValue (PMR905:1)

```
TheusageCounterNominalValueparameter contains the value of a
non-monetary usage counter, without any factor.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 0 to 9 223 372 036 854 775 807
```
## 7.247 usageCounterValueNew

```
TheusageCounterValueNewparameter contains the updated value of a
non-monetary usage counter.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 0 to 9 223 372 036 854 775 807
```
## 7.248 usageThresholdID

```
TheusageThresholdIDparameter identifies the ID of a usage threshold.
```
```
Data Type: <int> or <i4>
```
```
Element Size: 1 to 2147483647
```
7.249 usageThresholdMonetaryValue1 and usageThreshold

MonetaryValue2

```
TheusageThresholdMonetaryValue1 and usageThresholdMo
netaryValue2parameters contains the value of a monetary usage
threshold. The parameterusageThresholdMonetaryValue1indicates
a usage threshold amount in the first currency to be announced and
usageThresholdMonetaryValue2a usage threshold amount in the second
one.
```
```
Data Type: <string>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.250 usageThresholdMonetaryValueNew

```
TheusageThresholdMonetaryValueNewparameter contains theu pdated
value of a monetary usage threshold.
```
```
Data Type: <string>
```
```
Element Format: Price
```
```
Element Value Range: 0 to 999 999 999 999
```
## 7.251 usageThresholdSource

```
TheusageThreseholdSourceparameter contains the source of a usage
threshold.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range:
```
```
Table 181 Element Value Range - usageThresholdSource
```
```
Value Description
```
(^1) Personal - The threshold has been
changed to a value other than the
usage counter definition and is
fetched from the subscriber.
2 Common - The threshold has been
changed to an individual value for a
provider shared by all consumers.
3 Default - The threshold value fetched
from the usage counter definition.

## 7.252 usageThresholdValue

```
TheusageThresholdValueparameter contains the value of a non-monetary
usage threshold.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 0 to 9 223 372 036 854 775 807
```

```
Elements
```
## 7.253 usageThresholdValueNew

```
TheusageThresholdValueNewparameter contains the new value of a
non-monetary usage threshold.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 0 to 9 223 372 036 854 775 807
```
## 7.254 ussdEndOfCallNotificationID

```
TheussdEndOfCallNotificationIDparameter identifies which decision
tree to use, when selecting the appropriate USSD text string for the End of Call
Notification message to the subscriber.
```
```
Data Type: <int> or <i4>
```
```
Element Value Range: See Table 182
```
```
Table 182 Element Value Range - ussdEndOfCallNotificationID
```
```
Value Description
0–199 As defined in the tariff trees
200–254 Reserved
```
(^255) No ID assigned (clears previously
assigned ID)

## 7.255 validateSubscriberLocation

```
ThevalidateSubscriberLocationparameter is used in a refill request to
indicate if a validation of the subscriber location should be performed or not.
```
```
Data Type: <boolean>
```
```
Element Value Range: See Table 183
```
```
Table 183 Element Value Range - validateSubscriberLocation
```
```
Value Range Description
0 (false) (default value) Do not perform validation
1 (true) Perform validation
```

```
AIR Programmer's Guide UCIP Version 5.0
```
## 7.256 validityTime (PMR792)

```
ThevalidityTimeparameter contains the expiry date and time.
```
```
Data Type: <dateTime.iso8601>
```
```
Element Value Range: DateMin to DateMax
```
## 7.257 voucherActivationCode

```
ThevoucherActivationCodeparameter contains the activation number
which is the unique secret code on the voucher which the subscriber uses
when performing a voucher based refill of the account. The format includes
support of leading zeroes.
```
```
Data Type: <string>
```
```
Element Format: Numeric
```
```
Element Size: 8 to 20
```
## 7.258 voucherAgent

```
ThevoucherAgentparameter contains the identity of the dealer who received
the vouchers from the service provider (as defined when creating the vouchers).
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 – 8
```
## 7.259 voucherGroup

```
ThevoucherGroupparameter contains the unique identity of the card group
that is associated to the voucher.
```
```
Data Type: <string>
```
```
Element Format: Alphanumeric
```
```
Element Size: 1 – 4
```
## 7.260 voucherSerialNumber

```
ThevoucherSerialNumberparameter contains the vouchers serial number.
```

```
Elements
```
Data Type: <string>

Element Format: Numeric

Element Size: 8– 20

Optional alphanumeric

Optional Element Value Range: {0 to 9, a to z, A to Z}.


AIR Programmer's Guide UCIP Version 5.0


```
Data Type Definitions
```
## 8 Data Type Definitions

```
This section covers data type definitions.
```
## 8.1 Data Types

```
XML-RPC data types are used to transfer UCIP messages. If a parameter on
element level does only support a specific size, range or format of a given data
type, then this is further described in Section 7 on page 123.
```
```
The data types that are used in UCIP are listed and described in the table
Table 184.
```
```
Table 184 Data type definition
```
```
Data Type Definition
<array> A collection of elements. In this
context used as a collection of
structures (<struct>).
<boolean> A boolean value.
```
```
Value range:
```
- 0 (false)
- 1 (true)


AIR Programmer's Guide UCIP Version 5.0

```
Data Type Definition
<dateTime.iso8601> A date and time.
```
```
An element of this type only
contains date, unless it is
specified to also include time.
```
```
The used format does not
strictly follow the XML-RPC
specification on date format,
as the UCIP protocol allows
timezone information to be
included in the data type. It does
however follow the ISO 8601
specification. Parsers for this
protocol must be able to parse
dates containing timezone.
```
```
Format: YYYYMMDDThh:mm:s
sTZ
```
- YYYY = 1970 to 9999
- MM = 01 to 12
- DD = 01 to 31
- hh = 00 to 24
- mm = 00 to 59
- ss = 00 to 59
- TZ = [+/-]0000 to [+/-]2359

```
TZ is the timezone deviation in
hours and minutes from the UTC.
TZ is always preceded by either a
‘‘ + ’’ or ‘‘ - ’’ sign.
```
```
In the case when only a date is
transferred, the time must be set
at 12:00:00, and the time offset
must be set at +0000 (UTC).
```
```
Example 1: 19980817T14:08:59+
0130 (timestamp)
```
```
Example 2: 19980817T12:00:00+
0000 (date only)
<int>or<i4> A signed, 32-bit integer.
```

```
Data Type Definitions
```
```
Data Type Definition
<string> An ASCII string, which may
contain zero bytes. If no type
is indicated, the default type is
string.
(1)
```
```
<struct> A collection of key-value pairs.
The keys are strings; the values
may be of any type.
(1) This protocol expects the ASCII strings to be coded in 7-bit USASCII (ISO 646).
```
## 8.2 Element formats

```
Element formats are specific value ranges used for the elements.
```
```
The logical data types that are used in UCIP are listed and described in the
table Table 185
```
```
Table 185 Element formats
```
```
Data Type Definition Data
Type
Alphanumeric Alphanumeric characters are those comprised
by the combined set of the 26 alphabetic
characters, A to Z, and the Arabic numerals,
0 to 9. The alphanumeric characters set may
include both upper and lower case letters as
well as space (‘‘ ’’).
```
```
The alphanumeric data type is a string
consisting of alphanumeric characters.
```
```
<string>
```
```
Currency Characters according to the ISO 4217
standard, see Codes for the representation of
currencies and funds, Reference [4]
```
```
Example:EURfor Euro andSEKfor Swedish
Krona.
```
```
<string>
```
```
Extended
address
```
```
A <string> with extended address parameters
as specified in Table 186
```
```
<string>
```
```
Extended
alphanumeric
(PMR939:1
US25)
```
```
A <string> which allows all US-ASCII values
from 32 to 126 (hexadecimal 0x20 to 0x7e).
This includes all characters from the extended
address (Table 186) plus the characters
specified in Table 187
```
```
<string>
```
```
Numeric The numeric format consists of the Arabic
numerals 0 to 9.
```
```
<string>
```

AIR Programmer's Guide UCIP Version 5.0

```
Data Type Definition Data
Type
SignedNumeri
c
```
```
The SignedNumeric format is a Numeric value
plus the minus sign ‘‘-’’ in case of a negative
value.
```
```
<string>
```
```
Price The Price is a numeric value plus the minus
sign ‘‘ - ’’ in case of a negative value. The
value is provided in the lowest denomination of
the currency.
```
```
<string>
```
```
Unit The data type contains the Unit of the
dedicated account values and is a numeric
value plus the minus sign ‘‘ - ’’ in case of a
negative value. Unit can represent : Time,
money, service specific units and volume. The
value is provided in the lowest denomination of
the currency.
```
```
<string>
```
```
CGI/SAI The CGI/SAI parameter consists of MCC (3
digits), MNC (2 or 3 digits), LAC (1 - 5 digits)
and Cell Identity (1 - 5 digits). Each field (MCC,
MNC, LAC and Cell Identity) is separated by
space.
```
```
<string>
```
```
Table 186 Shows the extended address with valid characters and
hexadecimal ASCII value for NAI, SIP-URI and Private identifiers.
```
```
Character Hexadecimal value
! 0x21
# 0x23
```
```
$ 0x24
% 0x25
&
(1)
0x26
'
(2)
0x27
( 0x28
) 0x29
* 0x2A
+ 0x2B
, 0x2C
```
- 0x2D
. 0x2E

```
/ 0x2F
0-9 0x30-0x39
```

```
Data Type Definitions
```
```
: 0x3A
; 0x3B
= 0x3D
```
```
? 0x3F
@ 0x40
A-Z 0x41-0x5A
\ 0x5C
^ 0x5E
_ 0x5F
```
```
` 0 x60
a-z 0x61-0x7A
```
```
{ 0x7B
```
```
| 0x7C
} 0x7D
~ 0x7E
```
```
(1) Must be coded as &amp; to comply to xml standard
(2) May be coded as &apos; according to xml standard
```
```
Table 187 Shows the additional characters compared to extended address
allowed for an extended alphanumeric. (PMR939:1 US25)
```
```
Character Hexadecimal value
(space) 0x20
"
(1)
0x22
<
(2)
0x3C
>
(3)
0x3E
[ 0x5B
] 0x5D
(1) May be coded as &quot; according to xml standard
(2) Must be coded as &lt; to comply to xml standard
(3) Must be coded as &gt; to comply to xml standard
```
## 8.3 Logical Values

```
Logical Values are used in the Elements value ranges to define specific values
for the elements.
```

AIR Programmer's Guide UCIP Version 5.0

```
Table 188 Logical Values
```
```
Logical value Description Data Type Value
DateBeginningOf
Time
```
```
For start dates
this means always
available. Part of
the value is used as
a flag.
```
```
<dateTime.i
so8601>
```
### 00000101T12:00:00

### +0000

```
DateInfinite For expiry dates
this means no true
date and time set.
Part of the value is
used as a flag.
```
```
<dateTime.i
so8601>
```
### 99991231T12:00:00

### +0000

```
DateMax Maximum valid
date that could be
converted to a Unix
time number.
```
```
<dateTime.i
so8601>
```
### 20380119T03:14:07

### +0000

```
DateMin Oldest possible
date that could be
converted to a Unix
time number.
```
```
<dateTime.i
so8601>
```
### 19700101T00:00:00

### +0000

```
DateToday The date of the day
when the request is
sent.
```
```
<dateTime.i
so8601>
```
### -

```
DateTomorrow The date of the day
after the request is
sent.
```
```
<dateTime.i
so8601>
```
### -


```
Capabilities
```
## 9 Capabilities

```
This section describes which flag value each capability are using. The
capabilities are represented with an index and a mask value. The index number
represent the element and the mask value represent the bit that is used.
```
```
Table 189 Capability functions
```
```
ID Inde
x
```
```
Mask Level Capability Description Requ
ires
(1
)
```
```
Illeg
al
(2)
```
```
01 1 System Reserved Internal use
only
```
### --

```
11 2 Protocol Offer based
FaF Prov
isioning
(PC:09985)
```
```
Possible
to have
specific
attributes as
set of strings
on individual
offers
```
### - 16

```
21 4 Protocol Instant
Offer Expiry
(PMR
1009)
```
```
To be able
to expire
offers,
products
dedicated
accounts
immediately
from an
external
system
```
### --

```
31 8 Protocol Prevent
account
activation
(PC:10198)
```
```
Enables the
possibility
to reject
activation
of pre-active
accounts for
UCIP reque
sts
```
### --

```
41 16 Protocol Handle
dates in
the past
(PC:10485)
```
```
Make it
possible to
set dates
in the past
on AIR-IP
(only for test
purpose)
```
### --


AIR Programmer's Guide UCIP Version 5.0

```
ID Inde
x
```
```
Mask Level Capability Description Requ
ires
```
```
(1
)
```
```
Illeg
al
```
```
(2)
```
```
5 132 System CGI/SAI in
Location
Aware Refill
(PC:10366)
```
```
Makes it
possible to
use CGI/SAI
in Location
Aware Refill
(LAR) in the
Refill trees
```
### --

```
61 64 Protocol Product
Associated
Dedicated
Accounts
(PMR
1000:1)
```
```
Product loca
l dedicated
accounts
that gives
products
balance with
the products
lifecycle
```
### --

(^71128) Protocol Flexible
responses
over AIR-IP
(PC:10804)
Includes the
TreeDefine
dFields in
the Refill
response

### --

8 1 (^256) System Flexible
Account
Manage
ment via
USSD
(PC:10383)
Make it
possible for
subscribers
to perform
account
updates
over USSD
without the
need for a
voucher

### --

```
9 1 512 Protocol End of Prov
isioning
```
```
Error code
(257) indi
cating that
one of the
affected
entities
can not be
used due to
that it is in
an End of
Provisioning
state.
```
### --


```
Capabilities
```
**ID Inde
x**

```
Mask Level Capability Description Requ
ires
```
```
(1
)
```
```
Illeg
al
```
```
(2)
```
10 1 1024 System Product
Associated
Dedicated
Accounts
(PMR1000:
1)

```
Makes it
possible
to create
new offer
instances
through
Refill
```
### --

11 1 2048 Protocol Offer attrib
ute support
in AIR Refill
(PC:10797)

```
Add the
possibility
to use offer
attribute in
Refill and
set TDFs
in Refill
from AIR-IP
and USSD
requests
```
### - 16

12 1 4096 Protocol Location
Information
in GetAcco
untDetails

```
Return
subscriber
location on
UCIP for
GetAccou
ntDetails
```
### --

13 1 (^8192) Protocol Account
Prepaid
Empty Limit
Add the
possibility
to set and
remove the
Account
Prepaid
Empty Limit
and to
communic
ate the set
Account
Prepaid
Empty
Limit to the
end-user

### --


AIR Programmer's Guide UCIP Version 5.0

```
ID Inde
x
```
```
Mask Level Capability Description Requ
ires
```
```
(1
)
```
```
Illeg
al
```
```
(2)
```
```
14 1 16384 Protocol Discount
Enquiry
(PMR 792)
```
```
Add the
possibility to
enquire the
discount,
expiry time
and if the
discount is
active or
planned for
a subscriber
```
### --

```
15 1 32768 Protocol Aggregated
product
offer info
rmation
(PC:10803)
```
```
Make it
possible
to include
aggregated
information
of resources
connected
to offer
instances
on AIR-IP
and USSD
```
### 6 -

16 1 (^65536) Protocol Flexible
Fields
(PMR939:
1)
Enables
attributes
on offers for
handling set
of strings,
set of dates,
and decimal
numbers

### - 1,

### 11

```
17 1 131072 Protocol Bandwidth
Enquiry
(PMR904)
```
```
Add the
possibility
to enquire
uplink and
downlink
bandwidth
```
### 14 -


```
Capabilities
```
**ID Inde
x**

```
Mask Level Capability Description Requ
ires
```
```
(1
)
```
```
Illeg
al
```
```
(2)
```
18 1 262144 Protocol Flexible Fiel
ds Single
String in
CDR (PMR
939:2)

```
This capabi
lity controls
if a Refill
response
can contain
attributes if
requested
with reque
stAttribute
sFlag and
if the Refill
response
can contain
response
codes 256
and 262.
```
### 16 -

19 1 524288 System SMS Noti
fication at
Adjustment
(PMR1060:
2)

```
Enables
sending of
SMS notif
ication for
successful
adjustment
operations
over AIR-IP
and through
the batch file
```
### --

### 20 1 104857

### 6

```
System Product
Associated
Dedicated
Accounts in
CDR (PMR
1000:3)
```
```
Enables
product
private DAs
to be output
in the refill
record CDR.
```
### --.

### 21 1 209715

### 2

```
Protocol Update
Offers Error
response
mapping
(PC:12823)
```
```
Mapping
of generic
UCIP respo
nse code to
a specific
response
code for
UpdateOffer
request
```
### --


AIR Programmer's Guide UCIP Version 5.0

```
ID Inde
x
```
```
Mask Level Capability Description Requ
ires
```
```
(1
)
```
```
Illeg
al
```
```
(2)
```
### 22 1 419430

### 4

```
Protocol Quotacontr
ol (PMR90
5:1)
```
```
This capa
bility will
add the
possibility
to calculate
savings
using usag
eCounterN
ominalValu
```
- usageCou
nterValue =
Savings

### --

### 23 1 838860

### 8

```
Protocol Support
for refillFr
audCount
in GetAc
countDet
ails UCIP
Response
(PC:12475)
```
```
Returns
the refillFr
audCount
parameter
in the
response
for GetAcc
ountDetails
request.
```
### --

### 24 1 167772

### 16

```
Protocol Support
future reset
date on
ACIP for
accum
ulators
(PC:11935)
```
```
Makes it
possible to
set future
date for
accumulat
orStartDate
```
### --

```
(1) Used for function dependency. If there is a dependency to a another function. Then that
capability ID number is added here.
(2) This column is used if an other function can not co-exist with this function. Then that
capability ID is added here
```

```
State Behavior
```
## 10 State Behavior

```
This section covers state behavior.
```
## 10.1 Introduction

```
The messages on the UCIP does not use any complex state machines, as only
single request-response dialogues are handled.
```
```
XML-RPC syntax is used in the following section.
```
## 10.2 Traffic Cases

```
Examples of UCIP messages used to model potential AIR usage scenarios are
to be found in Section 11 on page 225.
```
```
Additional HTTP information is not presented in the examples. For additional
information on the transport layer, see Section 12 on page 241.
```

AIR Programmer's Guide UCIP Version 5.0


```
Examples
```
## 11 Examples

```
This section covers examples.
```
## 11.1 GetFaFList

```
This section covers GetFaFList.
```
**11.1.1 GetFaFList: Request.Direction: Client->Server**

```
Get Family and Friends list for subscriber 070-3105300. The message sent
from an IVR with host name ivr001.
```
```
<?xml version="1.0"?>
<methodCall>
<methodName>GetFaFList</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originNodeType</name>
<value>
<string>IVR</string>
</value>
</member>
<member>
<name>originHostName</name>
<value>
<string>ivr001</string>
</value>
</member>
<member>
<name>originTransactionID</name>
<value>
<string>566612</string>
</value>
</member>
<member>
<name>originTimeStamp</name>
<value>
<dateTime.iso8601>20050422T14:15:21+0200</dateTime.iso8601>
</value>
</member>
<member>
<name>subscriberNumber</name>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
<value>
<string>0703105300</string>
</value>
</member>
<member>
<name>requestedOwner</name>
<value>
<int>1</int>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>
```
**11.1.2 GetFaFList: Successful Response.Direction: Server->Client**

```
Response for Get Family and Friends list for subscriber 070-3105300.
<?xml version="1.0"encoding="ISO-8859-1" standalone="no"?>
<methodResponse>
<params>
<param>
<value>
<struct>
<member>
<name>fafInformationList</name>
<value>
<array>
<data>
<value>
<struct>
<member>
<name>fafNumber</name>
<value>
<string>0703105000</string>
</value>
</member>
<member>
<name>fafIndicator</name>
```

```
Examples
```
<value><int>42</int></value>
</member>
<member>
<name>owner</name>
<value><string>Account</string></value>
</member>
</struct>
</value>
<value>
<struct>
<member>
<name>fafNumber</name>
<value>
<string>0703105001</string>
</value>
</member>
<member>
<name>fafIndicator</name>
<value><int>47</int></value>
</member>
<member>
<name>owner</name>
<value><string>Account</string></value>
</member>
</struct>
</value>
</data>
</array>
</value>
</member>
<member>
<name>fafChangeUnbarDate</name>
<value>
<dateTime.iso8601>20050422T14:15:21+0200
</dateTime.iso8601>
</value>
</member>
<member>
<name>responseCode</name>
<value>
<int>0</int>
</value>
</member>
<member>
<name>fafMaxAllowedNumbersReachedFlag</name>
<value>
<boolean>0</boolean>
</value>
</member>
<member>
<name>originTransactionID</name>


```
AIR Programmer's Guide UCIP Version 5.0
```
```
<value>
<string>566612</string>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
<member>
<name>availableServerCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodResponse>
```
## 11.2 Get Allowed Service Classes

```
This section covers Get Allowed Service Classes.
```
**11.2.1 Get Allowed Service Classes: Request.Direction: Client->Server**

```
Get allowed service classes for subscriber 070-3105300. The message sent
from an administrative system with host name Admin1.
<?xml version="1.0"?>
<methodCall>
<methodName>GetAllowedServiceClasses</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originNodeType</name>
<value>
<string>ADM</string>
```

```
Examples
```
</value>
</member>
<member>
<name>originHostName</name>
<value>
<string>Admin1</string>
</value>
</member>
<member>
<name>originTransactionID</name>
<value>
<string>566613</string>
</value>
</member>
<member>
<name>originTimeStamp</name>
<value>
<dateTime.iso8601>
20050422T14:15:21+0200
</dateTime.iso8601>
</value>
</member>
<member>
<name>subscriberNumberNAI</name>
<value>
<string>2</string>
</value>
</member>
<member>
<name>subscriberNumber</name>
<value>
<string>0703105300</string>
</value>
</member>
<member>
<name>serviceClassCurrent</name>
<value>
<i4>5</i4>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>


```
AIR Programmer's Guide UCIP Version 5.0
```
```
</value>
</param>
</params>
</methodCall>
```
**11.2.2 Get Allowed Service Classes: Successful Response.Direction:
Server->Client**

```
Response for get allowed service classes for subscriber 070-3105300.
<?xml version="1.0"?>
<methodResponse>
<params>
<param>
<value>
<struct>
<member>
<name>serviceClassList</name>
<value>
<array>
<data>
<value><int>1</int></value>
<value><int>2</int></value>
<value><int>3</int></value>
<value><int>4</int></value>
</data>
</array>
</value>
</member>
<member>
<name>serviceClassCurrent</name>
<value><int>5</int></value>
</member>
<member>
<name>responseCode</name>
<value>
<int>0</int>
</value>
</member>
<member>
<name>originTransactionID</name>
<value>
<string>566613</string>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
```

```
Examples
```
```
</data>
</array>
</value>
</member>
<member>
<name>availableServerCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodResponse>
```
## 11.3 Get Refill Options

```
This section covers get refill options.
```
**11.3.1 Get Refill Options: Request.Direction: Client->Server**

```
Get refill options for subscriber 070-3105300. The message sent from an
administrative system with host name Admin2.
<?xml version="1.0"?>
<methodCall>
<methodName>GetRefillOptions</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originNodeType</name>
<value>
<string>ADM</string>
</value>
</member>
<member>
<name>originHostName</name>
<value>
<string>Admin2</string>
</value>
</member>
<member>
<name>originTransactionID</name>
```

AIR Programmer's Guide UCIP Version 5.0

```
<value>
<string>566612</string>
</value>
</member>
<member>
<name>originTimeStamp</name>
<value>
<dateTime.iso8601>
20050422T14:15:21+0200
</dateTime.iso8601>
</value>
</member>
<member>
<name>subscriberNumber</name>
<value>
<string>0703105300</string>
</value>
</member>
<member>
<name>serviceClassCurrent</name>
<value>
<i4>5</i4>
</value>
</member>
<member>
<name>voucherActivationCode</name>
<value>
<string>01234567890</string>
</value>
</member>
<member>
<name>messageCapabilityFlag</name>
<value>
<struct>
<member>
<name>promotionNotificationFlag</name>
<value>
<boolean>1</boolean>
</value>
</member>
<member>
<name>firstIVRCallSetFlag</name>
<value>
<boolean>0</boolean>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
```

```
Examples
```
```
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>
```
**11.3.2 Get Refill Options: Successful Response.Direction: Server->Client**

```
Response for get refill options for subscriber 070-3105300.
<?xml version="1.0"?>
<methodResponse>
<params>
<param>
<value>
<struct>
<member>
<name>refillOptions</name>
<value>
<array>
<data>
<value>
<int>9</int>
</value>
<value>
<i4>12</i4>
</value>
<value>
<i4>78</i4>
</value>
</data>
</array>
</value>
</member>
<member>
<name>serviceClassCurrent</name>
<value>
<i4>2</i4>
</value>
</member>
<member>
<name>responseCode</name>
<value>
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
<i4>0</i4>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
<member>
<name>availableServerCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodResponse>
```
## 11.4 UpdateUsageThresholdsAndCounters

```
This section covers update of usage thresholds and usage counters.
```
**11.4.1 Update Usage Thresholds And Counters: Request.Direction:
Client->Server**

```
Update provider owned UT10 to a personal value for Consumer 070-3105400
and UT20 to a common value for Provider 070-3105300. UT10 and UT20
belong to the same personal UC1. The message sent from an administrative
system with host name Admin2.
<?xml version="1.0"?>
<methodCall>
<methodName>UpdateUsageThresholdsAndCounters</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originNodeType</name>
```

```
Examples
```
<value>
<string>ADM</string>
</value>
</member>
<member>
<name>originHostName</name>
<value>
<string>Admin2</string>
</value>
</member>
<member>
<name>originTransactionID</name>
<value>
<string>566612</string>
</value>
</member>
<member>
<name>originTimeStamp</name>
<value>
<dateTime.iso8601>
20110118T14:15:21+0200
</dateTime.iso8601>
</value>
</member>
<member>
<name>subscriberNumber</name>
<value>
<string>0703105300</string>
</value>
</member>
<member>
<name>usageThresholdUpdateInformation</name>
<value>
<array>
<data>
<value>
<struct>
<member>
<name>usageThresholdID</name>
<value><int>10</int></value>
</member>
<member>
<name>usageThresholdValueNew</name>
<value>
<string>100</string>
</value>
</member>
<member>
<name>associatedPartyID</name>
<value>
<string>0703105400</string>


```
AIR Programmer's Guide UCIP Version 5.0
```
```
</value>
</member>
</struct>
</value>
<value>
<struct>
<member>
<name>usageThresholdID</name>
<value><int>20</int></value>
</member>
<member>
<name>usageThresholdValueNew</name>
<value>
<string>400</string>
</value>
</member>
</struct>
</value>
</data>
</array>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>
```
**11.4.2 Update Usage Thresholds And Counters: Successful
Response.Direction: Server->Client**

```
Response for update of usage thresholds and usage counters for subscriber
070-3105300.
<?xml version="1.0"?>
<methodResponse>
<params>
<param>
<value>
<struct>
<member>
```

```
Examples
```
<name>responseCode</name>
<value>
<i4>0</i4>
</value>
</member>
<member>
<name>originTransactionID</name>
<value>
<string>566612</string>
</value>
</member>
<member>
<name>usageCounterUsageThresholdInformation</name>
<value>
<array>
<data>
<value>
<struct>
<member>
<name>usageCounterID</name>
<value><int>1</int></value>
</member>
<member>
<name>usageCounterValue</name>
<value>
<string>10</string>
</value>
</member>
<member>
<name>usageThresholdInformation</name>
<value>
<array>
<data>
<value>
<struct>
<member>
<name>usageThresholdID</name>
<value><int>10</int></value>
</member>
<member>
<name>usageThresholdValue</name>
<value>
<string>100</string>
</value>
</member>
<member>
<name>usageThresholdSource</name>
<value><int>1</int></value>
</member>
</struct>
</value>


AIR Programmer's Guide UCIP Version 5.0

```
<value>
<struct>
<member>
<name>usageThresholdID</name>
<value><int>20</int></value>
</member>
<member>
<name>usageThresholdValue</name>
<value>
<string>400</string>
</value>
</member>
<member>
<name>usageThresholdSource</name>
<value><int>2</int></value>
</member>
</struct>
</value>
</data>
</array>
</value>
</member>
<member>
<name>associatedPartyID</name>
<value>
<string>0703105400</string>
</value>
</member>
</struct>
</value>
<value>
<struct>
<member>
<name>usageCounterID</name>
<value><int>1</int></value>
</member>
<member>
<name>usageCounterValue</name>
<value>
<string>35</string>
</value>
</member>
<member>
<name>usageThresholdInformation</name>
<value>
<array>
<data>
<value>
<struct>
<member>
<name>usageThresholdID</name>
```

```
Examples
```
<value><int>10</int></value>
</member>
<member>
<name>usageThresholdValue</name>
<value>
<string>500</string>
</value>
</member>
<member>
<name>usageThresholdSource</name>
<value><int>2</int></value>
</member>
</struct>
</value>
<value>
<struct>
<member>
<name>usageThresholdID</name>
<value><int>20</int></value>
</member>
<member>
<name>usageThresholdValue</name>
<value>
<string>400</string>
</value>
</member>
<member>
<name>usageThresholdSource</name>
<value><int>2</int></value>
</member>
</struct>
</value>
</data>
</array>
</value>
</member>
<member>
<name>associatedPartyID</name>
<value>
<string>0703105300</string>
</value>
</member>
</struct>
</value>
</data>
</array>
</value>
</member>
<member>
<name>negotiatedCapabilities</name>
<value>


```
AIR Programmer's Guide UCIP Version 5.0
```
```
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
<member>
<name>availableServerCapabilities</name>
<value>
<array>
<data>
<value><i4>0</i4></value>
</data>
</array>
</value>
</member>
</struct>
</value>
</param>
</params>
</methodResponse>
```
## 11.5 GetCapabilities

```
This section covers GetCapabilities request.
```
**11.5.1 GetCapabilities: Request.Direction: Client->Server**

```
Get capability from server.
```
```
<?xml version="1.0"?>
<methodCall>
<methodName>GetCapabilities</methodName>
<params>
<param>
<value>
<struct>
</struct>
</value>
</param>
</params>
</methodCall>
```

```
Compatibility Mechanisms
```
## 12 Compatibility Mechanisms

```
A client must use theuser-agentHTTP field to indicate client identity,
protocol version and client version in such a way that a server can provide
different answers depending on the client and client version, if the server
deems it necessary.
```
```
According to the HTTP specification, theUser-Agentfield may contain
multiple product tokens and comments identifying the client. By convention,
the product tokens are listed in the order of their significance for identifying the
application.
```
```
The token must be organized as follows ‘‘User-Agent: client-name/protocol
version/client version’’
```
```
The following data is to be used:
```
```
Table 190 User agent data
```
```
Parameter Description and value
client name The client name are decided by
client. Not used by server logic but
useful for fault tracing.
protocol version The protocol version must be 5.0
client version The client version are decided by
client. Not used by server logic but
useful for fault tracing.
```
```
An example is: User-Agent: IVR/5.0/1.0
```
```
If the server cannot handle the protocol version, it will return HTTP status code
403 (Forbidden).
```

AIR Programmer's Guide UCIP Version 5.0


```
Transfer Mechanism
```
## 13 Transfer Mechanism

```
This section cover transfer mechanism.
```
## 13.1 Introduction

```
The transfer mechanism used is HTTP, both HTTP requests and HTTP
responses use headers to send information about the HTTP message. A HTTP
header is a series of lines, with each line contains a name followed by a colon
and a space, and then a value. The fields can be arranged in any order. Some
header fields are used in both request and response headers, while others
are appropriate only for either a request or a response. Many request header
fields will allow the client to specify several acceptable options in the value part
and, in some cases, even rank each option's preference. Multiple items are
separated using a comma. Some fields can occur more than once in a single
header. For example, a header can have multiple ‘‘Warning’’ fields.
```
```
The syntax used in UCIP is described in Section 5 on page 13.
```
```
For more information about the transfer mechanism used by HTTP, see
Hypertext Transfer Protocol - - HTTP/1.1, Reference [6].
```
## 13.2 Request Mechanism

```
All XML-RPC requests should be submitted using the HTTPPOSTcommand.
The post includes a Uniform Resource Identifier (URI) indicating which
responder that should handle the request. The content of this URI is not defined,
it is up to the implementing server to decide which URIs that are to be handled.
```
```
Use correct content-length and content-type. Provide the content-length in the
request and set the content-type to ‘‘text/xml’’. Include the calling host in the
HTTP header and use the User-agent to identify the calling service.
```
```
Table 191 URI responder
```
```
Parameter Description and value
URI For all messages in this document
the URI must be set toAir.
```
```
Example:
[ POST BEGIN ]
POST /Air HTTP/1.1
Content-Length: 286
Content-Type: text/xml
Date: Mon, 30 Aug 2004 13:17:39 MEST
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Host: ws2258:10011
User-Agent: IVR/5.0/1.0
Authorization: Basic dXNlcjpwYXNzd29yZA==
```
```
[ XMLRPC REQUEST GOES HERE ]
[ POSTEND ]
```
## 13.3 Response Mechanism

```
Provide correct content-length in the response and set content-type to
‘‘text/xml’’.
```
```
Use the ‘‘server’’ field to identify the responding server.
```
```
Example:
[ RESPONSE BEGIN ]
HTTP/1.1 200 OK
X-Powered-By: Ericsson
Date: Wed, 30 Jan 2013 07:17:26 GMT
Server: air1
Expires: Thu, 01-Jan-1970 00:00:00 GMT
Set-Cookie: JSESSIONID=n95qao0l61nc7lc6rsmr3dfn;Path=/
Content-Length: 2354
Content-Type: text/xml
Connection: close
```
```
[ XMLRPC RESPONSE GOES HERE ]
[ RESPONSEEND ]
```
```
Note: The tags Expires and Set-Cookie must not be used by the clients
```
## 13.4 Error Handling

```
A total application failure such as a server crash or an unhandled server
exception returns a HTTP response code in the 500 series (Internal Server
Error).
```
```
If the client uses an unsupported version of the protocol, HTTP response code
403 is returned.
```
```
If the XML-RPC request is incomplete, uses illegal data types or has other
structural problems, the XML-RPC fault construct must be used to indicate the
failure to the client. HTTP response code 200 (successful) must be used for
this kind of situation.
```
```
Complete XML-RPC requests uses the response code defined in the response
messages to indicate success or failure. Failures like ‘‘Temporary Blocked’’,
should not be considered as faults and therefore must not use the XML-RPC
fault construct. HTTP response code 200 must be used.
```

```
Transfer Mechanism
```
```
Requests sent to the AIR server that are rejected due to overload are responded
with XML-RPC fault response with faultCode = 1007
```
```
In case of a mismatch of user:password the response will be “401 Unauthorized
WWW-Authenticate: Basic realm=”/Air”.
```
```
In case of incorrect content length, the response will be ‘‘400 Incomplete
request’’.
```
```
If an user is not allowed to do the specific action the response will be “403
Forbidden: Insufficient user privileges" (header version 1.1).
```
## 13.5 Load Balancing and Fail Over

```
The client may at its own discretion balance the load over several AIR
servers within the same AIR system. In case an AIR server is unavailable or
overloaded, it is the responsibility of the client to fail-over to another AIR server
within the AIR system.
```
```
The following are indications of that an AIR server is unavailable or overloaded:
```
- Not possible to acquire a new connection to the AIR server
- Requests sent to the AIR server time out
- Request sent to the AIR server are rejected due to overload (XML-RPC
    fault response with faultCode = 1007)

```
The client may later, at its own discretion, attempt to contact the AIR server
again.
```
## 13.6 Authentication, Authorization and Security

```
Authentication (Authorization) is mandatory and it is done at HTTP level. All
security is intended to be handled at transport level and downwards.
```
```
For higher security it is recommended to use encryption mechanisms like IPSec.
```
```
Using information from the HTTP header the server will handle the
authentication in a two step process. It is also possible to use strict
authentication, it is described in a four step process below. It does not only use
user:password for authentication, it also to restricts the access to hosts and
agents that are trusted.
```
```
Authentication
```
1. The HTTP header must contain an Authentication field containing “Basic
    user:password”. The user:password is b64 encoded, in other words it is not
    sent in readable text. The user:password is compared to a user:password
    configured in the AIR.


```
AIR Programmer's Guide UCIP Version 5.0
```
```
In case of a mismatch of user:password the response will be “401
Unauthorized WWW-Authenticate: Basic realm=”/Air”.
```
2. The User (as in bullet 1 above) can be configured towards a list of allowed
    actions, configured in the AIR application. This means that one user can be
    blocked for installing subscribers but is allowed to change account data.
    Another user might only have access to read the accounts.

```
In case of that the user is not allowed to perform an action the response will
be “403 Forbidden: Insufficient user privileges (header version 1.1)."
```
```
Strict Authentication
```
1. The host name is compared to a list of trusted hosts. If the host is not
    trusted the authentication has failed, otherwise the authentication continues
    according to next step.
2. The User-Agent is compared to a list of authorized User-Agents. If the
    User-Agent is not trusted the authentication has failed, otherwise the
    authentication continues according to next step.
3. The HTTP header must contain an Authentication field containing "Basic
    user:password" where the user:password is b64 encoded, in other words
    it is not sent in readable text. The user:password is compared to a
    user:password configured in the AIR.

```
In case of any of the steps above has failed the response will be "401
Unauthorized WWW-Authenticate: Basic realm="/Air".
```
4. The User (as in bullet 3 above) can be configured towards a list of allowed
    actions, configured in the AIR application. This means that one user can be
    blocked for installing subscribers but is allowed to change account data.
    Another user might only have access to read the accounts.

```
In case of that the user is not allowed to perform an action the response will
be "403 Forbidden: Insufficient user privileges (header version 1.1)."
```
## 13.7 TCP Level Compliance

```
To secure the server performance and robustness, an RST will always be
sent when the server closes the connection. This procedure differs from the
standard TCP FIN/ACK teardown.
```

```
Protocol Format Changes
```
## 14 Protocol Format Changes

```
This section describes changes in different versions.
```
14.1 Version 5.0 Update 2

```
This version contains the modifications described in Page 248
```
```
Table 192 Protocol Format Changes in Version 5.0 Update 2
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 5.0
Update 1
```
```
Comment
```
```
CAP:2 updateAction
```
```
productID
```
```
New parameters
become standard
```
### PMR 1009

```
GetAccountDetai
ls, request
```
```
requestActiveOff
ersFlag
```
```
New parameter PMR 1008
```
```
GetBalanceAndD
ate, request
```
```
requestActiveOff
ersFlag
```
```
New parameter PMR 1008
```
```
GetOffers and
GetUsageThresh
oldsAndCounters
```
```
response.
usageCounter
NominalValue
```
```
New parameter PMR905:1
```
```
GetOffers and
GetUsageThresh
oldsAndCounters
```
```
response:
usageCounter
NominalValue1
```
```
New parameter PMR905:1
```
```
GetOffers and
GetUsageThresh
oldsAndCounters
```
```
response.
usageCounter
NominalValue2
```
```
New parameter PMR905:1
```
```
CAP:22 usageCounterNo
minalValue
```
```
usageCounterNo
minalValue1
```
```
usageCounterNo
minalValue2
```
```
New capability PMR905:1
```
```
GetOffers and
GetUsageThresh
oldsAndCounters
```
```
responseCode Added error
code: 264
```
### PMR905:1


```
AIR Programmer's Guide UCIP Version 5.0
```
14.2 Version 5.0 Update 1

```
This version contains the modifications described in Page 248
```
```
Table 193 Protocol Format Changes in Version 5.0 Update 1
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 5.0
```
```
Comment
```
```
UpdateOffer response code Added 999 -
```
## 14.3 Version 5.0

```
This version contains the modifications described in Page 248
```
```
Table 194 Protocol Format Changes in Version 5.0
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 4.3
```
```
Comment
```
```
GetCapabilities New message
All messages negotiatedCapab
ilities.
```
```
New parameter. Added to
all message
requests and
responses
All messages availableServerC
apabilities.
```
```
New parameter. Added to
all message
responses
All messages responseCode Added response
code 260
Applicable
messages
```
```
clearedStartDate Changed from
DateInfinity to
DateBeginningOf
Time
```
```
DateBeginingO
fTime is used
to set infinity for
historical time.
DateInfinity is
used for Infinity
dates in the future
Applicable
messages
```
```
newStartDate Changed from
DateInfinity to
DateBeginningOf
Time
```
```
DateBeginingO
fTime is used
to set infinity for
historical time.
DateInfinity is
used for Infinity
dates in the future
```

```
Protocol Format Changes
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 4.3
```
```
Comment
```
```
Applicable
messages
```
```
startDate Changed from
DateInfinity to
DateBeginningOf
Time
```
```
DateBeginingO
fTime is used
to set infinity for
historical time.
DateInfinity is
used for Infinity
dates in the future
Applicable
messages
```
```
startDateCurrent Changed from
DateInfinity to
DateBeginningOf
Time
```
```
DateBeginingO
fTime is used
to set infinity for
historical time.
DateInfinity is
used for Infinity
dates in the future
Applicable
messages
```
```
startDateTime Changed from
DateInfinity to
DateBeginningOf
Time
```
```
DateBeginingO
fTime is used
to set infinity for
historical time.
DateInfinity is
used for Infinity
dates in the future
GetOffers requestInactiveO
ffersFlag
```
```
Excluded from
the XOR block
```
```
requestInactiveO
ffersFlag was in
earlier included
in an XOR block
together with offe
rSelection and
productSelection.
All messages Port number for
HTTP requests
is changed to
10011
```
```
Port is changed
to 10011 in 5.0.
Port 10010 is still
in use for older
protocol versions.
```
## 14.4 Version 4.3

```
This version contains the modifications described inTable 195
```

AIR Programmer's Guide UCIP Version 5.0

```
Table 195 Protocol Format Changes in Version 4.3
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 4.2
```
```
Comment
```
```
pamServiceID
added
```
```
DeleteOffer, New parameter
response
dedicatedAccoun
tDeleteInformatio
n
```
```
PamServiceID
added
```
```
GetAccountDetai
ls, response
```
```
offerInformationL
ist
```
```
PamServiceID
added
GetBalanceAndD
ate, response
```
```
dedicatedAccoun
tInformation
```
```
offerInformationL
ist
```
```
PamServiceID
added
```
```
offerInformation PamServiceID
added
```
```
GetOffers,
response
offerInformation
-> dedicatedAcco
untInformation
```
```
PamServiceID
added
```
```
UpdateBalanceA
ndDate, request
```
```
dedicatedAccoun
tUpdateInformati
on
```
```
PamServiceID
added
```
```
StartPamPeriodI
ndicator added
```
```
ExpiryPamPeriod
Indicator added
dedicatedAccoun
tChangeInformat
ion
```
```
PamServiceID
added
```
```
dedicatedAccoun
tDeleteInformatio
n
```
```
PamServiceID
added
```
```
UpdateBalan
ceAndDate,
response
```
```
responseCode Response codes
226, 227 and 230
added
UpdateOffer,
request
```
```
pamServiceID
```
```
startPamPeriodIn
dicator
```
```
expiryPamPeriod
Indicator
```
```
New parameters
```

```
Protocol Format Changes
```
**Message Protocol
Message
Parameter**

```
Changes
compared
version 4.2
```
```
Comment
```
UpdateOffer, pamServiceID New parameter
response
responseCode Response codes
226, 227 and 230
added

GetOffers
request

```
OfferRequestedT
ypeFlag
```
```
Added new
values 'Provider
Account and
Shared Account'
offerInformation
```
- offerType

```
Added new
values 'Provider
Account and
Shared Account'
```
GetOffers
response

```
offerInformation
```
- offerProviderID

```
New parameter
```
```
offerType Added new
values 'Provider
Account and
Shared Account'
```
UpdateOffer
request

```
offerProviderID New parameter
offerType Added new
values 'Provider
Account and
Shared Account'
offerProviderID New parameter
```
UpdateOffer
response

```
responseCode Response codes
237, 238 and 248
added
offerInformationL
ist
```
- offerType

```
Added new
values 'Provider
Account and
Shared Account'
```
GetAccountsDet
ails response

```
offerInformationL
ist
```
- offerProviderID

```
New parameter
```

AIR Programmer's Guide UCIP Version 5.0

```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 4.2
```
```
Comment
```
```
offerInformationL
ist
```
- offerType

```
Added new
values 'Provider
Account and
Shared Account'
```
```
GetBalanceAndD
ate
```
```
offerInformationL
ist
```
- offerProviderID

```
New parameter
```
```
offerInformationL
ist
```
- offerType

```
Added new
values 'Provider
Account and
Shared Account'.
Parameter
included in acco
untBeforeRefill
and accountAfter
Refill
offerInformationL
ist
```
- offerProviderID

```
New parameter
included in acco
untBeforeRefill
and accountAfter
Refill
```
```
Refill response
```
```
responseCode Response code
248 added
GetUsageThresh
oldsAndCounters
request
```
```
associatedPartyI
D
```
```
New parameter
```
```
GetUsageThresh
oldsAndCounters
response
```
```
associatedPartyI
D
```
```
New parameter
```
```
UpdateUsageThr
esholdsAndCoun
ters request
```
```
associatedPartyI
D
```
```
New parameter
```
```
UpdateUsageThr
esholdsAndCoun
ters response
```
```
associatedPartyI
D
```
```
New parameter
```
```
UpdateFaFList
request
```
```
struct fafInformat
ion
```
```
exactMatch
```
```
New parameter
```

```
Protocol Format Changes
```
**Message Protocol
Message
Parameter**

```
Changes
compared
version 4.2
```
```
Comment
```
GetFaFList
response

```
struct fafInformat
ion
```
```
exactMatch
```
```
New parameter
```
Refill request validateSubscrib
erLocation

```
New parameter
```
Refill request cellIdentifier New parameter

UpdateBalanceA
ndDate request

```
cellIdentifier New parameter
```
GetAccountDetai
ls, request

```
requestAttributes
Flag
```
```
New Parameter (PC:09985)
```
GetAccountDetai
ls, response

```
attributeInformati
onList
```
```
New Parameter
in structure offerI
nformationList
```
### (PC:09985)

GetBalanceAndD
ates, request

```
requestAttributes
Flag
```
```
New Parameter (PC:09985)
```
GetBalanceAndD
ates, response

```
attributeInformati
onList
```
```
New Parameter
in structure offerI
nformationList
```
### (PC:09985)

GetOffers,
request

```
requestAttributes
Flag
```
```
New Parameter (PC:09985)
```
GetOffers,
response

```
attributeInformati
onList
```
```
New Parameter
in structure offerI
nformationList
```
### (PC:09985)

UpdateOffer,
request

```
attributeUpdateIn
formationList
```
```
New Parameter (PC:09985)
```
UpdateOffer,
response

```
responseCode Response codes
256, 258, 259
added
```
### (PC:09985)

DeleteOffer,
response

```
attributeInformati
onList
```
```
New Parameter.
Note that attribu
teInformationList
inside offerInfor
mationList is not
supported.
```
### (PC:09985)

DeleteSubscriber
, response

```
attributeInformati
onList
```
```
New Parameter
in structure offerI
nformationList
```
### (PC:09985)

GetOffers,
request

```
requestInactiveO
ffersFlag
```
```
Updated paramet
er description.
```

```
AIR Programmer's Guide UCIP Version 5.0
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 4.2
```
```
Comment
```
```
GeneralUpdate,
response
```
```
responseCode Updated
description of
response code
214.
```
### (PC:10355)

```
UpdateOffer,
response
```
```
responseCode Updated
description of
response code
214.
```
### (PC:10355)

## 14.5 Version 4.2

```
This version contains the modifications described in, and Table 196
```
```
Table 196 Protocol Format Changes in Version 4.2
```
```
Message Protocol
Message
Parameter
```
```
Changes
compared
version 4.1
```
```
Comment
```
```
GetAccountsDet
ails response
```
```
PamInformation Added new
parameter pamS
ervicePriority
```
## 14.6 Version 4.1

```
This version contains the modifications described in , and Table 197
```
```
Table 197 Protocol Format Changes in Version 4.1
```
```
Message Protocol
Message
Parameter
```
```
Changes compared
version 4.0
```
```
Comment
```
```
dedicatedAc
countInforma
tion
```
```
dedicatedAccou
ntUnitType
```
```
Removed PC tag
and changed name
of parameter
dedicatedAc
countRefillInf
ormation
```
```
dedicatedAccou
ntUnitType
```
```
Removed PC tag
and changed name
of parameter
dedicatedAc
countUpdate
Information
```
```
dedicatedAccou
ntUnitType
```
```
Removed PC tag
and changed name
of parameter
```

```
Protocol Format Changes
```
```
Message Protocol
Message
Parameter
```
```
Changes compared
version 4.0
```
```
Comment
```
```
subDedicate
dAccountUp
dateInformat
ion
```
```
dedicatedAccou
ntUnitType
```
```
New parameter
```
```
GetOffers offerSelection Changed error code
returned for explicit
request from 214
to 165,to indicate
correct system
behaviour.
```
## 14.7 Version 4.0

```
This version contains the modifications described in , and Table 198.
```
```
Table 198 Protocol Format Changes in Version 4.0
```
```
Message Protocol
Message
Parameter
```
```
Changes compared
version 3.5
```
```
Comment
```
```
Refill(respon
se)
```
```
startDate Removal of pc
tags and moved
to standard
GetBalance
AndDate(Re
sponse)
```
```
startDate Removal of pc
tags and moved
to standard
GetBalanc
eAndDate
(Response)
```
```
GetOffers
(Response)
```
```
closestAcce
ssibleDate,
closestAcces
sibleValue1,
closestAccess
ibleValue2, clos
estExpiryDate,
closestExpiryVa
lue1 and closest
ExpiryValue2
```
```
Added
```
```
GetBalanc
eAndDate
(Response)
```
```
GetOffers
(Response)
```
```
subDedicatedAc
countInformatio
n.dedicatedAcc
ountID
```
```
Removed
```

AIR Programmer's Guide UCIP Version 5.0

```
Message Protocol
Message
Parameter
```
```
Changes compared
version 3.5
```
```
Comment
```
```
UpdateBalan
ceAndDate(
Request)
```
```
startDate and
adjustmentStart
DateRelative
```
```
Removal of pc
tags and moved
to standard
UpdateBalan startDate
ceAndDate(
Response)
responseCode Response code 163
and 164 added
```
```
Removal of pc
tags and moved to
standard
```
```
UpdateBala
nceAndDate
(Response)
```
```
dedicatedAccou
ntInformation
```
```
Replaced by
dedicatedAccount
ChangeInformation
UpdateBala
nceAndDate
(Response)
```
```
dedicatedAccou
ntChangeInform
ation
```
```
Replaces dedicated
AccountInformation
```
```
UpdateBala
nceAndDate
(Response)
```
```
compositeDedic
atedAccountInfo
rmation
```
```
Removed.
```
```
UpdateBala
nceAndDate
(request)
```
```
allowCropOfCo
mpositeDedicat
edAccounts
```
```
New parameter
```
```
GetAccount
Management
Counters
```
- New message

```
GetAccu
mulators
(response)
```
```
accountFlagsAft
er and accountF
lagsBefore
```
```
New parameter
```
```
UpdateBala
nceAndDate
(request)
```
```
serviceFeeExpir
yDateCurrent
```
```
New parameter
```
```
UpdateBala
nceAndDate
(request)
```
```
supervisionExpir
yDateCurrent
```
```
New parameter
```
```
UpdateBala
nceAndDate
(request)
```
```
serviceClassCu
rrent
```
```
New parameter
```
```
UpdateBala
nceAndDate
(request)
```
```
expiryDateCurre
nt
```
```
New parameter
```
```
UpdateBala
nceAndDate
(request)
```
```
expiryDateCurre
nt
```
```
New parameter
```

```
Protocol Format Changes
```
**Message Protocol
Message
Parameter**

```
Changes compared
version 3.5
```
```
Comment
```
UpdateBala
nceAndDate
(response)

```
negativeBalanc
eBarringDate
```
```
New parameter
```
UpdateBala
nceAndDate
(response)

```
accountFlagsAft
er
```
```
New parameter
```
UpdateBala
nceAndDate
(response)

```
responseCode Response code 204
added
```
UpdateBala
nceAndDate
(response)

```
dedicatedAccou
ntInformation
```
```
New parameter
```
UpdateBala
nceAndDate
(response)

```
accountValue1 New parameter
```
UpdateBala
nceAndDate
(response)

```
accountValue2 New parameter
```
GetAccou
ntDetails
(response)

```
maxServiceFee
Period
```
```
New parameter
```
GetAccou
ntDetails
(response)

```
maxSupervision
Period
```
```
New parameter
```
GetAccou
ntDetails
(response)

```
negativeBalanc
eBarringDate
```
```
New parameter
```
GetAccou
ntDetails
(response)

```
accountFlagsBe
fore
```
```
New parameter
```
GetRefil
lOptions
(response)

```
accountFlagsAft
er
```
```
New parameter
```
GetRefil
lOptions
(response)

```
accountFlagsBe
fore
```
```
New parameter
```
UpdateAcc
ountDetails
(request)

```
languageIDCurr
ent
```
```
New parameter
```

AIR Programmer's Guide UCIP Version 5.0

```
Message Protocol
Message
Parameter
```
```
Changes compared
version 3.5
```
```
Comment
```
```
UpdateAcc
ountDetails
(response)
```
```
accountFlagsAft
er
```
```
New parameter
```
```
UpdateAcc
ountDetails
(response)
```
```
accountFlagsBe
fore
```
```
New parameter
```
```
UpdateAcc
ountDetails
(response)
```
```
responseCode Response code 204
added
```
```
UpdateSe
rviceClass
(response)
```
```
accountFlagsAft
er
```
```
New parameter
```
```
UpdateSe
rviceClass
(response)
```
```
accountFlagsBe
fore
```
```
New parameter
```
```
UpdateProm
otionPlan
```
```
responseCode 204 added for Action
Set and Action Add
UpdateOffer offerType New parameter
UpdateOffer responseCode Added response
code 214
UpdateOffer responseCode Added response
code 215
GetOffers offerSelection.of
ferType
```
```
New parameter
```
```
GetOffers responseCode Added response
code 214
Refill(reques
t)
```
```
requestSubDedi
catedAccountDe
tailsFlag
```
```
Added
```
```
Refill(respon
se)
```
```
subDedicatedA
ccountRefillInfor
mation
```
```
Added in dedic
atedAccountRe
fillInformation in
refillValueTotal and
refillValuePromotion
in refillInformation.l
Refill(respon
se)
```
```
closestExpiryDa
te
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```

```
Protocol Format Changes
```
**Message Protocol
Message
Parameter**

```
Changes compared
version 3.5
```
```
Comment
```
Refill(respon
se)

```
closestExpiryVal
ue1
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
closestExpiryVal
ue2
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
closestAccessibl
eDate
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
closestAccessibl
eValue1
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
closestAccessibl
eValue2
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
subDedicatedAc
countInformatio
n
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
dedicatedAccou
ntActiveValue1
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
Refill(respon
se)

```
dedicatedAccou
ntActiveValue2
```
```
Added in dedicated
AccountInformation
in accountAfterRefill
and accountBeforeR
efill.
```
DeleteOffer - PC tag removed.


```
AIR Programmer's Guide UCIP Version 5.0
```
```
Message Protocol
Message
Parameter
```
```
Changes compared
version 3.5
```
```
Comment
```
```
GetAccount
Details
```
```
offerInformation
List
```
```
New parameter
added.
GetBalance
AndDate
```
```
offerInformation
List
```
```
New parameter
added.
GetOffers - PC tag removed.
UpdateOffer - PC tag removed
```
## 14.8 Version 3.5

```
This version contains the modifications described in , Table 199 and.
```
```
Table 199 Protocol Format Changes in Version 3.5
```
```
Message Protocol
Message
Parameter
```
```
Changes compared
version 3.4
```
```
Comment
```
```
GetAccou
ntDetails
(request)
```
```
requestPamInfo
rmationFlag
```
```
New parameter
```
```
GetAccou
ntDetails
(response)
```
```
pamInformation
List
```
```
New parameter
```

## Glossary

Glossary

### ADM

Administrative system

**AIR**
Account Information and Refill system

**ASCII**
American Standard Code for Information
Interchange

**b64**
Base-64 encoding and decoding

**CGI**
Cell Global Identity

**CPI**
Customer Product Information

**DR**
Data Record

**EXT**
External System

**FaF**
Family and Friends

**HLR**
Home Location Register

**HTTP**
Hyper Text Transfer Protocol

**IP**
Internet Protocol

**IPsec**
IP Security

**ISO**
International Organization for Standardization

**IVR**
Interactive voice response system

### MINSAT

```
Mobile Intelligence Network Service
Administration Tool
```
```
MSIDSN
Mobile Station International ISDN Number
```
```
NAI
Nature of Address Indicator
```
```
OGW
On-line gateway
```
```
PAM
Periodic Account Management
```
```
PIN
Personal Identification Number
```
```
SAI
Service Area Identification
```
```
SC
Service Class
```
```
SDP
Service Data Point
```
```
TZ
Time zone
```
```
UCIP
User Communication Integration Protocol
```
```
UGW
USSD gateway
```
```
URI
Uniform Resource Identifier
```
```
UTC
Universal Time Coordinate
```
```
URI
Uniform Resource Identifier
```

```
AIR Programmer's Guide UCIP Version 5.0
```
### XML

Extensive Markup Language

**XML-RPC**
Extensive Markup Language-Remote
Procedure Call


## Reference List

Reference List

**Ericsson Documents**

[1] _AIR Customer Product Information - Overview_ , 1/1551-EN/LZN 741 0130
Uen

[2] _AIR Network Element Description_ , 3/1551-FAM 901 108/5 Uen

[3] _AIR User's Guide Service Configuration Administration_ , 1/1553-FAM
901 108/5 Uen

**Standards**

[4] _Codes for the representation of currencies and funds_ , ISO 4217:2001

[5] _GSM Technical Specification_ , 3GPP TS 09.02, Mobile Application Part
(MAP) specification

[6] _Hypertext Transfer Protocol - - HTTP/1.1_ , IETF RFC 2616

**On-line References**

[7] _World Wide Web Consortium. Extensible Markup Language (XML) 1.0_ ,
[http://www.w3.org./TR/2000/REC-xml-20001006](http://www.w3.org./TR/2000/REC-xml-20001006)

[8] _XML-RPC Home Page_ , [http://www.xmlrpc.com/](http://www.xmlrpc.com/)


