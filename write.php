<?php
$fp = fopen("everyone.txt", "a");
fwrite($fp,$_GET['data']);
fwrite($fp,"\n");
fclose($fp);
echo("success");
?>