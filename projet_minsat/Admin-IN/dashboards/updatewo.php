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
 
  $aa = utf8_decode($_POST["id"]) ;
  $a = utf8_decode($_POST["swan"]) ;
  $b = utf8_decode($_POST["wo"]) ;
 $c = utf8_decode($_POST["datedemep"]) ;
 $d = utf8_decode($_POST["demandeur"]) ;
 $h = utf8_decode($_POST["mep"]) ;
 $i = utf8_decode($_POST["description"]) ;
 $j = utf8_decode($_POST["etatmep"]) ;
 $k = utf8_decode($_POST["executeur"]) ;
  $ii= str_replace("'", "`", $i);
 $iii= str_replace("’", "`", $ii);
 $iiii= str_replace("é", "e", $iii);
 $iiiia= str_replace("à", "a", $iiii);
 $iiiiab= str_replace("ê", "e", $iiiia);
 
$insert = "update docin set ts='$a',datedemep='$c',demandeur='$d',mep='$h',description='$iiiiab',etatmep='$j',executeur='$k' , wo='$b'
		where id='$aa'";
		mysqli_query($conn, $insert);
 
 
 $totalfiles = count($_FILES['file']['name']);

 // Looping over all files
 for($i=0;$i<$totalfiles;$i++){
 $filename = $_FILES['file']['name'][$i];
  $z = utf8_encode($filename) ;
// Upload files and store in database
if(move_uploaded_file($_FILES["file"]["tmp_name"][$i],"uploads/$a-".$filename)){
		// Image db insert sql
		$insertaa = "INSERT into files(file_name,uploaded_on,status) values('$z',now(),'$a')";
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
}


header("location:listewo"); 
?>

