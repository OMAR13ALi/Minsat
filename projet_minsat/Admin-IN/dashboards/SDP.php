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
$date_dir = $_GET['date'];
$iteration = $_GET['Iteration'];
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Admin-IN : SDP</title>
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
		<link rel="stylesheet" href="tabold/ooo.min.css" /> 
<link rel="stylesheet" href="tabold/databouton.min.css" />
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
			


<li class="nav-item active">
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
                  <li class="nav-item"> <a class="nav-link active" href="autochecks">Automated Checks</a></li>
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
                  <i class="mdi mdi-heart menu-icon"></i>
                </span> SDP
              </h3>
             <!-- <nav aria-label="breadcrumb">
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

             



	

	

<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN1SDP3a</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN2SDP4a</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN1SDP5a</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN2SDP6a</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN1SDP7a</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN2SDP8a</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/SDP/".$date_dir."/".$iteration."/checksA.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[3]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[4]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[5]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[6]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>
</tbody>	
</table>
</center>





<br/>
<br/>

<center>
<table id="b" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN1SDP3b</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN2SDP4b</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN1SDP5b</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN2SDP6b</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN1SDP7b</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">TN2SDP8b</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/SDP/".$date_dir."/".$iteration."/checksB.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[3]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[4]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[5]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[6]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>
</tbody>	
</table>
</center>


</div>
</div>
</div>

<br/>

		<script type="text/javascript">

		
		function getRow(t) 
		{
		var col=t.cellIndex;
		var row=t.parentNode.rowIndex;
		var memberA_table = document.getElementById("memberA_table");
		var filename = "../../OTN_HealthChecks/SDP/"+<?php Print($date_dir); ?>+"/"+<?php Print($iteration); ?>+"/"+"SDP_"+col+"_"+row;
		var myWindow = window.open(filename,"MsgWindow","width=800,height=600");
		}

		function getRow100(t) 
		{
		var col=t.cellIndex;
		var col100=col+100;
		var row=t.parentNode.rowIndex;
		var memberB_table = document.getElementById("memberB_table");
		var filename = "../../OTN_HealthChecks/SDP/"+<?php Print($date_dir); ?>+"/"+<?php Print($iteration); ?>+"/"+"SDP_"+col100+"_"+row;
		var myWindow = window.open(filename,"MsgWindow","width=800,height=600");
		}
		$(document).ready(function(){
			$('#memberA_table td.table_values').each(function(){
				if ($(this).text() == '[NOK]') {
					$(this).css('background-color','#213042');
					$(this).css('color','white');
				}else if ($(this).text() == '[N/A]') {
					$(this).css('background-color','#d9d9d9');
					$(this).css('color','#d9d9d9');
				}else if ($(this).text() == '[CHK]') {
					$(this).css('background-color','#d9d9d9');
					$(this).css('color','#151f2b');
				}
			});
		});
		$(document).ready(function(){
			$('#memberB_table td').each(function(){
				if ($(this).text() == '[NOK]') {
					$(this).css('background-color','#213042');
					$(this).css('color','white');
				}else if ($(this).text() == '[N/A]') {
					$(this).css('background-color','#d9d9d9');
					$(this).css('color','#d9d9d9');
				}else if ($(this).text() == '[CHK]') {
					$(this).css('background-color','#d9d9d9');
					$(this).css('color','#151f2b');
				}
			});
		});
		</script>   

        <footer class="footer">
            <div class="container-fluid d-flex justify-content-between">
              <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">&copy; 2024 Admin-IN. All Rights Reserved | Design by DRS <img src="img/orange.png" style="width:20px; transform:translate(0px,-2px)"></span>
            </div>
          </footer>
          <!-- partial -->
        
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
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
"ordering": false,
"pageLength": 15,
    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel'
        ],
	
} );
} );
</script>
<script>
$(document).ready(function() {
$('#b').DataTable( {
"ordering": false,
"pageLength": 15,
    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel'
        ],
	
} );
} );
</script>

</body>
</html>
