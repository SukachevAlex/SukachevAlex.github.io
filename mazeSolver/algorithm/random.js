function resolveRandom() {



	current.visited = true;
	if(current === end) {
		finishSolving();

	} else {
		countSteps();
		countTime();
		
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
	drawBackground();
	drawSets();
	drawStartEnd();
	drawCurrentPath(current, color(0, 0, 255));


}
