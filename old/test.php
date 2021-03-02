<?php
$url = parse_url(getenv('DATABASE_URL'));

$dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));

$pdo = new PDO($dsn, $url['user'], $url['pass']);
$stmt = $pdo->query($_GET['query']);
while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    print_r($result);
}
?>