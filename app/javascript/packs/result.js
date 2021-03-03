var timetables;
var row;
var col;
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
function setTT(){
    timetables = document.getElementById('timetables').dataset.json;
    timetables = JSON.parse(timetables);
    timetables.forEach(e => {
        e.timetable = JSON.parse(e.timetable);
    });
    if(timetables.length == 0)return;
    row = timetables[0].row;
    col = timetables[0].col;
}
function calcOnce(){
    var n = 0;
    for(var i=0;i<row*col;i++){
        var can = true;
        timetables.forEach(e => {
            if(e.timetable[i] == 1)can = false;
        });
        if(can){
            n++;
            var new_element = document.createElement("p");
            new_element.onclick = ()=>{
                console.log('ppp');
            };
            new_element.className = 'candidate';
            new_element.innerHTML = getClassTime(i,row);
            var anchor = document.getElementById('anchor-once');
            document.getElementById('once').insertBefore(new_element, anchor);
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}
function calcTwice(){
    var n = 0;
    for(var i=0;i<row*col-1;i++){
        for(var j=i+1;j<row*col;j++){
            var can = true;
            timetables.forEach(e => {
                if(e.timetable[i] == 1 && e.timetable[j] == 1)can = false;
            });
            if(can){
                n++;
                var new_element = document.createElement("p");
                new_element.onclick = ()=>{
                    console.log('ppp');
                };
                new_element.className = 'candidate';
                new_element.innerHTML = getClassTime(i,row) + '&' + getClassTime(j,row);
                var anchor = document.getElementById('anchor-twice');
                document.getElementById('twice').insertBefore(new_element, anchor);
            }
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}
window.onload = ()=>{
    setTT();
    calcOnce();
    calcTwice();
    /*
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
    request.send();
    */
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
function testclick(){
    document.getElementById("waiting-div").style.display="none";
}
function myinsert(beforeId,element){
    document.getElementById(beforeId).insertAdjacentHTML('afterend',element);
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