console.log('I am component.js');
export var resize=function(elements, split_n){
    var resize_func = ()=>{
        var screen_width = document.body.clientWidth;
        var parent_width = elements[0].parentNode.getBoundingClientRect().width
        var width = Math.min(parent_width / split_n, 80);
        if(screen_width<900){
            for(var i=0;i<elements.length;i++){
                elements[i].style.width = (width - 2) + "px"
                elements[i].style.height = (width - 2) + "px";
            }
        }
    };
    resize_func();
    return(resize_func);
}
export function getParty(){
    var party = document.getElementById('party').dataset.json;
    party = JSON.parse(party);
    party.dates = party.dates;
    party.times = party.times;
    return party;
}
export function getTTs_with(filter_list){
    console.log(filter_list)
    var outputs = [];
    var timetables = document.getElementById('timetables').dataset.json;
    timetables = JSON.parse(timetables);
    timetables.forEach(e => {
        if(filter_list[e.group] == void 0){
            if(filter_list['グループなし、削除済み'] == true){
                e.timetable = JSON.parse(e.timetable);
                outputs.push(e);
            }
        }else{
            if(filter_list[e.group] == true){
                e.timetable = JSON.parse(e.timetable);
                outputs.push(e);
            }
        }
    });
    return outputs;
}
export function getTTs(){
    var timetables = document.getElementById('timetables').dataset.json;
    timetables = JSON.parse(timetables);
    timetables.forEach(e => {
        e.timetable = JSON.parse(e.timetable);
    });
    if(timetables.length == 0)return;
    return timetables;
}
export function getDateTime(n,dates,times){
    var output="";
    output += dates[n % dates.length];
    output+= times[n % times.length]
    return output;
}
export function getClassTime(number, row){
    var output="";
    var dates = ["月","火","水","木","金","土","日"];
    output += dates[number%row];
    output+=Math.floor(number/row+1)+"限";
    return output;
}
export function set_csrftoken() {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            const token = $('meta[name="csrf-token"]').attr('content');
            if (token) {
                return jqXHR.setRequestHeader('X-CSRF-Token', token);
            }
        }
    });
}