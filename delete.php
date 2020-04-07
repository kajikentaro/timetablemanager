<?php
$fp = file("everyone.txt");
unset($fp[$_GET['lineNumber']]);
file_put_contents('everyone.txt', $fp);
echo("success");
?>