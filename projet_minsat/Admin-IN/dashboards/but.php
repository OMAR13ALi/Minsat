<?php
// Variables de connexion
$username = 'minsat1';
$password = 'minsat123';

// Données du formulaire
$field1 = '21650011405';
$field2 = '2023-11-13';
$field3 = '2023-11-13';

// Authentification avec curl
$login_url = "http://10.13.67.20:8080";

// Informations d'identification


// URL de la page protégée
$protected_url = "http://10.13.67.20:8080/Login";

// Création d'une session cURL
$ch = curl_init();

// Configuration des options de la session cURL pour se connecter
curl_setopt($ch, CURLOPT_URL, $login_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "user=$username&password=$password");
curl_setopt($ch, CURLOPT_COOKIEFILE, "cookies.txt");
curl_setopt($ch, CURLOPT_COOKIEJAR, "cookies.txt");

// Exécution de la session cURL pour se connecter
$output = curl_exec($ch);

// Configuration des options de la session cURL pour accéder à la page protégée
curl_setopt($ch, CURLOPT_URL, $protected_url);

// Exécution de la session cURL pour accéder à la page protégée
$output = curl_exec($ch);


// Envoi du formulaire avec curl
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, "http://10.13.67.20:8080/testShrMA.pub?User-Agent=Minsat%2F4.4%2F1.0");
curl_setopt($ch2, CURLOPT_POST, 1);
curl_setopt($ch2, CURLOPT_POSTFIELDS, "msisdn=".$field1."&startDate=".$field2."&endDate=".$field3);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch2, CURLOPT_COOKIEFILE, "cookies.txt");
$output2 = curl_exec($ch2);
curl_close($ch2);

// Affichage du résultat
// echo "Authentification : ".$output."<br>";
// echo "Envoi du formulaire : ".$output2;

// $obbefore= simplexml_load_string($output2);
		    // $jsoncc  = json_encode($obbefore);
?>

	<!--<table style="background:#000;color:#fff">
			<tr><th>Result</th></tr>
			<tr><td><?php //echo $jsoncc; ?></td></tr>
			</table>-->
			
<?php		
// if ($output2 !== false) {

    // $xml = simplexml_load_string($output2);
    

    // if ($xml !== false) {

        // $elementValue = $xml->transactionId;
        // echo "Value of element: " . $elementValue;
    // } else {

        // echo "Error parsing XML.";
    // }
// } else {

    // echo "Error retrieving XML.";
// }
// $xml = simplexml_load_string($output2);
// echo $xml->asXML();




/////////////////////////////////////////////////////////////////////////////////////


// if (!empty($output2)) {

    // $xml = simplexml_load_string($output2);

    // $title = $xml->pAMEvaluationMA;
    

    // foreach ($xml->pAMEvaluationMA as $item) {
        // $name = $item->transactionId;
        // $price = $item->subscriberNumber;

    // }
    

    // echo $output2;
// } else {
    // echo "Empty response received.";
// }





//////////////////////////////////////////////////////////////////////////////////////////


if (!empty($output2)) {
    // Parse the XML
    $xml = simplexml_load_string($output2);
    
    // Extract data from XML
    $items = $xml->cDRMA;
} else {
    echo "Empty response received.";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>XML to HTML Table</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>Date Time</th>
                <th>Transaction Amount</th>
                <th>Balance</th>
                <th>service Identifier</th>
                <th>Duration / Volume / Origin Node</th>
                <th>B Number / Voucher</th>
                <th>Location Number</th>
                <th>Routing Number</th>
                <th>Service Class</th>
                <th>Détails</th>
                <!-- Add more table headers as needed -->
            </tr>
        </thead>
        <tbody>
            <?php foreach ($items as $item): ?>
            <tr>
                <td><?php echo $item->transactionDateTime; ?></td>
                <td><?php echo $item->transactionAmount; ?></td>
                <td><?php echo $item->mainAccountBalance; ?></td>
                <td><?php echo $item->serviceIdentifier; ?></td>
                <td><?php 
				echo $item->dataVolume;
				echo $item->duration;
				echo " : ";
				echo $item->originNodeId;
				?>
				</td>
				<td><?php echo $item->otherPartyNumber; ?></td>
				<td><?php echo $item->locationNumber; ?></td>
				<td><?php echo $item->routingNumber; ?></td>
				<td><?php echo $item->serviceClassId; ?></td>
				<td>
				
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
        </tbody>
    </table>
</body>
</html>
