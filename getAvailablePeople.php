<?php
    $fp = fopen("everyone.txt","r");
    $people = "";
    while($line = fgets($fp)){
        $data = explode(" ",$line);
        if($data[$_GET['classNumber']-1]==1){
            $people = $people.$data[36];
        }
    }
    echo $people;
    fclose($fp);
?>