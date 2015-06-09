<?php
$host = 'localhost';
$user = 'michael';
$pass = 'huskies1975';
$db = 'ccs';

//$host = 'web482.webfaction.com';
//$user = 'ccs';
//$pass = 'huskies1975';
//$db = 'capecodbay';

$connection = pg_connect("host=$host dbname=$db user=$user password=$pass") or die('Could not connect: ' .pg_last_error());

$this_station = $_POST['station_num_id'];
//print_r($this_station);

$chart_data = pg_query($connection, "SELECT cruise, cruise_date, depth_class, temp, salinity, dissolved_o, ph, chl, pheo, turb, no, nh, po, si, tn, tp FROM     monitor_sampleparameters WHERE station_id = '".$this_station."' ORDER BY cruise_date ASC ");

$row_1 = array();

while ($r1 = pg_fetch_array($chart_data)) {
	$the_date = strtotime($r1['cruise_date'])*1000;
	$row_1[] = array('cruise', $the_date, $r1['depth_class'], $r1['temp'], $r1['salinity'], $r1['dissolved_o'], $r1['ph'], $r1['chl'], $r1['pheo'], $r1['turb'], $r1['no'], $r1['nh'], $r1['po'], $r1['si'], $r1['tn'], $r1['tp']);
}

echo(json_encode($row_1, JSON_NUMERIC_CHECK));


pg_close($connection);

?>
