<?php
session_start();
error_reporting(0);
if(($_SESSION['role'] != 'admin')){
	header('Location: ../404');
}
elseif(empty($_SESSION['username'])) 
{

  header('Location: ../index');
  exit();
}
$connect = mysqli_connect("10.13.64.59","root","rootme123","adminin");


?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Admin-IN</title>
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
          <a class="navbar-brand brand-logo" href="getmsisdninformation"><img src="img/zzz.png" alt="logo" /></a>
          <a class="navbar-brand brand-logo-mini" href="getmsisdninformation"><img src="img/mini-zzzz.png" alt="logo" /></a>
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
   <li class="nav-item nav-profile dropdown">
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
               <!-- <a class="dropdown-item" href="#">
                  <i class="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
                <div class="dropdown-divider"></div>-->
                <a class="dropdown-item" href="deconnexion">
                  <i class="mdi mdi-logout me-2 text-primary"></i>Se déconnecter</a>
              </div>
            </li>
            <li class="nav-item d-none d-lg-block full-screen-link">
              <a class="nav-link">
                <i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </a>
            </li>

          </ul>

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
                  <span class="text-secondary text-small"><?php echo ucfirst(utf8_encode($_SESSION['role'])); ?></span>
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
                  <li class="nav-item"> <a class="nav-link" href="history">History</a></li>
                  <li class="nav-item"> <a class="nav-link" href="serialnumber">Serial Number</a></li>
                  <li class="nav-item"> <a class="nav-link" href="activationcode">Activation Code</a></li>
                </ul>
              </div>
            </li>
			


<li class="nav-item">
              <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic3" aria-expanded="false" aria-controls="ui-basic3">
                <span class="menu-title">Health Check IN</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-crosshairs-gps menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic3">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <a class="nav-link" href="iloIN">ILO_IN</a></li>
                  <li class="nav-item"> <a class="nav-link" href="allhcin">All HC-IN</a></li>
				  <li class="nav-item"> <a class="nav-link" href="SDPNOK">SDP_NOK</a></li>
                  <li class="nav-item"> <a class="nav-link" href="AIRNOK">AIR_NOK</a></li>
                  <li class="nav-item"> <a class="nav-link" href="OCCNOK">OCC_NOK</a></li>
                  <li class="nav-item"> <a class="nav-link" href="CCNNOK">CCN_NOK</a></li>
                  <li class="nav-item"> <a class="nav-link" href="NGVSNOK">NGVS_NOK</a></li>
                  <li class="nav-item"> <a class="nav-link" href="NGCRSNOK">NGCRS_NOK</a></li>
                  <li class="nav-item"> <a class="nav-link" href="autochecks">Automated Checks</a></li>
                </ul>
              </div>
            </li>
			
				<li class="nav-item">
              <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic4" aria-expanded="false" aria-controls="ui-basic4">
                <span class="menu-title">Documentation IN</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-folder-multiple menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic4">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <a class="nav-link" href="listewo">WO List</a></li>
                  <li class="nav-item"> <a class="nav-link" href="addwo">Add WO</a></li>
                </ul>
              </div>
            </li>
			           	

<li class="nav-item">
              <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="ui-basic2">
                <span class="menu-title">Aide</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-help menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic2">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <a class="nav-link" href="serviceclass">SC / DA Group / UA</a></li>
                  <li class="nav-item"> <a class="nav-link" href="serviceidentifier">Service Identifier</a></li>
				  <li class="nav-item"> <a class="nav-link" href="offer">Offer</a></li>
				  <li class="nav-item"> <a class="nav-link" href="usagecounters">Usage Counters</a></li>
                </ul>
              </div>
            </li>
     
          </ul>
        </nav>
        <!-- partial -->
        <div class="main-panel">
<div class="content-wrapper">


  

