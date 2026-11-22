
let sessionTime = 25;
let breakTime = 5;
let remainingTime = sessionTime * 60;
let isSession = true;
let timer = null;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");

const sessionDisplay = document.getElementById("session-time");
const breakDisplay = document.getElementById("break-time");

const buttons = document.querySelectorAll(".time-setting button");

function updateTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function updateSettings() {
    sessionDisplay.textContent = sessionTime;
    breakDisplay.textContent = breakTime;
    remainingTime = sessionTime * 60;
    updateTimer();
}

function updateButtons() {
    buttons.forEach(button => {
        button.disabled = timer !== null;
    });
}

document.getElementById("session-plus").onclick = function () {
    if (timer === null) {
        sessionTime++;
        updateSettings();
    }
};

document.getElementById("session-minus").onclick = function () {
    if (timer === null && sessionTime > 0) {
        sessionTime--;
        updateSettings();
    }
};

document.getElementById("break-plus").onclick = function () {
    if (timer === null) {
        breakTime++;
        breakDisplay.textContent = breakTime;
    }
};

document.getElementById("break-minus").onclick = function () {
    if (timer === null && breakTime > 0) {
        breakTime--;
        breakDisplay.textContent = breakTime;
    }
};

document.getElementById("start").onclick = function () {
    if (timer !== null) return;

    updateButtons();

    timer = setInterval(function () {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimer();
        } else {
            isSession = !isSession;

            if (isSession) {
                modeDisplay.textContent = "Session";
                remainingTime = sessionTime * 60;
            } else {
                modeDisplay.textContent = "Break";
                remainingTime = breakTime * 60;
            }

            updateTimer();
        }
    }, 1000);
};

document.getElementById("reset").onclick = function () {
    clearInterval(timer);
    timer = null;

    isSession = true;
    modeDisplay.textContent = "Session";

    updateSettings();
    updateButtons();
};

updateTimer();
