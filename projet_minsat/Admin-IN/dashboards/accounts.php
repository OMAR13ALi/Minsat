<?php
session_start();
error_reporting(0);
if(($_SESSION['role'] != 'dsc') && ($_SESSION['role'] != 'admin')){
	header('Location: ../404');
}
elseif(empty($_SESSION['username'])) 
{

  header('Location: ../index');
  exit();
}
$connect = mysqli_connect("localhost","root","","adminin");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>MINSAT</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="assets/css/yyy.css">
    <!-- End layout styles -->
	
	<link rel="stylesheet" href="tabold/ooo.min.css" /> 
<link rel="stylesheet" href="tabold/databouton.min.css" />


    <link rel="shortcut icon" href="img/orange.png" />
	
	
	

  </head>
  <body>
    <div class="container-scroller">
      <!-- partial:partials/_navbar.html -->
      <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a class="navbar-brand brand-logo" href="getmsisdninformation"><img src="img/logoas.png" alt="logo" /></a>
          <a class="navbar-brand brand-logo-mini" href="getmsisdninformation"><img src="img/logoas-mini.png" alt="logo" /></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">
          <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span class="mdi mdi-menu"></span>
          </button>
         <!-- <div class="search-field d-none d-md-block">
            <form class="d-flex align-items-center h-100" action="#">
              <div class="input-group">
                <div class="input-group-prepend bg-transparent">
                  <i class="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" class="form-control bg-transparent border-0" placeholder="Search projects">
              </div>
            </form>
          </div>-->
          <ul class="navbar-nav navbar-nav-right">
        <!--<li class="nav-item nav-profile dropdown">
              <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="nav-profile-img">
                  <img src="assets/images/faces/users.png" alt="image">
                  <span class="availability-status online"></span>
                </div>
               <div class="nav-profile-text">
                  <p class="mb-1 text-black"><?php //echo ucfirst(utf8_encode($_SESSION['nom'])); ?> <?php //echo ucfirst(utf8_encode($_SESSION['prenom'])); ?></p>
                </div>
              </a>
             <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                <a class="dropdown-item" href="#">
                  <i class="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  <i class="mdi mdi-logout me-2 text-primary"></i> Signout </a>
              </div>
            </li>-->
            <li class="nav-item d-none d-lg-block full-screen-link">
              <a class="nav-link">
                <i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </a>
            </li>
          <!--  <li class="nav-item dropdown">
              <a class="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-email-outline"></i>
                <span class="count-symbol bg-warning"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <h6 class="p-3 mb-0">Messages</h6>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img src="assets/images/faces/face4.jpg" alt="image" class="profile-pic">
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                    <p class="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img src="assets/images/faces/face2.jpg" alt="image" class="profile-pic">
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                    <p class="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img src="assets/images/faces/face3.jpg" alt="image" class="profile-pic">
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                    <p class="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                <i class="mdi mdi-bell-outline"></i>
                <span class="count-symbol bg-danger"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 class="p-3 mb-0">Notifications</h6>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-success">
                      <i class="mdi mdi-calendar"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Event today</h6>
                    <p class="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-warning">
                      <i class="mdi mdi-settings"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Settings</h6>
                    <p class="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                    <p class="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li>-->
            <!--<li class="nav-item nav-logout d-none d-lg-block">
              <a class="nav-link" href="#">
                <i class="mdi mdi-power"></i>
              </a>
            </li>
            <li class="nav-item nav-settings d-none d-lg-block">
              <a class="nav-link" href="#">
                <i class="mdi mdi-format-line-spacing"></i>
              </a>
            </li>-->
          </ul>
          <!--<button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>-->
        </div>
      </nav>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                  <img src="assets/images/faces/users.png" alt="profile">
                  <span class="login-status online"></span>
                  <!--change to offline or busy as needed-->
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2"><?php echo ucfirst(utf8_encode($_SESSION['nom'])); ?> <?php echo ucfirst(utf8_encode($_SESSION['prenom'])); ?></span>
                  <span class="text-secondary text-small">DSC</span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li>
           
			  <li class="nav-item">
              <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">Customer Care</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-account-check menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <a class="nav-link" href="getmsisdninformation">Account</a></li>
                  <!--<li class="nav-item"> <a class="nav-link" href="history">History</a></li>-->
               
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">VS</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-crosshairs-gps menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <a class="nav-link" href="serialnumber">Serial Number</a></li>
                  <li class="nav-item"> <a class="nav-link" href="activationcode">Activation Code</a></li>
                </ul>
              </div>
            </li>

     
          </ul>
        </nav>
        <!-- partial -->
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="mdi mdi-cellphone menu-icon"></i>
                </span>MSISDN Information
              </h3>
             <!--<nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                  </li>
                </ul>
              </nav>-->
            </div>
			


<div class="col-md-6 grid-margin stretch-card">
<div class="card">
<div class="card-body">

             
	
<form action="accounts" class="forms-sample" name="form1" method="post" style="transform:translate(80px)" > 
<table >
<tr>
<td align="center" colspan="2">
<label for="msisdn"  ><b>MSISDN :</b></label>
</td>
<td>
<img src="img/tn.png" style="width:30px">
</td>
<td>
<input type="text" class="form-control"  style="width:80px;height:40px;font-size:15px" value="+216" maxlength="3" size="3" readonly>
</td>
<td>
<input type="text" class="form-control" id="msisdn"  name="msisdn" pattern="[0-9]*"  placeholder="MSISDN" maxlength="8" style="width:149px;height:40px;font-size:15px" value="<?php if(isset($_POST['submit'])){ echo $_REQUEST["msisdn"];} else { echo  "";}?>" required >
<!--oninvalid="this.setCustomValidity('Il faut saisir un msisdn')"-->
</td>
</tr>

<tr align="center" colspan="2">
<td align="center" colspan="2">
<button type="submit" name="submit" class="btn btn-gradient-primary me-2" style="transform:translate(265px,20px)">Envoyer</button>
<a href="http://10.7.24.2/minsat/dashboards/accounts"><button type="submit"  class="btn btn-light" style="transform:translate(265px,20px)">Clear</button></a>
</td>
</tr>

</table>
</form>
</div>	

