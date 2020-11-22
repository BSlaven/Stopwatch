const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

let startTime = 0;
let myTimer;
start.addEventListener('click', () => {
  startTime = new Date().getTime();
  myTimer = setInterval(() => {
    let newTime = new Date().getTime();
    const times = createTimes(startTime, newTime);
    output.innerText = outputTimes(times);
  }, 100);
});

stop.addEventListener('click', () => {
  clearInterval(myTimer);
  const stopTime = new Date().getTime();
  const differenceInHundreds = (Math.floor((stopTime - time) / 10)) % 100;
  const differenceInSeconds = (Math.floor((stopTime - time) / 1000)) % 60;
  const differenceInMinutes = Math.floor((stopTime - time) / 1000 / 60);
  hundredsElement.innerText = differenceInHundreds > 9 ? `: ${differenceInHundreds}` : `: 0${differenceInHundreds}`;
  secondsElement.innerText = differenceInSeconds > 9 ? `: ${differenceInSeconds}` : `: 0${differenceInSeconds}`;
  minutesElement.innerText = differenceInSeconds > 9 ? `${differenceInMinutes}` : `0${differenceInMinutes}`;
  });

reset.addEventListener('click', () => {
  time = 0;
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