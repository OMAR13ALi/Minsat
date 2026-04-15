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

    <link rel="stylesheet" href="assets/css/yyy.css">
    <!-- End layout styles -->
	

  
	<link rel="stylesheet" href="tab/ooo.min.css" /> 
<link rel="stylesheet" href="tab/databouton.min.css" />


    <link rel="shortcut icon" href="img/orange.png" />
	
	<style>

	</style>

	

  </head>
  <body class="sidebar-icon-only">
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
                  <span class="text-secondary text-small"><?php echo ucfirst(utf8_encode($_SESSION['role'])); ?></span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
   
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
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="mdi mdi-history menu-icon"></i>
                </span>MSISDN History
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

  <!-- <iframe src="http://10.7.24.2:8080/" style="width:1350px;height:570px;transform: scale(0.7);"  
   name="CRS" title="CRS Account History"frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe> -->
<center>   
<form action="history" class="forms-sample" name="form1" method="post" style="transform:translate(-120px)" > 
<table >
<tr>
<td align="center">
<label for="msisdn"  ><b>MSISDN :</b></label>
</td>
<td>
<input type="text" class="form-control"  style="width:80px;height:40px;font-size:15px" value="+216" maxlength="3" size="3" readonly>
</td>
<td>
<input type="text" class="form-control" id="msisdn"  name="msisdn" pattern="[0-9]*"  placeholder="MSISDN" maxlength="8" style="height:40px;font-size:15px" value="<?php if(isset($_POST['submit'])){ echo $_REQUEST["msisdn"];} else { echo  "";}?>" required >
<!--oninvalid="this.setCustomValidity('Il faut saisir un msisdn')"-->
</td>
<tr>
<td align="center" >
<label for="msisdn"  ><b>Début :</b></label>
</td>
<td>
</td>
<td>
<input type="date" class="form-control" name="debut"  value="<?php if(isset($_POST['submit'])){ echo $_REQUEST["debut"];} else { echo  "";}?>" >
</td>
</tr>
<tr>
<td align="center" >
<label for="msisdn"  ><b>Fin :</b></label>
</td>
<td>
</td>
<td>
<input type="date" class="form-control" name="fin" value="<?php if(isset($_POST['submit'])){ echo $_REQUEST["fin"];} else { echo  "";}?>" >
</td>
</tr>

<tr align="center" colspan="2">
<td align="center" colspan="2">
<button type="submit" name="submit" class="btn btn-gradient-primary me-2" style="transform:translate(255px,20px)">Envoyer</button>
<a href="http://10.13.64.59/minsat/dashboards/history"><button type="submit"  class="btn btn-light" style="transform:translate(260px,20px)">Clear</button></a>
</td>
</tr>

</table>
</form>
</center>


<br/>
<br/>
<br/>

<?php
if(isset($_POST['submit'])){
	
date_default_timezone_set('Africa/Tunis');
$datee=date('d/m/Y H:i');
$user=$_SESSION['username'];
$role=$_SESSION['role'];
$msisdnn=$_POST["msisdn"];
$debutt=$_POST["debut"];
$finn=$_POST["fin"];

$sqlss="insert into audit (`login`,`role`,`datehistory`,`ip`,`os`,`browser`,`msisdnhistory`,`datedebuthistory`,`datefinhistory`) 
values ('".$user."','".$role."','".$datee."','".$ip."','".$os."','".$browser."','".$msisdnn."','".$debutt."','".$finn."')  ";
$resultss=mysqli_query($connect,$sqlss);	



// $sqlss="update audit set msisdnhistory='$msisdnn' , datedebuthistory='$debutt', datefinhistory='$finn' where login='$user' and sessionin like '$datee%'  ";
// $resultss=mysqli_query($connect,$sqlss);	
	
	
$scriptPath = '/opt/lampp/htdocs/minsat/dashboards/but.php';
$output = shell_exec('/opt/lampp/bin/php -f ' . $scriptPath);

$username = 'minsat1';
$password = 'minsat123';



$field1 = '216'.$_POST["msisdn"];
$field2 = $_POST["debut"];
$field3 = $_POST["fin"];

$login_url = "http://10.13.67.20:8080";



$protected_url = "http://10.13.67.20:8080/Login";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $login_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "user=$username&password=$password");
curl_setopt($ch, CURLOPT_COOKIEFILE, "cookies.txt");
curl_setopt($ch, CURLOPT_COOKIEJAR, "cookies.txt");

