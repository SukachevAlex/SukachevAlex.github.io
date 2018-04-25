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

function drawCurrentPath(element, color, num) {

	path = uniqueElements(path);
	// console.log(path);
	for (let i = 0; i < path.length; i++) {
		stroke(colorPath[i]);
		strokeWeight(w/6);
		beginShape();
		noFill();
		for(let j = 0; j < path[i].length; j++) {
			vertex(path[i][j].i * w + w/1.5 -  i * 100 / cols, path[i][j].j * h + h/1.5 - i * 100 / rows);
		}
		endShape();
	}
}

function drawStartEnd() {
	start.show(color(133, 255, 199, 0.9));
	end.show(color(255, 140, 143, 0.9));
}
