<?php



// Variables de connexion
$username = 'minsat1';
$password = 'minsat123';

// Données du formulaire
$field1 = '21650011405';
$field2 = '2023-04-20';
$field3 = '2023-04-20';

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

$obbefore= simplexml_load_string($output2);
print_r($obbefore);
		    $jsoncc  = json_encode($obbefore);
			
?>

	<table style="background:#000;color:#fff">
			<tr><th>Result</th></tr>
			<tr><td><?php echo $jsoncc; ?></td></tr>
			</table>

