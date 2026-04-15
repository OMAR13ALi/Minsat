<!DOCTYPE html>
<?php
session_start();
error_reporting(0);
if(($_SESSION['role'] != 'dsc') && ($_SESSION['role'] != 'admin') && ($_SESSION['role'] != 'bob2b') && ($_SESSION['role'] != 'dfi') && ($_SESSION['role'] != 'smcbo')){
	header('Location: 404');
}
elseif(empty($_SESSION['username'])) 
{

  header('Location: ../minsat');
  exit();
}
$username=$_SESSION['username'];
?>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>MINSAT</title>
  <link rel="stylesheet" href="cssresetpassword/style.css">
<link rel="shortcut icon" href="img/orange.png" />
</head>
<body style="background:#000">
<!-- partial:index.partial.html -->
<div class="mainDiv">
  <div class="cardStyle">
    <form action="resetpass" method="post" name="signupForm" id="signupForm">
      
      <img src="" id="signupLogo"/>
      
      <h2 class="formTitle">
        Merci de changer votre mot de passe
      </h2>
	  
      <div class="inputDiv">
      <label class="inputLabel" for="tel">Tél :</label>
	  <input type="text" id="tel" name="tel" pattern="[0-9]*"  placeholder="Tél : 50011405" maxlength="8" required >
    </div> 
	
    <div class="inputDiv">
      <label class="inputLabel" for="password">Nouveau mot de passe :</label>
      <input type="password" id="password" name="password" required>
      <input type="hidden" id="username" name="username" value="<?php echo $username; ?>">
    </div>
      
    <div class="inputDiv">
      <label class="inputLabel" for="confirmPassword">Confirmez le mot de passe :</label>
      <input type="password" id="confirmPassword" name="confirmPassword">
    </div>
    
    <div class="buttonWrapper">
      <button type="submit" name="submit" id="submitButton" onclick="validateSignupForm()" class="submitButton pure-button pure-button-primary">
        <span>Continuer</span>
      </button>
    </div>
      
  </form>
  </div>
  
  
</div>

<center>
 <footer class="page-footer" style="transform:translate(0px,10px);color:#959494">
           &copy; 2023 MINSAT. All Rights Reserved | Design by DRS <a href="http://village.orangetunisie.intra/"><img src="img/orange.png" style="width:15px; transform:translate(5px,2px)"></a>
        </footer>
</center>
<!-- partial -->
  <script  src="cssresetpassword/script.js"></script>

</body>
</html>
