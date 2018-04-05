function drawBackground() {
	background(0);
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < cols; j++) {
			grid[i][j].show(color(255));
		}
	}
}

function drawSets() {
	for(let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0));
	}

	for(let i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0));
	}
}

function drawCurrentPath(current, color) {
	path = [];
	let temp = current;
	path.push(temp);

	while(temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}
	if (path[0] == end) {

		console.log(path.length);
		pathLength = path.length - 1;
	}

	stroke(color);
	strokeWeight(w/5);
	beginShape();
	noFill();
	for(let i = 0; i < path.length; i++) {
		vertex(path[i].i * w + w/2, path[i].j * h + h/2);
	}
	endShape();
}



function drawStartEnd() {
	start.show(color(133, 255, 199));
	end.show(color(255, 140, 143));
}
