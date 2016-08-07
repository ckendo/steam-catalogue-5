function getObjectInfo(){
	// Get just <section class ="full"> elements
	var sections = document.getElementsByClassName("full")
	console.log(sections)
	console.log(typeof(sections))
	var array = Array.prototype.slice.call(sections)
	console.log(array)
	console.log(typeof(array))
	console.log(array.length)
	var objectInfo = []
	for (var i = 0; i < array.length; i++){
		var currName = array[i].id.replace('-', ' ')
		var currTop = Math.round(array[i].getBoundingClientRect().top)
		var object = {name: currName, top: currTop, orig: array[i].id}
		objectInfo.push(object)
	}
	// Ensure sorted by increasing y value
	objectInfo = objectInfo.sort(function(a, b){
		return a.top - b.top
	})
	return objectInfo
}

var objectInfo = getObjectInfo()

window.onscroll = function showSectionName(){
	var offset = window.innerHeight/6
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