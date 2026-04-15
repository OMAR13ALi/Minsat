<?php

$xml_data = "<?xml version='1.0'?>
<methodCall>
<methodName>ChangeVoucherState</methodName>
<params>
<param>
<value>
<struct>
<member>
<name>serialNumberFirst</name>
<value><string>".$_POST["firstvouchers"]."</string></value>
</member>
<member>
<name>serialNumberLast</name>
<value><string>".$_POST["lastvouchers"]."</string></value>
</member>
<member>
<name>newState</name>
<value><i4>0</i4></value>
</member>
<member>
<name>oldState</name>
<value><i4>5</i4></value>
</member>
</struct>
</value>
</param>
</params>
</methodCall>";

// }


        $url = "10.13.0.50:10020/VoucherAdmin";
        $page = "/Air";
        $headers = array(
            "POST /VoucherAdmin HTTP/1.1",
            "Content-type: text/xml",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: \"run\"", 
            "Authorization: Basic bmd2c3VzZXI6VmVudGVAQElOQEAyMDIz"
        );

      
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_USERAGENT,'ADM/2.4/7.0');     
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_data);
		
        $data = curl_exec($ch);



      

        if (curl_errno($ch)) {
            print "Error: " . curl_error($ch);
        } else {
            // echo $data;
			$ob= simplexml_load_string($data);
		    $json  = json_encode($ob);
			 $configData = json_decode($json, true);
			 




					
 echo $json;




curl_close($ch);
}

?>


