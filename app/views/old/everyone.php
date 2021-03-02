<?php
    $url = parse_url(getenv('DATABASE_URL'));
    $dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));
    $pdo = new PDO($dsn, $url['user'], $url['pass']);
    $name = $_GET['name'];$data = $_GET['data'];
    $query="SELECT * FROM timetable";
    $response = $pdo->query($query);
    foreach($response as $record){
        echo($record[data].$record[name]."\n");
    }
?>