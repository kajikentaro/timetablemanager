var subject_elements = [];
$(function(){
    var row_col_num = JSON.parse(document.getElementById('row-col-num').dataset.json);
    var row = row_col_num.row;
    var col = row_col_num.col;
    for(var i=0;i<row*col;i++){
        subject_elements.push(document.getElementById("subject" + i));
    }
    $("#submit").on('click',function(){
    $.ajax({
        url: "sources/set_content",
        type: "GET",
        data: {content : $("div#editor").text()},
        datatype: "html",
        success: function(data){
        //成功時の処理
        console.log('h');
        },
        error: function(data){
        //失敗時の処理
        console.log('hello');
        }
    });
    });
});