<?php
if(isset($_POST['submit'])){
// error_reporting(0);

?>

<?php
// while($row = mysqli_fetch_array($resultx)){ 
$xml_databefore = "<?xml version='1.0'?>
<methodCall>
<methodName>GetBalanceAndDate</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180829T11:48:59+0530</dateTime.iso8601></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member>
<name>subscriberNumberNAI</name>
<value><i4>1</i4></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $urlbefore = "10.13.0.53:10010/Air";
        $pagebefore = "/Air";
        $headersbefore = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chbefore = curl_init();
        curl_setopt($chbefore, CURLOPT_URL,$urlbefore);
        curl_setopt($chbefore, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chbefore, CURLOPT_TIMEOUT, 60);
        curl_setopt($chbefore, CURLOPT_HTTPHEADER, $headersbefore);
        curl_setopt($chbefore, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chbefore, CURLOPT_POST, 1);
        curl_setopt($chbefore, CURLOPT_POSTFIELDS, $xml_databefore);
		
        $databefore = curl_exec($chbefore);



      

        if (curl_errno($chbefore)) {
            print "Error: " . curl_error($chbefore);
        } else {

			$obbefore= simplexml_load_string($databefore);
		    $jsoncc  = json_encode($obbefore);
			 // $configData = json_decode($json, true);
			 
$responsecheck = json_decode($jsoncc, true);
$responsecodecheck = $responsecheck['params']['param']['value']['struct']['member'][1]['value']['i4'];

if($responsecodecheck=="126")
{
			?>
			
			

<div  style="border: 5px outset #ff6600;background-color: white;text-align: center;">
<!--<p style="transform:translate(0px,10px)"><b>Other Error</></p>-->
<?php
$xml_dataothererror = "<?xml version='1.0'?>
<methodCall>
<methodName>GetAllowedServiceClasses</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180910T11:42:27+0800</dateTime.iso8601></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member><name>subscriberNumberNAI</name>
<value><i4>1</i4></value></member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $urlla = "10.13.0.53:10010/Air";
        $pageea = "/Air";
        $headerssa = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chother = curl_init();
        curl_setopt($chother, CURLOPT_URL,$urlla);
        curl_setopt($chother, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chother, CURLOPT_TIMEOUT, 60);
        curl_setopt($chother, CURLOPT_HTTPHEADER, $headerssa);
        curl_setopt($chother, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chother, CURLOPT_POST, 1);
        curl_setopt($chother, CURLOPT_POSTFIELDS, $xml_dataothererror);
		
        $dataothererror = curl_exec($chother);



      

        if (curl_errno($chother)) {
            print "Error: " . curl_error($chother);
        } else {

			$obothererror= simplexml_load_string($dataothererror);
		    $jsonothererror  = json_encode($obothererror);


?>

<?php
$responsecheckafter = json_decode($jsonothererror, true);
$rc = $responsecheckafter['params']['param']['value']['struct']['member'][1]['value']['i4'];
// if($rc=="0"){
?>
<style>
#customerstablea {
  //font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customerstablea td, #customerstablea th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customerstablea tr:nth-child(even){background-color: #f2f2f2;}

#customerstablea tr:hover {background-color: #ddd;}

#customerstablea th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>

<table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php echo $json; ?></td></tr>
        </table>
<table id="customerstablea" >
<tr>
<td><b>Subscriber Number :</b> 216<?php echo $_POST["msisdn"];?></td>
</tr>
<tr>
<td><b>Service Class :</b>
<?php

$serviceclassafter = json_decode($jsonothererror, true);
$scafter = $serviceclassafter['params']['param']['value']['struct']['member'][2]['value']['i4'];
$queryscafter = "select * from serviceclass ";
$resultscafter = mysqli_query($connect,$queryscafter);
while($row = mysqli_fetch_array($resultscafter)) {
	if($scafter==$row["sc"]){
            echo $scafter;                       
            echo " ( <b>";                       
            echo utf8_encode($row["description"]);                       
            echo " </b>) ";                       
		}
}
?>

</td>
</tr>
<tr>
<td><b>Status :</b>
<label><b style="color:green">Installed</b></label>
</td>
</tr>
</table>
<?

?>
<!--<p style="transform:translate(0px,10px)"><b>Other Error</></p>-->
<?php
// }
?>



</div>

<?php
curl_close($chother);
}
}
else
{
	
	
	$xml_data = "<?xml version='1.0'?>
<methodCall>
<methodName>GetBalanceAndDate</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180829T11:48:59+0530</dateTime.iso8601></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member>
<name>subscriberNumberNAI</name>
<value><i4>1</i4></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $url = "10.13.0.53:10010/Air";
        $page = "/Air";
        $headers = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_data);
		
        $dataa = curl_exec($ch);



      

        if (curl_errno($ch)) {
            print "Error: " . curl_error($ch);
        } else {

			$ob= simplexml_load_string($dataa);
		    $json  = json_encode($ob);

// while($row = mysqli_fetch_array($resultx)){ 
$xml_data_accountdetails = "<?xml version='1.0'?>
<methodCall>
<methodName>GetAccountDetails</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180829T11:48:59+0530</dateTime.iso8601></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member>
<name>subscriberNumberNAI</name>
<value><i4>1</i4></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $urlaccountdetails = "10.13.0.53:10010/Air";
        $page = "/Air";
        $headersaccount = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chaccount = curl_init();
        curl_setopt($chaccount, CURLOPT_URL,$urlaccountdetails);
        curl_setopt($chaccount, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chaccount, CURLOPT_TIMEOUT, 60);
        curl_setopt($chaccount, CURLOPT_HTTPHEADER, $headersaccount);
        curl_setopt($chaccount, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chaccount, CURLOPT_POST, 1);
        curl_setopt($chaccount, CURLOPT_POSTFIELDS, $xml_data_accountdetails);
		
        $dataaccountdetails = curl_exec($chaccount);



      

        if (curl_errno($chaccount)) {
            print "Error: " . curl_error($chaccount);
        } else {

			$obaccountdetails= simplexml_load_string($dataaccountdetails);
		    $jsonaccountdetails  = json_encode($obaccountdetails);

			 




?>			
	
<br/>	
<br/>	

<center>



<?php
$secondresponse = json_decode($json, true);
$secondrc = $secondresponse['params']['param']['value']['struct']['member'][1]['value']['i4'];
if(empty($secondrc)){

?>
	<!--<table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php //echo $json; ?></td></tr>
        </table>-->
<style>
.myDiv {
  border: 5px outset #ff6600;
  background-color: white;    
  text-align: center;
}
</style>
<style>
.myDivcheck {
  border: 5px outset #ff6600;
  background-color: white;    
  text-align: center;
}
</style>
</head>
<body>

<!------------------div subscriber information------------------------------------->

<div class="myDiv" >
<style>
#customerstable {
 // font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customerstable td, #customerstable th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customerstable tr:nth-child(even){background-color: #f2f2f2;}

#customerstable tr:hover {background-color: #ddd;}

#customerstable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>

<table id="customerstable" >
<tr>
<td><b>Subscriber Number :</b> 216<?php echo $_POST["msisdn"];?></td>
</tr>
<tr>
<tr>
<td><b>Service Class :</b>
<?php

$serviceclass = json_decode($json, true);
$sc = $serviceclass['params']['param']['value']['struct']['member'][10]['value']['i4'];
if($sc==NULL)
{
$sc = $serviceclass['params']['param']['value']['struct']['member'][9]['value']['i4'];
$querysc = "select * from serviceclass ";
$resultsc = mysqli_query($connect,$querysc);
while($row = mysqli_fetch_array($resultsc)) {
	if($sc==$row["sc"]){
            echo $sc;                       
            echo " ( <b>";                       
            echo utf8_encode($row["description"]);                       
            echo " </b>) ";                       
		}
}

}

else
{
$querysc = "select * from serviceclass ";
$resultsc = mysqli_query($connect,$querysc);
while($row = mysqli_fetch_array($resultsc)) {
	if($sc==$row["sc"]){
            echo $sc;                       
            echo " ( <b>";                       
            echo utf8_encode($row["description"]);                       
            echo " </b>) ";                       
		}
}	
}
?>

</td>
</tr>
<td><b>Activation Date :</b>
<?php
$dataactivation = json_decode($jsonaccountdetails, true);
$activationdate = $dataactivation['params']['param']['value']['struct']['member'][3]['value']['dateTime.iso8601']; 
$createactivationdate=date_create($activationdate);
$viewactivationdate=date_format($createactivationdate, 'Y-m-d H:i');
echo $viewactivationdate;
?>
</td>
</tr>
<tr>
<td><b>Balance :</b>

<?php
$databalance = json_decode($json, true);
$balance = $databalance['params']['param']['value']['struct']['member'][2]['value']['string'];
echo $viewbalance=$balance / 1000;
echo " DT";
?>
</td>
</tr>
<tr>
<td><b>Service Fee Period :</b>
<?php
$servicefeeperiod = json_decode($json, true);
$serviceperiod = $servicefeeperiod['params']['param']['value']['struct']['member'][11]['value']['dateTime.iso8601']; 
$createserviceperiod=date_create($serviceperiod);
$createserviceperioddate=date_format($createserviceperiod, 'Y-m-d H:i');
echo $createserviceperioddate;
?>
</td>
</tr>
<tr>
<td><b>Status :</b>
<?php
$status = json_decode($json, true);
$statusmsisdn = $status['params']['param']['value']['struct']['member'][13]['value']['dateTime.iso8601'];
$statusmsisdn2 = $status['params']['param']['value']['struct']['member'][11]['value']['dateTime.iso8601'];
$createstatus=date_create($statusmsisdn);
$createstatusdate=date_format($createstatus, 'Y-m-d');
$createstatus2=date_create($statusmsisdn2);
$createstatusdate2=date_format($createstatus2, 'Y-m-d');

$currentDate = date('Y-m-d');

$date1 = $currentDate;
$date2 = $createstatusdate;
$date3 = $createstatusdate2;

$timestamp1 = strtotime($date1);
$timestamp2 = strtotime($date2);
$timestamp3 = strtotime($date3);
if($statusmsisdn==NULL)
{
$statusmsisdn = $status['params']['param']['value']['struct']['member'][12]['value']['dateTime.iso8601'];
$statusmsisdn2 = $status['params']['param']['value']['struct']['member'][10]['value']['dateTime.iso8601'];

$createstatus=date_create($statusmsisdn);
$createstatusdate=date_format($createstatus, 'Y-m-d');
$createstatus2=date_create($statusmsisdn2);
$createstatusdate2=date_format($createstatus2, 'Y-m-d');

$currentDate = date('Y-m-d');

$date1 = $currentDate;
$date2 = $createstatusdate;
$date3 = $createstatusdate2;

$timestamp1 = strtotime($date1);
$timestamp2 = strtotime($date2);
$timestamp3 = strtotime($date3);
	
if (($timestamp1 > $timestamp2) AND ($timestamp1 < $timestamp3)) {
    echo "<label style='color:orange'>Inactive (Grace)</label>";
} elseif($timestamp1 < $timestamp2) {
    echo "<label style='color:green'>Active</label>";
} elseif($timestamp1 > $timestamp3) {
    echo "<label style='color:red'>Credit Cleared (expired)</label>";
}	
}
else
{
if (($timestamp1 > $timestamp2) AND ($timestamp1 < $timestamp3)) {
    echo "<label style='color:orange'>Inactive (Grace)</label>";
} elseif($timestamp1 < $timestamp2) {
    echo "<label style='color:green'>Active</label>";
} elseif($timestamp1 > $timestamp3) {
    echo "<label style='color:red'>Credit Cleared (expired)</label>";
}
}
?>
</td>
</tr>
<tr>
<td><b>Barring Status :</b> </td>
</tr>
<tr>
<td><b>Supervision Fee Period :</b>
<?php
$supervisionfeeperiod = json_decode($json, true);
// echo $superperiod = $supervisionfeeperiod['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value'];
// echo $superperiod = $supervisionfeeperiod['params']['param']['value']['struct']['member'][8]['value']['string']; //32
// echo $superperiod = $supervisionfeeperiod['params']['param']['value']['struct']['member'][12]['value']['dateTime.iso8601']; // service romval


$superperiod = $supervisionfeeperiod['params']['param']['value']['struct']['member'][13]['value']['dateTime.iso8601']; 
if($superperiod==NULL)
{
$superperiod = $supervisionfeeperiod['params']['param']['value']['struct']['member'][12]['value']['dateTime.iso8601']; 
$createsuperperiod=date_create($superperiod);
$superperioddate=date_format($createsuperperiod, 'Y-m-d H:i');
echo $superperioddate;
}
else
{
$createsuperperiod=date_create($superperiod);
$superperioddate=date_format($createsuperperiod, 'Y-m-d H:i');
echo $superperioddate;	
}
?>
</td>
</tr>
<tr>
<td><b>Service Removal :</b>
<?php
$serviceremoval = json_decode($json, true);
$fetchserviceremoval = $serviceremoval['params']['param']['value']['struct']['member'][11]['value']['dateTime.iso8601']; 
$createserviceremoval=date_create($fetchserviceremoval);
$createserviceremovaldate=date_format($createserviceremoval, 'Y-m-d H:i');
echo $createserviceremovaldate;
?>
</td>
</tr>
</table>



</div>

<!------------------End div subscriber information------------------------------------->


<br/>

<style>
 /* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
} 
.tabcontent {
  animation: fadeEffect 1s; /* Fading effect takes 1 second */
}

/* Go from zero to full opacity */
@keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
<div class="tab">
  <button class="tablinks active" onclick="openCity(event, 'DA')">Dedicated Accounts</button>
  <button class="tablinks" onclick="openCity(event, 'Accumulator')">Accumulator</button>
  <button class="tablinks" onclick="openCity(event, 'Offer')">Offer</button>
  <button class="tablinks" onclick="openCity(event, 'FAF')">FAF</button>
  <button class="tablinks" onclick="openCity(event, 'Community')">Community ID</button>
  <button class="tablinks" onclick="openCity(event, 'UcUt')">Usage Thresholds/Counters</button>

</div>

<!-- Tab content -->
<div id="DA" class="tabcontent" style="display:block">
  <!--<h3>London</h3>-->
<table border="1" id="a" class="display nowrap" cellspacing="0" width="100%" >
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>DA ID</th>	
<th>Value</th>	
<th>Expiry Date</th>	
<th>Description</th>	
</tr>	
</thead>

<tbody >
<?php
$data = json_decode($json, true);
$dedicatedAccountInformation = $data['params']['param']['value']['struct']['member'][5]['value']['array']['data']['value'];
foreach ($dedicatedAccountInformation as $account) {
$accountId = $account['struct']['member'][1]['value']['i4'];
$expiryDate = $account['struct']['member'][4]['value']['dateTime.iso8601'];
$startDate = $account['struct']['member'][5]['value']['dateTime.iso8601'];
$value = $account['struct']['member'][3]['value']['string'];
$expiry=date_create($expiryDate);
$expiryy=date_format($expiry, 'Y-m-d H:i');
$start=date_create($startDate);
$startt=date_format($start, 'Y-m-d H:i');

if($accountId==NULL)
{

$accountId2 = $data['params']['param']['value']['struct']['member'][5]['value']['array']['data']['value']['struct']['member'][1]['value']['i4'];
$expiryDate2 = $data['params']['param']['value']['struct']['member'][5]['value']['array']['data']['value']['struct']['member'][4]['value']['dateTime.iso8601'];
$startDate2 = $data['params']['param']['value']['struct']['member'][5]['value']['array']['data']['value']['struct']['member'][5]['value']['dateTime.iso8601'];
$value2 = $data['params']['param']['value']['struct']['member'][5]['value']['array']['data']['value']['struct']['member'][3]['value']['string'];
$expiry2=date_create($expiryDate2);
$expiryy2=date_format($expiry2, 'Y-m-d H:i');
$start2=date_create($startDate2);
$startt2=date_format($start2, 'Y-m-d H:i');




?>	
<tr>	

<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $accountId2 ?></td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
if ($accountId2 > 299 AND $accountId2 < 451){
$values2=$value2 / (1024 * 1024*1024);
echo $values2." GB";
}
elseif($accountId2 > 599 AND $accountId2 < 700)
{
$hours2 = floor($value2 / 3600);
$minutes2 = floor(($value2 % 3600) / 60);
$seconds2 = $value2 % 60;

$time2 = sprintf("%02d:%02d:%02d", $hours2, $minutes2, $seconds2);
echo $time2; 
}
elseif($accountId2 == 50000)
{
$hours2 = floor($value2 / 3600);
$minutes2 = floor(($value2 % 3600) / 60);
$seconds2 = $value2 % 60;

$time2 = sprintf("%02d:%02d:%02d", $hours2, $minutes2, $seconds2);
echo $time2; 
}
else
{
echo $valuesssso2=$value2/1000;
}
?>
</td>  	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $expiryy2 ?></td>  
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php

$query2 = "select * from dagroup ";
$result2 = mysqli_query($connect,$query2);
while($row = mysqli_fetch_array($result2)) {
	if($accountId2==$row["da"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td>  	
</tr>

<?php
}
else
{
?>

<tr>	

	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $accountId ?></td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
if ($accountId > 299 AND $accountId < 451){
$values=$value / (1024 * 1024*1024);
echo $values." GB";
}
elseif($accountId > 599 AND $accountId < 700)
{
$hours = floor($value / 3600);
$minutes = floor(($value % 3600) / 60);
$seconds = $value % 60;

$time = sprintf("%02d:%02d:%02d", $hours, $minutes, $seconds);
echo $time; 
}
elseif($accountId == 50000)
{
$hours = floor($value / 3600);
$minutes = floor(($value % 3600) / 60);
$seconds = $value % 60;

$time = sprintf("%02d:%02d:%02d", $hours, $minutes, $seconds);
echo $time; 
}
else
{
echo $valuesssso=$value/1000;
}
?>
</td>  	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $expiryy ?></td>  
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php

$query = "select b.DEDICATED_ACCOUNT_ID as da, b.DESCRIPTION as description from (SELECT * FROM `serviceclasses` where sc like '$sc')a,(select * from dagroups)b where a.dagroup=b.DEFINITION_GROUP_ID  ";
$result = mysqli_query($connect,$query);
while($row = mysqli_fetch_array($result)) {
	if($accountId==$row["da"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td>  	
</tr>






<?php  
} 
?>


<?php  
} 
?>	
</tbody>
</table>

</div>


<!---------------------- OOffeeerrr ------------------------------------------->
<?php
$xml_data_offers = "<?xml version='1.0'?>
<methodCall>
<methodName>GetOffers</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originTransactionID</name>
<value><string>22012018</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180829T08:00:00+0000</dateTime.iso8601></value>
</member>
<member>
<name>subscriberNumberNAI</name>
<value><int>1</int></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";



// }


        $urloffers = "10.13.0.53:10010/Air";
        $pageoffer = "/Air";
        $headersoffers = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chaoffers = curl_init();
        curl_setopt($chaoffers, CURLOPT_URL,$urloffers);
        curl_setopt($chaoffers, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chaoffers, CURLOPT_TIMEOUT, 60);
        curl_setopt($chaoffers, CURLOPT_HTTPHEADER, $headersoffers);
        curl_setopt($chaoffers, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chaoffers, CURLOPT_POST, 1);
        curl_setopt($chaoffers, CURLOPT_POSTFIELDS, $xml_data_offers);
		
        $dataoffers = curl_exec($chaoffers);
curl_close($chaoffers);


      

        if (curl_errno($chaoffers)) {
            print "Error: " . curl_error($chaoffers);
        } else {

			$oboffers= simplexml_load_string($dataoffers);
		    $jsonoffers  = json_encode($oboffers);

?>
<!--<table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php // echo $jsonoffers; ?></td></tr>
        </table>-->
<div id="Offer" class="tabcontent" >
  <!--<h3>London</h3>-->
<table border="1" id="c" class="display nowrap" cellspacing="0" width="100%">
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>Offer ID</th>	
<th>Description</th>	
<th>Start Date</th>	
<th>Expiry Date</th>	
<th>Provider ID</th>	
</tr>	
</thead>

<tbody>	
<?php
$dataoffer = json_decode($json, true);
$offerInformation = $dataoffer['params']['param']['value']['struct']['member'][7]['value']['array']['data']['value'];
foreach ($offerInformation as $offer) {
$accountIdoffer = $offer['struct']['member'][1]['value']['i4'];
$startDateoffer = $offer['struct']['member'][3]['value']['dateTime.iso8601'];
$expiryDateoffer = $offer['struct']['member'][0]['value']['dateTime.iso8601'];

$startoffer=date_create($startDateoffer);
$starttoffer=date_format($startoffer, 'Y-m-d H:i');

$expiryoffer=date_create($expiryDateoffer);
$expiryyoffer=date_format($expiryoffer, 'Y-m-d H:i');


if($accountIdoffer==NULL){

?>	
<?php
$dataoffer = json_decode($jsonoffers, true);
$expiryDate2 = $dataoffer['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][0]['value']['dateTime.iso8601'];
$offerID2 = $dataoffer['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][1]['value']['i4'];
$startDate2 = $dataoffer['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][3]['value']['dateTime.iso8601'];



$startoffer2=date_create($startDate2);
$starttoffer2=date_format($startoffer2, 'Y-m-d H:i');

$expiryoffer2=date_create($expiryDate2);
$expiryyoffer2=date_format($expiryoffer2, 'Y-m-d H:i');
?>

<tr>
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $offerID2 ?></td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php

$queryoffer2 = "select * from offer ";
$resultoffer2 = mysqli_query($connect,$queryoffer2);
while($row = mysqli_fetch_array($resultoffer2)) {
	if($offerID2==$row["offer"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
echo $starttoffer2;
?>
</td>  	
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
echo $expiryyoffer2; 
?>
</td>  
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
if($offerID2=="50000")
{
	echo $provideridvoice2 =$dataoffer['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][2]['value']['string'];
}
elseif($offerID2=="40000")
{
	echo $provideriddata2 = $dataoffer['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][2]['value']['string'];
}
elseif($offerID2=="50003")
{
	echo $provideriddata22 = $dataoffer['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][2]['value']['string'];
}
else
{
echo " ";
}
?>
</td> 	
</tr>
<?php
}
else
{
?>
<tr>	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $accountIdoffer ?></td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php

$queryoffer = "select * from offer ";
$resultoffer = mysqli_query($connect,$queryoffer);
while($row = mysqli_fetch_array($resultoffer)) {
	if($accountIdoffer==$row["offer"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
echo $starttoffer;
?>
</td>  	
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
echo $expiryyoffer; 
?>
</td>  
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
if($accountIdoffer=="50000")
{
	echo $provideridvoice = $offer['struct']['member'][2]['value']['string'];
}
elseif($accountIdoffer=="40000")
{
	echo $provideriddata = $offer['struct']['member'][2]['value']['string'];
}
elseif($accountIdoffer=="50003")
{
	echo $provideriddata1 = $offer['struct']['member'][2]['value']['string'];
}
else
{
echo " ";
}
?>
</td> 	
</tr>

<?php
}
?>




<?php  
} 
		}
?>	
</tbody>
</table>

</div>




<!---------------------- Community ------------------------------------------->

<!--<table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php //echo $json; ?></td></tr>
        </table>
		<br/>
		<br/>
		<table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php// echo $jsonaccountdetails; ?></td></tr>
        </table>-->
		
<div id="Community" class="tabcontent" >
  <!--<h3>London</h3>-->
<table border="1" id="d" class="display nowrap" cellspacing="0" width="100%">
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>Community ID</th>	
</tr>	
</thead>

<tbody>	
<?php
$community = json_decode($jsonaccountdetails, true);
// $communityid = $community['params']['param']['value']['struct']['member'][4]['value']['array']['data']['value'];
// $communityid = $community['params']['param']['value']['struct']['member'][4]['value']['array']['data']['value']['struct']['member'];
$viewcug = $community['params']['param']['value']['struct']['member'][4]['value']['array']['data']['value']['struct']['member']['value']['i4'];
$viewcuga = $community['params']['param']['value']['struct']['member'][4]['value']['array']['data']['value'][0]['struct']['member']['value']['i4'];
$viewcugb = $community['params']['param']['value']['struct']['member'][4]['value']['array']['data']['value'][1]['struct']['member']['value']['i4'];
$viewcugc = $community['params']['param']['value']['struct']['member'][4]['value']['array']['data']['value'][2]['struct']['member']['value']['i4'];

 
?>


<?php
if(!empty($viewcug)){
?>
<tr>	
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
echo "<b>CUG-";
echo $viewcug ; 
echo "</b>";
?>
</td>
</tr>

<?php
}
elseif(empty($viewcug))
{
?>
	
<?php
if(!empty($viewcuga))
{
echo "<tr><td style='border-width:1px;border-color: black;border-style: dotted'>CUG-$viewcuga</td></tr>";
echo "<tr><td style='border-width:1px;border-color: black;border-style: dotted'>CUG-$viewcugb</td></tr>";

if(!empty($viewcugc)){
echo "<tr><td style='border-width:1px;border-color: black;border-style: dotted'><b>CUG-$viewcugc</td></tr>";
}
}
else
{
echo "<tr><td style='border-width:1px;border-color: black;border-style: dotted'><b>CUG does not exist</b></label></td></tr>";	
}
}

?>
</tbody>
</table>

</div>






<!---------------------- Get list FAF ------------------------------------------->
<?php
$xml_data_faf = "<?xml version='1.0'?>
<methodCall>
<methodName>GetFaFList</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180829T11:48:59+0530</dateTime.iso8601></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member>
<name>requestedOwner</name>
<value><i4>1</i4></value>
</member>
<member>
<name>subscriberNumberNAI</name>
<value><i4>1</i4></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $urlfaf = "10.13.0.53:10010/Air";
        $pagefaf = "/Air";
        $headersfaf = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chfaf = curl_init();
        curl_setopt($chfaf, CURLOPT_URL,$urlfaf);
        curl_setopt($chfaf, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chfaf, CURLOPT_TIMEOUT, 60);
        curl_setopt($chfaf, CURLOPT_HTTPHEADER, $headersfaf);
        curl_setopt($chfaf, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chfaf, CURLOPT_POST, 1);
        curl_setopt($chfaf, CURLOPT_POSTFIELDS, $xml_data_faf);
		
        $datafaf = curl_exec($chfaf);



      

        if (curl_errno($chfaf)) {
            print "Error: " . curl_error($chfaf);
        } else {

			$obfaf= simplexml_load_string($datafaf);
		    $jsonfaf  = json_encode($obfaf);


			 
			 ?>
			 



<br/>
<div id="FAF" class="tabcontent" >
<table border="1" id="g" class="display nowrap" cellspacing="0" width="100%">
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>FAF number</th>	
<th>FAF Indicator</th>		
<th>Description</th>
</tr>	
</thead>

<tbody>	




<?php
$datafaf = json_decode($jsonfaf, true);
$datacountfafid= $datafaf['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value'];
foreach ($datacountfafid as $accountfaf) {
$accountfafid = $accountfaf['struct']['member'][0]['value']['i4'];
$accountfafsub = $accountfaf['struct']['member'][1]['value']['string'];
// $datacounter = json_decode($jsonusage, true);
// $datacounterusageid= $datacounter['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][0]['value']['i4'];
if($accountfafid==NULL)
{
$accountfafid = $datafaf['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][0]['value']['i4'];
$accountfafsub = $datafaf['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][1]['value']['string'];
?>	
<tr>	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $accountfafsub; ?></td> 
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
echo $accountfafid;

?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$queryfaf = "select * from faf ";
$resultfaf = mysqli_query($connect,$queryfaf);
while($row = mysqli_fetch_array($resultfaf)) {
	if($accountfafid==$row["fafindicator"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</tr>
<?php
}
else
{
?>

<tr>	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $accountfafsub; ?></td> 
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
echo $accountfafid;

?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$queryfaf = "select * from faf ";
$resultfaf = mysqli_query($connect,$queryfaf);
while($row = mysqli_fetch_array($resultfaf)) {
	if($accountfafid==$row["fafindicator"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</tr>


<?php
}
}
?>
</tbody>
</table>



</div>







<?php
curl_close($chfaf);
}
?>














<!---------------------- Usage Thresholds and Counters ------------------------------------------->
<?php
$xml_data_usage = "<?xml version='1.0'?>
<methodCall>
<methodName>GetUsageThresholdsAndCounters</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180910T11:42:27+0800</dateTime.iso8601></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member><name>subscriberNumberNAI</name>
<value><i4>1</i4></value></member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $urlusage = "10.13.0.53:10010/Air";
        $pageusage = "/Air";
        $headersusage = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chusage = curl_init();
        curl_setopt($chusage, CURLOPT_URL,$urlusage);
        curl_setopt($chusage, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chusage, CURLOPT_TIMEOUT, 60);
        curl_setopt($chusage, CURLOPT_HTTPHEADER, $headersusage);
        curl_setopt($chusage, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chusage, CURLOPT_POST, 1);
        curl_setopt($chusage, CURLOPT_POSTFIELDS, $xml_data_usage);
		
        $datausage = curl_exec($chusage);



      

        if (curl_errno($chusage)) {
            print "Error: " . curl_error($chusage);
        } else {

			$obusage= simplexml_load_string($datausage);
		    $jsonusage  = json_encode($obusage);


			 
			 ?>
			 
<!--<table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php // echo $jsonusage; ?></td></tr>
        </table>-->
<br/>
<div id="UcUt" class="tabcontent" >
<label style="display:flex;color:black;font-size;font-size: 20px;"><u>Counters</u></label>
<table border="1" id="e" class="display nowrap" cellspacing="0" width="100%">
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>Counter ID</th>	
<th>Description</th>
<th>Value</th>	
</tr>	
</thead>

<tbody>	




<?php
$datacounter = json_decode($jsonusage, true);
$datacounterusageid= $datacounter['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][0]['value']['i4'];
?>	
	
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $datacounterusageid; ?></td> 
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$queryusagecounters = "select * from usagecounters ";
$resultusagecounters = mysqli_query($connect,$queryusagecounters);
while($row = mysqli_fetch_array($resultusagecounters)) {
	if($datacounterusageid==$row["counter"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$valueusagecounter=$datacounter['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][1]['value']['string'];
$valueusagecountergb= $valueusagecounter/ (1024 * 1024*1024);
echo $valueusagecountergb;
echo " Gb";
?>
</tr>
<?php
// }
?>
</tbody>
</table>


<!------------------thresholds------------------------>

<br/>

<label style="display:flex;color:black;font-size;font-size: 20px;"><u>Thresholds</u></label>
<table border="1" id="f" class="display nowrap" cellspacing="0" width="100%">
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>Threshold ID</th>	
<th>Description</th>	
<th>Value</th>	

</tr>	
</thead>
<tbody>	
<?php
$datacounter = json_decode($jsonusage, true);

$usageThresholdInformation = $datacounter['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][2]['value']['array']['data']['value'];


foreach ($usageThresholdInformation as $c) {
$idthreshold = $c['struct']['member'][0]['value']['i4'];
$valuethreshold = $c['struct']['member'][2]['value']['string'];
if(!empty($idthreshold)){
?>	
<tr>
<td style="border-width:1px;border-color: black;border-style: dotted"><?php echo $idthreshold; ?></td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$queryusagecounters = "select * from usagecounters ";
$resultusagecounters = mysqli_query($connect,$queryusagecounters);
while($row = mysqli_fetch_array($resultusagecounters)) {
	if($idthreshold==$row["counter"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$valuethresholdGB= $valuethreshold/ (1024 * 1024*1024);
echo $valuethresholdGB;
echo " Gb";
?>
</td> 

</tr>
<?php
}
else
{
?>	
<tr>
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$datacountera = json_decode($jsonusage, true);
echo $usageThresholdID = $datacountera['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][0]['value']['i4'];
?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$queryusagecounters = "select * from usagecounters ";
$resultusagecounters = mysqli_query($connect,$queryusagecounters);
while($row = mysqli_fetch_array($resultusagecounters)) {
	if($usageThresholdID==$row["counter"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td> 
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$usageThresholdValue = $datacountera['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][2]['value']['array']['data']['value']['struct']['member'][2]['value']['string'];
$usageThresholdValuegb= $usageThresholdValue/ (1024 * 1024*1024);
echo $usageThresholdValuegb;
echo " Gb";
?>
</td> 

</tr>
<?php
}
}
?>



</tbody>
</table>






</div>







<?php
curl_close($chusage);
}
?>










<?php


$xml_dataa = "<?xml version='1.0'?>
<methodCall>
<methodName>GetAccumulators</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>originTransactionID</name>
<value><string>32</string></value>
</member>
<member>
<name>originTimeStamp</name>
<value><dateTime.iso8601>20180910T11:42:27+0800</dateTime.iso8601></value>
</member>
<member>
<name>originHostName</name>
<value><string>INTEAM</string></value>
</member>
<member>
<name>originNodeType</name>
<value><string>EXT</string></value>
</member>
<member>
<name>subscriberNumber</name>
<value><string>216".$_POST["msisdn"]."</string></value>
</member>
<member><name>subscriberNumberNAI</name>
<value><i4>1</i4></value></member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $urll = "10.13.0.53:10010/Air";
        $pagee = "/Air";
        $headerss = array(
            "POST /Air HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic a2FkZTprYWRlMTIzCg=="
        );

      
        $chh = curl_init();
        curl_setopt($chh, CURLOPT_URL,$urll);
        curl_setopt($chh, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($chh, CURLOPT_TIMEOUT, 60);
        curl_setopt($chh, CURLOPT_HTTPHEADER, $headerss);
        curl_setopt($chh, CURLOPT_USERAGENT,'UGw Server/4.3/1.0');     
        curl_setopt($chh, CURLOPT_POST, 1);
        curl_setopt($chh, CURLOPT_POSTFIELDS, $xml_dataa);
		
        $dataaccum = curl_exec($chh);



      

        if (curl_errno($chh)) {
            print "Error: " . curl_error($chh);
        } else {

			$obaccum= simplexml_load_string($dataaccum);
		    $jsonaccum  = json_encode($obaccum);


			 
			 ?>
			 


		
		
<div id="Accumulator" class="tabcontent">
<table border="1" id="b" class="display nowrap" cellspacing="0" width="100%">
<thead>
<tr style="background:#ff6600; color:#fff;font-weight: bold">
<th>Accumutaeur ID</th>	
<th>Value</th>	
<th>Start Date</th>	
<th>Reset Date</th>	
<th>Description</th>	
</tr>	
</thead>

<tbody>	
<?php
$dataaccumulateur = json_decode($jsonaccum, true);
$accumululateurInformation = $dataaccumulateur['params']['param']['value']['struct']['member'][2]['value']['array']['data']['value'];
foreach ($accumululateurInformation as $accountt) {
$accountIdaccum1 = $accountt['struct']['member'][0]['value']['i4'];
$accountIdaccum2 = $accountt['struct']['member'][1]['value']['i4'];
$startDatea = $accountt['struct']['member'][2]['value']['dateTime.iso8601'];
$startDateua = $accountt['struct']['member'][1]['value']['dateTime.iso8601'];
$lastresetDate = $accountt['struct']['member'][0]['value']['dateTime.iso8601'];
$valuea = $accountt['struct']['member'][3]['value']['i4'];
$valueaotherua = $accountt['struct']['member'][2]['value']['i4'];
$starta=date_create($startDatea);
$startta=date_format($starta, 'Y-m-d H:i');
$startua=date_create($startDateua);
$starttua=date_format($startua, 'Y-m-d H:i');
$lastresetDatea=date_create($lastresetDate);
$lastresetDateaa=date_format($lastresetDatea, 'Y-m-d H:i');

?>	
<tr>	
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
if($accountIdaccum2==NULL){echo $accountIdaccum1;} else {echo $accountIdaccum2;}
// echo $accountIdaccum2;
?>
</td>
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php 
if($valueaotherua==NULL){echo $valuea;} else {echo $valueaotherua;}
?>
</td>
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php if($startDateua==NULL){echo $startta;} else {echo $starttua;} ?>
</td>     
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php if($lastresetDate==NULL){echo "None";} else {echo $lastresetDateaa;} ?>
</td>     
<td style="border-width:1px;border-color: black;border-style: dotted">
<?php
$queryua = "select * from uagroup ";
$resultua = mysqli_query($connect,$queryua);
while($row = mysqli_fetch_array($resultua)) {
	if($accountIdaccum2==$row["ua"]){
            echo utf8_encode($row["description"]);                       
		}
    elseif($accountIdaccum1==$row["ua"]){
            echo utf8_encode($row["description"]);                       
		}
}
?>
</td>	
</tr>
<?php
}
?>	
</tbody>
</table>
</div>

<?php
curl_close($chh);
}
}
else{
?>
<div  style="border: 5px outset #ff6600;background-color: white;text-align: center;">
<p style="transform:translate(0px,10px)"><b>
<?php
$secondresponsee = json_decode($json, true);
$secondrc2 = $secondresponsee['params']['param']['value']['struct']['member'][1]['value']['i4'];

$querycode = "select * from responsecode ";
$resultcode = mysqli_query($connect,$querycode);
while($row = mysqli_fetch_array($resultcode)) {
	if($secondrc2==$row["response"]){
            echo utf8_encode($row["description"]);                       
		}
}

?>
</b>
</p>
</div>





<?php


}
curl_close($chaccount);
}
curl_close($ch);
}
}


curl_close($chbefore);
}
}



?>















	


	
</center>


	





























</div>
</div>
</div>
<br/>

           <!-- <div class="row">
              <div class="col-md-7 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="clearfix">
                      <h4 class="card-title float-left">Visit And Sales Statistics</h4>
                      <div id="visit-sale-chart-legend" class="rounded-legend legend-horizontal legend-top-right float-right"></div>
                    </div>
                    <canvas id="visit-sale-chart" class="mt-4"></canvas>
                  </div>
                </div>
              </div>
              <div class="col-md-5 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Traffic Sources</h4>
                    <canvas id="traffic-chart"></canvas>
                    <div id="traffic-chart-legend" class="rounded-legend legend-vertical legend-bottom-left pt-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Recent Tickets</h4>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th> Assignee </th>
                            <th> Subject </th>
                            <th> Status </th>
                            <th> Last Update </th>
                            <th> Tracking ID </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img src="assets/images/faces/users.png" class="me-2" alt="image"> David Grey
                            </td>
                            <td> Fund is not recieved </td>
                            <td>
                              <label class="badge badge-gradient-success">DONE</label>
                            </td>
                            <td> Dec 5, 2017 </td>
                            <td> WD-12345 </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="assets/images/faces/face2.jpg" class="me-2" alt="image"> Stella Johnson
                            </td>
                            <td> High loading time </td>
                            <td>
                              <label class="badge badge-gradient-warning">PROGRESS</label>
                            </td>
                            <td> Dec 12, 2017 </td>
                            <td> WD-12346 </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="assets/images/faces/face3.jpg" class="me-2" alt="image"> Marina Michel
                            </td>
                            <td> Website down for one week </td>
                            <td>
                              <label class="badge badge-gradient-info">ON HOLD</label>
                            </td>
                            <td> Dec 16, 2017 </td>
                            <td> WD-12347 </td>
                          </tr>
                          <tr>
                            <td>
                              <img src="assets/images/faces/face4.jpg" class="me-2" alt="image"> John Doe
                            </td>
                            <td> Loosing control on server </td>
                            <td>
                              <label class="badge badge-gradient-danger">REJECTED</label>
                            </td>
                            <td> Dec 3, 2017 </td>
                            <td> WD-12348 </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Recent Updates</h4>
                    <div class="d-flex">
                      <div class="d-flex align-items-center me-4 text-muted font-weight-light">
                        <i class="mdi mdi-account-outline icon-sm me-2"></i>
                        <span>jack Menqu</span>
                      </div>
                      <div class="d-flex align-items-center text-muted font-weight-light">
                        <i class="mdi mdi-clock icon-sm me-2"></i>
                        <span>October 3rd, 2018</span>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-6 pe-1">
                        <img src="assets/images/dashboard/img_1.jpg" class="mb-2 mw-100 w-100 rounded" alt="image">
                        <img src="assets/images/dashboard/img_4.jpg" class="mw-100 w-100 rounded" alt="image">
                      </div>
                      <div class="col-6 ps-1">
                        <img src="assets/images/dashboard/img_2.jpg" class="mb-2 mw-100 w-100 rounded" alt="image">
                        <img src="assets/images/dashboard/img_3.jpg" class="mw-100 w-100 rounded" alt="image">
                      </div>
                    </div>
                    <div class="d-flex mt-5 align-items-top">
                      <img src="assets/images/faces/face3.jpg" class="img-sm rounded-circle me-3" alt="image">
                      <div class="mb-0 flex-grow">
                        <h5 class="me-2 mb-2">School Website - Authentication Module.</h5>
                        <p class="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                      </div>
                      <div class="ms-auto">
                        <i class="mdi mdi-heart-outline text-muted"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Project Status</h4>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th> Due Date </th>
                            <th> Progress </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> 1 </td>
                            <td> Herman Beck </td>
                            <td> May 15, 2015 </td>
                            <td>
                              <div class="progress">
                                <div class="progress-bar bg-gradient-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> 2 </td>
                            <td> Messsy Adam </td>
                            <td> Jul 01, 2015 </td>
                            <td>
                              <div class="progress">
                                <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> 3 </td>
                            <td> John Richards </td>
                            <td> Apr 12, 2015 </td>
                            <td>
                              <div class="progress">
                                <div class="progress-bar bg-gradient-warning" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> 4 </td>
                            <td> Peter Meggik </td>
                            <td> May 15, 2015 </td>
                            <td>
                              <div class="progress">
                                <div class="progress-bar bg-gradient-primary" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> 5 </td>
                            <td> Edward </td>
                            <td> May 03, 2015 </td>
                            <td>
                              <div class="progress">
                                <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td> 5 </td>
                            <td> Ronald </td>
                            <td> Jun 05, 2015 </td>
                            <td>
                              <div class="progress">
                                <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title text-white">Todo</h4>
                    <div class="add-items d-flex">
                      <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?">
                      <button class="add btn btn-gradient-primary font-weight-bold todo-list-add-btn" id="add-task">Add</button>
                    </div>
                    <div class="list-wrapper">
                      <ul class="d-flex flex-column-reverse todo-list todo-list-custom">
                        <li>
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="checkbox" type="checkbox"> Meeting with Alisa </label>
                          </div>
                          <i class="remove mdi mdi-close-circle-outline"></i>
                        </li>
                        <li class="completed">
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="checkbox" type="checkbox" checked> Call John </label>
                          </div>
                          <i class="remove mdi mdi-close-circle-outline"></i>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="checkbox" type="checkbox"> Create invoice </label>
                          </div>
                          <i class="remove mdi mdi-close-circle-outline"></i>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="checkbox" type="checkbox"> Print Statements </label>
                          </div>
                          <i class="remove mdi mdi-close-circle-outline"></i>
                        </li>
                        <li class="completed">
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="checkbox" type="checkbox" checked> Prepare for presentation </label>
                          </div>
                          <i class="remove mdi mdi-close-circle-outline"></i>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="checkbox" type="checkbox"> Pick up kids from school </label>
                          </div>
                          <i class="remove mdi mdi-close-circle-outline"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <footer class="footer">

            <div class="container-fluid d-flex justify-content-between" >
              <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">&copy; 2023 MINSAT. All Rights Reserved | Design by DRS <img src="img/orange.png" style="width:20px; transform:translate(0px,-2px)"></span>
			</div>
		
          </footer>
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- plugins:js -->
    <script src="assets/vendors/js/vendor.bundle.base.js"></script>
    <!-- endinject -->
    <!-- Plugin js for this page -->
    <script src="assets/vendors/chart.js/Chart.min.js"></script>
    <script src="assets/js/jquery.cookie.js" type="text/javascript"></script>
    <!-- End plugin js for this page -->
    <!-- inject:js -->
    <script src="assets/js/off-canvas.js"></script>
    <script src="assets/js/hoverable-collapse.js"></script>
    <script src="assets/js/misc.js"></script>
    <!-- endinject -->
    <!-- Custom js for this page -->
    <script src="assets/js/dashboard.js"></script>
    <script src="assets/js/todolist.js"></script>
    <!-- End custom js for this page -->
	
	
	
	
	<script type="text/javascript" src="tabold/data.js"></script>		   
<script type="text/javascript" src="tabold/databouton.min.js"></script>		   
<script type="text/javascript" src="tabold/boutonflash.min.js"></script>		   
<script type="text/javascript" src="tabold/jszip.min.js"></script>		   
<script type="text/javascript" src="tabold/pdfmake.min.js"></script>		   
<script type="text/javascript" src="tabold/vfs.js"></script>		   
<script type="text/javascript" src="tabold/boutonhtml.min.js"></script>		   
<script type="text/javascript" src="tabold/boutonprint.min.js"></script>
<script>
$(document).ready(function() {
$('#a').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script> 
<script>
$(document).ready(function() {
$('#b').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script>
<script>
$(document).ready(function() {
$('#c').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script>
<script>
$(document).ready(function() {
$('#d').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script>
<script>
$(document).ready(function() {
$('#e').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script>
<script>
$(document).ready(function() {
$('#f').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script>
<script>
$(document).ready(function() {
$('#g').DataTable( {
"paging": false,
"orderFixed": [ 0, 'asc' ],
// dom: 'Bfrtip',
   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ],
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
    // initComplete: function () {
      // this.api().columns().every( function () {
          // var column = this;
          // var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
              // .appendTo( $(column.header()).empty() )
              // .on( 'change input', function () {
                  // var val = $(this).val()

                  // column
                      // .search( val ? val : '', true, false )
                      // .draw();
              // } );

      // } );
  // }
  
  
       // initComplete: function () {
            // this.api().columns().every( function () {
                // var column = this;
                // var select = $('<select><option value=""></option></select>')
                    // .appendTo( $(column.header()).empty() )
                    // .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                            // $(this).val()
                        // );
 
                        // column
                            // .search( val ? '^'+val+'$' : '', true, false )
                            // .draw();
                    // } );
 
                // column.data().unique().sort().each( function ( d, j ) {
                    // select.append( '<option value="'+d+'">'+d+'</option>' )
                // } );
            // } );
        // }
		
		
} );
} );
</script>
<script>
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
} 
</script>


  </body>
</html>
