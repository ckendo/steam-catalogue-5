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
			// document.getElementById("updateText").innerHTML = "<a href=\"" + "#" + objectInfo[i].orig + "\">" + objectInfo[i].name + "</a>"	
		}
	}	
}