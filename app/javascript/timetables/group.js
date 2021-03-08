console.log('I am timetables/group.js!')
var filter_state = {c: 0, display: ['none', 'block'], button_message: ['グループフィルタを開く', 'グループフィルタを閉じる']}

export function setup_filter(callback){
    var fg_button = document.getElementById('filter-group');
    var fg_disp = document.getElementById('group-filter');
    fg_button.onclick = (event)=>{
        filter_state.c = (filter_state.c + 1) % 2;
        fg_button.innerHTML = filter_state.button_message[filter_state.c];
        fg_disp.style.display = filter_state.display[filter_state.c];
    }

    var checkboxes = document.getElementsByClassName('group-filter-parent')[0];
    checkboxes = checkboxes.getElementsByClassName('filter-checkbox')
    for(var i = 0;i<checkboxes.length;i++){
        checkboxes[i].onclick = (event)=>{
            var disable_list = collect_disable();
            callback(disable_list);
        }
    }
};
function collect_disable(){
    var checkboxes = document.getElementsByClassName('group-filter-parent')[0];
    checkboxes = checkboxes.getElementsByClassName('filter-checkbox')
    var disable_list = [];
    for(var i = 0;i<checkboxes.length;i++){
        var c = checkboxes[i];
        if(c.checked == false){
            disable_list.push(c.value);
        }
    }
    return c.value;
}