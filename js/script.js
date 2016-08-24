// var globalObjectInfo; // = getObjectInfo()

window.addEventListener("resize", myFunction)

function getObjectInfo(){
	console.log('recalculating')
	// Get just <section class ="full"> elements
	var sections = document.getElementsByClassName("full")
	// console.log(sections)
	// console.log(typeof(sections))
	var array = Array.prototype.slice.call(sections)
	// console.log(array)
	// console.log(typeof(array))
	// console.log(array.length)
	var objectInfo = []
	for (var i = 0; i < array.length; i++){
		console.log('id:', array[i].id)
		// console.log('orig:', array[i].id)
		// var currName = array[i].id.replace('-', ' ')
		var currName = replaceAll(array[i].id, '-', ' ')
		// console.log('replaced:', currName)
		// var currTop = Math.round(array[i].getBoundingClientRect().top)
		var el = array[i]
		console.log(typeof(el))
		var currTop = offset(el).top
		var object = {name: currName, top: currTop, orig: array[i].id}
		objectInfo.push(object)
	}
	// Ensure sorted by increasing y value
	objectInfo = objectInfo.sort(function(a, b){
		return a.top - b.top
	})
	// globalObjectInfo = objectInfo
	return objectInfo
}
//Initial 
var objectInfo = getObjectInfo()

window.onresize=function(){
	objectInfo = getObjectInfo()
}

window.onhashchange=function(){
	objectInfo = getObjectInfo()
}

function offset(el) {
	var rect = el.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

var x = 0;
function myFunction() {
	var txt = x += 1;
	console.log(txt)
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

window.onscroll = function showSectionName(){

	var offset = window.innerHeight/4.5
	// var objectInfo = this.getObjectInfo()
	var curr = window.pageYOffset
	// No need to binary search, probably fast enough
	for (var i = 0; i < objectInfo.length; i++){
		if (curr > objectInfo[i].top - offset){
			document.getElementById("updateText").innerHTML = objectInfo[i].name
			var colorInfo = getColors(objectInfo[i].orig)
			document.querySelector("html").style.setProperty("--color-one", colorInfo[0]);
			document.querySelector("html").style.setProperty("--color-two", colorInfo[1]);
			document.querySelector("html").style.setProperty("--color-three", colorInfo[2]);
			document.querySelector("html").style.setProperty("--color-four", colorInfo[3]);
		}
	}	
}

function getColors(name){
	return colorDict[articleDict[name]]
}

/* Hardcoded dict unless you think of a better way */

var articleDict = {
	'Welcome': 'standard',
	'Catalogue-Five': 'standard',
	'Contents': 'standard',
	'Foreword': 'standard',
	'Hello-From': 'standard',
	'Rutgers-University': 'rutgers',
	'Boston-University': 'bu',
	'Harvard-University': 'harvard',
	'The-New-School': 'new-school',
	'University-of-Michigan': 'michigan',
	'University-of-Ottawa': 'ottawa',
	'MIT': 'mit',
	'Yale': 'yale',
	'Meet-Me-in-the-Middle': 'brown',
	'Time-Well-Spent': 'risd',
	'Mushroom-Hunt': 'risd-brown',
	'Laurence-Humier': 'risd',
	'Weather-or-Not?': 'risd-brown',
	'GENSPACE': 'risd',
	'Citizen-+-Virtual': 'risd-brown-mit-bu',
	'ADAPTATION': 'standard',
	'Gingko-Bioworks': 'risd-brown',
	'Brainy-Beats': 'brown',
	'RIGAMAJIG': 'risd',
	'STEAM-Assistive-Makeathon': 'brown',
	'STEAM-Week': 'risd',
	'DISCIPLINARYISM': 'standard',
	'Worlds-From-Cardboard': 'risd-brown',
	'Yeast-Selfies': 'risd-brown',
	'Looking-Forward-and-Ahead': 'standard',
	'We-Are': 'standard',
	'Colophon': 'standard',
}

var colorDict = {
	/* Nav bar styles*/
	// Default
	'standard': ['#000000', '#000000', '#000000', '#000000'],
	// Rutgers
	'rutgers': ['#6048a8', '#6048a8', '#6048a8', '#6048a8'],
	// BU
	'bu': ['#0ba016', '#0ba016', '#0ba016', '#0ba016'], 
	// Harvard
	'harvard': ['#fcc342', '#fcc342', '#fcc342', '#fcc342'],
	// New School
	'new-school': ['#f77116', '#f77116', '#f77116', '#f77116'],
	// Michigan
	'michigan': ['#000000', '#000000', '#000000', '#000000'],
	// Ottawa
	'ottawa': ['#000000', '#000000', '#000000', '#000000'],
	// MIT
	'mit': ['#24A8B3', '#24A8B3', '#24A8B3', '#24A8B3'], 
	// Yale
	'yale': ['#1A76BB', '#1A76BB', '#1A76BB', '#1A76BB'],
	// Brown
	'brown': ['#EC1C24', '#EC1C24', '#EC1C24', '#EC1C24'],
	// RISD
	'risd': ['#737373', '#737373', '#737373', '#737373'],
	// RISD+Brown
	'risd-brown': ['#737373', '#737373', '#EC1C24', '#EC1C24'],
	// RISD+Brown+MIT+BU
	'risd-brown-mit-bu': ['#737373', '#EC1C24', '#24A8B3', '#0ba016'],
}