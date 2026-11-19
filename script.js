
// ELEMENTS
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");
const lapCountDisplay = document.getElementById("lapCount");
const status = document.getElementById("status");


// STOPWATCH VARIABLES
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;


// FORMAT TIME
function formatTime(time) {

    const hours = Math.floor(time / 3600000);

    const minutes = Math.floor((time % 3600000) / 60000);

    const seconds = Math.floor((time % 60000) / 1000);

    const centiseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(centiseconds).padStart(2, "0")
    );
}


// UPDATE DISPLAY
function updateDisplay() {

    const currentTime = Date.now() - startTime + elapsedTime;

    display.textContent = formatTime(currentTime);

}


// UPDATE BUTTON STATES
function updateButtons(running) {

    startBtn.disabled = running;
    pauseBtn.disabled = !running;
    lapBtn.disabled = !running;

}


// START BUTTON
startBtn.addEventListener("click", function() {

    if (timerInterval !== null) return;

    startTime = Date.now();

    timerInterval = setInterval(updateDisplay, 10);

    status.textContent = "RUNNING";

    updateButtons(true);

});


// PAUSE BUTTON
pauseBtn.addEventListener("click", function() {

    if (timerInterval === null) return;

    elapsedTime += Date.now() - startTime;

    clearInterval(timerInterval);

    timerInterval = null;

    display.textContent = formatTime(elapsedTime);

    status.textContent = "PAUSED";

    updateButtons(false);

});


// RESET BUTTON
resetBtn.addEventListener("click", function() {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;

    display.textContent = "00:00:00.00";

    lapList.innerHTML = `
        <li class="empty-message">
            No laps recorded yet
        </li>
    `;

    lapCountDisplay.textContent = "0 LAPS";

    status.textContent = "READY";

    updateButtons(false);

});


// LAP BUTTON
lapBtn.addEventListener("click", function() {

    if (timerInterval === null) return;

    const currentTime = Date.now() - startTime + elapsedTime;

    lapCount++;

    const lapItem = document.createElement("li");

    const lapName = document.createElement("span");
    lapName.textContent = `Lap ${lapCount}`;

    const lapTime = document.createElement("span");
    lapTime.textContent = formatTime(currentTime);

    lapItem.appendChild(lapName);
    lapItem.appendChild(lapTime);

    if (lapCount === 1) {
        lapList.innerHTML = "";
    }

    lapList.prepend(lapItem);

    lapCountDisplay.textContent = `${lapCount} LAPS`;

});


// INITIAL BUTTON STATE
updateButtons(false);