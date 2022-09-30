<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://airtable.com/shr1FWYg8h4lp13oA/tblWJAQp2w3Ps4dvi',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_COOKIEJAR => dirname(__FILE__) . '/cookie.txt',
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_SSL_VERIFYHOST => false,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_VERBOSE => true,
  CURLOPT_STDERR => fopen(dirname(__FILE__).'/errorlog1.txt', 'w'),
));
$response = curl_exec($curl);

function getBetween($string, $start = "", $end = ""){
    if (strpos($string, $start)) { // required if $start not exist in $string
        $startCharCount = strpos($string, $start) + strlen($start);
        $firstSubStr = substr($string, $startCharCount, strlen($string));
        $endCharCount = strpos($firstSubStr, $end);
        if ($endCharCount == 0) {
            $endCharCount = strlen($firstSubStr);
        }
        return substr($firstSubStr, 0, $endCharCount);
    } else {
        return '';
    }
}

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => `https://airtable.com/v0.3/view/viwD4kE34KXLB5JuT/readSharedViewData?stringifiedObjectParams=%257B%2522shouldUseNestedResponseFormat%2522%253Atrue%257D&requestId=`.getBetween($response,'requestId: "','",').`accessPolicy=%257B%2522allowedActions%2522%253A%255B%257B%2522modelClassName%2522%253A%2522view%2522%252C%2522modelIdSelector%2522%253A%2522viwD4kE34KXLB5JuT%2522%252C%2522action%2522%253A%2522readSharedViewData%2522%257D%252C%257B%2522modelClassName%2522%253A%2522view%2522%252C%2522modelIdSelector%2522%253A%2522viwD4kE34KXLB5JuT%2522%252C%2522action%2522%253A%2522getMetadataForPrinting%2522%257D%252C%257B%2522modelClassName%2522%253A%2522view%2522%252C%2522modelIdSelector%2522%253A%2522viwD4kE34KXLB5JuT%2522%252C%2522action%2522%253A%2522readSignedAttachmentUrls%2522%257D%252C%257B%2522modelClassName%2522%253A%2522row%2522%252C%2522modelIdSelector%2522%253A%2522rows%2520*%255BdisplayedInView%253DviwD4kE34KXLB5JuT%255D%2522%252C%2522action%2522%253A%2522createBoxDocumentSession%2522%257D%252C%257B%2522modelClassName%2522%253A%2522row%2522%252C%2522modelIdSelector%2522%253A%2522rows%2520*%255BdisplayedInView%253DviwD4kE34KXLB5JuT%255D%2522%252C%2522action%2522%253A%2522createDocumentPreviewSession%2522%257D%255D%252C%2522shareId%2522%253A%2522shr1FWYg8h4lp13oA%2522%252C%2522applicationId%2522%253A%2522appPeKJE2w7yfGZyJ%2522%252C%2522generationNumber%2522%253A0%252C%2522expires%2522%253A%25222022-10-27T00%253A00%253A00.000Z%2522%252C%2522signature%2522%253A%2522a8b81b4e7503c50d60bc5a6ca3f0a3d6efa2db1d6420bea7ecc139e9c0f82cd7%2522%257D`,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_COOKIEFILE => dirname(__FILE__) . '/cookie.txt',
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_SSL_VERIFYHOST => false,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_VERBOSE => true,
  CURLOPT_STDERR => fopen(dirname(__FILE__).'/errorlog2.txt', 'w'),
  CURLOPT_HTTPHEADER => array(
    'x-airtable-application-id: appPeKJE2w7yfGZyJ',
    'x-airtable-inter-service-client: webClient',
    'x-airtable-page-load-id: pgle3fZypln0R81WS',
    'x-early-prefetch: true',
    'X-Requested-With: XMLHttpRequest',
    'x-time-zone: Europe/Paris',
    'x-user-locale: en',
    'ot-tracer-sampled: true',
    'ot-tracer-spanid: 3050a44060f5d0a3',
    'ot-tracer-traceid: 7128f66d5bf54442'
  ),
));

$response = curl_exec($curl);
echo $response;
