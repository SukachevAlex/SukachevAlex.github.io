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


let result = {
	steps: [],
	time: [],
	path: [],
	steps_average: 0,
	time_average: 0,
	path_average: 0,
	unsolved: 0,
};


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
	run_count = document.getElementById('runCount').value;
	document.getElementById("solution").style.display = "block";
	document.getElementById("results").style.display = "none";
	document.getElementById('solution__text').style.display = "none";

	document.getElementById('start').addEventListener('click', function () {
		resetSketch();
		result.steps = [];
		result.path = [];
		result.time = [];
		result.steps_average = 0;
		result.path_average = 0;
		result.time_average = 0;
		result.unsolved = 0;
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
	run_count--;
	document.getElementById('runCount').value = run_count;
	noLoop();
	countResult();
	document.getElementById('algorithm_table').innerHTML = algorithm;
	document.getElementById('steps_table').innerHTML = result.steps_average;
	document.getElementById('time_table').innerHTML = result.time_average;
	document.getElementById('path_table').innerHTML = result.path_average
	document.getElementById('unsolved_table').innerHTML = result.unsolved;
	if (run_count > 0) {
		setTimeout(resetSketch, 1250);

	} else if (run_count === 0) {
		loop();
		document.getElementById("solution").style.display = "none";
		document.getElementById("results").style.display = "block";
		document.getElementById('runCount').value = 1;

		document.getElementById('close_table').addEventListener('click', function () {
			document.getElementById('table-popup').style.display = "none";
		});
		document.getElementById('open_table').addEventListener('click', function () {
			document.getElementById('table-popup').style.display = "block";
			resetTable('results_table');
			for (let i = 0; i < result.path.length; i++) {
				addRow('results_table', i, result.steps[i], result.time[i], result.path[i]);
			}
			document.getElementById('unsolved_field').innerHTML = result.unsolved;
			document.getElementById('algorithm_field').innerHTML = algorithm;
		});
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
	createCanvas(350, 350);

	w = float(350 / cols);
	h = float(350 / rows);
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

function countResult() {
	if (result.time.length > 0 && result.path.length > 0 && result.steps.length > 0) {
		result.time_average = (result.time.reduce((acc,el) => acc + el, 0) / result.time.length).toFixed(2);
		result.path_average = (result.path.reduce((acc,el) => acc + el, 0) / result.path.length).toFixed(2);
		result.steps_average = (result.steps.reduce((acc,el) => acc + el, 0) / result.steps.length).toFixed(2);
	}
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

function resetTable(tableID) {
	let table = document.getElementById(tableID);
	while(table.rows.length > 1) {
	  table.deleteRow(1);
	}
}

function addRow(tableID,num, steps, time, path) {
	let table = document.getElementById(tableID);
	let newRow = table.insertRow(-1);
	let cell_num = newRow.insertCell(0);
	let cell_steps = newRow.insertCell(1);
	let cell_time = newRow.insertCell(2);
	let cell_path = newRow.insertCell(3);
	cell_num.innerHTML = ++num;
	cell_steps.innerHTML = steps;
	cell_time.innerHTML = time;
	cell_path.innerHTML = path;
}
