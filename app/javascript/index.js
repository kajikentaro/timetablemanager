console.log('hello');
window.onload = ()=>{
    document.getElementById('new-TT').onclick = ()=>{
        var url = document.getElementById('new-url').dataset.json;
        location.href = url;
    }
}