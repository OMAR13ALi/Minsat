<?php

$connecta = mysqli_connect("10.13.64.58","minsat2","smaoui009","kannel_db");   
$queryxxq ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'MINSAT', '50011405', 'Votre mot de passe a été changé ; password : KKKK', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultq = mysqli_query($connecta, $queryxxq);
 	if($resultq){
		  echo 'SMS envoyé';
		}
		else{
		  echo 'Error: '.mysqli_error($connecta);
		}

?>
