var max=36;
var timetable=new Array(max);
for(var i=0;i<max;i++){
    timetable[i]=1;
}
var setSubjectSize=function(){
    if(window.parent.screen.width<767){
    var width=document.getElementById("sub1").getBoundingClientRect().width;
    for(var i=1;i<=6;i++){
        document.getElementById("row"+i).style.height=width+"px";
    }
    }
}
window.onload = setSubjectSize;
window.addEventListener( 'resize',setSubjectSize, false );
function subclick(n){
    timetable[n-1]=(timetable[n-1]+1)%2;
    if(timetable[n-1]==1){
        document.getElementById("sub"+n).style.backgroundImage="url(hima.png)";
    }else{
        document.getElementById("sub"+n).style.backgroundImage="url(iso.png)";
    }
}
function printTable(){
    var output="";
    for(var i=0;i<max;i++){
        output+=timetable[i]+" ";
    }
    var name = getParams("name");
    output+=name;
    return output;
}
function submit(){
    writeData(printTable());
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
function writeData(data){
    var request =  createXmlHttpRequest();
    request.open('GET', './write.php?data='+data);
    request.addEventListener('load', function (response) {
        console.log(this.response);
        location.href="result.html?rand="+Math.random().toString(32).substring(2);
    });
    request.send();
}
function getParams(key){
    var params = (new URL(document.location)).searchParams;
    var data = params.get(key);
    return data;
}
function backHome(){
    location.href="index.html";
}