$output = curl_exec($ch);

curl_setopt($ch, CURLOPT_URL, $protected_url);

$output = curl_exec($ch);


$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, "http://10.13.67.20:8080/testShrMA.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch2, CURLOPT_POST, 1);
curl_setopt($ch2, CURLOPT_POSTFIELDS, "msisdn=".$field1."&startDate=".$field2."&endDate=".$field3);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch2, CURLOPT_COOKIEFILE, "cookies.txt");
$output2 = curl_exec($ch2);
curl_close($ch2);



if (!empty($output2)) {
    $xml = simplexml_load_string($output2);
    $items = $xml->cDRMA;
    $itemspam = $xml->pAMEvaluationMA;
    $itemsair = $xml->aIRSRefillMA;
    $itemserror = $xml->errorMA;
    $itemsadj = $xml->adjustmentMA;
} else {
    echo "Empty response received.";
}
?>   

<center style="transform:translate(-10px,0px);width:100%;">

<table border="1" id="a" class="display nowrap " cellspacing="0" style="width:100%;">
<!--<div  style="width:500px;transform:translate(-100px,-90px);line-height: 1.5" style="font-size:11px;">
<table border="1" id="a" class="display nowrap" cellspacing="0" style="font-size:10.5px;box-shadow: 0px 1px 20px #000">-->     
<thead class="description-column">
<tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dotted;height:70px" class="description-column">
<th style="border-width:1px;border-color: black;border-style:dashed">Date Time</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Transaction<br/>Amount</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Balance</th>
<th style="border-width:1px;border-color: black;border-style:dashed">service<br/>Identifier</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Charing<br/>Context</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Traffic</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Used Units</th>
<th style="border-width:1px;border-color: black;border-style:dashed">B Number /<br/>Voucher</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Location<br/>Number</th>
<th style="border-width:1px;border-color: black;border-style:dashed">Détails</th>
</tr>
<tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dotted;height:20px" class="description-column">
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed">Charing<br/>Context</th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
<th style="border-width:1px;border-color: black;border-style:dashed"></th>
</tr>
</thead>
<tbody style="font-size:11.5px;box-shadow: 0px 1px 20px #000">
            <?php foreach ($items as $item): ?>
            <tr>
			<?php
			$dd=$item->transactionDateTime; 
			?>
			
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo substr($dd,0,19); ?></td>
                <td   style="border-width:1px;border-color: black;border-style: dotted"><?php echo $item->transactionAmount; ?></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo $item->mainAccountBalance; ?></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo $item->serviceIdentifier; ?></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">
				<?php 
				 $cc=$item->chargingContext; 
				 $sii=$item->serviceIdentifier;
				 $trafficcase=$item->trafficCase;
					$querysi = "select * from serviceidentifier ";
					$resultsi = mysqli_query($connect,$querysi);
					while($row = mysqli_fetch_array($resultsi)) {
						if(($sii==$row["Id33"]) && ($cc==$row["Idname"]) ){	                      
								echo utf8_encode($row["Comment34"]);                       		                      
							}
					}
				
		
				?>
				<td  style="border-width:1px;border-color: black;border-style: dotted">
				<?php
						if(($sii=="0") || ($sii=="1"))
				{
				echo "<b>";
				$querytc = "select * from trafficcase ";
				$resulttc = mysqli_query($connect,$querytc);
				while($row = mysqli_fetch_array($resulttc)) {
					if(($trafficcase==$row["idd"])){	                      
							echo utf8_encode($row["description"]);                       		                      
						}
				}
			    echo "</b>";
				}
				?>
				</td>
				</td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php 
				echo "<b>";
				echo $item->dataVolume;
				echo "</b>";
				echo "<b>";
				echo $item->duration;
				echo "</b>";
				// echo " : ";
				// echo "<u>";
				// echo $item->originNodeId;
				// echo "</u>";
				?>
				</td>
				<td  style="border-width:1px;border-color: black;border-style: dotted">
				<?php
