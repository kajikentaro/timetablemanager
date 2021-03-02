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
    $url = parse_url(getenv('DATABASE_URL'));
    $dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));
    $pdo = new PDO($dsn, $url['user'], $url['pass']);
    $name = $_GET['name'];$data = $_GET['data'];
    $query="SELECT * FROM timetable";
    $response = $pdo->query($query);
            foreach($response as $record){
                echo "<a href='./human.php?id={$record[id]}&humanName={$record[name]}&timeTable={$record[data]}'>$record[name]</a><p> </p>";
                $lineNumber++;
            }
            fclose($fp);
        ?>
        </div>
    </body>
</html>