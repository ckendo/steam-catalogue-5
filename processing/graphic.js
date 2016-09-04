var FPS = 60;
var WEIGHT = 1;
var OPACITY = 80; // out of 255
var FOREGROUND = 0;
var BACKGROUND = 255;

function setup() {
	// if (webgl()){
	// 	console.log('webgl enabled for p5.js, initing')
	// 	initCanvas()
	// }else{
	// 	noLoop()
	// }
}

function initCanvas(){
	var canvas = createCanvas(windowWidth, windowHeight, P2D);
	canvas.parent('graphic');
	frameRate(FPS);
	noSmooth();
	strokeWeight(WEIGHT);
	stroke(FOREGROUND, OPACITY);
	paused = false
}

function draw() {
	if (!webgl()){
		return
	}
	// background(BACKGROUND); 
	background(102)
	push()
	translate(width*0.2, height*0.5)
	rotate(frameCount / 200.0)
	polygon(0, 0, 70 5)
	pop();
}

function mousePressed(){
	// reverse paused state
	paused = !paused;
}

// function windowResized() {
// 	initCanvas();
// 	NUM = Math.round(windowWidth/4);
// 	initNodes(NUM);
// }

// Polygon class
function polygon(x, y, radius, npoints){
	var angle = TWO_PI / npoints;
	beginShape()
	for (var a = 0; a < TWO_PI; a += angle){
		var sx = x + cos(a) * radius
		var sy = y + sin(a) * radius
		vertex(sx, sy)
	}
	endShape(CLOSE)
}

// Helper function to test webgl compatability
function webgl(){
	try {
		return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
	} catch(e) {
		return false;
	}	
}
