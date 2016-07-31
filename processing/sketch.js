var FPS = 60;
var WEIGHT = 1;
var OPACITY = 80; // out of 255
var FOREGROUND = 0;
var BACKGROUND = 255;
// var GFX = P2D;

var SPEED = 0.75;
var NUM = 300;
var MAX_DIST = 125;
// Node[] nodes; 
var nodes; 
var connections = 0;
var maxDist = MAX_DIST;
var text;
var paused;

// TODO: Resize window working, rescatter points
// Make MAX_DIST function of canvas size
// Button to pause
// Print output of number of connections

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight, P2D);
	// var canvas = createCanvas(window.innerWidth, window.innerHeight, P2D);
	canvas.parent('sketch');
	frameRate(FPS);
	noSmooth();
	strokeWeight(WEIGHT);
	stroke(FOREGROUND, OPACITY);
	paused = false;

	nodes = Array(NUM);
	for (var i = 0; i < NUM; i++){
		// nodes[i] = new Node(random(width), random(height), random(SPEED/4, SPEED));
		nodes[i] = new Node(random(windowWidth), random(windowHeight), random(SPEED/4, SPEED));
	}
	// // Text
	// text = createP('');
	// //var text = createElement('h2', 'blah');
	// text.position(15, 15);
	// text.style("font-size", "12px");
}

// TODO: this can probably be done cleaner. without so many if statements
function draw() {
	background(BACKGROUND); 
	// if not paused
	// paused = true;
	if (paused != true){
		nodes.sort(compare);
		maxDist = map(mouseY, windowHeight, 0, MAX_DIST/5, MAX_DIST);
		connections = 0;

		for (var i = 0; i < NUM; i++){
			var n = nodes[i];
			n.drawPoint();
			n.update();	
			nearestNeighbors(n, i, maxDist);
		} 
		// Log
		out = Math.round(frameRate());
		var string = 'fps ' + out + ' | maxDist ' + Math.round(maxDist) + ' | nodes ' + NUM + ' | connections ' + connections;
		var log = text(string, 15, 15);
	// else just draw static points
	}else{
		for (var i = 0; i < NUM; i++){
			var n = nodes[i];
			n.drawPoint();
			nearestNeighbors(n, i, maxDist);
		} 
		// Log paused
		var string = 'paused';
		var log = text(string, 15, 15);
	}
}

// window.onresize = function(){
// 	canvas.size(windowWidth, windowHeight);
// 	// And maybe update global width, height functions
// 	// Make max dist function of size
// }

function nearestNeighbors(n1, i, maxDist){
	var maxDistSquare = maxDist * maxDist;

	for (var j = i; j < NUM; j++){
		var n2 = nodes[j];
		// document.write(n2.getX() + '\n');
		var distX = n2.getX() - n1.getX();
		if (distX > maxDist){
			return;
		}
		var distY = abs(n2.getY() - n1.getY());
		if (distY > maxDist){
			continue;
		}
		if (distX*distX + distY*distY < maxDistSquare){
			// n2.setOther(n1);
			n1.drawLine(n2);
			connections++;
		}
	}
}

function compare(n1, n2){
	return Math.sign(n1.getX() - n2.getX());
}

function mousePressed(){
	// reverse paused state
	paused = !paused;
}

function windowResized() {
	setup();
}

// Node Class
function Node(xInit, yInit, speed){
	var _direction;
	var _position;
	var _other;
	place(xInit, yInit, speed);
	var mine;

	// Public functions
	this.update = function(){
		_position.add(_direction);
		if(offScreen(_position)){
			place(xInit, yInit, speed);
		}
	}

	this.drawPoint = function(){
		point(_position.x, _position.y);
	}

	this.drawLine = function(n2){
		line(_position.x, _position.y, n2.getX(), n2.getY());
	}
	
	this.getX = function(){
		return _position.x;
	}

	this.getY = function(){
		return _position.y;
	}

	this.setOther = function(other){
		_other = other;
	}

	// Private function
	function place(placeX, placeY, placeSpeed){
		_position = createVector(placeX, placeY);
		var a = random(TWO_PI);
		_direction = createVector(placeSpeed*cos(a), placeSpeed*sin(a));
	}

	function offScreen(curr){
		var offset = MAX_DIST/3;
		return curr.x < -offset | curr.y >= (windowWidth + offset) | curr.y < -offset | curr.y >= (windowHeight + offset);
	}
}

