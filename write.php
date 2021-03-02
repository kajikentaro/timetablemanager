<?php
try{
    $url = parse_url(getenv('DATABASE_URL'));
    $dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));
    $pdo = new PDO($dsn, $url['user'], $url['pass']);
    $name = $_GET['name'];$data = $_GET['data'];
    $query="INSERT INTO timetable (name ,data ) VALUES ('{$name}','{$data}')";
    $pdo->query($query);
    echo($query);
}catch(PdoException $e){
    echo($e->getMessage());
}
?>