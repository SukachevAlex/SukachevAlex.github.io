let grid = [];
let openSet = [];
let closedSet = [];
let path = [[],[],[]];
let steps_field;
let time_field;
let start;
let end;
let element = [];
let w, h;
let calculating = false;


function resetSketch() {
	init();
	buildGrid();
	generateBoard();
	loop();
	calculating = true;
	start.previous = false;
	element = new Array(3).fill(start);
	element[0].visitors.push(0);
	element[1].visitors.push(1);
	element[2].visitors.push(2);
	steps = 0;
	time = 0;
	path = [[start],[start],[start]];
	pathLength = 0;
	colorPath.push(color(255,225,57, 0.7), color(255, 57, 215, 0.7), color(97, 57, 255, 0.7)); //yellow magenta purple
	createCanv();
}

function init() {

	do_diagonal = document.getElementById('do_diagonal').checked;
	random_nodes = document.getElementById('random_nodes').checked;
	grid_spawn_rate = document.getElementById('grid_spawn_rate').value;
	steps_field = document.getElementById('steps');
	time_field = document.getElementById('time');
	cols = document.getElementById('cols').value;
	rows = document.getElementById('rows').value;
	algorithm = document.getElementById('algorithm').value;
	document.getElementById('solution__text').innerHTML = 'Solution:';
	document.getElementById('start').addEventListener('click', function () {
		resetSketch();
	});
}


function buildGrid() {
	// 2d array + create spots
	for(let i = 0; i < cols; i++) {
		grid[i] = [];

		for(let j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}
	// set neighbors
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}
	if (random_nodes) {
		start = grid[ Math.round(random(0, (cols - 1))) ][ Math.round(random(0, (rows - 1))) ];
		end = grid[ Math.round(random(0, (cols - 1))) ][ Math.round(random(0, (rows - 1))) ];
	} else {
		start = grid[0][0];
		start.visited = true;
		end = grid[(cols - 1)][(rows - 1)];
	}
}


function finishSolving(resolve) {
	calculating = false;
	noLoop();
	if (resolve) {
		document.getElementById('solution__text').innerHTML = `Find path in ${steps} steps, path length = ${pathLength}`;
	} else {
		document.getElementById('solution__text').innerHTML = 'No solution!';
	}
}

function generateBoard() {

	openSet = [];
	closedSet = [];
	path = [];

	start.wall = false;
	let neighborsStart = start.neighbors;
	for (let i = 0; i < neighborsStart.length; i++) {
		neighborsStart[i].wall = false;
	}
	end.wall = false;

	let neighborsEnd = end.neighbors;
	for (let i = 0; i < neighborsEnd.length; i++) {
		neighborsEnd[i].wall = false;
	}
	openSet.push(start);

	loop();
}

function removeFromArray(arr, elt) {
	for(let i = (arr.length - 1); i >= 0; i--) {
		if(arr[ i ] == elt) {
			arr.splice(i, 1);
		}
	}
}

var uniqueElements = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

function heuristic(a, b) {
	// euclidean distance
	//let d = dist(a.i, a.j, b.i, b.j);

	// manhattan distance
	let d = abs( a.i - b.i ) + abs( a.j - b.j );

	return d;
}

function createCanv() {
	createCanvas(500, 500);

	w = float(500 / cols);
	h = float(500 / rows);
}

function countSteps(step = 1) {
	steps += step;
	steps_field.innerHTML = steps;
}

function countTime() {
	time++;
	time_field.innerHTML = time;
}

function countPathLength(elem, num = 0) {
	let counter = 0;
	let temp = elem;

	while (temp.previous[num]) {
		counter++;
		temp = temp.previous[num];
	}
	return counter;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
		frames += 1;
		setup();
  } else if (keyCode === DOWN_ARROW) {
		frames -= 1;
		setup();
  }
}

function setup() {
	frameRate(frames);
	colorMode(RGB, 255, 255, 255, 1);
	init();
}

function draw() {
	if (calculating) {
		document.getElementById('frameRateInput').value= Math.floor(frameRate());


		if (algorithm == 'aStar') {
			resolveAStar();
		}else if (algorithm == 'random') {
			resolveRandom(1);
		}else if (algorithm == 'random2particle') {
			resolveRandom(2);
		}else if (algorithm == 'random3particle') {
			resolveRandom(3);
		}
	}else {
		noLoop();
	}
}
