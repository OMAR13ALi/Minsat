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

$read = fopen('../../OTN_HealthChecks/LocalServer/connected_nodes.txt', 'r');
$connected_nodes=fread($read,1000);
fclose($read);

//Get the Checks iteration
$current_time=date("H");
if(($current_time>=8)&&($current_time<14)){
	$check_seq="1st";
}elseif (($current_time>=14)&&($current_time<20)) {
	$check_seq="2nd";
}else{
	$check_seq="3rd";
}

//Get the NOKs summary
$handle = fopen('../../OTN_HealthChecks/NOKs_Summary/sdp_noks.txt', 'r');
$sdp_noks=fread($handle,1000);
fclose($handle);

$handle = fopen('../../OTN_HealthChecks/NOKs_Summary/air_noks.txt', 'r');
$air_noks=fread($handle,1000);
fclose($handle);

$handle = fopen('../../OTN_HealthChecks/NOKs_Summary/occ_noks.txt', 'r');
$occ_noks=fread($handle,1000);
fclose($handle);

$handle = fopen('../../OTN_HealthChecks/NOKs_Summary/ccn_noks.txt', 'r');
$ccn_noks=fread($handle,1000);
fclose($handle);

$handle = fopen('../../OTN_HealthChecks/NOKs_Summary/ngvs_noks.txt', 'r');
$ngvs_noks=fread($handle,1000);
fclose($handle);

$handle = fopen('../../OTN_HealthChecks/NOKs_Summary/ngcrs_noks.txt', 'r');
$ngcrs_noks=fread($handle,1000);
fclose($handle);
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

// /* Create three equal columns that floats next to each other */
// .columnn {
  // float: left;
  // width: 50%;
  // padding: 15px;
// }

// /* Clear floats after the columns */
// .rown::after {
  // content: "";
  // display: table;
  // clear: both;
// }

// /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
// @media screen and (max-width:600px) {
  // .columnn {
    // width: 100%;
  // }
// }
</style>

<style type="text/css">
			@keyframes blinker {
				50% {
				opacity: 0;
			  }
			}
			#main_server_checks{
				// border:1px solid #151f2b;
				position: relative;
				width:1120px;
				height:200px;
			}
			#connected_servers_box{
				margin:20px;
				background-color: #000;
				border:1px solid #000;
				border-radius: 10px;
				position: relative;
				width:330px;
				height:210px;
				text-align: center;
				left: 10px;
			}
			#disk_space_box{
				margin:20px;
				background-color: #000;
				border:1px solid #000;
				border-radius: 10px;
				position: relative;
			    width:330px;
				height:210px;
				text-align: center;
				top:-232px;
				left: 380px;
			}
			#load_average_box{
				margin:20px;
				background-color: #000;
				border:1px solid #000;
				border-radius: 10px;
				position: relative;
				width:320px;
				height:210px;
				text-align: center;
				top:-464px;
				left: 750px;
			}
	
			#NOK_summary{
				// border:1px solid #151f2b;
				position: relative;
				width:1120px;
				height:200px;
				top:20px;
			}
			#SDP_NOKs{
				margin:10px;
				background-color: #f60;
				border:1px solid #f60;
				border-radius: 10px;
				position: absolute;
				width:350px;
				height:100px;
				text-align: center;
				left: 10px;
			}
			#AIR_NOKs{
				margin:10px;
				background-color: #f60;
				border:1px solid #f60;
				border-radius: 10px;
				position: absolute;
				width:350px;
				height:100px;
				text-align: center;
				left: 380px;
			}
			#OCC_NOKs{
				margin:10px;
				background-color: #f60;
				border:1px solid #f60;
				border-radius: 10px;
				position: absolute;
				width:350px;
				height:100px;
				text-align: center;
				left: 750px;
			}
			#CCN_NOKs{
				margin:10px;
				background-color: #f60;
				border:1px solid #f60;
				border-radius: 10px;
				position: absolute;
				width:350px;
				height:100px;
				text-align: center;
				left: 10px;
				top: 230px;
			}
			#NGVS_NOKs{
				margin:10px;
				background-color: #f60;
				border:1px solid #f60;
				border-radius: 10px;
				position: absolute;
				width:350px;
				height:100px;
				text-align: center;
				left: 380px;
				top: 230px;
			}
			#NGCRS_Cluster_NOKs{
				margin:10px;
				background-color: #f60;
				border:1px solid #f60;
				border-radius: 10px;
				position: absolute;
				width:350px;
				height:100px;
				text-align: center;
				left: 750px;
				top: 230px;
			}
			.ahref{
color:black; text-decoration : none;
			}
		</style>
		
		
</head>
<body>


<!--<div class="rown">
  <div class="columnn">
