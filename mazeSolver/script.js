let grid = [];
let openSet = [];
let closedSet = [];
let path = [];
let steps_field;
let start;
let end;
let current;
let w, h;

let is_drawing = false;
let found_path = true;
let calculating = false;


function init() {

	document.getElementById('start').addEventListener('click', function() {

		do_diagonal = document.getElementById('do_diagonal').checked;
		random_nodes = document.getElementById('random_nodes').checked;
		grid_spawn_rate = document.getElementById('grid_spawn_rate').value;
		steps_field = document.getElementById('steps');
		cols = document.getElementById('cols').value;
		rows = document.getElementById('rows').value;
		algorithm = document.getElementById('algorithm').value;
		document.getElementById('solution__text').innerHTML = 'Solution:';

		buildGrid();
		generateBoard();

		loop();
		calculating = true;
		current = start;
		steps = -1;


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


function finishSolving() {
	calculating = false;
	noLoop();
	document.getElementById('solution__text').innerHTML = `Find path in ${steps} steps, path length = ${pathLength}`;

	found_path = true;
}

function generateBoard() {

	openSet = [];
	closedSet = [];
	path = [];
	found_path = false

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

function resolveAStar() {

	let winner = 0;

	for(let i = 0; i < openSet.length; i++) {
		if(openSet[i].f < openSet[winner].f) {
			winner = i;
		}
	}

	current = openSet[winner];

	if(current === end) {
		finishSolving();
	}

	removeFromArray(openSet, current);
	closedSet.push(current);

	let neighbors = current.neighbors;

	for(let i = 0; i < neighbors.length; i++) {
		let neighbor = neighbors[i];

		if(!closedSet.includes(neighbor) && !neighbor.wall) {
			let tempG = current.g + 1;

			let newPath = false;

			if(openSet.includes(neighbor)) {
				if(tempG < neighbor.g) {
					neighbor.g = tempG;
					newPath = true;
				}
			} else {
				neighbor.g = tempG;
				newPath = true;
				openSet.push(neighbor);
			}

			if(newPath) {
				neighbor.h = heuristic(neighbor, end);
				neighbor.f = (neighbor.g + neighbor.h);
				neighbor.previous = current;
			}
		}
	}
}

function resolveRandom() {

	current.visited = true;
	if(current === end) {
		//pathLength = openSet.length;
		finishSolving();

	} else {
		let neighbors = current.neighbors;
		let neighborList = [];

		for (let i = 0; i < neighbors.length; i++) {

			if (!neighbors[i].wall && !neighbors[i].visited) {
				neighborList.push(neighbors[i]);
			}
		}
		if (neighborList.length > 0) {
			let next = neighborList[floor(random(0, neighborList.length))];
			if (next) {
				next.previous = current;
				openSet.push(current);
				current = next;
			}
		} else if (openSet.length > 0) {
			closedSet.push(current);
			current = openSet.pop();
		}
	}
}

function createCanv() {
	createCanvas(640, 640);

	w = float(640 / cols);
	h = float(640 / rows);
}

function countSteps() {
	steps++;
	steps_field.innerHTML = steps;
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
		countSteps();

		if(openSet.length > 0) {
			if (algorithm == 'aStar') {
				resolveAStar();
			}else if (algorithm == 'random') {
				resolveRandom();
			}

		} else {
			document.getElementById('solution__text').innerHTML = 'Nqio solution!';
			noLoop();
		}
		drawBackground();
		drawSets();
		drawCurrentPath(current);
		drawStartEnd();


	}else {
		noLoop();
	}


}
