import * as component from 'timetables/component';
var timetables;
var row;
var col;
var candidate =0;
var onceCandidate;
var class_num;
window.addEventListener('load',start);
function start(){
    class_num = document.getElementById('class_num').dataset.json;
    console.log(class_num);
    class_num = parseInt(class_num);
    console.log(class_num);
    timetables = component.getTTs();
    row = timetables[0].row;
    col = timetables[0].col;
    document.getElementById("message").innerHTML = component.getClassTime(class_num,row) + "の参加状況";
    for(var i=0;i<timetables.length;i++){
        if(timetables[i].timetable[class_num] == 0){
            document.getElementsByClassName("absent")[i].innerHTML = "○"
        }else{
            document.getElementsByClassName("absent")[i].innerHTML = "×"
        }
    }
}