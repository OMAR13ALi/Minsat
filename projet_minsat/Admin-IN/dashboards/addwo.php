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
    <link rel="stylesheet" href="assets/css/zz.css">

	
    <!-- End layout styles -->
	



    <link rel="shortcut icon" href="img/orange.png" />

	 <style>




/* class applies to select element itself, not a wrapper element */
.select-css {
display: block;
font-size: 16px;
font-family: sans-serif;
font-weight: 700;
color: #000;
line-height: 1.3;
padding: .6em 1.4em .5em .8em;
/*! width: 100%; */
max-width: 100%; /* useful when width is set to anything other than 100% */
box-sizing: border-box;
margin: 0;
border: 1px solid #757575;
box-shadow: 0 1px 0 1px rgba(57, 43, 43, 0.71);
border-radius: .5em;
-moz-appearance: none;
-webkit-appearance: none;
appearance: none;
background-color: #fff;
/* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference

*/
background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #fff 0%,#bfbfbf 100%);
background-repeat: no-repeat, repeat;
/* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
background-position: right .7em top 50%, 0 0;
/* icon size, then gradient */
background-size: .65em auto, 100%;
}
/* Hide arrow icon in IE browsers */
.select-css::-ms-expand {
display: none;
}
/* Hover style */
.select-css:hover {
border-color: #888;
}
/* Focus style */
.select-css:focus {
border-color: #f00;
/* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
box-shadow: 0 0 0 3px -moz-mac-focusring;
color: #000; 
outline: none;
}

/* Set options to normal weight */
.select-css option {
font-weight:normal;
}

/* Support for rtl text, explicit support for Arabic and Hebrew */
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
background-position: left .7em top 50%, 0 0;
padding: .6em .8em .5em 1.4em;
}

/* Disabled styles */
.select-css:disabled, .select-css[aria-disabled=true] {
color: graytext;
background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
}

.select-css:disabled:hover, .select-css[aria-disabled=true] {
border-color: #aaa;
}
  </style>
  <style>
.btn-group .button {
  background-color: #000; /* Green */
  border: 1px solid #ff6600;
  color: white;
  padding: 5px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.13), 0 6px 20px 0 rgba(0, 0, 0, 0.66);
}

.btn-group .button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

.btn-group .button:hover {
  background-color: #ff6600;
  border: 1px solid #000;
}

</style>

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


  
<form action="ajoutwo"  method="post" enctype="multipart/form-data" style="transform:translate(0px,0px)"> 
<center>

<div class="form-group">
<label for="swan" style="transform:translate(-10px,15px)">Fichiers:</label>
<input type="file" name="file[]" class="btn btn-default" id="files" multiple>
</div>

</center>
<br/>

<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="swan">Ticket SWAN:*</label>
<input type="text" class="form-control" id="swan"  name="swan" required>
</div>
</td>
<td>
<div class="form-group">
<label for="wo">WO:</label>
<input type="text" class="form-control" id="wo" name="wo" maxlength="50">
</div>
</td>
<td>
<div class="form-group">
<label for="datedemep">Date de MEP:</label>
<input type="date" class="form-control" id="datedemep" name="datedemep" required>
</div>
</td>
</tr>
</table>

<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="demandeur">Demandeur: *</label>
<select class="form-control" id="demandeur" name="demandeur" required>
<option></option>
<option value="Yasmine Mchirgui">Yasmine Mchirgui</option>
<option value="Mohamed Jabaloui">Mohamed Jabaloui</option>
<option value="Oussama Arfaoui">Oussama Arfaoui</option>
<option value="Asma khlifi">Asma khlifi</option>
<option value="Nour El Houda">Nour El Houda</option>
<option value="Nawfel Fitouhi">Nawfel Fitouhi</option>
<option value="Mohamed Ammar">Mohamed Ammar</option>
<option value="Achraf Smaoui">Achraf Smaoui</option>
<option value="Amine Souabni">Amine Souabni</option>
<option value="Bilel Boussaa">Bilel Boussaa</option>
</select>
</div>
</td>
<td>
<div class="form-group">
<label for="executeur">Responsable: *</label>
<select class="form-control" id="executeur" name="executeur" required>
<option></option>
<option value="Mohamed Ammar">Mohamed Ammar</option>
<option value="Achraf Smaoui">Achraf Smaoui</option>
<option value="Amine Souabni">Amine Souabni</option>
<option value="Bilel Boussaa">Bilel Boussaa</option>
</select>
</div>
</td>
<td>
<div class="form-group">
<label for="cr">CR/Projet:</label>
<input type="text" class="form-control" id="cr" name="cr" maxlength="10">
</div>
</td>
<td>
<div class="form-group">
<label for="woenvoye">WO envoyé:</label>
<select class="form-control" id="woenvoye" name="woenvoye" >
<option></option>
<option value="yes">Yes</option>
<option value="no">No</option>
</select>
</div>
</td>
<td>
<div class="form-group">
<label for="kickoff">Kickoff effectué:</label>
<select class="form-control" id="kickoff" name="kickoff" >
<option></option>
<option value="yes">Yes</option>
<option value="no">No</option>
</select>
</div>
</td>
<td>
<div class="form-group">
<label for="mep">MEP effectué:</label>
<select class="form-control" id="mep" name="mep" >
<option></option>
<option value="yes">Yes</option>
<option value="no">No</option>
</select>
</div>
</td>
<td>
<div class="form-group">
<label for="etatmep">Etat de MEP:</label>
<select class="form-control" id="etatmep" name="etatmep" >
<option></option>
<option value="Success">Success</option>
<option value="Rollback">Rollback</option>
<option value="Annullé">Annullé</option>
</select>
</div>
</td>
</tr>
</table>

<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="description">Description: *</label>
<textarea class="form-control" id="description" name="description" required></textarea>
</div>
</td>
</tr>
</table>






<center style="transform:translate(0px,10px)">
<button type="submit" class="btn btn-default" name="submit">Submit</button>
</center>
</form>

















	
		  
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
	
	
<script src="assets/js/jquery-3.3.1.min.js"></script>
<script src="assets/js/jquery-1.10.2.min.js"></script>
 	
	
	<script type="text/javascript" src="tabold/data.js"></script>		   
<script type="text/javascript" src="tabold/databouton.min.js"></script>		   
<script type="text/javascript" src="tabold/boutonflash.min.js"></script>		   
<script type="text/javascript" src="tabold/jszip.min.js"></script>		   
<script type="text/javascript" src="tabold/pdfmake.min.js"></script>		   
<script type="text/javascript" src="tabold/vfs.js"></script>		   
<script type="text/javascript" src="tabold/boutonhtml.min.js"></script>		   
<script type="text/javascript" src="tabold/boutonprint.min.js"></script>

<script>
const popupCenter = ({url, title, w, h}) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title, 
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
}
</script>

  </body>
</html>
