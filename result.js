var candidate =0;
var onceCandidate;
function subclick1(n){
    var request =  createXmlHttpRequest();
    request.open('GET', './getAvailablePeople.php?classNumber='+n);
    request.addEventListener('load', function (response) {
        alert("この時間に来れる人は、\n"+this.responseText);
    });
    request.send();
}
function subclick2(i,j){
    var request =  createXmlHttpRequest();
    request.open('GET', './getAvailablePeople2.php?className1='+getClassTime(i)+'&className2='+getClassTime(j)+'&classNumber1='+i+'&classNumber2='+j);
    request.addEventListener('load', function (response) {
        alert("　　　○…どっちにも来れる\n"+this.responseText);
    });
    request.send();
}
function getParams(key){
    var params = (new URL(document.location)).searchParams;
    var data = params.get(key);
    return data;
}
window.onload = function(){
    var request =  createXmlHttpRequest();
    request.open('GET', './everyone.php');
    request.addEventListener('load', function (response) {
        var rows = request.responseText.split("\n");
        var a= new Array();
        for(var i=0;i<rows.length-1;i++){
            a[i]=rows[i].split(" ");
        }
        var displaied=new Array();
        for(i=0;i<36;i++){
                var flag=true;
                displaied[i]=1;
                for(var k=0;k<rows.length-1;k++){
                    if(a[k][i]==0){
                        flag=false;
                        displaied[i]=0;
                        break;
                    }
                }
                if(flag==true){
                    myinsert('candidate'+candidate,'<p onclick="subclick1('+i+')" class="candidate" id="candidate'+(candidate+1)+'">'+getClassTime(i)+'</p>');
                    candidate++;
                }
        }
        onceCandidate=candidate;
        for(i=0;i<35;i++){
            for(var j=i+1;j<36;j++){
                if(displaied[i]==1||displaied[j]==1){
                    break;
                }
                var flag=true;
                for(var k=0;k<rows.length-1;k++){
                    if(a[k][i]+a[k][j]==0){
                        flag=false;
                        break;
                    }
                }
                if(flag==true){
                    myinsert('candidate'+candidate,'<p onclick="subclick2('+i+','+j+')" class="candidate" id="candidate'+(candidate+1)+'">'+getClassTime(i)+' & '+getClassTime(j)+'</p>');
                    candidate++;
                }
            }
        }
        if(candidate>0){
            myinsert('candidate0','<h3>< ひとコマのみ ></h3>');
            if(candidate-onceCandidate>0){
                myinsert('candidate'+onceCandidate,'<h3>< ふたコマ ></h3>');
            }
        }else if(onceCandidate==0){
            myinsert('candidate0','<h3>ひとコマのみは不可能でした<br>< ふたコマ ></h3>');
        }else{
            myinsert('candidate0','<h3>ひとコマ、ふたコマでは不可能でした</h3>');
        }
    });
    request.send();
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