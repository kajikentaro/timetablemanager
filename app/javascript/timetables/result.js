import * as component from 'timetables/component';
var timetables;
var row;
var col;
var candidate =0;
var onceCandidate;
window.addEventListener('load',start);
function calcOnce(){
    var n = 0;
    for(var i=0;i<row*col;i++){
        var can = true;
        timetables.forEach(e => {
            if(e.timetable[i] == 1)can = false;
        });
        if(can){
            n++;
            var new_element = document.createElement("p");
            new_element.onclick = ()=>{
                console.log('ppp');
            };
            new_element.className = 'candidate';
            new_element.innerHTML = component.getClassTime(i,row);
            var anchor = document.getElementById('anchor-once');
            document.getElementById('once').insertBefore(new_element, anchor);
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}
function calcTwice(){
    var n = 0;
    for(var i=0;i<row*col-1;i++){
        for(var j=i+1;j<row*col;j++){
            var can = true;
            timetables.forEach(e => {
                if(e.timetable[i] == 1 && e.timetable[j] == 1)can = false;
            });
            if(can){
                n++;
                var new_element = document.createElement("p");
                new_element.onclick = ()=>{
                    console.log('ppp');
                };
                new_element.className = 'candidate';
                new_element.innerHTML = component.getClassTime(i,row) + '&' + component.getClassTime(j,row);
                var anchor = document.getElementById('anchor-twice');
                document.getElementById('twice').insertBefore(new_element, anchor);
            }
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}
function start(){
    timetables = component.getTTs();
    row = timetables[0].row;
    col = timetables[0].col;
    calcOnce();
    calcTwice();
}