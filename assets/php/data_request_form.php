<?php

$errorMSG = "";

// NAME
if (empty($_POST["requestname"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["requestname"];
}

// EMAIL
if (empty($_POST["requestemail"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["requestemail"];
}

// ORGANIZATION
if (empty($_POST["requestorganization"])) {
    $errorMSG .= "Organization is required ";
} else {
    $organization = $_POST["requestorganization"];
}

// INTENTION
if (empty($_POST["requestintentions"])) {
    $errorMSG .= "Intended use is required ";
} else {
    $intentions = $_POST["requestintentions"];
}


$EmailTo = "geomajor56@gmail.com";
$Subject = "Data Download Request";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Organization: ";
$Body .= $organization;
$Body .= "\n";
$Body .= "Intended Use: ";
//$Body .= 'My Intentions';
$Body .= $intentions;

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>