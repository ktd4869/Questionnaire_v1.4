<?php
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


    // for($i=0;$i<200;$i++){
    //     $query = "INSERT INTO `td_junchen`(`id`, `view`) VALUES ($i,0)";
    //     $result = mysql_query($query);

    //     if (!$result) {
    //         die("could not to the database\n" . mysql_error());
    //     }
    // }

    $query = "SELECT * FROM `td_junchen`";
    $result = mysql_query($query);
    if (!$result) {
        die("could not to the database\n" . mysql_error());
    }

    $list = array();
    header('Content-Type:text/json;charset=utf-8');
    while ($row = mysql_fetch_row($result)) {
        $str = array
       (
          'id'=>$row[0],
          'view'=>$row[1]
       );
       array_push($list,$str);
        // echo "id: $id view: $view \n";
    }

    echo json_encode($list);;
?>