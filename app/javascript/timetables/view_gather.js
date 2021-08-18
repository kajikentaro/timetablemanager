import * as component from 'timetables/component';
var timetables;
var candidate =0;
var onceCandidate;
var class_num;
var party;
window.addEventListener('load',start);
function start(){
    class_num = document.getElementById('class_num').dataset.json;
    console.log(class_num);
    class_num = parseInt(class_num);
    console.log(class_num);
    timetables = component.getTTs();
    party = component.getParty();
    document.getElementById("message").innerHTML = component.getDateTime(class_num,party.dates, party.times) + "の参加状況";
    for(var i=0;i<timetables.length;i++){
        if(timetables[i].timetable[class_num] == 0){
            document.getElementsByClassName("absent")[i].innerHTML = '<i class="far fa-circle"></i>'
        }else{
            document.getElementsByClassName("absent")[i].innerHTML = '<i class="fas fa-times"></i>'
        }
    }
}