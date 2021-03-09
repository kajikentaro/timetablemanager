import { href } from '@rails/ujs';
import * as component from 'timetables/component';
console.log('I am timetable.js');
var party;
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
    party = component.getParty();
    row = party.times.length;
    col = party.dates.length;
    setTT();
    if(timetable_obj.timetable)drawInputTT();
    else drawNewTT();
    if(changeable)setToggleAction();
    else setViewGatherAction();
    setButtonAction();
}
function setViewGatherAction(){
    for(var i=0;i<row*col;i++){
        document.getElementById("subject" + i).addEventListener('click',function(){
            var keep_i = i;
            var go_view_gather = ()=>{
                location.href = "./view_gather/" + keep_i;
            }
            return go_view_gather;
        }());
    }
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
    iso_url = JSON.parse(document.getElementById('iso-url').dataset.json);
    hima_url = JSON.parse(document.getElementById('hima-url').dataset.json);
    timetable_obj = JSON.parse(document.getElementById('timetable').dataset.json);
    changeable = JSON.parse(document.getElementById('changeable').dataset.json);
    timetable_obj.timetable = JSON.parse(timetable_obj.timetable);
    username = timetable_obj.name;
}
function setImage(sub_no){
    if(subject_elements[sub_no] == 0)document.getElementById("subject" + sub_no).setAttribute('src',hima_url);
    if(subject_elements[sub_no] == 1)document.getElementById("subject" + sub_no).setAttribute('src',iso_url);
}

function setButtonAction(){
    component.set_csrftoken();
    if(document.getElementById('update')){
    document.getElementById('update').onclick = ()=>{
        var group = document.getElementById('group-selector').value;
        console.log('update');
            $.ajax({
                url: document.getElementById('update-url').dataset.json,
                type: "PATCH",
                data: JSON.stringify({name:username, timetable: subject_elements, row: row, col: col, group:group}),
                datatype: "html",
                success: function(data){
                    if(data){
                        alert("更新しました。");
                        location.href = "../history";
                    }else{
                        alert("サーバーでエラーが発生しました。しばらくたった後にやり直してください。");
                    }
                },
                error: function(data){
                    alert("送信に失敗しました。しばらくたった後にやり直してください。");
                }
            });
        }
    }
    console.log(document.getElementById('submit'));
    if(document.getElementById('submit')){
    document.getElementById('submit').onclick = ()=>{
        var group = document.getElementById('group-selector').value;
        console.log('update');
            $.ajax({
                url: document.getElementById('create-url').dataset.json,
                type: "POST",
                data: JSON.stringify({name:username, timetable: subject_elements, row: row, col: col, group:group}),
                datatype: "html",
                success: function(data){
                    if(data){
                        location.href = "result";
                    }else{
                        alert("サーバーでエラーが発生しました。しばらくたった後にやり直してください。");
                    }
                },
                error: function(data){
                    alert("送信に失敗しました。しばらくたった後にやり直してください。");
                }
            });
        }
    }
}