var subject_elements = [];
var hima_url;
var iso_url;
var row;
var col;
var username;
var timetable_obj;
var changeable;
function setTT(){
    var row_col_num = JSON.parse(document.getElementById('row-col-num').dataset.json);
    iso_url = JSON.parse(document.getElementById('iso-url').dataset.json);
    hima_url = JSON.parse(document.getElementById('hima-url').dataset.json);
    timetable_obj = JSON.parse(document.getElementById('timetable').dataset.json);
    changeable = JSON.parse(document.getElementById('changeable').dataset.json);
    if(!changeable)timetable_obj.timetable = JSON.parse(timetable_obj.timetable);
    username = timetable_obj.name;
    console.log(username, timetable_obj);
    row = row_col_num.row;
    col = row_col_num.col;
}
function setImage(sub_no){
    if(subject_elements[sub_no] == 0)document.getElementById("subject" + sub_no).setAttribute('src',hima_url);
    if(subject_elements[sub_no] == 1)document.getElementById("subject" + sub_no).setAttribute('src',iso_url);
}

function setSubFix(){
    for(var i=0;i<row*col;i++){
        subject_elements.push(timetable_obj.timetable[i]);
        setImage(i);
    }
}
function setSubChangeable(){
    for(var i=0;i<row*col;i++){
        subject_elements.push(0);
        document.getElementById("subject" + i).addEventListener('click',function(){
            var i_keep = i;
            var closer = () =>{
                subject_elements[i_keep]++;
                subject_elements[i_keep] %= 2;
                setImage(i_keep);
            }
            return closer;
        }());
    }
}
window.onload = ()=>{
    setTT();
    if(changeable){
        setSubChangeable();
    }else{
        setSubFix();
    }
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