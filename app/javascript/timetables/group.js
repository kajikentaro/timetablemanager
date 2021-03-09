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
        if(i==0){
            checkboxes[0].onclick = (event)=>{
                check_all_force(checkboxes[0].checked);
                var filter_list= collect_filter();
                callback(filter_list);
            }
            continue;
        }
        checkboxes[i].onclick = (event)=>{
            var filter_list= collect_filter();
            callback(filter_list);
        }
    }
};
function check_all_force(check_status){
    var checkboxes = document.getElementsByClassName('group-filter-parent')[0];
    checkboxes = checkboxes.getElementsByClassName('filter-checkbox')
    for(var i = 0;i<checkboxes.length;i++){
        checkboxes[i].checked = check_status;
    }
}
function collect_filter(){
    var checkboxes = document.getElementsByClassName('group-filter-parent')[0];
    checkboxes = checkboxes.getElementsByClassName('filter-checkbox')
    var filter_list= {};
    for(var i = 1;i<checkboxes.length;i++){
        var c = checkboxes[i];
        filter_list[c.value] = c.checked;
    }
    return filter_list;
}