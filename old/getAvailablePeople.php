<?php
try{
    $url = parse_url(getenv('DATABASE_URL'));
    $dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));
    $pdo = new PDO($dsn, $url['user'], $url['pass']);
    $name = $_GET['name'];$data = $_GET['data'];
    $query="SELECT * FROM timetable";
    $response = $pdo->query($query);
    $people = "";
    foreach($response as $record){
        $data = explode(" ",$record[data]);
        if($data[$_GET['classNumber']]==1){
            $people = $people.$record[name]."\n";
        }
    }
    echo $people;
}catch(PdoException $e){
    echo($e->getMessage());
}
?>