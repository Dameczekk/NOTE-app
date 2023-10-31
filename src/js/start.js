const startScreen = document.querySelector('#startScreen');
const logos = document.querySelector('#logos');
const hr = document.querySelector('#hr');

let firstConnect = true;

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dev = () => {
  for (let i = 0; i < 5; i++) {
    createNewNote();
  }
}

const start = async () => {
  startScreen.style.display = 'flex';
  hr.style.width = '50px';
  if (firstConnect) {
    startScreen.style.transform = 'translateY(0)';
  } else {
    startScreen.style.transform = 'translateY(100%)';
    await sleep(300);
    startScreen.style.transform = 'translateY(0)';
  }
  if (firstConnect) {
    await sleep(400);
  } else {
    await sleep(700);
  }
  hr.style.width = '200px';
  await sleep(800);
  startScreen.style.transform = 'translateY(100%)';
  await sleep(1000);
  startScreen.style.display = 'none';
  firstConnect = false;
}

start();