function resolveAint() {

	countSteps(aint_array.length - aint_finished.length);
	countTime();



	if (aint_array.length > 0) {

		if (aint_finished.length !== aint_array.length) {

			for(let i = 0; i < aint_array.length; i++) {

				let aint = aint_array[i];
				let first_turn = [];
				let second_turn = [];
				let third_turn = [];
				let neighbors = aint.current.neighbors;

				aint.current.pheromon = 1;
				aint.current.visited = true;

				if (aint.current == end) {
					result.path.push(aint_array[i].path.length - 1);
					result.steps.push(steps);
					result.time.push(time);
					removeFromArray(aint_array, aint_array[i]);
				} else {
					for (let j = 0; j < neighbors.length; j++) {

						if (!neighbors[j].wall  && neighbors[j] !== start && !closedSet.includes(neighbors[j])) {
							if (neighbors[j].pheromon == 0) {
								first_turn.push(neighbors[j]);
							} else if (!aint.visited.includes(neighbors[j])) {
								second_turn.push(neighbors[j]);
							}
						}
					}
					if (first_turn.length > 0) {
						let next = first_turn[floor(random(0, first_turn.length))];
						if (next) {
							aint.path.push(next);
							openSet.push(aint_array[i].current);
							aint_array[i].visited.push(next);
							aint_array[i].current = next;
							aint_array[i].current.visitors.push(i);
						}
					} else if (second_turn.length > 0) {
						let next = second_turn[floor(random(0, second_turn.length))];
						if (next) {
							aint.path.push(next);
							openSet.push(aint_array[i].current);
							aint_array[i].visited.push(next);
							aint_array[i].current = next;
							aint_array[i].current.visitors.push(i);
						}
					} else if (aint_array[i].path.length > 0){
						if (aint_array[i].current == start) {
							aint_array[i].current = start;
							aint_finished.push(i);
						} else {
							removeFromArray(aint_array[i].current.visitors, i);
							if (aint_array[i].current !== start && aint_array[i].current.visitors < 1) {
								closedSet.push(aint_array[i].current);
							}
							removeFromArray(openSet, aint_array[i].current);
							aint.path.pop();
							aint_array[i].current = aint.path[aint.path.length - 1];
						}

					} else {
						console.log('fck');
					}
					closedSet = uniqueElements(closedSet);
					openSet = uniqueElements(openSet);
					aint_finished = uniqueElements(aint_finished);
				}
			}
		} else {
			result.unsolved++;
			finishSolving(false);
		}
	} else {
		finishSolving(true);
	}

	drawBackground();
	drawStartEnd();
	drawSets();
	drawAints();





}
