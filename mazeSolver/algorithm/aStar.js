function resolveAStar() {

	let winner = 0;

	for(let i = 0; i < openSet.length; i++) {
		if(openSet[i].f < openSet[winner].f) {
			winner = i;
		}
	}

	current = openSet[winner];

	if(current === end) {
		finishSolving(true);
	} else {
		countSteps();
		countTime();

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


	// drawBackground();
	// drawSets();
	// drawStartEnd();
	// drawCurrentPath(current, color(0, 0, 255));

}
