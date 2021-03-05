const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const historyBtn = document.querySelector(".history");
const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const timeList = document.querySelector(".time-list");

const infoBtn = document.querySelector(".info");
const modalShadow = document.querySelector(".modal-shadow");
const closeModalBtn = document.querySelector(".close");

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];

const handleStart = () => {
    clearInterval(countTime);

    countTime = setInterval(() => {
        // console.log(seconds);
        if (seconds < 9) {
            seconds++;
            stopwatch.textContent = `${minutes}:0${seconds}`;
        } else if (seconds >= 9 && seconds < 59) {
            seconds++;
            stopwatch.textContent = `${minutes}:${seconds}`;
        } else {
            minutes++;
            seconds = 0;
            stopwatch.textContent = `${minutes}:00`
        }



    }, 1000);
}
const handleStop = () => {

    if (stopwatch.textContent !== "0:00") {
        time.style.visibility = "visible";
        time.textContent = `Ostatni czas: ${stopwatch.textContent}`;

        timesArr.push(stopwatch.textContent)
    }

    clearAll();

}

const handlePause = () => {
    clearInterval(countTime);
}

const handleReset = () => {
    clearAll();
    time.style.visibility = "hidden";
    timesArr = [];
}

const clearAll = () => {
    clearInterval(countTime);
    stopwatch.textContent = "0:00";
    seconds = 0;
    minutes = 0;
    timeList.textContent = "";
}

const showHistory = () => {
    timeList.textContent = "";
    let num = 1;

    timesArr.forEach(time => {
        const newTime = document.createElement("li");
        newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`;

        timeList.appendChild(newTime);
        num++
    })

}

const showModal = () => {
    if (!(modalShadow.style.display === "block")) {
        modalShadow.style.display = "block"
    } else {
        modalShadow.style.display = "none"
    };
    modalShadow.classList.toggle("modal-animation");
}


startBtn.addEventListener("click", handleStart)
pauseBtn.addEventListener("click", handlePause)
stopBtn.addEventListener("click", handleStop)
resetBtn.addEventListener("click", handleReset)
historyBtn.addEventListener("click", showHistory)

infoBtn.addEventListener("click", showModal)
closeModalBtn.addEventListener("click", showModal)
window.addEventListener("click", e => e.target === modalShadow ? showModal() : false)