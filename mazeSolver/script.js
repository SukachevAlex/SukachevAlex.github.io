let cols = 10;
let rows = 10;
let grid_size = 50;
let grid = [];

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let frames = 2;
let path = [];

let do_diagonal = false;
let random_nodes = false;
let do_debug = false;
let grid_spawn_rate = 0;

let is_drawing = true;
let steps = 0;
let found_path = true;
let calculating = false;

document.getElementById('start').addEventListener('click', function() {
	steps = 0;
	if (document.getElementById('do_diagonal').checked == true) {
		do_diagonal = true;
	}
	if (document.getElementById('random_nodes').checked == true) {
		random_nodes = true;
	}
	grid_spawn_rate = document.getElementById('grid_spawn_rate').value;
	cols = document.getElementById('cols').value;
	rows = document.getElementById('rows').value;

	buildGrid();
	generateBoard();

	is_drawing = false;
	loop();
	calculating = true;

});


function buildGrid() {
	// 2d array + create spots
	for(let i = 0; i < cols; i++) {
		grid[ i ] = [];

		for(let j = 0; j < rows; j++) {
			grid[ i ][ j ] = new Spot(i, j);
		}
	}

	// set neighbors
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[ i ][ j ].addNeighbors(grid);
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

function generateBoard() {
	// reset global variables
	openSet = [];
	closedSet = [];
	path = [];
	found_path = false

	// make sure start and end aren't walls
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

function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	if(random(1) < grid_spawn_rate) {
		this.wall = true;
	}

	this.show = function(col) {
		noStroke();

		fill(col);

		if(this.wall) {
			fill(20, 20, 20);
		}

		rect((this.i * w), (this.j * h), (w - 1), (h - 1));
	};

	this.addNeighbors = function(grid) {
		let i = this.i;
		let j = this.j;

		// left
		if(i < (cols - 1)) {
			this.neighbors.push(grid[ i + 1 ][ j     ]);
		}

		// right
		if(i > 0) {
			this.neighbors.push(grid[ i - 1 ][ j     ]);
		}

		// above
		if(j < (rows - 1)) {
			this.neighbors.push(grid[ i     ][ j + 1 ]);
		}

		// below
		if(j > 0) {
			this.neighbors.push(grid[ i     ][ j - 1 ]);
		}

		if(do_diagonal) {
			// diag top left
			if((i > 0) && (j > 0)) {
				this.neighbors.push(grid[ i - 1 ][ j - 1 ]);
			}

			// diag top right
			if((i < (cols - 1)) && (j > 0)) {
				this.neighbors.push(grid[ i + 1 ][ j - 1 ]);
			}

			// diag bottom left
			if((i > 0) && (j < (rows - 1))) {
				this.neighbors.push(grid[ i - 1 ][ j + 1 ]);
			}

			// diag bottom right
			if((i < (cols - 1)) && (j < (cols - 1))) {
				this.neighbors.push(grid[ i + 1 ][ j + 1 ]);
			}
		}
	};
}

function setup() {
	frameRate(frames);

}

function createCanv() {
	createCanvas(cols * grid_size, rows * grid_size);

	w = (width / cols);
	h = (height / rows);
}

function draw() {
	if (calculating) {
		createCanv();

		steps++;
		document.getElementById('steps').innerHTML = steps;

		var current;

		if(!is_drawing) {
			let won_this_round = false;

			if(openSet.length > 0) {
				// keep going
				let winner = 0;

				for(let i = 0; i < openSet.length; i++) {
					if(openSet[ i ].f < openSet[ winner ].f) {
						winner = i;
					}
				}

				current = openSet[ winner ];

				if(current === end) {
					calculating = false;
					noLoop();
					console.log("Found solution!");
					document.getElementById('solution__text').innerHTML = `Find path in ${steps} steps`;


					won_this_round = true;
					found_path = true;
				}

				if(!won_this_round) {
					removeFromArray(openSet, current);
					closedSet.push(current);

					let neighbors = current.neighbors;

					for(let i = 0; i < neighbors.length; i++) {
						let neighbor = neighbors[ i ];

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
			} else {
				// no solution
				console.log("No solution!");
				document.getElementById('solution__text').innerHTML = 'No solution!';
				noLoop();

				// return 1;
			}
		}

		background(255);

		for(let i = 0; i < cols; i++) {
			for(let j = 0; j < cols; j++) {
				grid[ i ][ j ].show(color(255));
			}
		}

		if(!is_drawing) {
			for(let i = 0; i < closedSet.length; i++) {
				closedSet[ i ].show(color(255, 0, 0));
			}

			for(let i = 0; i < openSet.length; i++) {
				openSet[ i ].show(color(0, 255, 0));
			}
		}


		let start_color = color(133, 255, 199);
		let end_color = color(255, 140, 143);

		if(!is_drawing) {
			// draw the current best path
			path = [];
			let temp = current;
			path.push(temp);
			while(temp.previous) {
				path.push(temp.previous);
				temp = temp.previous;
			}

			stroke(0, 0, 255);
			strokeWeight(w/5);
			beginShape();
			noFill();
			for(let i = 0; i < path.length; i++) {
				vertex(path[i].i * w + w/2, path[i].j * h + h/2);
			}
			endShape();
		}


		// draw start + end
		start.show(start_color);
		end.show(end_color);
	}else {
		noLoop();
	}

}
