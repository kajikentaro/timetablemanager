import * as component from 'timetables/component';
var party;
var timetables;
var row;
var col;
var candidate =0;
var onceCandidate;
window.onload = ()=>{
    party = component.getParty();
    console.log(party);
    timetables = component.getTTs();
    row = party.times.length;
    col = party.dates.length;
    calcOnce();
    calcTwice();
}
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
            new_element.addEventListener('click',function(){
                var keep_i = i;
                var go_view_gather = ()=>{
                    location.href = "./view_gather/" + keep_i;
                }
                return go_view_gather;
            }());
            new_element.className = 'candidate';
            new_element.innerHTML = component.getDateTime(i,party.dates, party.times);
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
                new_element.addEventListener('click',function(){
                    var keep_i = i;
                    var keep_j = j;
                    var go_view_gather = ()=>{
                        location.href = "./view_gather/" + keep_i + "/" + keep_j;
                    }
                    return go_view_gather;
                }());
                new_element.className = 'candidate';
                new_element.innerHTML = component.getDateTime(i,party.dates, party.times) + '&' + component.getDateTime(j,party.dates, party.times);
                var anchor = document.getElementById('anchor-twice');
                document.getElementById('twice').insertBefore(new_element, anchor);
            }
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}