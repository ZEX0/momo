<?php 
$to = "info@oceanclubsharm.com"; 
$from = $_REQUEST['email'] ; 
$name = $_REQUEST['name'] ; 
$headers = "From: $from"; 
$subject = "Reservation"; 

$fields = array(); 
$fields{"name"} = "Name"; 
$fields{"email"} = "E-Mail"; 
$fields{"Country"} = "Nationality"; 
$fields{"phone"} = "Telephone NO.";
$fields{"message"} = "Message";

$body = "This is a list of the information about the enquiry:\n\n"; foreach($fields as $a => $b){ $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); } 

$headers2 = "From: $to"; 
$subject2 = "Thank you for contacting us"; 
$autoreply = "Thank you for contacting us. A member of our team will answer to your enquiry as soon as we can.";

if($from == '') {print "You have not entered an email, please go back and try again";} 
else { 
if($name == '') {print "You have not entered a name, please go back and try again";} 
else { 
$send = mail($to, $subject, $body, $headers); 
$send2 = mail($from, $subject2, $autoreply, $headers2); 
if($send) 
{header( "Location: http://www.oceanclubsharm.com/thankyou.html" );} 
else 
{print "We encountered an error sending your mail, please notify info@oceanclubsharm.com"; } 
}
}
?> 
