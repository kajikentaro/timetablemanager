import * as component from 'timetables/component';
import * as group from 'timetables/group';
console.log('I am distribution.js');
var timetables;
var row;
var col;
var party;
window.onload = ()=>{
    //initialize
    party = component.getParty();
    row = party.times.length;
    col = party.dates.length;

    //draw distribution
    timetables = component.getTTs();
    if(timetables != void 0){
        var free_man_table = getDistribution();
        setDistribution(free_man_table);
    }

    //filter setup
    group.setup_filter(TT_filter);

    //responsive design
    responsive_design(col+1);
}
function responsive_design(split_n){
    window.addEventListener('resize',component.resize(document.getElementsByClassName('subject'), split_n), false);
    window.addEventListener('resize',component.resize(document.getElementsByClassName('time'), split_n), false);
    window.addEventListener('resize',component.resize(document.getElementsByClassName('date'), split_n), false);
}
//フィルターのステータスが変わったら呼ばれる
function TT_filter(filter_list){
    all_remove();
    timetables = component.getTTs_with(filter_list)
    var free_man_table = getDistribution();
    setDistribution(free_man_table);
}
function all_remove(){
    var targets = document.getElementsByClassName('candidate');
    while(targets.length){
        targets[0].remove();
    }
}
function getDistribution(){
    var free_man_table = [];
    for(var i=0;i<row*col;i++){
        var free_man = 0;
        timetables.forEach(t => {
            if(t.timetable[i] == 0)free_man++;
        });
        free_man_table.push(free_man);
    }
    return free_man_table;
}
function setDistribution(free_man_table){
    console.log(free_man_table);
    for(var i=0;i<row*col;i++){
        var target = document.getElementById('subject'+i);
        target.innerHTML = free_man_table[i];
        target.style.backgroundColor = component.getColorCode(free_man_table[i],timetables.length);
        target.addEventListener('click',function(){
            var keep_i = i;
            var go_view_gather = ()=>{
                location.href = "./view_gather/" + keep_i;
            }
            return go_view_gather;
        }());
    }
}