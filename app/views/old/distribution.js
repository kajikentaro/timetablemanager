var candidate =0;
var onceCandidate;
function backHome(){
    location.href='./index.html';

}
var setSubjectSize=function(){
    var width=document.getElementById("sub1").getBoundingClientRect().width;
    if(document.body.clientWidth<767){
        for(var i=1;i<=6;i++){
            document.getElementById("row"+(i)).style.height=width+"px";
        }
    }
    for(var i=1;i<=36;i++){
        document.getElementById("sub"+(i)).style.lineHeight=width+"px";
        document.getElementById("sub"+(i)).style.fontSize=(width/2)+"px";
    }
}
window.addEventListener( 'resize',setSubjectSize, false );
function subclick(n){
    var request =  createXmlHttpRequest();
    request.open('GET', './getAvailablePeople.php?classNumber='+(n-1));
    request.addEventListener('load', function (response) {
        alert("この時間に来れる人は、\n"+this.responseText);
    });
    request.send();
}
window.onload = function(){
    this.setSubjectSize();  
    var request =  createXmlHttpRequest();
    request.open('GET', './everyone.php');
    request.addEventListener('load', function (response) {
        var rows = request.responseText.split("\n");
        var a= new Array();
        var b= new Array(36).fill(0);
        for(var i=0;i<rows.length-1;i++){
            a=rows[i].split(" ");
            for(var j=0;j<36;j++){
                b[j]+=Number(a[j]);
            }
        }
        var max = Math.max.apply(null,b);
        for(var i=0;i<36;i++){
            setColorNumber(document.getElementById("sub"+(i+1)),b[i],max);
        }
    });
    request.send();
}
function setColorNumber(element,number,max){
    var red = 139 - (139*number/max/2);
    var green= 255- (255*number/max/2);
    var blue= 185- (185*number/max/2);
    element.style.backgroundColor=`rgb(${red},${green},${blue})`;
    element.textContent=number+"";
}
function getClassTime(number){
    var output="";
    switch(number%6){
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
    }
    output+=Math.floor(number/6+1)+"限";
    return output;
}
function testclick(){
    document.getElementById("waiting-div").style.display="none";
}
function createXmlHttpRequest() {
    var xmlhttp=null;
    if(window.ActiveXObject) {
        try { xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e2) { } }
    }
    else if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
function myinsert(beforeId,element){
    document.getElementById(beforeId).insertAdjacentHTML('afterend',element);
}