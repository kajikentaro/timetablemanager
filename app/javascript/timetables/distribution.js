import * as component from 'timetables/component';
console.log('I am distribution.js');
var free_man_table = [];
var timetables;
var row;
var col;
var party;
window.onload = ()=>{
    timetables = component.getTTs();
    party = component.getParty();
    row = party.times.length;
    col = party.dates.length;
    console.log(timetables);
    gatherPeople();
    console.log(free_man_table);
    makeDistribution();
}
function　gatherPeople(){
    for(var i=0;i<row*col;i++){
        var free_man = 0;
        timetables.forEach(t => {
            if(t.timetable[i] == 0)free_man++;
        });
        free_man_table.push(free_man);
    }
}
function getColorCode3(number,max){
    var h = number;
    var i = max - number;
    var result = 0.0 * h + 360.0* i;
    result /= max;
    var result2 = hsl2rgb([result,0.75,0.52]);
    return `rgb(${result2[0]},${result2[1]},${result2[2]})`;
}
function getColorCode2(number,max){
    var hima = [146,217,232];
    var iso = [225,174,201];
    var result = [0,0,0];
    var h = number;
    var i = max - number;
    for(var p=0;p<3;p++){
        result[p] = hima[p] * h + iso[p] * i;
        result[p] /= max;
    }
    return `rgb(${result[0]},${result[1]},${result[2]})`;
}
function makeDistribution(){
    for(var i=0;i<row*col;i++){
        var target = document.getElementById('subject'+i);
        target.innerHTML = free_man_table[i];
        target.style.backgroundColor = getColorCode3(free_man_table[i],timetables.length);
        target.addEventListener('click',function(){
            var keep_i = i;
            var go_view_gather = ()=>{
                location.href = "./view_gather/" + keep_i;
            }
            return go_view_gather;
        }());
    }
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
