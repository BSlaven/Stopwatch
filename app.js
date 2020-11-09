const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const tenthsElement = document.querySelector('#tenths')
const hundredsElement = document.querySelector('#hundreds');
const output = document.querySelector('#time');

let time = 0;
start.addEventListener('click', () => {
  time = new Date().getTime();
  let hundreds = 0;
  let seconds = 0;
  let minutes = 0;
  const myTimer = setInterval(() => {
    hundreds++;
    if(hundreds === 100) {
      hundreds = 0;
    }
    hundredsElement.innerText = hundreds > 9 ? `${hundreds}` : `0${hundreds}`;
  }, 10);
  const secondsTimer = setInterval(() => {
    seconds++;
    if(seconds === 60) {
      seconds = 0;
    }
    secondsElement.innerText = seconds > 9 ? `${seconds} :` : `0${seconds} :`;
  }, 1000);

  const minutesTimer = setInterval(() => {
    minutes++;
    minutesElement.innerText = minutes > 9 ? `${minutes}` : `0${minutes} :`
  }, 60000);
  stop.addEventListener('click', () => {
    clearInterval(myTimer);
    clearInterval(secondsTimer);
    clearInterval(minutesTimer);
    const stopTime = new Date().getTime();
    const differenceInHundreds = (Math.floor((stopTime - time) / 10)) % 100;
    const differenceInSeconds = (Math.floor((stopTime - time) / 1000)) % 60;
    const differenceInMinutes = Math.floor((stopTime - time) / 1000 / 60);
    hundredsElement.innerText = differenceInHundreds > 9 ? `: ${differenceInHundreds}` : `: 0${differenceInHundreds}`;
    secondsElement.innerText = differenceInSeconds > 9 ? `: ${differenceInSeconds}` : `: 0${differenceInSeconds}`;
    minutesElement.innerText = differenceInSeconds > 9 ? `${differenceInMinutes}` : `0${differenceInMinutes}`;
  });
});
