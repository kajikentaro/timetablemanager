<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
</head>
<body>
    <input id='testinput'>
    <button onclick='test()'>aaa</button>
    <script type=text/javascript>
        function test(){
            location.href='test.php?query='+document.getElementById('testinput').value;
        }
    </script>

</body>