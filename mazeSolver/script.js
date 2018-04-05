let grid = [];
let openSet = [];
let closedSet = [];
let path = [];
let steps_field;
let time_field;
let start;
let end;
let current;
let currentSecond;
let w, h;
let calculating = false;


function init() {

	document.getElementById('start').addEventListener('click', function() {
		do_diagonal = document.getElementById('do_diagonal').checked;
		random_nodes = document.getElementById('random_nodes').checked;
		grid_spawn_rate = document.getElementById('grid_spawn_rate').value;
		steps_field = document.getElementById('steps');
		time_field = document.getElementById('time');
		cols = document.getElementById('cols').value;
		rows = document.getElementById('rows').value;
		algorithm = document.getElementById('algorithm').value;
		document.getElementById('solution__text').innerHTML = 'Solution:';

		buildGrid();
		generateBoard();
		loop();
		calculating = true;
		current = start;
		currentSecond = start;
		steps = 0;
		time = 0;
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
	end.wall = false;
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

function heuristic(a, b) {
	// euclidean distance
	//let d = dist(a.i, a.j, b.i, b.j);

	// manhattan distance
	let d = abs( a.i - b.i ) + abs( a.j - b.j );

	return d;
}

function createCanv() {
	createCanvas(480, 480);

	w = float(480 / cols);
	h = float(480 / rows);
}

function countSteps() {
	steps++;
	steps_field.innerHTML = steps;
}

function countTime() {
	time++;
	time_field.innerHTML = time;
}


init();

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
}

function draw() {
	if (calculating) {
		document.getElementById('frameRateInput').value= floor(frameRate());
		createCanv();

		drawBackground();
		drawSets();
		drawStartEnd();
		drawCurrentPath(current, color(0, 0, 255));
		drawCurrentPath(currentSecond, color(255, 0, 255));
		if(openSet.length > 0) {
			if (algorithm == 'aStar') {
				resolveAStar();
			}else if (algorithm == 'random') {
				resolveRandom();
			}else if (algorithm == 'random2particle') {
				resolveRandomTwoParticle();
			}
		} else {
			finishSolving(false);
		}

	}else {
		noLoop();
	}
}
