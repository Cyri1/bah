<?php

// $curl = curl_init();

// curl_setopt_array($curl, array(
//   CURLOPT_URL => 'https://airtable.com/shr1FWYg8h4lp13oA/tblWJAQp2w3Ps4dvi',
//   CURLOPT_RETURNTRANSFER => true,
//   CURLOPT_ENCODING => '',
//   CURLOPT_MAXREDIRS => 10,
//   CURLOPT_TIMEOUT => 0,
//   CURLOPT_FOLLOWLOCATION => true,
//   CURLOPT_COOKIEJAR => dirname(__FILE__) . '/cookie.txt',
//   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//   CURLOPT_CUSTOMREQUEST => 'GET',
//   CURLOPT_SSL_VERIFYHOST => false,
//   CURLOPT_SSL_VERIFYPEER => false,
//   CURLOPT_VERBOSE => true,
//   CURLOPT_STDERR => fopen(dirname(__FILE__).'/errorlog1.txt', 'w'),
// ));
// $response = curl_exec($curl);

// function getBetween($string, $start = "", $end = ""){
//     if (strpos($string, $start)) { // required if $start not exist in $string
//         $startCharCount = strpos($string, $start) + strlen($start);
//         $firstSubStr = substr($string, $startCharCount, strlen($string));
//         $endCharCount = strpos($firstSubStr, $end);
//         if ($endCharCount == 0) {
//             $endCharCount = strlen($firstSubStr);
//         }
//         return substr($firstSubStr, 0, $endCharCount);
//     } else {
//         return '';
//     }
// }

// $curl = curl_init();
// curl_setopt_array($curl, array(
//   CURLOPT_URL => `https://airtable.com/v0.3/view/viwD4kE34KXLB5JuT/readSharedViewData?stringifiedObjectParams=%257B%2522shouldUseNestedResponseFormat%2522%253Atrue%257D&requestId=`.getBetween($response,'requestId: "','",').`accessPolicy=%257B%2522allowedActions%2522%253A%255B%257B%2522modelClassName%2522%253A%2522view%2522%252C%2522modelIdSelector%2522%253A%2522viwD4kE34KXLB5JuT%2522%252C%2522action%2522%253A%2522readSharedViewData%2522%257D%252C%257B%2522modelClassName%2522%253A%2522view%2522%252C%2522modelIdSelector%2522%253A%2522viwD4kE34KXLB5JuT%2522%252C%2522action%2522%253A%2522getMetadataForPrinting%2522%257D%252C%257B%2522modelClassName%2522%253A%2522view%2522%252C%2522modelIdSelector%2522%253A%2522viwD4kE34KXLB5JuT%2522%252C%2522action%2522%253A%2522readSignedAttachmentUrls%2522%257D%252C%257B%2522modelClassName%2522%253A%2522row%2522%252C%2522modelIdSelector%2522%253A%2522rows%2520*%255BdisplayedInView%253DviwD4kE34KXLB5JuT%255D%2522%252C%2522action%2522%253A%2522createBoxDocumentSession%2522%257D%252C%257B%2522modelClassName%2522%253A%2522row%2522%252C%2522modelIdSelector%2522%253A%2522rows%2520*%255BdisplayedInView%253DviwD4kE34KXLB5JuT%255D%2522%252C%2522action%2522%253A%2522createDocumentPreviewSession%2522%257D%255D%252C%2522shareId%2522%253A%2522shr1FWYg8h4lp13oA%2522%252C%2522applicationId%2522%253A%2522appPeKJE2w7yfGZyJ%2522%252C%2522generationNumber%2522%253A0%252C%2522expires%2522%253A%25222022-10-27T00%253A00%253A00.000Z%2522%252C%2522signature%2522%253A%2522a8b81b4e7503c50d60bc5a6ca3f0a3d6efa2db1d6420bea7ecc139e9c0f82cd7%2522%257D`,
//   CURLOPT_RETURNTRANSFER => true,
//   CURLOPT_ENCODING => '',
//   CURLOPT_MAXREDIRS => 10,
//   CURLOPT_TIMEOUT => 0,
//   CURLOPT_FOLLOWLOCATION => true,
//   CURLOPT_COOKIEFILE => dirname(__FILE__) . '/cookie.txt',
//   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//   CURLOPT_CUSTOMREQUEST => 'GET',
//   CURLOPT_SSL_VERIFYHOST => false,
//   CURLOPT_SSL_VERIFYPEER => false,
//   CURLOPT_VERBOSE => true,
//   CURLOPT_STDERR => fopen(dirname(__FILE__).'/errorlog2.txt', 'w'),
//   CURLOPT_HTTPHEADER => array(
//     'x-airtable-application-id: appPeKJE2w7yfGZyJ',
//     'x-airtable-inter-service-client: webClient',
//     'x-airtable-page-load-id: pgle3fZypln0R81WS',
//     'x-early-prefetch: true',
//     'X-Requested-With: XMLHttpRequest',
//     'x-time-zone: Europe/Paris',
//     'x-user-locale: en',
//     'ot-tracer-sampled: true',
//     'ot-tracer-spanid: 3050a44060f5d0a3',
//     'ot-tracer-traceid: 7128f66d5bf54442'
//   ),
// ));

