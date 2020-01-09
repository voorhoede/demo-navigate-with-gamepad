const rAF = window.mozRequestAnimationFrame || window.requestAnimationFrame;
let current = 0;
let focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

window.addEventListener('gamepadconnected', function(e) {
   updateLoop();
});

// event listener for vibration button
document.querySelector('#btn-vibration').addEventListener('click', function (e) {
    hapticFeedback();
});

function hapticFeedback() {
    navigator.getGamepads()[0].vibrationActuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration: 1000,
        weakMagnitude: 0.5,
        strongMagnitude: 1
    });
}

function nextItem(index) {
    index++;
    current = index % focusable.length;
    focusable[current].focus();
}

function prevItem(index) {
    index--;
    current = index % focusable.length;
    focusable[current].focus();
}

function clickItem(index) {
    if (focusable[index]) {
        focusable[index].click();
    }
}

function updateLoop() {
    let gp = navigator.getGamepads()[0];
    console.log(gp);
    console.log(current);

    switch (true) {
        case gp.buttons[0].pressed:
            clickItem(current);
            break;
        case gp.buttons[4].pressed:
            prevItem(current);
            break;
        case gp.buttons[5].pressed:
            nextItem(current);
            break;
        default:
            break;
    }

    setTimeout(function () {
        rAF(updateLoop);
    }, 150);
}
