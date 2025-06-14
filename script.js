// DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

// Stopwatch variables and initialization
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

// Format time (hh:mm:ss.ms)
function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0')
    );
}

// Updating the display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Starting the stopwatch
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
    }
}

// Pausing the stopwatch
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

// Reseting the stopwatch
function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    lapCount = 0;
}

// Recording a lap time
function lap() {
    if (isRunning) {
        lapCount++;
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formatTime(elapsedTime)}</span>
        `;
        lapsContainer.prepend(lapItem);
    }
}

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initializing display
updateDisplay();