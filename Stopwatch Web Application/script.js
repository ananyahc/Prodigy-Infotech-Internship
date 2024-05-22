let timer;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapResetButton = document.getElementById('lapReset');
const lapsList = document.getElementById('laps');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        lapResetButton.textContent = 'Reset';
        isRunning = false;
    } else {
        timer = setInterval(runStopwatch, 10);
        startStopButton.textContent = 'Stop';
        lapResetButton.textContent = 'Lap';
        isRunning = true;
    }
}

function runStopwatch() {
    let currentTime = display.textContent;
    let timeArray = currentTime.split(':');
    let hours = parseInt(timeArray[0]);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2]);

    seconds++;

    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function lapReset() {
    if (isRunning) {
        let lapTime = document.createElement('li');
        lapTime.textContent = 'Lap ' + lapCounter + ': ' + display.textContent;
        lapsList.appendChild(lapTime);
        lapCounter++;
    } else {
        display.textContent = '00:00:00';
        lapResetButton.textContent = 'Lap';
        lapsList.innerHTML = '';
        lapCounter = 1;
    }
}

startStopButton.addEventListener('click', startStop);
lapResetButton.addEventListener('click', lapReset);
