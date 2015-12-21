<?php

$host = 'web482.webfaction.com';
$user = 'ccs';
$pass = 'huskies1975';
$db = 'capecodbay';

$connection = pg_connect("host=$host dbname=$db user=$user password=$pass") or die('Could not connect: ' . pg_last_error());

$myfile = fopen("volunteer_table.json", "w") or die("Unable to open file!");


$volunteer_data = pg_query($connection, "SELECT site, previous, present FROM monitor_volunteers  ORDER BY site ASC ");
if (!$volunteer_data) {
  echo "An error occurred.\n";
  exit;
}


while ($row  = pg_fetch_array($volunteer_data)) {

    $row_table[] = array('site'     => $row['site'],
                         'previous' => $row['previous'],
                         'present'  => $row['present']);

}
fwrite($myfile, json_encode($row_table));
fclose($myfile);

pg_close($connection);
?>