// if($_SESSION['role'] == 'bob2b') {
				// $opn=$item->otherPartyNumber;
				// echo $opn;
// }
// else
// {
// $opn=$item->otherPartyNumber;
// echo substr($opn,0,8);
// echo "XXX";	
$opn=$item->otherPartyNumber;
				echo $opn;			
 
// }
				?>		
				</td>
				<td style="border-width:1px;border-color: black;border-style: dotted">
				<?php 
				$ln=$item->locationNumber;
				if((substr($ln,0,3)=="605") || (substr($ln,0,3)=="216"))
				{ 
			      // echo "National :";
			      echo "National";
			      // echo $ln;
			
			     }
				 elseif((substr($ln,0,3)!="605") && (substr($ln,0,3)!=NULL))
				{ 
			      // echo "Roaming :";
			      echo "Roaming";
			      // echo $ln;
			
			     }
				 	 elseif(substr($ln,0,3)==NULL)
				{ 
			       echo " ";
			
			     }
				 // else 
				 // {
					// echo " ";
			      
				 // }
				
				?>
				</td>
				<!--<td style="border-width:1px;border-color: black;border-style: dotted"><?php //echo $item->routingNumber; ?></td>	
				<td style="border-width:1px;border-color: black;border-style: dotted"><?php //echo $item->serviceClassId; ?></td>-->
				<td style="border-width:1px;border-color: black;border-style: dotted">
				
	<?php			
	
$transs = $item->transactionId;
$ch3 = curl_init();
curl_setopt($ch3, CURLOPT_URL, "http://10.13.67.20:8080/testShrTD.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch3, CURLOPT_POST, 1);
curl_setopt($ch3, CURLOPT_POSTFIELDS, "transactionId=".$transs);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch3, CURLOPT_COOKIEFILE, "cookies.txt");
$output3 = curl_exec($ch3);
curl_close($ch3);

if (!empty($output3)) {
$ob = simplexml_load_string($output3);
$json = json_encode($ob);
$secondresponse = json_decode($json, true);

if (!function_exists('parseData')) {
function parseData($secondresponse, $prefix = '') {
foreach ($secondresponse as $key => $value) {
if (is_array($value)) {
parseData($value, $prefix);
} else {
$flattenedKey = $prefix . $key;
$excludedKey = 'transactionId';

if ($flattenedKey !== $excludedKey) {
if($value !== '4.4'){

echo "{$flattenedKey} ";
echo " {$value}";
echo "<br>";

}
}
}
}
}
}

parseData($secondresponse);
}

?>
</td>
</tr>
<?php endforeach; ?>



<?php foreach ($itemspam as $itempam): ?>
            <tr>
			<?php
			$dd=$itempam->transactionDateTime; 
			?>
			
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo substr($dd,0,19); ?></td>
                <td   style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">PAM</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
				
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php 		
				echo "<u>";
				echo $itempam->originNodeId;
				echo "</u>";
				?>
				</td>
				<td  style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">Service Class :<?php echo $item->serviceClassId; ?></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">
				
	<?php			
	
$transspam = $itempam->transactionId;
$ch3 = curl_init();
curl_setopt($ch3, CURLOPT_URL, "http://10.13.67.20:8080/testShrTD.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch3, CURLOPT_POST, 1);
curl_setopt($ch3, CURLOPT_POSTFIELDS, "transactionId=".$transspam);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch3, CURLOPT_COOKIEFILE, "cookies.txt");
$output3 = curl_exec($ch3);
curl_close($ch3);

if (!empty($output3)) {
$ob = simplexml_load_string($output3);
$json = json_encode($ob);
$secondresponse = json_decode($json, true);

if (!function_exists('parseData')) {
function parseData($secondresponse, $prefix = '') {
foreach ($secondresponse as $key => $value) {
if (is_array($value)) {
parseData($value, $prefix);
} else {
$flattenedKey = $prefix . $key;
$excludedKey = 'transactionId';

if ($flattenedKey !== $excludedKey) {
if($value !== '4.4'){

echo "{$flattenedKey} ";
echo " {$value}";
echo "<br>";

}
}
}
}
}
}

parseData($secondresponse);
}

