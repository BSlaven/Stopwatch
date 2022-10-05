const stopwatchContainer = document.querySelector('#stopwatch');
const startRestartBtn = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
const lapBtn = document.querySelector('#lap-btn');

let isRunning = false;
let totalTime = 0;
let restartTotalTime = 0;
let myTimer;

stopwatchContainer.addEventListener('click', e => {
  startClickHandler();
});

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

lapBtn.addEventListener('click', e => {
  showLapTime();
})

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

const startClickHandler = () => {
  if(isRunning) {
    stopAndPause();
    return;
  }
  startOrRestart();
}

const startOrRestart = () => {
  isRunning = true;
  const startTime = new Date().getTime();
  startRestartBtn.textContent = 'pause';
  if(totalTime === 0) {
    myTimer = setInterval(() => {
      const newTime = new Date().getTime();
      const timeDifference = newTime - startTime;
      totalTime = timeDifference;
      const outputTime = formatTimes(totalTime);
      output.textContent = outputTimes(outputTime);
    }, 100);
  } else {
    myTimer = setInterval(() => {
      const newTime = new Date().getTime();
      restartTotalTime = newTime - startTime;
      const restartWithTotalTime = restartTotalTime + totalTime;
      const outputTime = formatTimes(restartWithTotalTime);
      output.textContent = outputTimes(outputTime);
    }, 100);
  }
}

const stopAndPause = () => {
  if(!isRunning) return;
  clearInterval(myTimer);
  startRestartBtn.textContent = 'restart';
  isRunning = false;
  totalTime += restartTotalTime;
  restartTotalTime = 0;
}

const showLapTime = () => {
  console.log('this is lap time');
}

const resetStopwatchValues = () => {
  isRunning = false;
  startRestartBtn.textContent = 'start';
  output.innerText = `00 : 00.00`;
  totalTime = 0;
  restartTotalTime = 0;
}