var timetables;
var free_man_table = [];
var row;
var col;
var candidate =0;
var onceCandidate;
function setTTs(){
    timetables = document.getElementById('timetables').dataset.json;
    timetables = JSON.parse(timetables);
    timetables.forEach(e => {
        e.timetable = JSON.parse(e.timetable);
    });
    if(timetables.length == 0)return;
    row = timetables[0].row;
    col = timetables[0].col;
}
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
function getColorCode(number,max){
    var red = 139 - (139*number/max/2);
    var green= 255- (255*number/max/2);
    var blue= 185- (185*number/max/2);
    return `rgb(${red},${green},${blue})`;
}
function makeDistribution(){
    for(var i=0;i<row*col;i++){
        var target = document.getElementById('subject'+i);
        target.innerHTML = free_man_table[i];
        target.style.backgroundColor = getColorCode2(free_man_table[i],timetables.length);
    }
}
window.onload = ()=>{
    setTTs();
    console.log(timetables);
    gatherPeople();
    console.log(free_man_table);
    makeDistribution();
}
function getClassTime(number, row){
    var output="";
    switch(number%row){
        case 0:
            output+="月";
            break;
        case 1:
            output+="火";
            break;
        case 2:
            output+="水";
            break;
        case 3:
            output+="木";
            break;
        case 4:
            output+="金";
            break;
        case 5:
            output+="土";
            break;
        case 6:
            output+='日';
            break;
    }
    output+=Math.floor(number/6+1)+"限";
    return output;
}
$("#submit").on('click',function(){
    set_csrftoken();
$.ajax({
    url: "create",
    type: "POST",
    data: JSON.stringify({name:username, timetable: subject_elements, row: row, col: col}),
    datatype: "html",
    success: function(data){
    //成功時の処理
    console.log(data);
    },
    error: function(data){
    //失敗時の処理
    console.log('hello');
    }
});
});
/**
 * CSRFトークンを取得・セット
 */
function set_csrftoken() {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            const token = $('meta[name="csrf-token"]').attr('content');
            if (token) {
                return jqXHR.setRequestHeader('X-CSRF-Token', token);
            }
        }
    });
}