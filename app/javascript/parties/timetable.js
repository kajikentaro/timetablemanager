console.log("I am parties/timetable.js");
window.onload = ()=>{
    start();
}
function ope_col(a,b){
    if(b == c - 1){
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        for(var i=0;i<r;i++){
            var cols = rows[i].children;
            for(var j=0;j<c;j++){
                if(j == r-3){
                    rows[i].insertBefore(cols[j].cloneNode(true), cols[j]);
                }
            }
        }
    }else{
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
        var TT = document.getElementById('timetable-make');
        var rows = TT.getElementsByClassName("row");
        TT.insertBefore(rows[r-2].cloneNode(true), rows[r-1]);
    }else{
        //remove
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