?>
</td>
</tr>
<?php endforeach; ?>







 <?php foreach ($itemsair as $itemair): ?>
            <tr>
			<?php
			$dd=$itemair->transactionDateTime; 
			?>
			
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo substr($dd,0,19); ?></td>
                <td   style="border-width:1px;border-color: black;border-style: dotted"><?php echo $itemair->transactionAmount; ?></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo $itemair->mainAccountBalance; ?></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">Refill</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php 
		
				echo "<u>";
				echo $itemair->originNodeId;
				echo "</u>";
				?>
				</td>
				<td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo $itemair->nominalAmount  ;?> <b>DT :</b>
				<?php // echo  $itemair->segmentationId; ?>
				<?php  echo  $itemair->voucherSerialNumber; ?>
				
				
				</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">
				
	<?php			
	
$transsair = $itemair->transactionId;
$ch3 = curl_init();
curl_setopt($ch3, CURLOPT_URL, "http://10.13.67.20:8080/testShrTD.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch3, CURLOPT_POST, 1);
curl_setopt($ch3, CURLOPT_POSTFIELDS, "transactionId=".$transsair);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch3, CURLOPT_COOKIEFILE, "cookies.txt");
$output3 = curl_exec($ch3);
curl_close($ch3);

if (!empty($output3)) {
$ob = simplexml_load_string($output3);
$json = json_encode($ob);
$secondresponse = json_decode($json, true);

if (!function_exists('parseData')) {
function parseData($secondresponse, $prefix = '') {
foreach ($secondresponse as $key => $value) {
if (is_array($value)) {
parseData($value, $prefix);
} else {
$flattenedKey = $prefix . $key;
$excludedKey = 'transactionId';

if ($flattenedKey !== $excludedKey) {
if($value !== '4.4'){

echo "{$flattenedKey} ";
echo " {$value}";
echo "<br>";

}
}
}
}
}
}

parseData($secondresponse);
}

?>
</td>
</tr>
<?php endforeach; ?>










   <?php foreach ($itemsadj as $itemadj): ?>
            <tr>
			<?php
			$dd=$itemadj->transactionDateTime; 
			?>
			
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo substr($dd,0,19); ?></td>
                <td   style="border-width:1px;border-color: black;border-style: dotted"><?php echo $itemadj->transactionAmount; ?></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo $itemadj->mainAccountBalance; ?></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">Adjustment</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php 
				// echo "<u>";
				// echo $itemadj->originNodeId;
				// echo "</u>";
				?>
				</td>
				<td  style="border-width:1px;border-color: black;border-style: dotted">
				<?php 
				if($itemadj->externalData1 !='')
				{
					echo $itemadj->externalData1 ;
				?>
				<b>:</b> 
				<?php 
				
				echo  $itemadj->externalData2; 
				}
				?>
				</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">
				
	<?php			
	
$transsadj = $itemadj->transactionId;
$ch3 = curl_init();
curl_setopt($ch3, CURLOPT_URL, "http://10.13.67.20:8080/testShrTD.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch3, CURLOPT_POST, 1);
curl_setopt($ch3, CURLOPT_POSTFIELDS, "transactionId=".$transsadj);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch3, CURLOPT_COOKIEFILE, "cookies.txt");
$output3 = curl_exec($ch3);
curl_close($ch3);

if (!empty($output3)) {
$ob = simplexml_load_string($output3);
$json = json_encode($ob);
$secondresponse = json_decode($json, true);

if (!function_exists('parseData')) {
function parseData($secondresponse, $prefix = '') {
foreach ($secondresponse as $key => $value) {
if (is_array($value)) {
parseData($value, $prefix);
} else {
$flattenedKey = $prefix . $key;
$excludedKey = 'transactionId';

if ($flattenedKey !== $excludedKey) {
if($value !== '4.4'){

echo "{$flattenedKey} ";
echo " {$value}";
echo "<br>";

}
}
}
}
}
}

parseData($secondresponse);
}

