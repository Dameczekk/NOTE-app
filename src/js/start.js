const startScreen = document.querySelector('#startScreen');
const logos = document.querySelector('#logos');
const hr = document.querySelector('#hr');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async () => {
  await sleep(200);
  hr.style.width = '200px';
  await sleep(800);
  startScreen.style.opacity = '0';
  await sleep(1000);
  startScreen.style.display = 'none';
}

start();