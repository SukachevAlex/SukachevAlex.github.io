function makeDraggable(evt) {
    const pointer = document.getElementById("controllerPointer");
    const lightTicks = document.getElementById('lightTicks');
    const ticks = document.getElementById('ticks');
    const svg = evt.target;
    let coord;
    let ticksLength;
    let mDown;

    ticks.addEventListener('mousedown', startDragging);
    ticks.addEventListener('mousemove', dragging);
    ticks.addEventListener('mouseleave', stopDragging);
    ticks.addEventListener('mouseup', stopDragging);
    ticks.addEventListener('touchstart', startDragging);
    ticks.addEventListener('touchmove', dragging);
    ticks.addEventListener('touchend', stopDragging);
    ticks.addEventListener('touchleave', stopDragging);
    ticks.addEventListener('touchcancel', stopDragging);

    mDown = false;

    function startDragging(evt) {
        console.log(getMousePosition(evt, svg));
        coord = getMousePosition(evt, svg);
        ticksLength = getTicksLength(coord);
        mDown = true;
        if (mDown) {
            lightTicks.style.strokeDashoffset = ticksLength;
            changeTemperature(ticksLength);
        }
    }

    function dragging(evt) {
        coord = getMousePosition(evt, svg);
        ticksLength = getTicksLength(coord);
        if (mDown) {
            lightTicks.style.strokeDashoffset = ticksLength;
            changeTemperature(ticksLength);
        }

    }

    function stopDragging() {
        mDown = false;
    }


}

function changeTemperature(ticksLength) {
    console.log(ticksLength);
    document.getElementById('temperatureValue').innerHTML = `+${(Math.round((620 - ticksLength) / 17))}`;
}


function getMousePosition(evt, svg) {
    var CTM = svg.getScreenCTM();
    if (evt.touches) {
        evt = evt.touches[0];
    }
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

function getTicksLength(coord) {
    let ticksLength = 0;

    if (coord.x < 110) {
        if (coord.y > 110) {
            ticksLength = (60 - coord.x) * 1.4;
        } else {
            ticksLength = coord.x * 1.5 + 110;
        }
        ticksLength = ticksLength > 0 ? 622 - ticksLength : 622;
    } else {
        if (coord.y < 110) {
            ticksLength = coord.x * 1.3 + 110;
        } else {
            ticksLength = (220 - coord.x) * 2 + 410;
            ticksLength = Math.min(520, ticksLength);
        }
        ticksLength = ticksLength > 0 ? 622 - ticksLength : 622;
    }
    return ticksLength;
}