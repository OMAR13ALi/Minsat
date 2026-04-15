<?php
$jsonData = '{"params":{"param":{"value":{"struct":{"member":[{"name":"offerInformation","value":{"array":{"data":{"value":{"struct":{"member":[{"name":"expiryDate","value":{"dateTime.iso8601":"99991231T00:00:00+1200"}},{"name":"offerID","value":{"i4":"4997"}},{"name":"offerType","value":{"i4":"0"}},{"name":"startDate","value":{"dateTime.iso8601":"20230605T12:00:00+0000"}}]}}}}}},{"name":"originTransactionID","value":{"string":"22012018"}},{"name":"responseCode","value":{"i4":"0"}}]}}}}}';

$data = json_decode($jsonData, true);

// Extract values from JSON
$expiryDate = $data['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][0]['value']['dateTime.iso8601'];
$offerID = $data['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][1]['value']['i4'];
$offerType = $data['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][2]['value']['i4'];
$startDate = $data['params']['param']['value']['struct']['member'][0]['value']['array']['data']['value']['struct']['member'][3]['value']['dateTime.iso8601'];
$originTransactionID = $data['params']['param']['value']['struct']['member'][1]['value']['string'];
$responseCode = $data['params']['param']['value']['struct']['member'][2]['value']['i4'];

// Generate HTML table
$html = '<table>';
$html .= '<tr><td>Expiry Date</td><td>' . $expiryDate . '</td></tr>';
$html .= '<tr><td>Offer ID</td><td>' . $offerID . '</td></tr>';
$html .= '<tr><td>Offer Type</td><td>' . $offerType . '</td></tr>';
$html .= '<tr><td>Start Date</td><td>' . $startDate . '</td></tr>';
$html .= '<tr><td>Origin Transaction ID</td><td>' . $originTransactionID . '</td></tr>';
$html .= '<tr><td>Response Code</td><td>' . $responseCode . '</td></tr>';
$html .= '</table>';

echo $html;
?>
