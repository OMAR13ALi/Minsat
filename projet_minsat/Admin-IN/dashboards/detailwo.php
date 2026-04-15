<?php

error_reporting(0);
ini_set('session.cache_limiter','public');
session_cache_limiter(false);
session_start();
if (!isset($_SESSION['username']))
{header("Location:index");
}
?>
<?php

if(isset($_POST["employeea_id"]))  
 {  

	  $connect = mysqli_connect("10.13.64.59","root","rootme123","erp");  
      // $query = "SELECT *,id,STR_TO_DATE(datecommande , '%Y-%m-%d' )as dc,STR_TO_DATE(datelivraison , '%Y-%m-%d' )as dl FROM `fournisseur` WHERE  id = '".$_POST["employeea_id"]."' ";  
      $query = "SELECT a.*,b.* FROM docin a, files b where a.ts=b.status and a.id = '".$_POST["employeea_id"]."'  ";  
      $result = mysqli_query($connect, $query); 


	  
  $querya = "SELECT  *,STR_TO_DATE(datedemep , '%Y-%m-%d' )as dc FROM docin where id = '".$_POST["employeea_id"]."'  ";  
      $resulta = mysqli_query($connect, $querya); 
   

   
  
 

  ?>
<html>
<head>

</head>
<body>

 <form action="updatewo" method="POST" enctype="multipart/form-data">
 <?php
   while($row = mysqli_fetch_array($resulta))  
      { 
  $c=$row["dc"];
  ?>
  




<center>

<div class="form-group">
<label for="swan">Fichiers:</label>
<input type="file" name="file[]" class="btn btn-default" id="files" multiple>
</div>

</center>


<br>
 
<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="swan">Ticket SWAN:</label>
<input type="text" class="form-control" id="swan"  name="swan" value="<?php echo utf8_encode($row["ts"])  ?>">
<input type="hidden" class="form-control" id="id"  name="id" value="<?php echo utf8_encode($row["id"])  ?>">
</div>
</td>
<td>
<div class="form-group">
<label for="datedemep">Date de MEP:</label>
<input type="date" class="form-control" id="datedemep" name="datedemep" value="<?php echo $c;?>">
</div>
</td>
<td>
<div class="form-group">
<label for="mep">MEP effectué:</label>
<select class="form-control" id="mep" name="mep" >
<option value="<?php echo utf8_encode($row["mep"])  ?>"><?php echo utf8_encode($row["mep"])  ?></option>
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
<option value="<?php echo utf8_encode($row["etatmep"])  ?>"><?php echo utf8_encode($row["etatmep"])  ?></option>
<option></option>
<option value="Success">Success</option>
<option value="Rollback">Rollback</option>
<option value="Annulled">Annulled</option>
</select>
</div>
</td>
</table>



<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="wo">WO:</label>
<input type="text" class="form-control" id="wo"  name="wo" value="<?php echo utf8_encode($row["wo"])  ?>">
</div>
</td>
<td>
<div class="form-group">
<label for="demandeur">Demandeur:</label>
<select class="form-control" id="demandeur" name="demandeur" >
<option value="<?php echo utf8_encode($row["demandeur"])  ?>"><?php echo utf8_encode($row["demandeur"])  ?></option>
<option></option>
<option value="Yasmine Mchirgui">Yasmine Mchirgui</option>
<option value="Rania Zarred">Rania Zarred</option>
<option value="Amine Bouzayeni">Amine Bouzayeni</option>
<option value="Amine Dhouibi">Amine Dhouibi</option>
<option value="Oussama Arfaoui">Oussama Arfaoui</option>
<option value="Nawfel Fitouhi">Nawfel Fitouhi</option>
<option value="Mohamed Ammar">Mohamed Ammar</option>
<option value="Mohamed Amine Ben Achour">Mohamed Amine Ben Achour</option>
<option value="Ali Brahmia">Ali Brahmia</option>
<option value="Achraf Smaoui">Achraf Smaoui</option>
<option value="Amine Souabni">Amine Souabni</option>
<option value="Bilel Boussaa">Bilel Boussaa</option>
</select>
</div>
</td>
<td>
<div class="form-group">
<label for="executeur">Responsable:</label>
<select class="form-control" id="executeur" name="executeur" >
<option value="<?php echo utf8_encode($row["executeur"])  ?>"><?php echo utf8_encode($row["executeur"])  ?></option>
<option></option>
<option value="Mohamed Ammar">Mohamed Ammar</option>
<option value="Mohamed Amine Ben Achour">Mohamed Amine Ben Achour</option>
<option value="Ali Brahmia">Ali Brahmia</option>
<option value="Achraf Smaoui">Achraf Smaoui</option>
<option value="Amine Souabni">Amine Souabni</option>
<option value="Bilel Boussaa">Bilel Boussaa</option>
</select>
</div>
</td>
</tr>
</table>




<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="description">Description:</label>
<textarea class="form-control" style="height:70px" id="description" name="description" ><?php echo utf8_encode($row["description"]);  ?></textarea>
</div>
</td>
</tr>
</table>

<?php
	  }
?>



















<?php
	  
   while($row = mysqli_fetch_array($result))  
      { 
  ?>
<table width="100%">
<tr>
<td>
<div class="form-group">
<label for="fournisseur" style="transform:translate(-2px,3px)">File:</label>
<a href="uploads/<?php echo utf8_encode($row["file_name"]);  ?>"><?php echo utf8_encode($row["file_name"]);  ?></a>
</div>
</td>
</tr>
</table>


<?php
}
}
?>

<center>
<button type="submit" name="submit" class="btn btn-default">Update</button>
</center>

</body>
</html>

