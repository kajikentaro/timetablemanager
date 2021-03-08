import * as component from 'timetables/component';
console.log("I am timetable/group.js");
var groups_str = [];
window.onload = () =>{
    setAddAction();
    setDelAction();
    setApplyAction();
}
function delRow(i){
    document.getElementsByClassName("row")[i].remove();
    setDelAction();
}
function setDelAction(){
    var dels = document.getElementsByClassName('delete');
    var n = dels.length;
    console.log(dels);
    for(var i=0;i<n;i++){
        dels[i].onclick = function(){
            var keep_i =i;
            var closer = ()=>{
                delRow(keep_i);
            }
            return closer;
        }();
    }
}
function setAddAction(){
    document.getElementById("add").onclick = () => {
        var str= '<input class="groups-input" value=""><button class="delete">削除</button>';
        var div = document.createElement('div');
        div.className = "row";
        div.innerHTML = str; 
        document.getElementById('group-make').insertBefore(div,document.getElementById('anchor'));
        setDelAction();
    }
}
function setApplyAction(){
    document.getElementById('apply').onclick = ()=>{
        gather_data()
        for(var i=0;i<groups_str.length;i++){
            console.log(groups_str[i]);
            if(groups_str[i] == ""){
                alert("空白があります");
                return ;
            }
        }
        submit_party();
    }
}
function gather_data(except = -1) {
    groups_str = [];
    var inputs = document.getElementsByClassName("groups-input");
    console.log(inputs);
    if (0 == inputs.length) return;
    for(var i=0;i<inputs.length;i++){
        if(i==except)continue;
        console.log(inputs[i].value);
        groups_str.push(inputs[i].value);
    };
    console.log(groups_str);
}
function submit_party() {
    component.set_csrftoken();
    var update_url = document.getElementById('update-url').dataset.json;
    $.ajax({
        url: update_url,
        type: "patch",
        data: JSON.stringify({ groups: groups_str }),
        datatype: "html",
        success: function (data) {
            console.log(data);
            if (data) {
                location.href = location.href;
            } else {
                alert("サーバーでエラーが発生しました。しばらくたった後にやり直してください。");
            }
        },
        error: function (data) {
            console.log(data);
            alert("送信に失敗しました。しばらくたった後にやり直してください。");
        }
    });
}
function ope_col(a, b) {
    if (b == c - 1) {
        if (c == 10) {
            alert("これ以上追加できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for (var i = 0; i < r; i++) {
            var cols = rows[i].children;
            for (var j = 0; j < c; j++) {
                if (j == c - 2) {
                    rows[i].insertBefore(cols[j].cloneNode(true), cols[j + 1]);
                }
            }
        }
    } else {
        if (c == 4) {
            alert("削除できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for (var i = 0; i < r; i++) {
            var cols = rows[i].children;
            for (var j = 0; j < c; j++) {
                if (j == b) cols[j].remove();
            }
        }
    }
    start();
}
function ope_row(a, b) {
    if (a == r - 1) {
        //add
        if (r == 20) {
            alert("これ以上追加できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        TT.insertBefore(rows[r - 2].cloneNode(true), rows[r - 1]);
    } else {
        //remove
        if (r == 4) {
            alert("削除できません");
            return;
        }
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for (var i = 0; i < r; i++) {
            if (i == a) rows[i].remove();
        }
    }
    start();
}
var r, c;
function start() {
    var TT = document.getElementById('timetable-make');
    var rows = TT.getElementsByClassName("row");
    r = rows.length;
    for (var i = 0; i < r; i++) {
        var cols = rows[i].children;
        c = cols.length;
        for (var j = 0; j < c; j++) {
            var col = cols[j];
            if (i == 0) {
                if (j < 2) continue;
                col.onclick = function () {
                    var i_ = i, j_ = j;
                    var func = () => {
                        ope_col(i_, j_);
                    }
                    return func;
                }();
            }
            if (2 <= i) {
                if (j == 0) {
                    col.onclick = function () {
                        var i_ = i, j_ = j;
                        var func = () => {
                            ope_row(i_, j_);
                        }
                        return func;
                    }();
                }
            }
        }
    }
}