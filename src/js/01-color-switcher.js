function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerToChangeBg = null;

btnStart.addEventListener('click', onStartInterval);
btnStop.addEventListener('click', onStopInterval);


function onStartInterval(evt) {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerToChangeBg = setInterval((getChangeBgColor), 1000);

    function getChangeBgColor() {
        body.style.backgroundColor = getRandomHexColor();
    }
}

function onStopInterval(evt) {
    clearInterval(timerToChangeBg);
    btnStart.disabled = false;
    btnStop.disabled = true;
}