// $response = curl_exec($curl);
// echo $response;

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => `https://airtable.com/v0.3/view/viwD4kE34KXLB5JuT/readSharedViewData?stringifiedObjectParams=%7B%22shouldUseNestedResponseFormat%22%3Atrue%7D&requestId=reqrQk3Ix0we8a7jT&accessPolicy=%7B%22allowedActions%22%3A%5B%7B%22modelClassName%22%3A%22view%22%2C%22modelIdSelector%22%3A%22viwD4kE34KXLB5JuT%22%2C%22action%22%3A%22readSharedViewData%22%7D%2C%7B%22modelClassName%22%3A%22view%22%2C%22modelIdSelector%22%3A%22viwD4kE34KXLB5JuT%22%2C%22action%22%3A%22getMetadataForPrinting%22%7D%2C%7B%22modelClassName%22%3A%22view%22%2C%22modelIdSelector%22%3A%22viwD4kE34KXLB5JuT%22%2C%22action%22%3A%22readSignedAttachmentUrls%22%7D%2C%7B%22modelClassName%22%3A%22row%22%2C%22modelIdSelector%22%3A%22rows%20*%5BdisplayedInView%3DviwD4kE34KXLB5JuT%5D%22%2C%22action%22%3A%22createBoxDocumentSession%22%7D%2C%7B%22modelClassName%22%3A%22row%22%2C%22modelIdSelector%22%3A%22rows%20*%5BdisplayedInView%3DviwD4kE34KXLB5JuT%5D%22%2C%22action%22%3A%22createDocumentPreviewSession%22%7D%5D%2C%22shareId%22%3A%22shr1FWYg8h4lp13oA%22%2C%22applicationId%22%3A%22appPeKJE2w7yfGZyJ%22%2C%22generationNumber%22%3A0%2C%22expires%22%3A%222022-10-27T00%3A00%3A00.000Z%22%2C%22signature%22%3A%22a8b81b4e7503c50d60bc5a6ca3f0a3d6efa2db1d6420bea7ecc139e9c0f82cd7%22%7D`,
  CURLOPT_RETURNTRANSFER => false,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_SSL_VERIFYHOST => false,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_VERBOSE => true,
  CURLOPT_STDERR => fopen(dirname(__FILE__).'/errorlog2.txt', 'w'),
  CURLOPT_HTTPHEADER => array(
    'Cookie: AWSELB=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE92B48CE1BB3BE2DF64F2AF8FC299B7DB140BC1262B9940A7DF1D234855648842F3CC3EBF5745D7203454491E06F96450A2; AWSELBCORS=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE92B48CE1BB3BE2DF64F2AF8FC299B7DB140BC1262B9940A7DF1D234855648842F3CC3EBF5745D7203454491E06F96450A2; __Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNYcWFwcmdnY1ZpZXpBTiIsImNzcmZTZWNyZXQiOiJmVWdUaVhyblRVRWZRZW1uelR4M29QRS0ifQ==; __Host-airtable-session.sig=0D80nO__4y2WZLJ_sSdtBgkclKHwzCffHPMG6dYMAy8; brw=brwuLyvNMtkVUFDX0',
    'Cookie: brw=brwuLyvNMtkVUFDX0; intercom-id-wb1whb4b=08e554c8-e13d-497e-af6b-5613e883d8c0; __Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNjT0tuZ05sRkxwWWtaWSIsImNzcmZTZWNyZXQiOiJTWXVqYmFhN3FmV084VjVHZl9ENWtYeHUiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE2NjMzMTY3OTgyNDEsInVzZXJJZCI6InVzckVrMUNWOFhJYVF6Z1NzIiwibG9nZ2VkSW5UaW1lIjoiMjAyMi0wOS0xNlQwODoyNjozOC4yOTNaIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlfQ==; __Host-airtable-session.sig=2Bxcn2GgGXgayh1j8WMvURJFhbNaQSdBEV6DIjjTkPQ; lightstep_guid%2FsharedViewOrApp=461a7577683e1f0d; lightstep_session_id=491f8d1b1fd2847f; AWSELB=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE920025D3C55287816E4AE3E4B24EF7E36B91AC3560650744EDFEAB3519A6F71FB90228B1D42233BE375DAC5578290CB97D; AWSELBCORS=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE920025D3C55287816E4AE3E4B24EF7E36B91AC3560650744EDFEAB3519A6F71FB90228B1D42233BE375DAC5578290CB97D',
    'x-airtable-application-id: appPeKJE2w7yfGZyJ',
    'x-airtable-inter-service-client: webClient',
    'x-airtable-page-load-id: pgle3fZypln0R81WS',
    'x-early-prefetch: true',
    'X-Requested-With: XMLHttpRequest',
    'x-time-zone: Europe/Paris',
    'x-user-locale: en',
    'Host: airtable.com',
    'ot-tracer-sampled: true',
    'ot-tracer-spanid: 3050a44060f5d0a3',
    'ot-tracer-traceid: 7128f66d5bf54442'
  ),
));

$response = curl_exec($curl);
echo $response;
