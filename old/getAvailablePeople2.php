<?php
    $url = parse_url(getenv('DATABASE_URL'));
    $dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));
    $pdo = new PDO($dsn, $url['user'], $url['pass']);
    $name = $_GET['name'];$data = $_GET['data'];
    $query="SELECT * FROM timetable";
    $response = $pdo->query($query);
    $people1 = "";
    $people2 = "";
    foreach($response as $record){
        $data = explode(" ",$record[data]);
        if($data[$_GET['classNumber1']]==1){
            if($data[$_GET['classNumber2']]==1){
                $people1 = $people1."○".$record[name]."\n";
                $people2 = $people2."○".$record[name]."\n";
            }else{
                $people1 = $people1.$record[name]."\n";
            }
        }else if($data[$_GET['classNumber2']]==1){
            $people2 = $people2.$record[name]."\n";
        }
    }
    echo $_GET['className1']."に来れる人は、\n".$people1."\n".$_GET['className2']."に来れる人は、\n".$people2;
    fclose($fp);
?>