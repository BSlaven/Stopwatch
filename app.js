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
  e.target.textContent = 'pause';
  continueBtn.disabled = true;
  reset.disabled = true;
  stop.removeAttribute('disabled');
  startTime = new Date().getTime();
  myTimer = setInterval(() => {
    const newTime = new Date().getTime();
    const timeDifference = newTime - startTime;
    const outputTime = formatTimes(timeDifference);
    output.innerText = outputTimes(outputTime);
  }, 100);
});

stop.addEventListener('click', e => {
  clearInterval(myTimer);
  e.target.disabled = true;
  continueBtn.disabled = false;
  start.textContent = 'start';
  stopTime = new Date().getTime();
  timesOnStop = createTimes(startTime, stopTime, initialTimes);
  output.innerText = outputTimes(timesOnStop);
  initialTimes = timesOnStop;
  reset.disabled = false;
});

reset.addEventListener('click', () => {
  clearInterval(myTimer);
  resetStopwatchValues();
});

continueBtn.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;
  const restartTime = new Date().getTime();
  myTimer = setInterval(() => {
    const newTime = new Date().getTime();
    const totalRestartTime = newTime - restartTime;
    const difference = totalRestartTime - startTime;
    const outputTime = formatTimes(difference)
    output.innerText = outputTimes(outputTime);
  }, 100);
});

// const createTimes = (startTime, endTime) => {
//   const hundreds = ((Math.floor((endTime - startTime) / 10)) + initialTimes.hundreds) % 100;
//   const seconds = ((Math.floor((endTime - startTime) / 1000)) + initialTimes.seconds) % 60;
//   const minutes = Math.floor((endTime - startTime) / 1000 / 60) + initialTimes.minutes
//   return { hundreds, seconds, minutes }
// }

const formatTimes = (time) => {
  const hundreds = Math.floor(time / 10) % 100;
  const seconds = Math.floor(time / 10 / 100) % 60;
  const minutes = Math.floor(time / 10 / 100 / 60) % 60;
  return { hundreds, seconds, minutes }
}

const outputTimes = ({ hundreds, minutes, seconds }) => {
  const minutesText = minutes > 9 ? `${minutes} ` : `0${minutes} `;
  const secondsText = seconds > 9 ? ` : ${seconds}` : ` : 0${seconds}`;
  const hundredsText = hundreds > 9 ? `.${hundreds}` : `.0${hundreds}`;
  return minutesText + secondsText + hundredsText;
}

const addRestartTimes = (stopTimes, restartTimes) => {
  const hundreds = (stopTimes.hundreds + restartTimes.hundreds) % 100;
  const seconds = (stopTimes.seconds + restartTimes.seconds) % 60;
  const minutes = stopTimes.minutes + restartTimes.minutes;
  return { hundreds, seconds, minutes }
}

const resetStopwatchValues = () => {
  start.disabled = false;
  start.textContent = 'start';
  stop.disabled = true;
  continueBtn.disabled = true;
  initialTimes.hundreds = 0;
  initialTimes.seconds = 0;
  initialTimes.minutes = 0;
  startTime = 0;
  output.innerText = `00 : 00 : 00`;
}