
<?php

// error_reporting(E_All);
$connect = mysqli_connect("10.13.64.59","root","rootme123","adminin");
 

// Define $username and $mypassword
$username=$_POST['username'];
$password=$_POST['password'];



// $username = stripslashes($username);
// $password = stripslashes($password);

// $username = mysql_real_escape_string($username);
// $password = mysql_real_escape_string($password);


$sql="SELECT * FROM members WHERE username='$username' and password='$password'  ";
$result=mysqli_query($connect,$sql);

$count=mysqli_num_rows($result);


if($count==1){
$result=mysqli_fetch_array($result);
$role = $result['role'];
$nom = $result['nom'];
$prenom = $result['prenom'];
$passwordd = $result['password'];

$_SESSION['username']="username";
$_SESSION['password']="password";
// rafika: ici une redirection de page selon le role
// if($role =='admin'){
// $link = 'x.php';
// }
// elseif($role =='agent'){
// $link ='y.php';
// }
session_start();

if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
$ip = $_SERVER['HTTP_CLIENT_IP'];
} 
else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} 
else {
$ip = $_SERVER['REMOTE_ADDR'];
}

$client = $_SERVER['HTTP_USER_AGENT'];
$os=explode(";",$client)[1];
$browser=end(explode(" ",$client));	

date_default_timezone_set('Africa/Tunis');

        $datee=date('d/m/Y H:i');
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $role;
        $_SESSION['nom'] = $nom;
        $_SESSION['prenom'] = $prenom;
		// $sqlss="insert into usersconnect (`login`,`date`) values ('".$username."','".$date."')  ";
         // $resultss=mysql_query($sqlss);
		 if($passwordd =='Orange_Minsat_2023'){
			header("Location: resetpassword");
			}
			else
			{
	$sqlss="insert into audit (`login`,`role`,`sessionin`,`ip`,`os`,`browser`) 
	values ('".$username."','".$role."','".$datee."','".$ip."','".$os."','".$browser."')  ";
         $resultss=mysqli_query($connect,$sqlss);				
				
				
        header("Location: dashboards/getmsisdninformation");
        exit();
			}
}
else {
header("location:404");
}


?>




