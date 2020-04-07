<!DOCTYPE html>
<html lang="ja">
    <head>
        <title>提出履歴</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="styles.css">
        <meta name="viewport" content="width=device-width, initial=1.0" />
    </head>
    <body>
        <header>
            <h1 class="title">提出履歴</h1>
        </header>
        <div class="contents">
        <div class="onebutton">
            <button class="goHome" onclick="backHome()">最初に戻る</button>
        </div>
        <script type=text/javascript>
            function backHome(){
                location.href="./index.html";
            }
        </script>
        <div></div>
        <?php
            $fp = fopen("everyone.txt","r");
            $lineNumber = 0;
            while($line = fgets($fp)){
                $data = explode(" ",$line);
                $timeTable = "";
                for($i = 0 ; $i < 36 ; $i++){
                    $timeTable = $timeTable.$data[$i]." ";
                }
                echo "<a href='./human.php?lineNumber=$lineNumber&humanName=$data[36]&timeTable=$timeTable'>$data[36]</a><p> </p>";
                $lineNumber++;
            }
            fclose($fp);
        ?>
        </div>
    </body>
</html>