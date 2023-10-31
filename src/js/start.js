const startScreen = document.querySelector('#startScreen');
const logos = document.querySelector('#logos');
const hr = document.querySelector('#hr');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dev = () => {
  for (let i = 0; i < 5; i++) {
    createNewNote();
  }
}

const start = async () => {
  await sleep(400);
  hr.style.width = '200px';
  await sleep(800);
  startScreen.style.opacity = '0';
  await sleep(1000);
  startScreen.style.display = 'none';

  dev();
}

start();