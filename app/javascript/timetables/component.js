console.log('I am component.js');
export var resize=function(elements, split_n){
    var resize_func = ()=>{
        var screen_width = document.body.clientWidth;
        var parent_width = elements[0].parentNode.getBoundingClientRect().width
        var width = Math.min(parent_width / split_n, 80);
        if(screen_width<900){
            for(var i=0;i<elements.length;i++){
                elements[i].style.width = (width - 2) + "px"
                elements[i].style.height = (width - 2) + "px";
            }
        }
    };
    resize_func();
    return(resize_func);
}
export function getParty(){
    var party = document.getElementById('party').dataset.json;
    party = JSON.parse(party);
    party.dates = party.dates;
    party.times = party.times;
    return party;
}
export function getTTs_with(filter_list){
    console.log(filter_list)
    var outputs = [];
    var timetables = document.getElementById('timetables').dataset.json;
    timetables = JSON.parse(timetables);
    timetables.forEach(e => {
        if(filter_list[e.group] == void 0){
            if(filter_list['グループなし、削除済み'] == true){
                e.timetable = JSON.parse(e.timetable);
                outputs.push(e);
            }
        }else{
            if(filter_list[e.group] == true){
                e.timetable = JSON.parse(e.timetable);
                outputs.push(e);
            }
        }
    });
    return outputs;
}
export function getTTs(){
    var timetables = document.getElementById('timetables').dataset.json;
    timetables = JSON.parse(timetables);
    timetables.forEach(e => {
        e.timetable = JSON.parse(e.timetable);
    });
    if(timetables.length == 0)return;
    return timetables;
}
export function getDateTime(n,dates,times){
    var output="";
    output += dates[n % dates.length];
    output+= times[n % times.length]
    return output;
}
export function getClassTime(number, row){
    var output="";
    var dates = ["月","火","水","木","金","土","日"];
    output += dates[number%row];
    output+=Math.floor(number/row+1)+"限";
    return output;
}
export function set_csrftoken() {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            const token = $('meta[name="csrf-token"]').attr('content');
            if (token) {
                return jqXHR.setRequestHeader('X-CSRF-Token', token);
            }
        }
    });
}
export function getColorCode(number,max){
    if(max == 0)return `rgb(255,255,255)`;
    var h = number;
    var i = max - number;
    var result = 0.0 * h + 360.0* i;
    result /= max;
    var result2 = hsl2rgb([result,0.67,0.70]);
    return `rgb(${result2[0]},${result2[1]},${result2[2]})`;
}
function hsl2rgb ( hsl ) {
	var h = hsl[0] ;
	var s = hsl[1] ;
	var l = hsl[2] ;

	var max = l + ( s * ( 1 - Math.abs( ( 2 * l ) - 1 ) ) / 2 ) ;
	var min = l - ( s * ( 1 - Math.abs( ( 2 * l ) - 1 ) ) / 2 ) ;

	var rgb ;
	var i = parseInt( h / 60 ) ;

	switch( i ) {
		case 0 :
		case 6 :
			rgb = [ max, min + (max - min) * (h / 60), min ] ;
		break ;

		case 1 :
			rgb = [ min + (max - min) * (120 - h / 60), max, min ] ;
		break ;

		case 2 :
			rgb = [ min, max, min + (max - min) * (h - 120 / 60) ] ;
		break ;

		case 3 :
			rgb = [ min, min + (max - min) * (240 - h / 60), max ] ;
		break ;

		case 4 :
			rgb = [ min + (max - min) * (h - 240 / 60), min, max ] ;
		break ;

		case 5 :
			rgb = [ max, min, min + (max - min) * (360 - h / 60) ] ;
		break ;
	}

	return rgb.map( function ( value ) {
		return value * 255 ;
	} ) ;
}