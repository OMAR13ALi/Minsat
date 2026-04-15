<?php
session_start();
error_reporting(0);
if(($_SESSION['role'] != 'dsc') && ($_SESSION['role'] != 'admin') && ($_SESSION['role'] != 'bob2b') && ($_SESSION['role'] != 'dfi') && ($_SESSION['role'] != 'smcbo')){
	header('Location: ../404');
}
elseif(empty($_SESSION['username'])) 
{

  header('Location: ../index');
  exit();
}
$connect = mysqli_connect("localhost","root","","adminin");

date_default_timezone_set('Africa/Tunis');
$datee=date('d/m/Y H:i');
$dateee=date('d/m/Y');
$user=$_SESSION['username'];
$msisdn=$_POST["msisdn"];
$sqlss="update audit set sessionout='$datee' where login='$user' and sessionin like '$dateee%'  ";
$resultss=mysqli_query($connect,$sqlss);


session_unset();

// destroy the session
session_destroy(); 
header("Location: ../../minsat");

?>