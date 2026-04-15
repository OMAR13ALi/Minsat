<?php
// URL de la page de connexion
$login_url = "http://10.13.67.20:8080";

// Informations d'identification
$username = "minsat1";
$password = "minsat123";

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





// Fermeture de la session cURL
curl_close($ch);

// Affichage du résultat
echo $output;
?>

