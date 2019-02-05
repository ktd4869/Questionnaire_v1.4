<?php
$id1 = $_POST['id1'];
$id2 = $_POST['id2'];
$view1 = $_POST['view1'];
$view2 = $_POST['view2'];

$host = "47.91.41.232";
$password = "Acg_123456";
$username = "root";
$database = "ACG";

$connection = mysql_connect($host, $username, $password);

if (!$connection) {
    die("could not connect to the database.\n" . mysql_error());
}

$selectedDb = mysql_select_db($database);
if (!$selectedDb) {
    die("could not to the database\n" . mysql_error());
}

$query1 = "UPDATE `td_junchen` SET view = $view1 WHERE id = $id1";
$query2 = "UPDATE `td_junchen` SET view = $view2 WHERE id = $id2";
$result = mysql_query($query1);
$result = mysql_query($query2);

if (!$result) {
    die("could not to the database\n" . mysql_error());
}
mysql_close();
echo "TRUE";
?>