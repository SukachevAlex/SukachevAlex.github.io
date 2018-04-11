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
      for (let j = 0; j < neighbors.length; j++) {

        if (!neighbors[j].wall  && !neighbors[j].visited) {
					neighborList.push(neighbors[j]);
        }
      }
      if (neighborList.length > 0) {
        let next = neighborList[floor(random(0, neighborList.length))];
        if (next) {
          next.previous = element[i];
          element[i] = next;
          element[i].visited = true;
        }
      } else if (element[i].previous){
				closedSet.push(element[i]);
        element[i] = element[i].previous;
      }
    }
	}

	if (element.every(el => el === start)) {
		finishSolving(false);
	}


	drawBackground();
	drawSets();
	for (let i = 0; i < particleCount; i++) {
			drawCurrentPath(element[i], colorPath[i]);
	}
	drawStartEnd();


}
