<?php 
// error_reporting(0);
//Database Connection
$conn = mysqli_connect("10.13.64.59","root","rootme123","erp");
//Check for connection error
if($conn->connect_error){
  die("Error in DB connection: ".$conn->connect_errno." : ".$conn->connect_error);    
}

if(isset($_POST['submit'])){
 // Count total uploaded files
 
  $a = $_POST["swan"]  ;
 $b = $_POST["wo"] ;
 $c = $_POST["datedemep"] ;
 $d = $_POST["demandeur"] ;
 $e = $_POST["cr"];
 $f = $_POST["woenvoye"] ;
 $g = $_POST["kickoff"] ;
 $h = $_POST["mep"] ;
 $i = $_POST["description"] ;
 $j = $_POST["etatmep"] ;
 $k = $_POST["executeur"] ;
 $ii= str_replace("'", "`", $i);
 $iii= str_replace("’", "`", $ii);
 $bb = str_replace("’", "`", $b);
 $bbb = str_replace("'", "`", $bb);
 
$insert = "INSERT into docin(ts,wo,datedemep,demandeur,cr,woenvoye,kickoff,mep,description,etatmep,executeur) 
		values('".utf8_decode($a)."','".utf8_decode($bbb)."','".utf8_decode($c)."','".utf8_decode($d)."'
		,'".utf8_decode($e)."','".utf8_decode($f)."','".utf8_decode($g)."'
		,'".utf8_decode($h)."','".utf8_decode($iii)."','".utf8_decode($j)."','".utf8_decode($k)."')";
		mysqli_query($conn, $insert);

 

 $totalfiles = count($_FILES['file']['name']);

 // Looping over all files
 for($i=0;$i<$totalfiles;$i++){
 $filename = $_FILES['file']['name'][$i];
  $z =  $filename  ;
  $zz = str_replace("’", "`", $z);
 $zzz = str_replace("'", "`", $zz);

// Upload files and store in database

if(move_uploaded_file($_FILES["file"]["tmp_name"][$i],"uploads/$a-".$filename)){
		// Image db insert sql
		$insertaa = "INSERT into files(file_name,uploaded_on,status) values('$a-".utf8_decode($zzz)."',now(),'".utf8_decode($a)."')";
		if(mysqli_query($conn, $insertaa)){
		  echo 'Data inserted successfully';
		}
		else{
		  echo 'Error: '.mysqli_error($conn);
		}
	}else{
		echo 'Error in uploading file - '.$_FILES['file']['name'][$i].'<br/>';
	}
 }
 
 
 
 
 
$connecta = mysqli_connect("10.13.64.58","root","rootme123","kannel_db");   
// $queryxxq ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 // ( 'MT', 'New WO', '50011743', '($a : $c) ; $d / $k : $b', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
// $resultq = mysqli_query($connecta, $queryxxq);
 	// if($resultq){
		  // echo 'SMS envoyé';
		// }
		// else{
		  // echo 'Error: '.mysqli_error($connecta);
		// }
 
 
 $queryxxqq ="INSERT INTO send_sms ( momt, sender, receiver, msgdata, sms_type,time,coding,charset) VALUES
 ( 'MT', 'New WO', '50011405', '($a : $c) ; $d / $k : $b', 2,UNIX_TIMESTAMP(),0,'latin1'); ";
$resultqq = mysqli_query($connecta, $queryxxqq);
 	if($resultqq){
		  echo 'SMS envoyé';
		}
		else{
		  echo 'Error: '.mysqli_error($connecta);
		}
 
}


header("location:listewo"); 
?>
