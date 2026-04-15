<?php
session_start();

if(($_SESSION['role'] != 'dsc') && ($_SESSION['role'] != 'admin') && ($_SESSION['role'] != 'bob2b') && ($_SESSION['role'] != 'dfi')){
	header('Location: ../404');
}
elseif(empty($_SESSION['username'])) 
{

  header('Location: ../index');
  exit();
}
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
                  <i class="mdi mdi-crosshairs-gps menu-icon"></i>
                </span>Change Vouchers Status
              </h3>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                  </li>
                </ul>
              </nav>
            </div>
			


              <div class="col-md-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">

             
	
<form action="changestatus" class="forms-sample" name="form1" method="post"  > 
<table>


<tr>
<td align="center" colspan="2">
<label for="firstvouchers">First Serial Number :</label>
</td>
<td>
<input type="text" class="form-control" id="firstvouchers" maxlength="12" name="firstvouchers" value="<?php if(isset($_POST['submit'])){ echo $_REQUEST["firstvouchers"];} else { echo  "";}?>">
</div>
</td>
</tr>


<tr>
<td align="center" colspan="2">
<label for="lastvouchers">Last Serial Number :</label>
</td>
<td>
<input type="text" class="form-control" id="lastvouchers" maxlength="12" name="lastvouchers" value="<?php if(isset($_POST['submit'])){ echo $_REQUEST["lastvouchers"];} else { echo  "";}?>">
</div>
</td>
</tr>

<tr>
<td align="center" colspan="2">
<label for="from">New State :</label>
</td>
<td>
<select name="from">
<option></option>
<option value="0">Available</option>
<option value="1">Used</option>
<option value="2">Damaged</option>
<option value="3">Stolen/Missing</option>
<option value="4">Pending</option>
<option value="5">Unavailable</option>
<option value="6">Reserved</option>
</select>
</div>
</td>
</tr>

<tr>
<td align="center" colspan="2">
<label for="To">Old State :</label>
</td>
<td>
<select name="to">
<option></option>
<option value="0">Available</option>
<option value="1">Used</option>
<option value="2">Damaged</option>
<option value="3">Stolen/Missing</option>
<option value="4">Pending</option>
<option value="5">Unavailable</option>
<option value="6">Reserved</option>
</select>
</div>
</td>
</tr>


<tr align="center" colspan="2">
<td align="center" colspan="2">
<button type="submit" name="submit" class="btn btn-gradient-primary me-2" style="transform:translate(265px,20px)">Envoyer</button>
<a href="http://10.7.24.2/Admin-IN/dashboards/changestatus"><button type="submit"  class="btn btn-light" style="transform:translate(265px,20px)">Clear</button></a>
</td>
</tr>


</table>



	</form>
	
	
<!--
<b style="color:#ff6600;font-size:20px">Template 1DT pour les fournisseurs: </b>
-->
<?php
if(isset($_POST['submit'])){
error_reporting(0);
$connect = mysqli_connect("10.13.64.59","root","rootme123","erp");
$connecta = mysqli_connect("10.13.64.59","root","rootme123","adminin");


// while($row = mysqli_fetch_array($resultx)){ 
$xml_data = "<?xml version='1.0'?>
<methodCall>
<methodName>ChangeVoucherState</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>serialNumberFirst</name>
<value><string>".$_POST["firstvouchers"]."</string></value>
</member>
<member>
<name>serialNumberLast</name>
<value><string>".$_POST["lastvouchers"]."</string></value>
</member>
<member>
<name>newState</name>
<value><i4>".$_POST["from"]."</i4></value>
</member>
<member>
<name>oldState</name>
<value><i4>".$_POST["to"]."</i4></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $url = "10.13.0.50:10020/VoucherAdmin";
        $page = "/Air";
        $headers = array(
            "POST /VoucherAdmin HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic bmd2c3VzZXI6VmVudGVAQElOQEAyMDIz"
        );

      
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_USERAGENT,'ADM/2.4/7.0');     
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_data);
		
        $data = curl_exec($ch);



      

        if (curl_errno($ch)) {
            print "Error: " . curl_error($ch);
        } else {
            // echo $data;
			$ob= simplexml_load_string($data);
		    $json  = json_encode($ob);
			 $configData = json_decode($json, true);
			 
// $queryx = "delete from lookup where 1 ";
// $resultx = mysqli_query($connect,$queryx);

// $queryxx = "insert into lookup (champ) values ('$json') ";
// $resultxx = mysqli_query($connect,$queryxx);

// $a='"';
// $queryxa = "
// SELECT substr(SUBSTRING_INDEX(champ, 'i4', -1),4,1) as state , 
// substr(SUBSTRING_INDEX(champ, 'responseCode', -1),18,1) as rp,
// substr(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'batchId', -1),':',3),':',-2),':',-1),'".$a."',2),2,20) as batchid,
// date_format(str_to_date(substr(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'dateTime.iso8601',-2),'".$a."',3),4,100),'%Y%m%d'),'%d-%m-%Y') as expiry,
// substr(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'subscriberId', -1),'string',-1),'".$a."',3),4,20) as subscriber,
// substr(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'i4', -1),'value',3),'string',-1),'".$a."',3),4,20) as valeur,
// substr(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'voucherGroup', -1),':',3),'string',-1),'".$a."',3),4,20) as vg,
// substr(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'agent', -1),':',3),'string',-1),'".$a."',3),4,20) as agent,
// date_format(str_to_date(substr(SUBSTRING_INDEX(SUBSTRING_INDEX(champ, 'dateTime.iso8601',-1),'".$a."',3),4,100),'%Y%m%dT%H:%i:%s'),'%d-%m-%Y %H:%i') as used
// FROM `lookup` order by id desc limit 1 ";
// $resultxa = mysqli_query($connect,$queryxa);
			?>
			
			<!--
			<table style="background:#000;color:#fff">
			<tr><th>Result</th></tr>
			<tr><td><?php// echo $json; ?></td></tr>
			</table>
			-->
					



					
<br/>		

<center>

   <table style="background:#000;color:#fff" width="80%">
        <tr><th>Result</th></tr>
        <tr><td><?php echo $json; ?></td></tr>
        </table>


</center>


	




<?php
curl_close($ch);
}
}
?>





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
            <div class="container-fluid d-flex justify-content-between">
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
  </body>
</html>
