function resolveRandomTwoParticle() {



	current.visited = true;
	if(current === end || currentSecond === end) {
		finishSolving(true);
		noLoop();

	} else {
		countSteps();
		countSteps();
		countTime();

		let neighbors = current.neighbors;
		let neighborList = [];

		let neighborsSecond = currentSecond.neighbors;
		let neighborListSecond = [];

		for (let i = 0; i < neighbors.length; i++) {

			if (!neighbors[i].wall && !neighbors[i].visited) {
				neighborList.push(neighbors[i]);
			}
		}
		if (neighborList.length > 0) {
			let next = neighborList[floor(random(0, neighborList.length))];
			if (next) {
				next.previous = current;
				current = next;
				current.visited = true;
			}
		} else if (current.previous){
			current = current.previous;
		}

		for (let i = 0; i < neighborsSecond.length; i++) {

			if (!neighborsSecond[i].wall && !neighborsSecond[i].visited) {
				neighborListSecond.push(neighborsSecond[i]);
			}
		}
		if (neighborListSecond.length > 0) {
			let next = neighborListSecond[floor(random(0, neighborListSecond.length))];
			if (next) {
				next.previous = currentSecond;
				currentSecond = next;
				currentSecond.visited = true;
			}
		} else if (currentSecond.previous){
			currentSecond = currentSecond.previous;
		}
	}


	if (current === start && currentSecond === start) {
		openSet = [];
	}


}
