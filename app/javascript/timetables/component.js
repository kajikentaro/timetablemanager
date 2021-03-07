console.log('I am component.js');
export function getParty(){
    var party = document.getElementById('party').dataset.json;
    party = JSON.parse(party);
    party.dates = JSON.parse(party.dates);
    party.times = JSON.parse(party.times);
    return party;
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