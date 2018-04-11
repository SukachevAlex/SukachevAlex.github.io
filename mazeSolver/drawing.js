function drawBackground() {
	background(0);
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}
}

function drawSets() {
	for(let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0, 0.6));
	}

	for(let i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0, 0.6));
	}
}

function drawCurrentPath(element, color) {
	path = [];
	let temp = element;
	path.push(temp);

	while(temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}
	stroke(color);
	strokeWeight(w/5);
	beginShape();
	noFill();
	if (path.length > 0) {
		console.log(path);
		for(let i = 0; i < path.length; i++) {
			vertex(path[i].i * w + w/2, path[i].j * h + h/2);
		}
	} else {
		console.log('fuck!');
	}
	endShape();
}



function drawStartEnd() {
	start.show(color(133, 255, 199, 0.9));
	end.show(color(255, 140, 143, 0.9));
}
