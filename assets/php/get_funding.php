<?php

$host = 'localhost';
$user = 'michael';
$pass = 'huskies1975';
$db = 'ccs';

$connection = pg_connect("host=$host dbname=$db user=$user password=$pass") or die('Could not connect: ' . pg_last_error());

$myfile = fopen("funding_table.json", "w") or die("Unable to open file!");


$funding_data = pg_query($connection, "SELECT funder FROM monitor_funding");
if (!$funding_data) {
  echo "An error occurred.\n";
  exit;
}


while ($row  = pg_fetch_array($funding_data)) {

    $row_table[] = array('funder'     => $row['funder']);

}
fwrite($myfile, json_encode($row_table));
fclose($myfile);

pg_close($connection);
?>