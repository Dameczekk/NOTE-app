sectionsInSections++;

let renderId = 0;
let num = 0;

const renderButton = (extensionId) => {
  const side02 = document.querySelector('#side0');
  const extension0 = document.createElement('button');
  extension0.id = `extension${extensionId}`;

  side02.appendChild(extension0);

  const img0 = document.createElement('img');

  img0.src = 'assets/images/icons/terminal.png';

  extension0.appendChild(img0);

  extension0.addEventListener('click', () => {
    switchSection('all', 'section4')
    hideToolBar();
    functionalButtons('0', 'close');
  });
}

const renderSection = (extensionId) => {
  const main2 = document.querySelector('main');
  const section0 = document.createElement('section');
  section0.id = `section${extensionId}`;

  main2.appendChild(section0);
  sections.push('section4');
}

const renderContainer = () => {
  const section = document.querySelector('#section4');
  const console = document.createElement('div');
  const consoleTools = document.createElement('div');
  const consoleTerminal = document.createElement('div');
  const consoleInput = document.createElement('input');
  const container = document.createElement('div');

  container.classList.add('container');
  container.id = 'consoleContainer';
  consoleTools.id = 'consoleTools';
  consoleTerminal.id = 'consoleTerminal';
  consoleInput.id = 'consoleInput';
  console.id = 'console';

  section.appendChild(container);
  container.appendChild(consoleTools);
  container.appendChild(consoleTerminal);
  container.appendChild(consoleInput);

  consoleInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addLog(consoleInput.value, 'message');
    }
  });
}

const addLog = (content, type, sender) => {
  let now = new Date();
  const log = document.createElement('span');
  const consoleTerminal = document.querySelector('#consoleTerminal');

  log.id = 'log' + num;
  log.classList.add('log');
  if (type == 'message') {
    log.textContent = '[' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()  + '] ' +  `${sender}:` + content;
  } else {
    log.textContent = content;
  }

  consoleTerminal.appendChild(log);
   
  num++

  scroll();
}

const scroll = () => {
  const consoleTerminal = document.querySelector('#consoleTerminal');
  consoleTerminal.scrollTop = consoleTerminal.scrollHeight;
}

renderButton('1');
renderSection('4');
renderContainer();

addLog(`Logged at ${Date()}`, 'sys', name);
addLog(`Hello ${name}!`, 'sys', name);
