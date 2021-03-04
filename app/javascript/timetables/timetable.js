import * as component from 'timetables/component';
console.log('I am timetable.js');
var subject_elements = [];
var hima_url;
var iso_url;
var row;
var col;
var username;
var timetable_obj;
var changeable;
window.addEventListener('load', function() {
    start();
});

function start(){
    setTT();
    if(timetable_obj.timetable)drawInputTT();
    else drawNewTT();
    if(changeable)setToggleAction();
    setButtonAction();
}
function drawNewTT(){
    for(var i=0;i<row*col;i++){
        subject_elements.push(0);
    }
}
function drawInputTT(){
    for(var i=0;i<row*col;i++){
        subject_elements.push(timetable_obj.timetable[i]);
        setImage(i);
    }
}
function setToggleAction(){
    for(var i=0;i<row*col;i++){
        document.getElementById("subject" + i).addEventListener('click',function(){
            var i_keep = i;
            var closer = () =>{
                subject_elements[i_keep]++;
                subject_elements[i_keep] %= 2;
                setImage(i_keep);
            }
            return closer;
        }());
    }
}
function setTT(){
    var row_col_num = JSON.parse(document.getElementById('row-col-num').dataset.json);
    iso_url = JSON.parse(document.getElementById('iso-url').dataset.json);
    hima_url = JSON.parse(document.getElementById('hima-url').dataset.json);
    timetable_obj = JSON.parse(document.getElementById('timetable').dataset.json);
    changeable = JSON.parse(document.getElementById('changeable').dataset.json);
    timetable_obj.timetable = JSON.parse(timetable_obj.timetable);
    username = timetable_obj.name;
    row = row_col_num.row;
    col = row_col_num.col;
}
function setImage(sub_no){
    if(subject_elements[sub_no] == 0)document.getElementById("subject" + sub_no).setAttribute('src',hima_url);
    if(subject_elements[sub_no] == 1)document.getElementById("subject" + sub_no).setAttribute('src',iso_url);
}

function setButtonAction(){
    component.set_csrftoken();
    if(document.getElementById('update')){
    document.getElementById('update').onclick = ()=>{
        console.log('update');
            $.ajax({
                url: "./",
                type: "PATCH",
                data: JSON.stringify({name:username, timetable: subject_elements, row: row, col: col}),
                datatype: "html",
                success: function(data){
                //成功時の処理
                console.log(data);
                },
                error: function(data){
                //失敗時の処理
                console.log('hello');
                }
            });
        }
    }
    console.log(document.getElementById('submit'));
    if(document.getElementById('submit')){
    document.getElementById('submit').onclick = ()=>{
        console.log('update');
            $.ajax({
                url: "create",
                type: "POST",
                data: JSON.stringify({name:username, timetable: subject_elements, row: row, col: col}),
                datatype: "html",
                success: function(data){
                //成功時の処理
                console.log(data);
                },
                error: function(data){
                //失敗時の処理
                console.log('hello');
                }
            });
        }
    }
}