<?php
header('Access-Control-Allow-Origin:*');

$config = include('config.php');

$con = mysql_connect('localhost', $config['mysql']['user'], $config['mysql']['password']);
if (!$con) {
  die("Cannot connect to mysql".mysql_error());
}

mysql_select_db($config['mysql']['dbname']);

// query
$sql = "SELECT `id`, `now`, `total` FROM `wp2017_homework` WHERE 1";
$r = mysql_query($sql, $con);
$now= mysql_result($r, 0, 1);
$total = mysql_result($r, 0, 2);

if (count($_POST)!=0) {
  // update
  if ($_POST['exit']) {
    if ($_POST['exit'] == 'yes') {
      $now--; 
      echo 'exit';
    }
    if ($_POST['exit'] == 'no') {
      $now++;
      $total++;
      echo 'add';
    }

    $sql = "UPDATE `wp2017_homework` SET `now`=$now,`total`=$total WHERE 1";
  
    mysql_query($sql, $con);
  }

} else {
  $res = [
    'now' => $now,
    'total' => $total
  ];
  echo json_encode($res);
}


mysql_close($con);


?>
