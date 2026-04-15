<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$handle = fopen('/opt/lampp/htdocs/OTN_HealthChecks/NOKs_Summary/sdp_noks.txt', 'r');
$sdp_noks=fread($handle,1000);


$handle = fopen('/opt/lampp/htdocs/OTN_HealthChecks/NOKs_Summary/air_noks.txt', 'r');
$air_noks=fread($handle,1000);


$handle = fopen('/opt/lampp/htdocs/OTN_HealthChecks/NOKs_Summary/occ_noks.txt', 'r');
$occ_noks=fread($handle,1000);


$handle = fopen('/opt/lampp/htdocs/OTN_HealthChecks/NOKs_Summary/ccn_noks.txt', 'r');
$ccn_noks=fread($handle,1000);


$handle = fopen('/opt/lampp/htdocs/OTN_HealthChecks/NOKs_Summary/ngvs_noks.txt', 'r');
$ngvs_noks=fread($handle,1000);


$handle = fopen('/opt/lampp/htdocs/OTN_HealthChecks/NOKs_Summary/ngcrs_noks.txt', 'r');
$ngcrs_noks=fread($handle,1000);





$connect = mysqli_connect("10.13.64.58","minsat2","smaoui009","kannel_db");   

 
 
 $query ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'HC_NOK_IN', '50011405', 'SDP_NOK : $sdp_noks AIR_NOK : $air_noks OCC_NOK : $occ_noks CCN_NOK : $ccn_noks NGVS_NOK : $ngvs_noks NGCRS_NOK : $ngcrs_noks', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$result = mysqli_query($connect, $query);

 $querya ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'HC_NOK_IN', '50012718', 'SDP_NOK : $sdp_noks AIR_NOK : $air_noks OCC_NOK : $occ_noks CCN_NOK : $ccn_noks NGVS_NOK : $ngvs_noks NGCRS_NOK : $ngcrs_noks', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resulta = mysqli_query($connect, $querya);

 $queryb ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'HC_NOK_IN', '50012012', 'SDP_NOK : $sdp_noks AIR_NOK : $air_noks OCC_NOK : $occ_noks CCN_NOK : $ccn_noks NGVS_NOK : $ngvs_noks NGCRS_NOK : $ngcrs_noks', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultb = mysqli_query($connect, $queryb);		
		
 $queryc ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'HC_NOK_IN', '50011572', 'SDP_NOK : $sdp_noks AIR_NOK : $air_noks OCC_NOK : $occ_noks CCN_NOK : $ccn_noks NGVS_NOK : $ngvs_noks NGCRS_NOK : $ngcrs_noks', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultc = mysqli_query($connect, $queryc);

 $queryd ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'HC_NOK_IN', '50013115', 'SDP_NOK : $sdp_noks AIR_NOK : $air_noks OCC_NOK : $occ_noks CCN_NOK : $ccn_noks NGVS_NOK : $ngvs_noks NGCRS_NOK : $ngcrs_noks', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultd = mysqli_query($connect, $queryd);

 // $querye ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 // ( 'MT', 'HC_NOK_IN', '50012066', 'SDP_NOK : $sdp_noks AIR_NOK : $air_noks OCC_NOK : $occ_noks CCN_NOK : $ccn_noks NGVS_NOK : $ngvs_noks NGCRS_NOK : $ngcrs_noks', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
// $resulte = mysqli_query($connect, $querye);


?>





