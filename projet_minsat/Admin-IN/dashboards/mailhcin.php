<?php


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

  </head>
  <body>
<div class="content-wrapper">


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
	
				</div>
					<div id="NOK_summary" >
					<h2 style="color:#000"><b>NOKs</b> summary from Today's <?php echo $check_seq ?> checks</h2>
					<table id="b" class="display" style="width:100%">
					<tbody>		
					<tr>
					<td style="width:33%;">
					<div id="SDP_NOKs" >
						<h3><a href="SDPNOK" class="ahref">SDP NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $sdp_noks ?></strong></p>
					</div>
					</td>
					<td style="width:33%;">
					<div id="AIR_NOKs">
						<h3><a href="AIRNOK" class="ahref">AIR NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $air_noks ?></strong></p>
					</div>
					</td>
					<td style="width:33%;">
					<div id="OCC_NOKs">
						<h3><a href="OCCNOK" class="ahref">OCC NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $occ_noks ?></strong></p>
					</div>
					</td>
					</tr>
					<tr>
					<td style="width:33%;">
					<div id="CCN_NOKs">
						<h3><a href="CCNNOK" class="ahref">CCN NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $ccn_noks ?></strong></p>
					</div>
					</td>
					<td style="width:33%;">
					<div id="NGVS_NOKs">
						<h3><a href="NGVSNOK" class="ahref">NgVS NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $ngvs_noks ?></strong></p>
					</div>
					</td>
					<td style="width:33%;">
					<div id="NGCRS_Cluster_NOKs">
						<h3><a href="NGCRSNOK" class="ahref">NgCRS HSecmaster NOKs</a></h3>
						<p id="connected_nodes" style="font-family: tahoma; font-size: 40px; color: white"><strong><?php echo $ngcrs_noks ?></strong></p>
					</div>
					</td>
					</tr>
					</tbody>
                    </table>
				</div>  
				

  
<br/>
<br/>
<br/>

<h2 style="color:#000"><b>OCC NOKs</b></h2>

<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Node ID</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Status</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/NOKs_Summary/OCC_NOKs.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>	
</tbody>	
</table>
</center>



<h2 style="color:#000"><b>SDP NOKs</b></h2>

<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Node ID</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Status</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/NOKs_Summary/SDP_NOKs.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>	
</tbody>	
</table>
</center>
                  
			
<h2 style="color:#000"><b>CCN NOKs</b></h2>	

		  
<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Node ID</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Status</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/NOKs_Summary/CCN_NOKs.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>	
</tbody>	
</table>
</center>		  				
	


<h2 style="color:#000"><b>NGVS NOKs</b></h2>	

		  
<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Node ID</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Status</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/NOKs_Summary/NGVS_NOKs.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>	
</tbody>	
</table>
</center>	



<h2 style="color:#000"><b>AIR NOKs</b></h2>	

		  
<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Node ID</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Check</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Status</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/NOKs_Summary/AIR_NOKs.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[2]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>	
</tbody>	
</table>
</center>	



<h2 style="color:#000"><b>NGCRS NOKs</b></h2>	

		  

<center>
<table id="a" class="display" style="width:100%">
        <thead>
            <tr style="background:#ff6600; color:#fff;font-weight: bold;border-style: dashed;height:30px">
                <th style="border-width:1px;border-color: black;border-style:dashed">Node ID</th>
                <th style="border-width:1px;border-color: black;border-style:dashed">Status</th>
            </tr>

        </thead>
        <tbody>
<?php
if (($csvfile= fopen("../../OTN_HealthChecks/NOKs_Summary/NGCRS_NOKs.csv", "r")) !==FALSE)
{ 
while (($csvdata = fgetcsv ($csvfile, 10000, ",")) !==FALSE)
{
$colcount = count ($csvdata);
echo "<tr>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[0]."</td>";
echo "<td style='border-width:1px;border-color: black;border-style:dotted' onclick='getRow(this)'>".$csvdata[1]."</td>";
echo "</tr>";							
} 		
fclose($csvfile);
}
?>	
</tbody>	
</table>
</center>







		  
  </div>	  
		  
	  


  </body>
</html>


