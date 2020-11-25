const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
const restart = document.querySelector('#restart');

let startTime = 0;
let myTimer, timesOnStop;
start.addEventListener('click', e => {
  // e.target.setAttribute('disabled', 'true');
  startTime = new Date().getTime();
  myTimer = setInterval(() => {
    let newTime = new Date().getTime();
    const times = createTimes(startTime, newTime);
    output.innerText = outputTimes(times);
  }, 100);
});

stop.addEventListener('click', () => {
  clearInterval(myTimer);
  stopTime = new Date().getTime();
  timesOnStop = createTimes(startTime, stopTime);
  // output.innerText = outputTimes(timesOnStop);
});

reset.addEventListener('click', () => {
  clearInterval(myTimer);
  startTime = 0;
  output.innerText = `00 : 00 : 00`;
});

restart.addEventListener('click', () => {
  const restartTime = new Date().getTime();
  myTimer = setInterval(() => {
    const newTime = new Date().getTime();
    const restartTimes = createTimes(restartTime, newTime);
    const totalTimes = addRestartTimes(timesOnStop, restartTimes);
    output.innerText = outputTimes(totalTimes);
  }, 100);
});

const createTimes = (startTime, endTime) => {
  return {
    hundreds: (Math.floor((endTime - startTime) / 10)) % 100,
    seconds: (Math.floor((endTime - startTime) / 1000)) % 60,
    minutes: Math.floor((endTime - startTime) / 1000 / 60)
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
