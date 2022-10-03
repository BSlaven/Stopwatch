const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
const continueBtn = document.querySelector('#continue-btn');

let isRunning = false;
let totalTime = 0;
let restartTotalTime = 0;
let myTimer;

start.addEventListener('click', e => {
  startOrRestart();
});

stop.addEventListener('click', e => {
  stopAndPause();
});

reset.addEventListener('click', () => {
  clearInterval(myTimer);
  resetStopwatchValues();
});

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

const startOrRestart = () => {
  if(!isRunning) {
    const startTime = new Date().getTime();
    start.textContent = 'pause';
    isRunning = true;
    myTimer = setInterval(() => {
      const newTime = new Date().getTime();
      const timeDifference = newTime - startTime;
      totalTime = timeDifference;
      const outputTime = formatTimes(totalTime);
      output.innerText = outputTimes(outputTime);
    }, 100);
  } else {
    isRunning = false;
    start.textContent = 'restart';
    const restartTime = new Date().getTime();
    clearInterval(myTimer);
    myTimer = setInterval(() => {
      const newTime = new Date().getTime();
      restartTotalTime = newTime - restartTime;
      const restartWithTotalTime = restartTotalTime + totalTime;
      const outputTime = formatTimes(restartWithTotalTime);
      output.textContent = outputTimes(outputTime);
    }, 100);
  }
}

const stopAndPause = () => {
  clearInterval(myTimer);
  continueBtn.disabled = false;
  reset.disabled = false;
  start.textContent = 'restart';
  isRunning = false;
  totalTime += restartTotalTime;
  restartTotalTime = 0;
}

const resetStopwatchValues = () => {
  start.disabled = false;
  start.textContent = 'start';
  stop.disabled = true;
  continueBtn.disabled = true;
  output.innerText = `00 : 00.00`;
  totalTime = 0;
}