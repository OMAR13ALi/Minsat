<?php

$scriptPath = '/opt/lampp/htdocs/minsat/dashboards/but.php';
$output = shell_exec('/opt/lampp/bin/php -f ' . $scriptPath);

$username = 'minsat1';
$password = 'minsat123';

$field1 = '21656005201';
$field2 = '2023-04-20';
$field3 = '2023-04-20';

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