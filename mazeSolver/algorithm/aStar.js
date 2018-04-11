function resolveAStar() {

	let winner = 0;

	for(let i = 0; i < openSet.length; i++) {
		if(openSet[i].f < openSet[winner].f) {
			winner = i;
		}
	}

	element[0] = openSet[winner];

	if(element[0] === end) {
		pathLength = countPathLength(element[0]);
		finishSolving(true);
	} else {
		countSteps();
		countTime();

		removeFromArray(openSet, element[0]);
		closedSet.push(element[0]);

		let neighbors = element[0].neighbors;

		for(let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];

			if(!closedSet.includes(neighbor) && !neighbor.wall) {
				let tempG = element[0].g + 1;

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
					neighbor.previous = element[0];
				}
			}
		}
	}

	drawBackground();
	drawSets();
	drawStartEnd();
	drawCurrentPath(element[0], colorPath[2]);
	if (openSet.length == 0) {
		finishSolving(false);
	}
}
