import * as component from 'timetables/component';
console.log('I am distribution.js');
var free_man_table = [];
var timetables;
var row;
var col;
window.addEventListener('load',start);
function　gatherPeople(){
    for(var i=0;i<row*col;i++){
        var free_man = 0;
        timetables.forEach(t => {
            if(t.timetable[i] == 0)free_man++;
        });
        free_man_table.push(free_man);
    }
}
function getColorCode2(number,max){
    var hima = [146,217,232];
    var iso = [225,174,201];
    var result = [0,0,0];
    var h = number;
    var i = max - number;
    for(var p=0;p<3;p++){
        result[p] = hima[p] * h + iso[p] * i;
        result[p] /= max;
    }
    return `rgb(${result[0]},${result[1]},${result[2]})`;
}
function makeDistribution(){
    for(var i=0;i<row*col;i++){
        var target = document.getElementById('subject'+i);
        target.innerHTML = free_man_table[i];
        target.style.backgroundColor = getColorCode2(free_man_table[i],timetables.length);
        target.addEventListener('click',function(){
            var keep_i = i;
            var go_view_gather = ()=>{
                location.href = "./view_gather/" + keep_i;
            }
            return go_view_gather;
        }());
    }
}
function start(){
    timetables = component.getTTs();
    row = timetables[0].row;
    col = timetables[0].col;
    console.log(timetables);
    gatherPeople();
    console.log(free_man_table);
    makeDistribution();
}