<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 10%;
  font-size : 11.5px;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 2px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f60;
  color: white;
}
</style>
<style>
.myDiv {
  border: 5px double #f60; 
  width: 15%;  
  // text-align: center;
}
</style>
<style>
.buttona {
  background-color: #04AA6D; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}

.button1 {font-size: 10px;}

</style>
<style>
.box {
display: flex;
justify-content: space-between;
}
</style>
<div class="box">
<?php


$xmlFilePathSDP3a = '../../ilo/outputilo/outputILO_SDP3a.xml';
$xmlFilePathSDP3b = '../../ilo/outputilo/outputILO_SDP3b.xml';
$xmlFilePathSDP5a = '../../ilo/outputilo/outputILO_SDP5a.xml';
$xmlFilePathSDP5b = '../../ilo/outputilo/outputILO_SDP5b.xml';
$xmlFilePathSDP8a = '../../ilo/outputilo/outputILO_SDP8a.xml';
$xmlFilePathSDP8b = '../../ilo/outputilo/outputILO_SDP8b.xml';


$fileContentSDP3a = file_get_contents($xmlFilePathSDP3a);
$fileContentSDP3b = file_get_contents($xmlFilePathSDP3b);
$fileContentSDP5a = file_get_contents($xmlFilePathSDP5a);
$fileContentSDP5b = file_get_contents($xmlFilePathSDP5b);
$fileContentSDP8a = file_get_contents($xmlFilePathSDP8a);
$fileContentSDP8b = file_get_contents($xmlFilePathSDP8b);



/////ilo sdp3a

$startPositionSDP3a = strpos($fileContentSDP3a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP3a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP3a = substr($fileContentSDP3a, $startPositionSDP3a);


$endPositionSDP3a = strpos($xmlContentSDP3a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP3a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP3a = substr($xmlContentSDP3a, 0, $endPositionSDP3a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP3a = simplexml_load_string($xmlContentSDP3a);


if ($xmlSDP3a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP3a) {
        echo $errorSDP3a->message . " at line " . $errorSDP3a->line . " column " . $errorSDP3a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP3a <br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP3a($elementSDP3a, $levelSDP3a = 0)
{
    foreach ($elementSDP3a->children() as $childSDP3a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP3a) . $childSDP3a->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP3a['STATUS'])) {
            if(htmlspecialchars($childSDP3a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP3a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP3a = $xmlSDP3a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP3a) {
    processXmlElementSDP3a($healthAtAGlanceSDP3a);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.17/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP3a</a></button>
</center>
</div>
';

///// ilo sdp3b

$startPositionSDP3b = strpos($fileContentSDP3b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP3b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP3b = substr($fileContentSDP3b, $startPositionSDP3b);


$endPositionSDP3b = strpos($xmlContentSDP3b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP3b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP3b = substr($xmlContentSDP3b, 0, $endPositionSDP3b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP3b = simplexml_load_string($xmlContentSDP3b);


if ($xmlSDP3b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP3b) {
        echo $errorSDP3b->message . " at line " . $errorSDP3b->line . " column " . $errorSDP3b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP3b<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP3b($elementSDP3b, $levelSDP3b = 0)
{
    foreach ($elementSDP3b->children() as $childSDP3b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP3b) . $childSDP3b->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP3b['STATUS'])) {
            if(htmlspecialchars($childSDP3b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP3b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP3b = $xmlSDP3b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP3b) {
    processXmlElementSDP3b($healthAtAGlanceSDP3b);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.16/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP3b</a></button>
</center>
</div>
';


///// ilo sdp5a

$startPositionSDP5a = strpos($fileContentSDP5a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP5a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP5a = substr($fileContentSDP5a, $startPositionSDP5a);


$endPositionSDP5a = strpos($xmlContentSDP5a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP5a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP5a = substr($xmlContentSDP5a, 0, $endPositionSDP5a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP5a = simplexml_load_string($xmlContentSDP5a);


if ($xmlSDP5a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP5a) {
        echo $errorSDP5a->message . " at line " . $errorSDP5a->line . " column " . $errorSDP5a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP5a<br/> Gen8</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP5a($elementSDP5a, $levelSDP5a = 0)
{
    foreach ($elementSDP5a->children() as $childSDP5a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP5a) . $childSDP5a->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP5a['STATUS'])) {
            if(htmlspecialchars($childSDP5a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP5a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP5a = $xmlSDP5a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP5a) {
    processXmlElementSDP5a($healthAtAGlanceSDP5a);
}

echo '</table>
<button class="buttona button1" style="transform:translate(0px,25px)"><a href="https://10.13.1.18/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP5a</a></button>
</center>
</div>
';


///// ilo sdp5b

$startPositionSDP5b = strpos($fileContentSDP5b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP5b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP5b = substr($fileContentSDP5b, $startPositionSDP5b);


$endPositionSDP5b = strpos($xmlContentSDP5b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP5b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP5b = substr($xmlContentSDP5b, 0, $endPositionSDP5b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP5b = simplexml_load_string($xmlContentSDP5b);


if ($xmlSDP5b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP5b) {
        echo $errorSDP5b->message . " at line " . $errorSDP5b->line . " column " . $errorSDP5b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP5b<br/> Gen8</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP5b($elementSDP5b, $levelSDP5b = 0)
{
    foreach ($elementSDP5b->children() as $childSDP5b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP5b) . $childSDP5b->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP5b['STATUS'])) {
            if(htmlspecialchars($childSDP5b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP5b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP5b = $xmlSDP5b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP5b) {
    processXmlElementSDP5b($healthAtAGlanceSDP5b);
}

echo '</table>
<button class="buttona button1" style="transform:translate(0px,25px)"><a href="https://10.13.1.19/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP5b</a></button>
</center>
</div>
';


///// ilo sdp8a

$startPositionSDP8a = strpos($fileContentSDP8a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP8a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP8a = substr($fileContentSDP8a, $startPositionSDP8a);


$endPositionSDP8a = strpos($xmlContentSDP8a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP8a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP8a = substr($xmlContentSDP8a, 0, $endPositionSDP8a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP8a = simplexml_load_string($xmlContentSDP8a);


if ($xmlSDP8a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP8a) {
        echo $errorSDP8a->message . " at line " . $errorSDP8a->line . " column " . $errorSDP8a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP8a<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP8a($elementSDP8a, $levelSDP8a = 0)
{
    foreach ($elementSDP8a->children() as $childSDP8a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP8a) . $childSDP8a->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP8a['STATUS'])) {
            if(htmlspecialchars($childSDP8a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP8a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP8a = $xmlSDP8a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP8a) {
    processXmlElementSDP8a($healthAtAGlanceSDP8a);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.21/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP8a</a></button>
</center>
</div>
';


///// ilo sdp8b

$startPositionSDP8b = strpos($fileContentSDP8b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP8b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP8b = substr($fileContentSDP8b, $startPositionSDP8b);


$endPositionSDP8b = strpos($xmlContentSDP8b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP8b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP8b = substr($xmlContentSDP8b, 0, $endPositionSDP8b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP8b = simplexml_load_string($xmlContentSDP8b);


if ($xmlSDP8b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP8b) {
        echo $errorSDP8b->message . " at line " . $errorSDP8b->line . " column " . $errorSDP8b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP8b<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP8b($elementSDP8b, $levelSDP8b = 0)
{
    foreach ($elementSDP8b->children() as $childSDP8b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP8b) . $childSDP8b->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP8b['STATUS'])) {
            if(htmlspecialchars($childSDP8b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP8b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP8b = $xmlSDP8b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP8b) {
    processXmlElementSDP8b($healthAtAGlanceSDP8b);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.22/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP8b</a></button>
</center>
</div>
';






?>

</div>


 <br/>


<div class="box">
<?php


$xmlFilePathSDP4a = '../../ilo/outputilo/outputILO_SDP4a.xml';
$xmlFilePathSDP4b = '../../ilo/outputilo/outputILO_SDP4b.xml';
$xmlFilePathSDP6a = '../../ilo/outputilo/outputILO_SDP6a.xml';
$xmlFilePathSDP6b = '../../ilo/outputilo/outputILO_SDP6b.xml';
$xmlFilePathSDP7a = '../../ilo/outputilo/outputILO_SDP7a.xml';
$xmlFilePathSDP7b = '../../ilo/outputilo/outputILO_SDP7b.xml';


$fileContentSDP4a = file_get_contents($xmlFilePathSDP4a);
$fileContentSDP4b = file_get_contents($xmlFilePathSDP4b);
$fileContentSDP6a = file_get_contents($xmlFilePathSDP6a);
$fileContentSDP6b = file_get_contents($xmlFilePathSDP6b);
$fileContentSDP7a = file_get_contents($xmlFilePathSDP7a);
$fileContentSDP7b = file_get_contents($xmlFilePathSDP7b);



/////ilo sdp4a

$startPositionSDP4a = strpos($fileContentSDP4a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP4a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP4a = substr($fileContentSDP4a, $startPositionSDP4a);


$endPositionSDP4a = strpos($xmlContentSDP4a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP4a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP4a = substr($xmlContentSDP4a, 0, $endPositionSDP4a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP4a = simplexml_load_string($xmlContentSDP4a);


if ($xmlSDP4a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP4a) {
        echo $errorSDP4a->message . " at line " . $errorSDP4a->line . " column " . $errorSDP4a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP4a <br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP4a($elementSDP4a, $levelSDP4a = 0)
{
    foreach ($elementSDP4a->children() as $childSDP4a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP4a) . $childSDP4a->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP4a['STATUS'])) {
            if(htmlspecialchars($childSDP4a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP4a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP4a = $xmlSDP4a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP4a) {
    processXmlElementSDP4a($healthAtAGlanceSDP4a);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.17/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP4a</a></button>
</center>
</div>
';

///// ilo sdp4b

$startPositionSDP4b = strpos($fileContentSDP4b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP4b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP4b = substr($fileContentSDP4b, $startPositionSDP4b);


$endPositionSDP4b = strpos($xmlContentSDP4b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP4b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP4b = substr($xmlContentSDP4b, 0, $endPositionSDP4b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP4b = simplexml_load_string($xmlContentSDP4b);


if ($xmlSDP4b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP4b) {
        echo $errorSDP4b->message . " at line " . $errorSDP4b->line . " column " . $errorSDP4b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP4b<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP4b($elementSDP4b, $levelSDP4b = 0)
{
    foreach ($elementSDP4b->children() as $childSDP4b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP4b) . $childSDP4b->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP4b['STATUS'])) {
            if(htmlspecialchars($childSDP4b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP4b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP4b = $xmlSDP4b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP4b) {
    processXmlElementSDP4b($healthAtAGlanceSDP4b);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.16/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP4b</a></button>
</center>
</div>
';


///// ilo sdp6a

$startPositionSDP6a = strpos($fileContentSDP6a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP6a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP6a = substr($fileContentSDP6a, $startPositionSDP6a);


$endPositionSDP6a = strpos($xmlContentSDP6a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP6a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP6a = substr($xmlContentSDP6a, 0, $endPositionSDP6a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP6a = simplexml_load_string($xmlContentSDP6a);


if ($xmlSDP6a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP6a) {
        echo $errorSDP6a->message . " at line " . $errorSDP6a->line . " column " . $errorSDP6a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP6a<br/> Gen8</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP6a($elementSDP6a, $levelSDP6a = 0)
{
    foreach ($elementSDP6a->children() as $childSDP6a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP6a) . $childSDP6a->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP6a['STATUS'])) {
            if(htmlspecialchars($childSDP6a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP6a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP6a = $xmlSDP6a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP6a) {
    processXmlElementSDP6a($healthAtAGlanceSDP6a);
}

echo '</table>
<button class="buttona button1" style="transform:translate(0px,25px)"><a href="https://10.13.65.20/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP6a</a></button>
</center>
</div>
';


///// ilo sdp6b

$startPositionSDP6b = strpos($fileContentSDP6b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP6b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP6b = substr($fileContentSDP6b, $startPositionSDP6b);


$endPositionSDP6b = strpos($xmlContentSDP6b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP6b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP6b = substr($xmlContentSDP6b, 0, $endPositionSDP6b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP6b = simplexml_load_string($xmlContentSDP6b);


if ($xmlSDP6b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP6b) {
        echo $errorSDP6b->message . " at line " . $errorSDP6b->line . " column " . $errorSDP6b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP6b<br/> Gen8</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP6b($elementSDP6b, $levelSDP6b = 0)
{
    foreach ($elementSDP6b->children() as $childSDP6b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP6b) . $childSDP6b->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP6b['STATUS'])) {
            if(htmlspecialchars($childSDP6b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP6b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP6b = $xmlSDP6b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP6b) {
    processXmlElementSDP6b($healthAtAGlanceSDP6b);
}

echo '</table>
<button class="buttona button1" style="transform:translate(0px,25px)"><a href="https://10.13.65.19/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP6b</a></button>
</center>
</div>
';


///// ilo sdp7a

$startPositionSDP7a = strpos($fileContentSDP7a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP7a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP7a = substr($fileContentSDP7a, $startPositionSDP7a);


$endPositionSDP7a = strpos($xmlContentSDP7a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP7a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP7a = substr($xmlContentSDP7a, 0, $endPositionSDP7a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP7a = simplexml_load_string($xmlContentSDP7a);


if ($xmlSDP7a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP7a) {
        echo $errorSDP7a->message . " at line " . $errorSDP7a->line . " column " . $errorSDP7a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP7a<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP7a($elementSDP7a, $levelSDP7a = 0)
{
    foreach ($elementSDP7a->children() as $childSDP7a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP7a) . $childSDP7a->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP7a['STATUS'])) {
            if(htmlspecialchars($childSDP7a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP7a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP7a = $xmlSDP7a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP7a) {
    processXmlElementSDP7a($healthAtAGlanceSDP7a);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.20/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP7a</a></button>
</center>
</div>
';


///// ilo sdp7b

$startPositionSDP7b = strpos($fileContentSDP7b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionSDP7b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentSDP7b = substr($fileContentSDP7b, $startPositionSDP7b);


$endPositionSDP7b = strpos($xmlContentSDP7b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionSDP7b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentSDP7b = substr($xmlContentSDP7b, 0, $endPositionSDP7b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlSDP7b = simplexml_load_string($xmlContentSDP7b);


if ($xmlSDP7b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorSDP7b) {
        echo $errorSDP7b->message . " at line " . $errorSDP7b->line . " column " . $errorSDP7b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO SDP7b<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementSDP7b($elementSDP7b, $levelSDP7b = 0)
{
    foreach ($elementSDP7b->children() as $childSDP7b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelSDP7b) . $childSDP7b->getName() . '</td>';
        echo '<td>';
        if (isset($childSDP7b['STATUS'])) {
            if(htmlspecialchars($childSDP7b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childSDP7b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceSDP7b = $xmlSDP7b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceSDP7b) {
    processXmlElementSDP7b($healthAtAGlanceSDP7b);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.21/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO SDP7b</a></button>
</center>
</div>
';






?>

</div> 
			
	

<br/>


<div class="box">
<?php


$xmlFilePathOCC1 = '../../ilo/outputilo/outputILO_OCC1.xml';
$xmlFilePathOCC2 = '../../ilo/outputilo/outputILO_OCC2.xml';
$xmlFilePathOCC3 = '../../ilo/outputilo/outputILO_OCC3.xml';
$xmlFilePathOCC4 = '../../ilo/outputilo/outputILO_OCC4.xml';
$xmlFilePathAIR3 = '../../ilo/outputilo/outputILO_AIR3.xml';
$xmlFilePathAIR4 = '../../ilo/outputilo/outputILO_AIR4.xml';


$fileContentOCC1 = file_get_contents($xmlFilePathOCC1);
$fileContentOCC2 = file_get_contents($xmlFilePathOCC2);
$fileContentOCC3 = file_get_contents($xmlFilePathOCC3);
$fileContentOCC4 = file_get_contents($xmlFilePathOCC4);
$fileContentAIR3 = file_get_contents($xmlFilePathAIR3);
$fileContentAIR4 = file_get_contents($xmlFilePathAIR4);



/////ilo OCC1

$startPositionOCC1 = strpos($fileContentOCC1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionOCC1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentOCC1 = substr($fileContentOCC1, $startPositionOCC1);


$endPositionOCC1 = strpos($xmlContentOCC1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionOCC1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentOCC1 = substr($xmlContentOCC1, 0, $endPositionOCC1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlOCC1 = simplexml_load_string($xmlContentOCC1);


if ($xmlOCC1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorOCC1) {
        echo $errorOCC1->message . " at line " . $errorOCC1->line . " column " . $errorOCC1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO OCC1 <br/> Gen10</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementOCC1($elementOCC1, $levelOCC1 = 0)
{
    foreach ($elementOCC1->children() as $childOCC1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelOCC1) . $childOCC1->getName() . '</td>';
        echo '<td>';
        if (isset($childOCC1['STATUS'])) {
            if(htmlspecialchars($childOCC1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childOCC1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceOCC1 = $xmlOCC1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceOCC1) {
    processXmlElementOCC1($healthAtAGlanceOCC1);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.23/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO OCC1</a></button>
</center>
</div>
';

///// ilo OCC2

$startPositionOCC2 = strpos($fileContentOCC2, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionOCC2 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentOCC2 = substr($fileContentOCC2, $startPositionOCC2);


$endPositionOCC2 = strpos($xmlContentOCC2, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionOCC2 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentOCC2 = substr($xmlContentOCC2, 0, $endPositionOCC2 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlOCC2 = simplexml_load_string($xmlContentOCC2);


if ($xmlOCC2 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorOCC2) {
        echo $errorOCC2->message . " at line " . $errorOCC2->line . " column " . $errorOCC2->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO OCC2<br/> Gen10</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementOCC2($elementOCC2, $levelOCC2 = 0)
{
    foreach ($elementOCC2->children() as $childOCC2) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelOCC2) . $childOCC2->getName() . '</td>';
        echo '<td>';
        if (isset($childOCC2['STATUS'])) {
            if(htmlspecialchars($childOCC2['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childOCC2['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceOCC2 = $xmlOCC2->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceOCC2) {
    processXmlElementOCC2($healthAtAGlanceOCC2);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.25/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO OCC2</a></button>
</center>
</div>
';


///// ilo OCC3

$startPositionOCC3 = strpos($fileContentOCC3, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionOCC3 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentOCC3 = substr($fileContentOCC3, $startPositionOCC3);


$endPositionOCC3 = strpos($xmlContentOCC3, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionOCC3 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentOCC3 = substr($xmlContentOCC3, 0, $endPositionOCC3 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlOCC3 = simplexml_load_string($xmlContentOCC3);


if ($xmlOCC3 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorOCC3) {
        echo $errorOCC3->message . " at line " . $errorOCC3->line . " column " . $errorOCC3->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO OCC3<br/> Gen10</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementOCC3($elementOCC3, $levelOCC3 = 0)
{
    foreach ($elementOCC3->children() as $childOCC3) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelOCC3) . $childOCC3->getName() . '</td>';
        echo '<td>';
        if (isset($childOCC3['STATUS'])) {
            if(htmlspecialchars($childOCC3['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childOCC3['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceOCC3 = $xmlOCC3->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceOCC3) {
    processXmlElementOCC3($healthAtAGlanceOCC3);
}

echo '</table>
<button class="buttona button1" ><a href="https://10.13.65.24/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO OCC3</a></button>
</center>
</div>
';


///// ilo OCC4

$startPositionOCC4 = strpos($fileContentOCC4, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionOCC4 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentOCC4 = substr($fileContentOCC4, $startPositionOCC4);


$endPositionOCC4 = strpos($xmlContentOCC4, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionOCC4 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentOCC4 = substr($xmlContentOCC4, 0, $endPositionOCC4 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlOCC4 = simplexml_load_string($xmlContentOCC4);


if ($xmlOCC4 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorOCC4) {
        echo $errorOCC4->message . " at line " . $errorOCC4->line . " column " . $errorOCC4->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO OCC4<br/> Gen10</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementOCC4($elementOCC4, $levelOCC4 = 0)
{
    foreach ($elementOCC4->children() as $childOCC4) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelOCC4) . $childOCC4->getName() . '</td>';
        echo '<td>';
        if (isset($childOCC4['STATUS'])) {
            if(htmlspecialchars($childOCC4['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childOCC4['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceOCC4 = $xmlOCC4->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceOCC4) {
    processXmlElementOCC4($healthAtAGlanceOCC4);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.26/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO OCC4</a></button>
</center>
</div>
';


///// ilo AIR3

$startPositionAIR3 = strpos($fileContentAIR3, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionAIR3 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentAIR3 = substr($fileContentAIR3, $startPositionAIR3);


$endPositionAIR3 = strpos($xmlContentAIR3, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionAIR3 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentAIR3 = substr($xmlContentAIR3, 0, $endPositionAIR3 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlAIR3 = simplexml_load_string($xmlContentAIR3);


if ($xmlAIR3 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorAIR3) {
        echo $errorAIR3->message . " at line " . $errorAIR3->line . " column " . $errorAIR3->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO AIR3<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementAIR3($elementAIR3, $levelAIR3 = 0)
{
    foreach ($elementAIR3->children() as $childAIR3) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelAIR3) . $childAIR3->getName() . '</td>';
        echo '<td>';
        if (isset($childAIR3['STATUS'])) {
            if(htmlspecialchars($childAIR3['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childAIR3['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceAIR3 = $xmlAIR3->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceAIR3) {
    processXmlElementAIR3($healthAtAGlanceAIR3);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.36/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO AIR3</a></button>
</center>
</div>
';


///// ilo AIR4

$startPositionAIR4 = strpos($fileContentAIR4, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionAIR4 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentAIR4 = substr($fileContentAIR4, $startPositionAIR4);


$endPositionAIR4 = strpos($xmlContentAIR4, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionAIR4 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentAIR4 = substr($xmlContentAIR4, 0, $endPositionAIR4 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlAIR4 = simplexml_load_string($xmlContentAIR4);


if ($xmlAIR4 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorAIR4) {
        echo $errorAIR4->message . " at line " . $errorAIR4->line . " column " . $errorAIR4->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO AIR4<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementAIR4($elementAIR4, $levelAIR4 = 0)
{
    foreach ($elementAIR4->children() as $childAIR4) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelAIR4) . $childAIR4->getName() . '</td>';
        echo '<td>';
        if (isset($childAIR4['STATUS'])) {
            if(htmlspecialchars($childAIR4['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childAIR4['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceAIR4 = $xmlAIR4->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceAIR4) {
    processXmlElementAIR4($healthAtAGlanceAIR4);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.37/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO AIR4</a></button>
</center>
</div>
';






?>

</div> 
		  
		  				
<br/>


<div class="box">
<?php


$xmlFilePathNGVS1a = '../../ilo/outputilo/outputILO_NGVS1a.xml';
$xmlFilePathNGVS1b = '../../ilo/outputilo/outputILO_NGVS1b.xml';
$xmlFilePathNGVS1c = '../../ilo/outputilo/outputILO_NGVS1c.xml';
$xmlFilePathNGVS2a = '../../ilo/outputilo/outputILO_NGVS2a.xml';
$xmlFilePathNGVS2b = '../../ilo/outputilo/outputILO_NGVS2b.xml';
$xmlFilePathNGVS2c = '../../ilo/outputilo/outputILO_NGVS2c.xml';


$fileContentNGVS1a = file_get_contents($xmlFilePathNGVS1a);
$fileContentNGVS1b = file_get_contents($xmlFilePathNGVS1b);
$fileContentNGVS1c = file_get_contents($xmlFilePathNGVS1c);
$fileContentNGVS2a = file_get_contents($xmlFilePathNGVS2a);
$fileContentNGVS2b = file_get_contents($xmlFilePathNGVS2b);
$fileContentNGVS2c = file_get_contents($xmlFilePathNGVS2c);



/////ilo NGVS1a

$startPositionNGVS1a = strpos($fileContentNGVS1a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGVS1a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGVS1a = substr($fileContentNGVS1a, $startPositionNGVS1a);


$endPositionNGVS1a = strpos($xmlContentNGVS1a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGVS1a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGVS1a = substr($xmlContentNGVS1a, 0, $endPositionNGVS1a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGVS1a = simplexml_load_string($xmlContentNGVS1a);


if ($xmlNGVS1a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGVS1a) {
        echo $errorNGVS1a->message . " at line " . $errorNGVS1a->line . " column " . $errorNGVS1a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO NGVS1a <br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGVS1a($elementNGVS1a, $levelNGVS1a = 0)
{
    foreach ($elementNGVS1a->children() as $childNGVS1a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGVS1a) . $childNGVS1a->getName() . '</td>';
        echo '<td>';
        if (isset($childNGVS1a['STATUS'])) {
            if(htmlspecialchars($childNGVS1a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGVS1a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGVS1a = $xmlNGVS1a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGVS1a) {
    processXmlElementNGVS1a($healthAtAGlanceNGVS1a);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.33/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO NGVS1a</a></button>
</center>
</div>
';

///// ilo NGVS1b

$startPositionNGVS1b = strpos($fileContentNGVS1b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGVS1b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGVS1b = substr($fileContentNGVS1b, $startPositionNGVS1b);


$endPositionNGVS1b = strpos($xmlContentNGVS1b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGVS1b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGVS1b = substr($xmlContentNGVS1b, 0, $endPositionNGVS1b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGVS1b = simplexml_load_string($xmlContentNGVS1b);


if ($xmlNGVS1b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGVS1b) {
        echo $errorNGVS1b->message . " at line " . $errorNGVS1b->line . " column " . $errorNGVS1b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO NGVS1b<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGVS1b($elementNGVS1b, $levelNGVS1b = 0)
{
    foreach ($elementNGVS1b->children() as $childNGVS1b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGVS1b) . $childNGVS1b->getName() . '</td>';
        echo '<td>';
        if (isset($childNGVS1b['STATUS'])) {
            if(htmlspecialchars($childNGVS1b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGVS1b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGVS1b = $xmlNGVS1b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGVS1b) {
    processXmlElementNGVS1b($healthAtAGlanceNGVS1b);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.34/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO NGVS1b</a></button>
</center>
</div>
';


///// ilo NGVS1c

$startPositionNGVS1c = strpos($fileContentNGVS1c, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGVS1c === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGVS1c = substr($fileContentNGVS1c, $startPositionNGVS1c);


$endPositionNGVS1c = strpos($xmlContentNGVS1c, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGVS1c === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGVS1c = substr($xmlContentNGVS1c, 0, $endPositionNGVS1c + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGVS1c = simplexml_load_string($xmlContentNGVS1c);


if ($xmlNGVS1c === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGVS1c) {
        echo $errorNGVS1c->message . " at line " . $errorNGVS1c->line . " column " . $errorNGVS1c->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO NGVS1c<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGVS1c($elementNGVS1c, $levelNGVS1c = 0)
{
    foreach ($elementNGVS1c->children() as $childNGVS1c) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGVS1c) . $childNGVS1c->getName() . '</td>';
        echo '<td>';
        if (isset($childNGVS1c['STATUS'])) {
            if(htmlspecialchars($childNGVS1c['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGVS1c['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGVS1c = $xmlNGVS1c->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGVS1c) {
    processXmlElementNGVS1c($healthAtAGlanceNGVS1c);
}

echo '</table>
<button class="buttona button1" ><a href="https://10.13.1.35/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO NGVS1c</a></button>
</center>
</div>
';


///// ilo NGVS2a

$startPositionNGVS2a = strpos($fileContentNGVS2a, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGVS2a === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGVS2a = substr($fileContentNGVS2a, $startPositionNGVS2a);


$endPositionNGVS2a = strpos($xmlContentNGVS2a, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGVS2a === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGVS2a = substr($xmlContentNGVS2a, 0, $endPositionNGVS2a + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGVS2a = simplexml_load_string($xmlContentNGVS2a);


if ($xmlNGVS2a === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGVS2a) {
        echo $errorNGVS2a->message . " at line " . $errorNGVS2a->line . " column " . $errorNGVS2a->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO NGVS2a<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGVS2a($elementNGVS2a, $levelNGVS2a = 0)
{
    foreach ($elementNGVS2a->children() as $childNGVS2a) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGVS2a) . $childNGVS2a->getName() . '</td>';
        echo '<td>';
        if (isset($childNGVS2a['STATUS'])) {
            if(htmlspecialchars($childNGVS2a['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGVS2a['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGVS2a = $xmlNGVS2a->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGVS2a) {
    processXmlElementNGVS2a($healthAtAGlanceNGVS2a);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.34/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO NGVS2a</a></button>
</center>
</div>
';


///// ilo NGVS2b

$startPositionNGVS2b = strpos($fileContentNGVS2b, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGVS2b === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGVS2b = substr($fileContentNGVS2b, $startPositionNGVS2b);


$endPositionNGVS2b = strpos($xmlContentNGVS2b, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGVS2b === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGVS2b = substr($xmlContentNGVS2b, 0, $endPositionNGVS2b + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGVS2b = simplexml_load_string($xmlContentNGVS2b);


if ($xmlNGVS2b === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGVS2b) {
        echo $errorNGVS2b->message . " at line " . $errorNGVS2b->line . " column " . $errorNGVS2b->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO NGVS2b<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGVS2b($elementNGVS2b, $levelNGVS2b = 0)
{
    foreach ($elementNGVS2b->children() as $childNGVS2b) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGVS2b) . $childNGVS2b->getName() . '</td>';
        echo '<td>';
        if (isset($childNGVS2b['STATUS'])) {
            if(htmlspecialchars($childNGVS2b['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGVS2b['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGVS2b = $xmlNGVS2b->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGVS2b) {
    processXmlElementNGVS2b($healthAtAGlanceNGVS2b);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.35/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO NGVS2b</a></button>
</center>
</div>
';


///// ilo NGVS2c

$startPositionNGVS2c = strpos($fileContentNGVS2c, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGVS2c === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGVS2c = substr($fileContentNGVS2c, $startPositionNGVS2c);


$endPositionNGVS2c = strpos($xmlContentNGVS2c, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGVS2c === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGVS2c = substr($xmlContentNGVS2c, 0, $endPositionNGVS2c + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGVS2c = simplexml_load_string($xmlContentNGVS2c);


if ($xmlNGVS2c === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGVS2c) {
        echo $errorNGVS2c->message . " at line " . $errorNGVS2c->line . " column " . $errorNGVS2c->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO NGVS2c<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGVS2c($elementNGVS2c, $levelNGVS2c = 0)
{
    foreach ($elementNGVS2c->children() as $childNGVS2c) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGVS2c) . $childNGVS2c->getName() . '</td>';
        echo '<td>';
        if (isset($childNGVS2c['STATUS'])) {
            if(htmlspecialchars($childNGVS2c['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGVS2c['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGVS2c = $xmlNGVS2c->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGVS2c) {
    processXmlElementNGVS2c($healthAtAGlanceNGVS2c);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.36/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO NGVS2c</a></button>
</center>
</div>
';






?>

</div> 




<br/>


<div class="box">
<?php


$xmlFilePathNGCRS1d1 = '../../ilo/outputilo/outputILO_NGCRS1d1.xml';
$xmlFilePathNGCRS1d2 = '../../ilo/outputilo/outputILO_NGCRS1d2.xml';
$xmlFilePathNGCRS1h1 = '../../ilo/outputilo/outputILO_NGCRS1h1.xml';
$xmlFilePathNGCRS1h2 = '../../ilo/outputilo/outputILO_NGCRS1h2.xml';
$xmlFilePathNGCRS1h3 = '../../ilo/outputilo/outputILO_NGCRS1h3.xml';
$xmlFilePathNGCRS1r1 = '../../ilo/outputilo/outputILO_NGCRS1r1.xml';


$fileContentNGCRS1d1 = file_get_contents($xmlFilePathNGCRS1d1);
$fileContentNGCRS1d2 = file_get_contents($xmlFilePathNGCRS1d2);
$fileContentNGCRS1h1 = file_get_contents($xmlFilePathNGCRS1h1);
$fileContentNGCRS1h2 = file_get_contents($xmlFilePathNGCRS1h2);
$fileContentNGCRS1h3 = file_get_contents($xmlFilePathNGCRS1h3);
$fileContentNGCRS1r1 = file_get_contents($xmlFilePathNGCRS1r1);



/////ilo NGCRS1d1

$startPositionNGCRS1d1 = strpos($fileContentNGCRS1d1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS1d1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS1d1 = substr($fileContentNGCRS1d1, $startPositionNGCRS1d1);


$endPositionNGCRS1d1 = strpos($xmlContentNGCRS1d1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS1d1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS1d1 = substr($xmlContentNGCRS1d1, 0, $endPositionNGCRS1d1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS1d1 = simplexml_load_string($xmlContentNGCRS1d1);


if ($xmlNGCRS1d1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS1d1) {
        echo $errorNGCRS1d1->message . " at line " . $errorNGCRS1d1->line . " column " . $errorNGCRS1d1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN1NGCRS1d1 <br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS1d1($elementNGCRS1d1, $levelNGCRS1d1 = 0)
{
    foreach ($elementNGCRS1d1->children() as $childNGCRS1d1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS1d1) . $childNGCRS1d1->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS1d1['STATUS'])) {
            if(htmlspecialchars($childNGCRS1d1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS1d1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS1d1 = $xmlNGCRS1d1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS1d1) {
    processXmlElementNGCRS1d1($healthAtAGlanceNGCRS1d1);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.31/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN1NGCRS1d1</a></button>
</center>
</div>
';

///// ilo NGCRS1d2

$startPositionNGCRS1d2 = strpos($fileContentNGCRS1d2, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS1d2 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS1d2 = substr($fileContentNGCRS1d2, $startPositionNGCRS1d2);


$endPositionNGCRS1d2 = strpos($xmlContentNGCRS1d2, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS1d2 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS1d2 = substr($xmlContentNGCRS1d2, 0, $endPositionNGCRS1d2 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS1d2 = simplexml_load_string($xmlContentNGCRS1d2);


if ($xmlNGCRS1d2 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS1d2) {
        echo $errorNGCRS1d2->message . " at line " . $errorNGCRS1d2->line . " column " . $errorNGCRS1d2->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN1NGCRS1d2<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS1d2($elementNGCRS1d2, $levelNGCRS1d2 = 0)
{
    foreach ($elementNGCRS1d2->children() as $childNGCRS1d2) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS1d2) . $childNGCRS1d2->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS1d2['STATUS'])) {
            if(htmlspecialchars($childNGCRS1d2['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS1d2['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS1d2 = $xmlNGCRS1d2->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS1d2) {
    processXmlElementNGCRS1d2($healthAtAGlanceNGCRS1d2);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.30/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN1NGCRS1d2</a></button>
</center>
</div>
';


///// ilo NGCRS1h1

$startPositionNGCRS1h1 = strpos($fileContentNGCRS1h1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS1h1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS1h1 = substr($fileContentNGCRS1h1, $startPositionNGCRS1h1);


$endPositionNGCRS1h1 = strpos($xmlContentNGCRS1h1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS1h1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS1h1 = substr($xmlContentNGCRS1h1, 0, $endPositionNGCRS1h1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS1h1 = simplexml_load_string($xmlContentNGCRS1h1);


if ($xmlNGCRS1h1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS1h1) {
        echo $errorNGCRS1h1->message . " at line " . $errorNGCRS1h1->line . " column " . $errorNGCRS1h1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN1NGCRS1h1<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS1h1($elementNGCRS1h1, $levelNGCRS1h1 = 0)
{
    foreach ($elementNGCRS1h1->children() as $childNGCRS1h1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS1h1) . $childNGCRS1h1->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS1h1['STATUS'])) {
            if(htmlspecialchars($childNGCRS1h1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS1h1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS1h1 = $xmlNGCRS1h1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS1h1) {
    processXmlElementNGCRS1h1($healthAtAGlanceNGCRS1h1);
}

echo '</table>
<button class="buttona button1" ><a href="https://10.13.1.29/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN1NGCRS1h1</a></button>
</center>
</div>
';


///// ilo NGCRS1h2

$startPositionNGCRS1h2 = strpos($fileContentNGCRS1h2, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS1h2 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS1h2 = substr($fileContentNGCRS1h2, $startPositionNGCRS1h2);


$endPositionNGCRS1h2 = strpos($xmlContentNGCRS1h2, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS1h2 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS1h2 = substr($xmlContentNGCRS1h2, 0, $endPositionNGCRS1h2 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS1h2 = simplexml_load_string($xmlContentNGCRS1h2);


if ($xmlNGCRS1h2 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS1h2) {
        echo $errorNGCRS1h2->message . " at line " . $errorNGCRS1h2->line . " column " . $errorNGCRS1h2->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN1NGCRS1h2<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS1h2($elementNGCRS1h2, $levelNGCRS1h2 = 0)
{
    foreach ($elementNGCRS1h2->children() as $childNGCRS1h2) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS1h2) . $childNGCRS1h2->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS1h2['STATUS'])) {
            if(htmlspecialchars($childNGCRS1h2['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS1h2['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS1h2 = $xmlNGCRS1h2->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS1h2) {
    processXmlElementNGCRS1h2($healthAtAGlanceNGCRS1h2);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.28/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN1NGCRS1h2</a></button>
</center>
</div>
';


///// ilo NGCRS1h3

$startPositionNGCRS1h3 = strpos($fileContentNGCRS1h3, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS1h3 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS1h3 = substr($fileContentNGCRS1h3, $startPositionNGCRS1h3);


$endPositionNGCRS1h3 = strpos($xmlContentNGCRS1h3, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS1h3 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS1h3 = substr($xmlContentNGCRS1h3, 0, $endPositionNGCRS1h3 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS1h3 = simplexml_load_string($xmlContentNGCRS1h3);


if ($xmlNGCRS1h3 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS1h3) {
        echo $errorNGCRS1h3->message . " at line " . $errorNGCRS1h3->line . " column " . $errorNGCRS1h3->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN1NGCRS1h3<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS1h3($elementNGCRS1h3, $levelNGCRS1h3 = 0)
{
    foreach ($elementNGCRS1h3->children() as $childNGCRS1h3) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS1h3) . $childNGCRS1h3->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS1h3['STATUS'])) {
            if(htmlspecialchars($childNGCRS1h3['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS1h3['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS1h3 = $xmlNGCRS1h3->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS1h3) {
    processXmlElementNGCRS1h3($healthAtAGlanceNGCRS1h3);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.27/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN1NGCRS1h3</a></button>
</center>
</div>
';


///// ilo NGCRS1r1

$startPositionNGCRS1r1 = strpos($fileContentNGCRS1r1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS1r1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS1r1 = substr($fileContentNGCRS1r1, $startPositionNGCRS1r1);


$endPositionNGCRS1r1 = strpos($xmlContentNGCRS1r1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS1r1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS1r1 = substr($xmlContentNGCRS1r1, 0, $endPositionNGCRS1r1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS1r1 = simplexml_load_string($xmlContentNGCRS1r1);


if ($xmlNGCRS1r1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS1r1) {
        echo $errorNGCRS1r1->message . " at line " . $errorNGCRS1r1->line . " column " . $errorNGCRS1r1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN1NGCRS1r1<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS1r1($elementNGCRS1r1, $levelNGCRS1r1 = 0)
{
    foreach ($elementNGCRS1r1->children() as $childNGCRS1r1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS1r1) . $childNGCRS1r1->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS1r1['STATUS'])) {
            if(htmlspecialchars($childNGCRS1r1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS1r1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS1r1 = $xmlNGCRS1r1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS1r1) {
    processXmlElementNGCRS1r1($healthAtAGlanceNGCRS1r1);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.1.32/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN1NGCRS1r1</a></button>
</center>
</div>
';






?>

</div> 



<br/>


<div class="box">
<?php


$xmlFilePathNGCRS2d1 = '../../ilo/outputilo/outputILO_NGCRS2d1.xml';
$xmlFilePathNGCRS2d2 = '../../ilo/outputilo/outputILO_NGCRS2d2.xml';
$xmlFilePathNGCRS2h1 = '../../ilo/outputilo/outputILO_NGCRS2h1.xml';
$xmlFilePathNGCRS2h2 = '../../ilo/outputilo/outputILO_NGCRS2h2.xml';
$xmlFilePathNGCRS2h3 = '../../ilo/outputilo/outputILO_NGCRS2h3.xml';
$xmlFilePathNGCRS2r1 = '../../ilo/outputilo/outputILO_NGCRS2r1.xml';


$fileContentNGCRS2d1 = file_get_contents($xmlFilePathNGCRS2d1);
$fileContentNGCRS2d2 = file_get_contents($xmlFilePathNGCRS2d2);
$fileContentNGCRS2h1 = file_get_contents($xmlFilePathNGCRS2h1);
$fileContentNGCRS2h2 = file_get_contents($xmlFilePathNGCRS2h2);
$fileContentNGCRS2h3 = file_get_contents($xmlFilePathNGCRS2h3);
$fileContentNGCRS2r1 = file_get_contents($xmlFilePathNGCRS2r1);



/////ilo NGCRS2d1

$startPositionNGCRS2d1 = strpos($fileContentNGCRS2d1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS2d1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS2d1 = substr($fileContentNGCRS2d1, $startPositionNGCRS2d1);


$endPositionNGCRS2d1 = strpos($xmlContentNGCRS2d1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS2d1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS2d1 = substr($xmlContentNGCRS2d1, 0, $endPositionNGCRS2d1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS2d1 = simplexml_load_string($xmlContentNGCRS2d1);


if ($xmlNGCRS2d1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS2d1) {
        echo $errorNGCRS2d1->message . " at line " . $errorNGCRS2d1->line . " column " . $errorNGCRS2d1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN2NGCRS2d1 <br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS2d1($elementNGCRS2d1, $levelNGCRS2d1 = 0)
{
    foreach ($elementNGCRS2d1->children() as $childNGCRS2d1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS2d1) . $childNGCRS2d1->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS2d1['STATUS'])) {
            if(htmlspecialchars($childNGCRS2d1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS2d1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS2d1 = $xmlNGCRS2d1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS2d1) {
    processXmlElementNGCRS2d1($healthAtAGlanceNGCRS2d1);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.32/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN2NGCRS2d1</a></button>
</center>
</div>
';

///// ilo NGCRS2d2

$startPositionNGCRS2d2 = strpos($fileContentNGCRS2d2, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS2d2 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS2d2 = substr($fileContentNGCRS2d2, $startPositionNGCRS2d2);


$endPositionNGCRS2d2 = strpos($xmlContentNGCRS2d2, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS2d2 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS2d2 = substr($xmlContentNGCRS2d2, 0, $endPositionNGCRS2d2 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS2d2 = simplexml_load_string($xmlContentNGCRS2d2);


if ($xmlNGCRS2d2 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS2d2) {
        echo $errorNGCRS2d2->message . " at line " . $errorNGCRS2d2->line . " column " . $errorNGCRS2d2->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN2NGCRS2d2<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS2d2($elementNGCRS2d2, $levelNGCRS2d2 = 0)
{
    foreach ($elementNGCRS2d2->children() as $childNGCRS2d2) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS2d2) . $childNGCRS2d2->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS2d2['STATUS'])) {
            if(htmlspecialchars($childNGCRS2d2['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS2d2['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS2d2 = $xmlNGCRS2d2->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS2d2) {
    processXmlElementNGCRS2d2($healthAtAGlanceNGCRS2d2);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.31/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN2NGCRS2d2</a></button>
</center>
</div>
';


///// ilo NGCRS2h1

$startPositionNGCRS2h1 = strpos($fileContentNGCRS2h1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS2h1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS2h1 = substr($fileContentNGCRS2h1, $startPositionNGCRS2h1);


$endPositionNGCRS2h1 = strpos($xmlContentNGCRS2h1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS2h1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS2h1 = substr($xmlContentNGCRS2h1, 0, $endPositionNGCRS2h1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS2h1 = simplexml_load_string($xmlContentNGCRS2h1);


if ($xmlNGCRS2h1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS2h1) {
        echo $errorNGCRS2h1->message . " at line " . $errorNGCRS2h1->line . " column " . $errorNGCRS2h1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN2NGCRS2h1<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS2h1($elementNGCRS2h1, $levelNGCRS2h1 = 0)
{
    foreach ($elementNGCRS2h1->children() as $childNGCRS2h1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS2h1) . $childNGCRS2h1->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS2h1['STATUS'])) {
            if(htmlspecialchars($childNGCRS2h1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS2h1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS2h1 = $xmlNGCRS2h1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS2h1) {
    processXmlElementNGCRS2h1($healthAtAGlanceNGCRS2h1);
}

echo '</table>
<button class="buttona button1" ><a href="https://10.13.65.30/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN2NGCRS2h1</a></button>
</center>
</div>
';


///// ilo NGCRS2h2

$startPositionNGCRS2h2 = strpos($fileContentNGCRS2h2, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS2h2 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS2h2 = substr($fileContentNGCRS2h2, $startPositionNGCRS2h2);


$endPositionNGCRS2h2 = strpos($xmlContentNGCRS2h2, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS2h2 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS2h2 = substr($xmlContentNGCRS2h2, 0, $endPositionNGCRS2h2 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS2h2 = simplexml_load_string($xmlContentNGCRS2h2);


if ($xmlNGCRS2h2 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS2h2) {
        echo $errorNGCRS2h2->message . " at line " . $errorNGCRS2h2->line . " column " . $errorNGCRS2h2->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN2NGCRS2h2<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS2h2($elementNGCRS2h2, $levelNGCRS2h2 = 0)
{
    foreach ($elementNGCRS2h2->children() as $childNGCRS2h2) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS2h2) . $childNGCRS2h2->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS2h2['STATUS'])) {
            if(htmlspecialchars($childNGCRS2h2['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS2h2['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS2h2 = $xmlNGCRS2h2->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS2h2) {
    processXmlElementNGCRS2h2($healthAtAGlanceNGCRS2h2);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.29/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN2NGCRS2h2</a></button>
</center>
</div>
';


///// ilo NGCRS2h3

$startPositionNGCRS2h3 = strpos($fileContentNGCRS2h3, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS2h3 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS2h3 = substr($fileContentNGCRS2h3, $startPositionNGCRS2h3);


$endPositionNGCRS2h3 = strpos($xmlContentNGCRS2h3, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS2h3 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS2h3 = substr($xmlContentNGCRS2h3, 0, $endPositionNGCRS2h3 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS2h3 = simplexml_load_string($xmlContentNGCRS2h3);


if ($xmlNGCRS2h3 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS2h3) {
        echo $errorNGCRS2h3->message . " at line " . $errorNGCRS2h3->line . " column " . $errorNGCRS2h3->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN2NGCRS2h3<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS2h3($elementNGCRS2h3, $levelNGCRS2h3 = 0)
{
    foreach ($elementNGCRS2h3->children() as $childNGCRS2h3) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS2h3) . $childNGCRS2h3->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS2h3['STATUS'])) {
            if(htmlspecialchars($childNGCRS2h3['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS2h3['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS2h3 = $xmlNGCRS2h3->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS2h3) {
    processXmlElementNGCRS2h3($healthAtAGlanceNGCRS2h3);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.28/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN2NGCRS2h3</a></button>
</center>
</div>
';


///// ilo NGCRS2r1

$startPositionNGCRS2r1 = strpos($fileContentNGCRS2r1, '<GET_EMBEDDED_HEALTH_DATA>');
if ($startPositionNGCRS2r1 === false) {
    echo "Could not find the start of XML data.";
    exit;
}


$xmlContentNGCRS2r1 = substr($fileContentNGCRS2r1, $startPositionNGCRS2r1);


$endPositionNGCRS2r1 = strpos($xmlContentNGCRS2r1, '</GET_EMBEDDED_HEALTH_DATA>');
if ($endPositionNGCRS2r1 === false) {
    echo "Could not find the end of XML data.";
    exit;
}


$xmlContentNGCRS2r1 = substr($xmlContentNGCRS2r1, 0, $endPositionNGCRS2r1 + strlen('</GET_EMBEDDED_HEALTH_DATA>'));


libxml_use_internal_errors(true); 
$xmlNGCRS2r1 = simplexml_load_string($xmlContentNGCRS2r1);


if ($xmlNGCRS2r1 === false) {
    echo "Failed loading XML: ";
    foreach (libxml_get_errors() as $errorNGCRS2r1) {
        echo $errorNGCRS2r1->message . " at line " . $errorNGCRS2r1->line . " column " . $errorNGCRS2r1->column . "<br>";
    }
    libxml_clear_errors();
    exit; 
}

echo '
<div class="myDiv">
<center><p>ILO TN2NGCRS2r1<br/> Gen9</p>
<table border="1" id="customers">
        <tr>
            <th>Element</th>
            <th>Details</th>
        </tr>';

function processXmlElementNGCRS2r1($elementNGCRS2r1, $levelNGCRS2r1 = 0)
{
    foreach ($elementNGCRS2r1->children() as $childNGCRS2r1) {
        echo '<tr>';
        echo '<td>' . str_repeat('&nbsp;&nbsp;&nbsp;', $levelNGCRS2r1) . $childNGCRS2r1->getName() . '</td>';
        echo '<td>';
        if (isset($childNGCRS2r1['STATUS'])) {
            if(htmlspecialchars($childNGCRS2r1['STATUS'])=='OK')
			{echo '<img src="ok.PNG" style="width:50px">';}
			else {echo '<img src="degraded.PNG" style="width:55px">';}
        } elseif (isset($child['REDUNDANCY'])) {
            echo htmlspecialchars($childNGCRS2r1['REDUNDANCY']);
        } else {
            echo 'N/A';
        }
        echo '</td>';
        echo '</tr>';
    }
}

$healthAtAGlanceNGCRS2r1 = $xmlNGCRS2r1->HEALTH_AT_A_GLANCE;
if ($healthAtAGlanceNGCRS2r1) {
    processXmlElementNGCRS2r1($healthAtAGlanceNGCRS2r1);
}

echo '</table>
<button class="buttona button1"><a href="https://10.13.65.33/" style=" text-decoration: none;color:#fff" target="_blank">Accès ILO TN2NGCRS2r1</a></button>
</center>
</div>
';






?>

</div> 













	
		  
  </div>	  
  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
          <footer class="footer">

            <div class="container-fluid d-flex justify-content-between" >
              <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">&copy; 2024 Admin-IN. All Rights Reserved | Design by DRS <img src="img/orange.png" style="width:20px; transform:translate(0px,-2px)"></span>
			</div>
		
          </footer>
          <!-- partial -->
      
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
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

<script src="../../OTN_HealthChecks/Chart.min.js"></script>

  </body>
</html>
