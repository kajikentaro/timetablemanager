<?php
    $fp = fopen("everyone.txt","r");
    $people1 = "";
    $people2 = "";
    while($line = fgets($fp)){
        $data = explode(" ",$line);
        if($data[$_GET['classNumber1']]==1){
            if($data[$_GET['classNumber2']]==1){
                $people1 = $people1."○".$data[36];
                $people2 = $people2."○".$data[36];
            }else{
                $people1 = $people1.$data[36];
            }
        }else if($data[$_GET['classNumber2']]==1){
            $people2 = $people2.$data[36];
        }
    }
    echo $_GET['className1']."に来れる人は、\n".$people1."\n".$_GET['className2']."に来れる人は、\n".$people2;
    fclose($fp);
?>