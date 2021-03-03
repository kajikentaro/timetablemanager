var subject_elements = [];
var hima_url;
var iso_url;
var row;
var col;
var username;
window.onload = ()=>{
    var row_col_num = JSON.parse(document.getElementById('row-col-num').dataset.json);
    iso_url = JSON.parse(document.getElementById('iso-url').dataset.json);
    hima_url = JSON.parse(document.getElementById('hima-url').dataset.json);
    username = JSON.parse(document.getElementById('username').dataset.json);
    row = row_col_num.row;
    col = row_col_num.col;
    for(var i=0;i<row*col;i++){
        subject_elements.push(0);
        document.getElementById("subject" + i).addEventListener('click',function(){
            var i_keep = i;
            var closer = () =>{
                subject_elements[i_keep]++;
                subject_elements[i_keep] %= 2;
                if(subject_elements[i_keep] == 0)document.getElementById("subject" + i_keep).setAttribute('src',hima_url);
                if(subject_elements[i_keep] == 1)document.getElementById("subject" + i_keep).setAttribute('src',iso_url);
            }
            return closer;
        }());
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