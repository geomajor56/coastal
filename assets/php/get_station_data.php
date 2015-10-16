<?php

$host = 'web482.webfaction.com';
$user = 'ccs';
$pass = 'huskies1975';
$db = 'capecodbay';

$connection = pg_connect("host=$host dbname=$db user=$user password=$pass") or die('Could not connect: ' . pg_last_error());


$response = array();
$posts = array();

$myfile = fopen("station_data_table.json", "w") or die("Unable to open file!");

$this_station = $_POST['station_num_id'];

$chart_data = pg_query($connection, "SELECT cruise, cruise_date, depth_class, temp, 
salinity, dissolved_o, ph, chl, pheo, turb, no, nh, po, si, tn, 
tp FROM     monitor_sampleparameters WHERE station_id = '" . $this_station . "' ORDER BY cruise_date ASC ");

$row_1 = array();
$row_table = array();

while ($r1 = pg_fetch_array($chart_data)) {

    $cruise_date = $row_1['cruise_date'];

    $the_date = strtotime($r1['cruise_date']) * 1000;

    $row_1[] = array('cruise', $the_date,
        $r1['depth_class'],
        $r1['temp'],
        $r1['salinity'],
        $r1['dissolved_o'],
        $r1['ph'],
        $r1['chl'],
        $r1['pheo'],
        $r1['turb'],
        $r1['no'],
        $r1['nh'],
        $r1['po'],
        $r1['si'],
        $r1['tn'],
        $r1['tp']
    );


# //{"cruise_date":"2014-10-08","temperature":"23","salinity":"32","dissolved_oxygen":"8.6","chlorophyll":"1.579","pheophytin":"0.533",
#        // "turbidity":"2.3593","nitrogen":"3.7495","ammonium":"20.7495","phosphates":"0.9755","silicates":"3.53","total_nitrogen":"1.67","total_phosphorus":"314"}

    $row_table[] = array('cruise_date' => $r1['cruise_date'],
        'temperature' => $r1['temp'],
        'salinity' => $r1['salinity'],
        'dissolved_oxygen' => $r1['dissolved_o'],
        'chlorophyll' => $r1['si'],//ok
        'pheophytin' => $r1['tn'],//ok
        'turbidity' => $r1['tp'],//ok
        'nitrogen' => $r1['chl'],//ok
        'ammonium' => $r1['turb'],//ok
        'phosphates' => $r1['pheo'],//ok
        'silicates' => $r1['no'],//ok
        'total_nitrogen' => $r1['nh'],//ok
        'total_phosphorus' => $r1['po'] //ok
    );
}
fwrite($myfile, json_encode($row_table));
fclose($myfile);

echo(json_encode($row_1, JSON_NUMERIC_CHECK));
pg_close($connection);
?>