<img src="img/hcin.jpg" alt="Health Check IN" style="width:200px">
  </div>-->
  

                  <div id="main_server_checks" style="transform:translate(0px,-40px)">
					<div id="connected_servers_box">
						<h2 style="color:#fff">Connected Nodes</h2>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 70px; color: white;"><?php echo $connected_nodes ?></p>
					</div>
					<div id="disk_space_box">
						<canvas id="chart" width="250" height="150"></canvas>
						<script>
							ChartIT();

							async function ChartIT(){
								const data = await getData();
								const ctx = document.getElementById('chart').getContext('2d');
								const myChart = new Chart(ctx, {
								    type: 'line',
								    data: {
								        labels: data.xdata,
								        datasets: [{
								        	fill:false,
								            label: 'Disk Space',
								            data: data.ydata,
								            backgroundColor: 'white',
								            borderColor: 'white',
								            borderWidth: 1
								        }]
								    },
									options: {
								        legend: {
								             labels: {
								                  fontColor: 'white'
								                 }
								              },
								       
								        scales: {
								            yAxes: [{
								                ticks: {
								                    beginAtZero:true,
								                    fontColor: 'white'
								                },
								            }],
								          xAxes: [{
								                ticks: {
								                    fontColor: 'white'
								                },
								            }]
								        } 
								    }
								});
							}

							async function getData() {
								const xdata = [];
								const ydata = [];
								const response = await fetch('../../OTN_HealthChecks/LocalServer/disk_space.csv');
								const data = await response.text();

								const table = data.split('\n').slice(1);
								table.forEach(row => {
									const columns = row.split(',');
									const time = columns[0];
									xdata.push(time);
									const disk_usage = columns[1];
									ydata.push(disk_usage);
									console.log(time , disk_usage);
								});
								return{xdata , ydata};
							}
						</script>
					</div>
					<div id="load_average_box">
						<canvas id="chart2" width="250" height="150"></canvas>
						<script>
							ChartIT2();

							async function ChartIT2(){
								const data2 = await getData2();
								const ctx2 = document.getElementById('chart2').getContext('2d');
								const myChart2 = new Chart(ctx2, {
								    type: 'line',
								    data: {
								        labels: data2.xdata2,
								        datasets: [{
								        	fill:false,
								            label: 'CPU Load',
								            data: data2.ydata2,
								            backgroundColor: 'white',
								            borderColor: 'white',
								            borderWidth: 1
								        }]
								    },
									options: {
								        legend: {
								             labels: {
								                  fontColor: 'white'
								                 }
								              },
								       
								        scales: {
								            yAxes: [{
								                ticks: {
								                    beginAtZero:true,
								                    fontColor: 'white'
								                },
								            }],
								          xAxes: [{
								                ticks: {
								                    fontColor: 'white'
								                },
								            }]
								        } 
								    }
								});
							}

							async function getData2() {
								const xdata2 = [];
								const ydata2 = [];
								const response2 = await fetch('../../OTN_HealthChecks/LocalServer/cpu_load.csv');
								const data2 = await response2.text();

								const table2 = data2.split('\n').slice(1);
								table2.forEach(row => {
									const columns2 = row.split(',');
									const time2 = columns2[0];
									xdata2.push(time2);
									const cpu_load = columns2[1];
									ydata2.push(cpu_load);
									console.log(time2 , cpu_load);
								});
								return{xdata2 , ydata2};
							}
						</script>
					</div>
				</div>
				<div id="NOK_summary" style="transform:translate(0px,-40px)">
					<h2 style="color:#000"><b>NOKs</b> summary from Today's <?php echo $check_seq ?> checks</h2>
					<div id="SDP_NOKs" style="transform:translate(0px,-5px)">
						<h3><a href="SDPNOK" class="ahref">SDP NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $sdp_noks ?></strong></p>
					</div>
					<div id="AIR_NOKs" style="transform:translate(0px,-5px)">
						<h3><a href="AIRNOK" class="ahref">AIR NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $air_noks ?></strong></p>
					</div>
					<div id="OCC_NOKs" style="transform:translate(0px,-5px)">
						<h3><a href="OCCNOK" class="ahref">OCC NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $occ_noks ?></strong></p>
					</div>
					<div id="CCN_NOKs" style="transform:translate(0px,-80px)">
						<h3><a href="CCNNOK" class="ahref">CCN NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $ccn_noks ?></strong></p>
					</div>
					<div id="NGVS_NOKs" style="transform:translate(0px,-80px)">
						<h3><a href="NGVSNOK" class="ahref">NgVS NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $ngvs_noks ?></strong></p>
					</div>
					<div id="NGCRS_Cluster_NOKs" style="transform:translate(0px,-80px)">
						<h3><a href="NGCRSNOK" class="ahref">NgCRS HSecmaster NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $ngcrs_noks ?></strong></p>
					</div>
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
