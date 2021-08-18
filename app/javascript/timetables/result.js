import * as component from 'timetables/component';
let party;
let timetables;
let row;
let col;
let candidateList = [];
let free_man_table;
let showing_id = 0;
window.onload = ()=>{
    // 候補の計算
    party = component.getParty();
    timetables = component.getTTs();
    row = party.times.length;
    col = party.dates.length;
    free_man_table = getDistribution();
    calcOnce();
    calcTwice();

    // クリックアクションの定義
    setClickSubjectAction();
    setSeekbarClickAction();

    // 候補1の描写
    resetTT();
    displayCandidate(0);
}
function resetTT(){
    let targets = document.getElementsByClassName("distribution");
    for(let t of targets){
        t.innerHTML = "";
        t.style.backgroundColor = "#eee";
    }
}
function displayCandidate(n){
    let cand = candidateList[n];
    for(let i=0;i<cand.size;i++){
        let cls = cand.classes[i];
        let target = document.getElementById("subject" + cls.id);
        target.innerHTML = cls.cnt;
        target.style.backgroundColor = cls.color;
    }
}
function getDistribution(){
    let free_man_table = [];
    for(let i=0;i<row*col;i++){
        let free_man = 0;
        timetables.forEach(t => {
            if(t.timetable[i] == 0)free_man++;
        });
        free_man_table.push(free_man);
    }
    return free_man_table;
}
function setClickSubjectAction(){
    for(let i=0;i<row*col;i++){
        let target = document.getElementById('subject'+i);
        target.addEventListener('click',function(){
            let keep_i = i;
            let go_view_gather = ()=>{
                location.href = "./view_gather/" + keep_i;
            }
            return go_view_gather;
        }());
    }
}
function setSeekbarClickAction(){
    const previousBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    const previousBtnBan = document.getElementById("previous-ban");
    const nextBtnBan = document.getElementById("next-ban");
    const idText = document.getElementById("can-id-text");
    previousBtn.addEventListener("click",()=>{
        showing_id--;
        setDisableOrEnableBtn();
        resetTT();
        displayCandidate(showing_id);
        idText.innerHTML = "候補 " + (showing_id+1);
    });
    nextBtn.addEventListener("click",()=>{
        showing_id++;
        setDisableOrEnableBtn();
        resetTT();
        displayCandidate(showing_id);
        idText.innerHTML = "候補 " + (showing_id+1);
    });
    function setDisableOrEnableBtn(){
        if(showing_id === 0){
            previousBtn.style.display = "none";
            previousBtnBan.style.display = "inline";
        }else{
            previousBtn.style.display = "inline";
            previousBtnBan.style.display = "none";
        }
        if(showing_id === candidateList.length - 1){
            nextBtn.style.display = "none";
            nextBtnBan.style.display = "inline";
        }else{
            nextBtn.style.display = "inline";
            nextBtnBan.style.display = "none";
        }
    }
}
function calcOnce(){
    let n = 0;
    for(let i=0;i<row*col;i++){
        let can = true;
        timetables.forEach(e => {
            if(e.timetable[i] == 1)can = false;
        });
        if(can){
            let person_num = free_man_table[i];
            candidateList.push({size:1, classes:[{id:i,cnt:person_num,color:component.getColorCode(person_num,timetables.length)}]})
            n++;
            let new_element = document.createElement("p");
            new_element.addEventListener('click',function(){
                let keep_i = i;
                let go_view_gather = ()=>{
                    location.href = "./view_gather/" + keep_i;
                }
                return go_view_gather;
            }());
            new_element.className = 'candidate';
            new_element.innerHTML = component.getDateTime(i,party.dates, party.times);
            let anchor = document.getElementById('anchor-once');
            document.getElementById('once').insertBefore(new_element, anchor);
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}
function calcTwice(){
    let n = 0;
    for(let i=0;i<row*col-1;i++){
        for(let j=i+1;j<row*col;j++){
            let can = true;
            timetables.forEach(e => {
                if(e.timetable[i] == 1 && e.timetable[j] == 1)can = false;
            });
            if(can){
                let person_num1 = free_man_table[i];
                let person_num2 = free_man_table[j];
                candidateList.push(
                    {size:1, classes:[
                        {id:i,cnt:person_num1,color:component.getColorCode(person_num1,timetables.length)},
                        {id:i,cnt:person_num2,color:component.getColorCode(person_num2,timetables.length)}
                    ]});
                n++;
                let new_element = document.createElement("p");
                new_element.addEventListener('click',function(){
                    let keep_i = i;
                    let keep_j = j;
                    let go_view_gather = ()=>{
                        location.href = "./view_gather/" + keep_i + "/" + keep_j;
                    }
                    return go_view_gather;
                }());
                new_element.className = 'candidate';
                new_element.innerHTML = component.getDateTime(i,party.dates, party.times) + '&' + component.getDateTime(j,party.dates, party.times);
                let anchor = document.getElementById('anchor-twice');
                document.getElementById('twice').insertBefore(new_element, anchor);
            }
        }
    }
    if(n == 0){
        document.getElementById('once').display = "none";
    }
}