?>
</td>
</tr>
<?php endforeach; ?>






 <?php foreach ($itemserror as $itemerror): ?>
            <tr>
			<?php
			$dd=$itemerror->transactionDateTime; 
			?>
			
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php echo substr($dd,0,19); ?></td>
                <td   style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">Error</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
                <td  style="border-width:1px;border-color: black;border-style: dotted"><?php 
				// echo "<u>";
				// echo $itemerror->originNodeId;
				// echo "</u>";
				?>
				</td>
				<td  style="border-width:1px;border-color: black;border-style: dotted">
				<?php 
				$act=$itemerror->activationCode;
				echo substr($act,0,4);
				echo "XXXXXXXXX";
				?>
				</td>
				<td style="border-width:1px;border-color: black;border-style: dotted"></td>
				<td style="border-width:1px;border-color: black;border-style: dotted">
				
	<?php			
	
$transserror = $itemerror->transactionId;
$ch3 = curl_init();
curl_setopt($ch3, CURLOPT_URL, "http://10.13.67.20:8080/testShrTD.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch3, CURLOPT_POST, 1);
curl_setopt($ch3, CURLOPT_POSTFIELDS, "transactionId=".$transserror);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch3, CURLOPT_COOKIEFILE, "cookies.txt");
$output3 = curl_exec($ch3);
curl_close($ch3);

if (!empty($output3)) {
$ob = simplexml_load_string($output3);
$json = json_encode($ob);
$secondresponse = json_decode($json, true);

if (!function_exists('parseData')) {
function parseData($secondresponse, $prefix = '') {
foreach ($secondresponse as $key => $value) {
if (is_array($value)) {
parseData($value, $prefix);
} else {
$flattenedKey = $prefix . $key;
$excludedKey = 'transactionId';

if ($flattenedKey !== $excludedKey) {
if($value !== '4.4'){

echo "{$flattenedKey} ";
echo " {$value}";
echo "<br>";

}
}
}
}
}
}

parseData($secondresponse);
}

?>
</td>
</tr>
<?php endforeach; ?>






</tbody>
</table>




</center>
   
   
   
   
   
   
<?php
}
?>  
   
   
   
   
   
   
   
   
   
   
   
</div>	










</div>
</div>
</div>


          <footer class="footer">

            <div class="container-fluid d-flex justify-content-between" >
              <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">&copy; 2024 Admin-IN. All Rights Reserved | Design by DRS <img src="img/orange.png" style="width:20px; transform:translate(0px,-2px)"></span>
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
	
	<script type="text/javascript" src="tab/data.js"></script>		   
<script type="text/javascript" src="tab/databouton.min.js"></script>		   
<script type="text/javascript" src="tab/boutonflash.min.js"></script>		   
<script type="text/javascript" src="tab/jszip.min.js"></script>		   
<script type="text/javascript" src="tab/pdfmake.min.js"></script>		   
<script type="text/javascript" src="tab/vfs.js"></script>		   
<script type="text/javascript" src="tab/boutonhtml.min.js"></script>		   
<script type="text/javascript" src="tab/boutonprint.min.js"></script>
<script>
// $(document).ready(function() {
// $('#a').DataTable( {
// "pageLength": 10,

   // columns: [
        // null,
    
        // {
            // "render": function(data, type, row){
                // return data.split(", ").join("<br/>");
            // }
        // },
		    // null,
    // ]
// dom: 'Bfrtip',
// buttons: [
	'excel','csv','pdf','copy'
	// 'excel'
// ],
// "scrollX": true,
// } );
// } );
</script>

<script>
$(document).ready(function() {
$('#a').DataTable( {
"paging": false,
// "pageLength": 10,

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
dom: 'Bfrtip',
buttons: [
	// 'excel','csv','pdf','copy'
	'excel'
],
// "scrollX": true,
// "scrollY": true,
scrollY: 400,
scrollX: true,

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
  
  
initComplete: function () {
    this.api().columns().every(function (index) {
        if (index === 4) { 
            var column = this;
            var select = $('<select style="width:120px"><option value=""></option></select>')
                .appendTo($(column.header()).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());

                    column
                        .search(val ? '^' + val + '$' : '', true, false)
                        .draw();
                });

            column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });
        }
    });
}
		
		
} );
} );
</script> 

</body>
</html>
