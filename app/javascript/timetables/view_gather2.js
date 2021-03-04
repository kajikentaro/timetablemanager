import * as component from 'timetables/component';
var timetables;
var row;
var col;
var candidate =0;
var onceCandidate;
var class_num;
var class_num2;
window.addEventListener('load',start);
function start(){
    class_num = document.getElementById('class_num').dataset.json;
    class_num2 = document.getElementById('class_num2').dataset.json;
    class_num = parseInt(class_num);
    class_num2 = parseInt(class_num2);
    timetables = component.getTTs();
    row = timetables[0].row;
    col = timetables[0].col;
    document.getElementById("message").innerHTML = component.getClassTime(class_num,row) + "と" + component.getClassTime(class_num2,row) + "の参加状況";
    document.getElementById("class1").innerHTML = component.getClassTime(class_num,row)
    document.getElementById("class2").innerHTML = component.getClassTime(class_num2,row)
    console.log(class_num, class_num2);
    for(var i=0;i<timetables.length;i++){
        if(timetables[i].timetable[class_num2] == 0){
            document.getElementsByClassName("absent")[2*i].innerHTML = "○"
        }else{
            document.getElementsByClassName("absent")[2*i].innerHTML = "×"
        }

        if(timetables[i].timetable[class_num] == 0){
            document.getElementsByClassName("absent")[2*i + 1].innerHTML = "○"
        }else{
            document.getElementsByClassName("absent")[2*i + 1].innerHTML = "×"
        }
    }
}