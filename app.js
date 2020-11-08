const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const tenthsElement = document.querySelector('#tenths')
const hundredsElement = document.querySelector('#hundreds');

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
    
  });
});

// seconds.innerText = `: ${differenceInSeconds}`;
// minutes.innerText = `${differenceInMinutes}`;
// console.log(differenceInSeconds);
// console.log(differenceInMinutes);
