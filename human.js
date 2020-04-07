var max=36;
var timetable=getParams("timeTable").split(" ");
function subclick(n){
    var request =  createXmlHttpRequest();
    request.open('GET', './getAvailablePeople.php?classNumber='+n);
    request.addEventListener('load', function (response) {
        alert("この時間に来れる人は、\n"+this.responseText);
    });
    request.send();
}
function getParams(key){
    var params = (new URL(document.location)).searchParams;
    var data = params.get(key);
    return data;
}
function mydelete(){
    if(window.confirm(getParams("humanName")+"を削除してもよろしいですか？")==true){
        var request =  createXmlHttpRequest();
        request.open('GET', './delete.php?lineNumber='+getParams("lineNumber"));
        request.addEventListener('load', function (response) {
            alert("削除しました");
            location.href="./index.html";
        });
        request.send();
    }
}
var setSubjectSize=function(){
    if(window.parent.screen.width<767){
    var width=document.getElementById("sub1").getBoundingClientRect().width;
    for(var i=1;i<=6;i++){
        document.getElementById("row"+i).style.height=width+"px";
    }
    }
}
window.addEventListener( 'resize',setSubjectSize, false );
window.onload = function(){
    setSubjectSize();
    for(var i=0;i<36;i++){
        if(timetable[i]==1){
            document.getElementById("sub"+(i+1)).style.backgroundImage="url(hima.png)";
        }else{
            document.getElementById("sub"+(i+1)).style.backgroundImage="url(iso.png)";
        }
    }
}
function createXmlHttpRequest()
{
    var xmlhttp=null;
    if(window.ActiveXObject)
    {
        try
        {
            xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e2)
            {
            }
        }
    }
    else if(window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}