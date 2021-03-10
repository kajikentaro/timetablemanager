import * as component from 'timetables/component';
console.log("I am parties/timetable.js");
window.onload = ()=>{
    start();
    document.getElementById("submit").onclick = ()=>{
        if(window.confirm("後から変更出来ませんが、よろしいですか")){
            submit_TT();
        }
    }
}
function submit_TT(){
    var dates_str = [];
    var times_str = [];
    var TT = document.getElementById('timetable-make');
    var rows = TT.getElementsByClassName("row");
    for(var i=0;i<r-1;i++){
        var cols = rows[i].children;
        for(var j=0;j<c-1;j++){
            if(2 <= j && i == 1){
                dates_str.push(cols[j].value);
            }
            if(2 <= i && j == 1){
                times_str.push(cols[j].value);
            }
        }
    }

    var partyname = document.getElementById('username').value;
    if(partyname == "")partyname = "名無しのレジェンド団体";
    component.set_csrftoken();
    $.ajax({
        url: "./parties",
        type: "POST",
        data: JSON.stringify({name:partyname, dates:dates_str,times:times_str}),
        datatype: "html",
        success: function(data){
            console.log(data);
            if(data){
                console.log(data);
                location.href = "parties/" + data.id + "/start";
            }else{
                alert("サーバーでエラーが発生しました。しばらくたった後にやり直してください。");
            }
        },
        error: function(data){
            console.log(data);
            alert("送信に失敗しました。しばらくたった後にやり直してください。");
        }
    });
}
function ope_col(a,b){
    if(b == c - 1){
        if(c == 10){
            alert("これ以上追加できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for(var i=0;i<r;i++){
            var cols = rows[i].children;
            for(var j=0;j<c;j++){
                if(j == c-2){
                    rows[i].insertBefore(cols[j].cloneNode(true), cols[j+1]);
                }
            }
        }
    }else{
        if(c == 4){
            alert("削除できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for(var i=0;i<r;i++){
            var cols = rows[i].children;
            for(var j=0;j<c;j++){
                if(j == b)cols[j].remove();
            }
        }
    }
    start();
}
function ope_row(a,b){
    if(a == r - 1){
        //add
        if(r == 20){
            alert("これ以上追加できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        TT.insertBefore(rows[r-2].cloneNode(true), rows[r-1]);
    }else{
        //remove
        if(r == 4){
            alert("削除できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for(var i=0;i<r;i++){
            if(i == a)rows[i].remove();
        }
    }
    start();
}
var r,c;
function start(){
    var TT = document.getElementById('timetable-make');
    var rows = TT.getElementsByClassName("row");
    r = rows.length;
    for(var i=0;i<r;i++){
        var cols = rows[i].children;
        c = cols.length;
        for(var j=0;j<c;j++){
            var col = cols[j];
            if(i == 0){
                if(j < 2)continue;
                    col.onclick = function(){
                        var i_ = i, j_ = j;
                        var func = ()=>{
                            ope_col(i_, j_);
                    }
                    return func;
                }();
            }
            if(2 <= i){
                if(j == 0){
                    col.onclick = function(){
                        var i_ = i, j_ = j;
                        var func = ()=>{
                            ope_row(i_, j_);
                    }
                    return func;
                    }();
                }
            }
        }
    }
}