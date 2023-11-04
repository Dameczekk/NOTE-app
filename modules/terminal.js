sectionsInSections++;

let renderId = 0;

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

renderButton('1');
renderSection('4');