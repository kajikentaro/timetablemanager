import * as component from 'timetables/component';
console.log("I am parties/start.js");
window.onload = () => {
    setLinkAction();
}
function setLinkAction(){
    document.getElementById('visit-home-url').onclick = ()=>{
        var new_url = document.getElementById('home-url-data').dataset.json;
        window.open(new_url);
    }
    document.getElementById('share-home-url').onclick = ()=>{
        var new_url = document.getElementById('share-home-url-data').dataset.json;
        window.open(new_url);
    }
  $('#copy-home-url').on('click', function(){
    //　テキストエリアを選択
    $('#home-url').select();
    // コピー
    document.execCommand('copy');
    // アラート文の表示
    $('#js-copyalert').show().delay(2000).fadeOut(400);
  });
}