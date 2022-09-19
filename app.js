const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
const continueBtn = document.querySelector('#continue-btn');

let startTime = 0;
let myTimer, timesOnStop;
let initialTimes = {
  hundreds: 0,
  seconds: 0,
  minutes: 0
}
start.addEventListener('click', e => {
  e.target.disabled = true;
  continueBtn.disabled = true;
  stop.removeAttribute('disabled');
  startTime = new Date().getTime();
  myTimer = setInterval(() => {
    let newTime = new Date().getTime();
    const finalTimes = createTimes(startTime, newTime, initialTimes);
    output.innerText = outputTimes(finalTimes);
  }, 100);
});

stop.addEventListener('click', e => {
  clearInterval(myTimer);
  e.target.disabled = true;
  continueBtn.disabled = false;
  stopTime = new Date().getTime();
  timesOnStop = createTimes(startTime, stopTime, initialTimes);
  output.innerText = outputTimes(timesOnStop);
  initialTimes = timesOnStop;
});

reset.addEventListener('click', () => {
  clearInterval(myTimer);
  start.disabled = false;
  stop.disabled = true;
  continueBtn.disabled = true;
  initialTimes.hundreds = 0;
  initialTimes.seconds = 0;
  initialTimes.minutes = 0;
  startTime = 0;
  output.innerText = `00 : 00 : 00`;
});

continueBtn.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;
  startTime = new Date().getTime();
  myTimer = setInterval(() => {
    const newTime = new Date().getTime();
    const restartTimes = createTimes(startTime, newTime, initialTimes);
    output.innerText = outputTimes(restartTimes);
  }, 100);
});

const createTimes = (startTime, endTime, initialTimes) => {
  return {
    hundreds: ((Math.floor((endTime - startTime) / 10)) + initialTimes.hundreds) % 100,
    seconds: ((Math.floor((endTime - startTime) / 1000)) + initialTimes.seconds) % 60,
    minutes: Math.floor((endTime - startTime) / 1000 / 60) + initialTimes.minutes
  }
}

const outputTimes = ({ hundreds, minutes, seconds }) => {
  const hundredsText = hundreds > 9 ? `: ${hundreds}` : `: 0${hundreds}`;
  const secondsText = seconds > 9 ? `: ${seconds} ` : `: 0${seconds} `;
  const minutesText = minutes > 9 ? `${minutes} ` : `0${minutes} `;
  return minutesText + secondsText + hundredsText;
}

const addRestartTimes = (stopTimes, restartTimes) => {
  return {
    hundreds: (stopTimes.hundreds + restartTimes.hundreds) % 100,
    seconds: (stopTimes.seconds + restartTimes.seconds) % 60,
    minutes: stopTimes.minutes + restartTimes.minutes
  }
}
