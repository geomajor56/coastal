<?php
$myemail = 'wqdata@coastalstudies.org';
if (isset($_POST['name'])) {
$name = strip_tags($_POST['name']);
$email = strip_tags($_POST['email']);
$organization = strip_tags($_POST['organization']);
$intentions = strip_tags($_POST['intentions']);
echo "<span class=\"alert alert-success\" >Your message has been received. Thanks! Here is what you submitted:</span><br><br>";
//echo "<stong>Name:</strong> ".$name."<br>";
//echo "<stong>Email:</strong> ".$email."<br>";
//echo "<stong>Message:</strong> ".$message."<br>";



$to = $myemail;
$email_subject = "Data Download Request Submission: $name";
$email_body = "You have received a new request. ".
" Here are the details:\n Name: $name \n ".
"Email: $email\n Organization:  $organization \n Intentions:  $intentions";
$headers = "From: $myemail\n";
$headers .= "Reply-To: $email";
mail($to,$email_subject,$email_body,$headers);

}?>