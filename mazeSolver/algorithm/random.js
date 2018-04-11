function resolveRandom(particleCount = 1) {

	if(element.includes(end)) {
    pathLength = countPathLength(element[element.indexOf(end)]);
		finishSolving(true);
		noLoop();
	} else {
		countSteps(particleCount);
		countTime();

    for(let i = 0; i < particleCount; i++) {
      let neighbors = element[i].neighbors;
      let neighborList = [];
			let neighborSubList = [];
      for (let j = 0; j < neighbors.length; j++) {

        if (!neighbors[j].wall && !closedSet.includes(neighbors[j]) && !neighbors[j].visited) {
					neighborList.push(neighbors[j]);
        }else if (!neighbors[j].wall && !closedSet.includes(neighbors[j]) && neighbors[j] !== start){
					neighborSubList.push(neighbors[j]);
				}
      }
      if (neighborList.length > 0) {
        let next = neighborList[floor(random(0, neighborList.length))];
        if (next) {
          next.previous = element[i];
          element[i] = next;
          element[i].visited = true;
					element[i].visitors.push(i);
        }
      } else if (element[i].previous ){ // && element[i].visitors.length == 1) {
				if (element[i] !== start && element[i].visitors.length < 2) {
					closedSet.push(element[i]);
				}
				removeFromArray(element[i].visitors, i);
        element[i] = element[i].previous;
      } else {
				neighborList = neighborSubList;
				let next = neighborList[floor(random(0, neighborList.length))];
				if (next) {
					next.previous = element[i];
					element[i] = next;
					element[i].visited = true;
					element[i].visitors.push(i);
				}
			}
    }
	}
	//console.log(element);
	if (element.every(el => el === start)) {
		finishSolving(false);
	}
	drawBackground();
	drawSets();
	drawStartEnd();
	for (let i = 0; i < particleCount; i++) {
		drawCurrentPath(element[i], colorPath[i]);
	}
	console.log('-----');
}
