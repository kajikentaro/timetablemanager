<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>timetable</title>
        <link rel=stylesheet href=styles.css>
        <script type="text/javascript" src=distribution.js ></script>
        <meta name="viewport" content="width=device-width, initial=1.0" />
    </head>
    <body>
        <header>
            <h1 class="title" id="name">分布を見る</h1>
        </header>
        <div class="contents center">
        <div class="onebutton">
            <button class="goHome" onclick="backHome()">最初に戻る</button>
        </div>
        <p>「暇」の数を表示しています。クリックして詳細を表示</p>
        <style>
            .subject{
                background-image:none;
                line-height:80px;
                border-radius:50%;
                color:#F4BDFF;
            }
        </style>
       <div class="timetable">
       <div id="row0" class="dates row">
            <div class="space"></div>
            <div class="date">月</div>
            <div class="date">火</div>
            <div class="date">水</div>
            <div class="date">木</div>
            <div class="date">金</div>
            <div class="date">土</div>
        </div>
        <div id="row1" class="row">
            <div class="time">1</div>
            <div id="sub1" onclick="subclick(1)" class="subject sub1"></div>
            <div id="sub2" onclick="subclick(2)" class="subject sub2"></div>
            <div id="sub3" onclick="subclick(3)" class="subject sub3"></div>
            <div id="sub4" onclick="subclick(4)" class="subject sub4"></div>
            <div id="sub5" onclick="subclick(5)" class="subject sub5"></div>
            <div id="sub6" onclick="subclick(6)" class="subject sub6"></div>
        </div>
        <div id="row2" class="row">
            <div class="time">2</div>
            <div id="sub7" onclick="subclick(7)" class="subject sub7"></div>
            <div id="sub8" onclick="subclick(8)" class="subject sub8"></div>
            <div id="sub9" onclick="subclick(9)" class="subject sub9"></div>
            <div id="sub10" onclick="subclick(10)"class="subject sub10"></div>
            <div id="sub11" onclick="subclick(11)"class="subject sub11"></div>
            <div id="sub12" onclick="subclick(12)"class="subject sub12"></div>
        </div>
        <div id="row3" class="row">
            <div class="time">3</div>
            <div id="sub13" onclick="subclick(13)"class="subject sub13"></div>
            <div id="sub14" onclick="subclick(14)"class="subject sub14"></div>
            <div id="sub15" onclick="subclick(15)"class="subject sub15"></div>
            <div id="sub16" onclick="subclick(16)"class="subject sub16"></div>
            <div id="sub17" onclick="subclick(17)"class="subject sub17"></div>
            <div id="sub18" onclick="subclick(18)"class="subject sub18"></div>
        </div>
        <div id="row4" class="row">
            <div class="time">4</div>
            <div id="sub19" onclick="subclick(19)"class="subject sub19"></div>
            <div id="sub20" onclick="subclick(20)"class="subject sub20"></div>
            <div id="sub21" onclick="subclick(21)"class="subject sub22"></div>
            <div id="sub22" onclick="subclick(22)"class="subject sub22"></div>
            <div id="sub23" onclick="subclick(23)"class="subject sub23"></div>
            <div id="sub24" onclick="subclick(24)"class="subject sub24"></div>
        </div>
        <div id="row5" class="row">
            <div class="time">5</div>
            <div id="sub25" onclick="subclick(25)"class="subject sub25"></div>
            <div id="sub26" onclick="subclick(26)"class="subject sub26"></div>
            <div id="sub27" onclick="subclick(27)"class="subject sub27"></div>
            <div id="sub28" onclick="subclick(28)"class="subject sub28"></div>
            <div id="sub29" onclick="subclick(29)"class="subject sub29"></div>
            <div id="sub30" onclick="subclick(30)"class="subject sub30"></div>
        </div>
        <div id="row6" class="row">
            <div class="time">6</div>
            <div id="sub31" onclick="subclick(31)"class="subject sub31"></div>
            <div id="sub32" onclick="subclick(32)"class="subject sub32"></div>
            <div id="sub33" onclick="subclick(33)"class="subject sub33"></div>
            <div id="sub34" onclick="subclick(34)"class="subject sub34"></div>
            <div id="sub35" onclick="subclick(35)"class="subject sub35"></div>
            <div id="sub36" onclick="subclick(36)"class="subject sub36"></div>
        </div></div>
        </div>
    </body>
</html>
