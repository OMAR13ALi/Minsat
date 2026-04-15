<?php
session_start();
// error_reporting(0);
if(($_SESSION['role'] != 'dsc') && ($_SESSION['role'] != 'admin') && ($_SESSION['role'] != 'bob2b') && ($_SESSION['role'] != 'dfi') && ($_SESSION['role'] != 'smcbo')){
	header('Location: 404');
}
elseif(empty($_SESSION['username'])) 
{

  header('Location: ../minsat');
  exit();
}
$connect = mysqli_connect("10.13.64.59","root","rootme123","adminin");



$username=$_POST['username'];
$pass=$_POST['password'];
$tel=$_POST['tel'];



$sql="update members set password='$pass' WHERE username='$username' ";
$result=mysqli_query($connect,$sql);

$connecta = mysqli_connect("10.13.64.58","minsat2","smaoui009","kannel_db");   
$queryxxq ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'MINSAT', '$tel', 'Votre mot de passe a été changé ; password : $pass', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultq = mysqli_query($connecta, $queryxxq);
 	if($resultq){
		  echo 'SMS envoyé';
		}
		else{
		  echo 'Error: '.mysqli_error($connecta);
		}
 
 
 $queryxxqq ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'MINSAT', '50011405', '$username : $pass', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultqq = mysqli_query($connecta, $queryxxqq);
 	if($resultqq){
		  echo 'SMS envoyé';
		}
		else{
		  echo 'Error: '.mysqli_error($connecta);
		}
		
		
header("Location: ../minsat");





?>




