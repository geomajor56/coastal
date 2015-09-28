<?php
/* Set e-mail recipient */
$name = $_POST['InputName'];
$email = $_POST['InputEmail'];
$message = $_POST['InputMessage'];
$from = '';
$to = 'geomajor56@gmail.com';
$subject = 'Question or Comments from Cape Cod Bay Website';
$human = $_POST['InputHuman'];
$body = "From: $name\n E-Mail: $email\n Message: $message\n";
if ($_POST['submit'] && $human == '4') {
    if (mail ($to, $subject, $body, $from)) {
        echo '<p>Your message has been sent!</p>';
    } else {
        echo '<p>Something went wrong, go back and try again!</p>';
    }
} else if ($_POST['submit'] && $human != '4') {
    echo '<p>Change anti-spam answer to "4"</p>';
}
?>