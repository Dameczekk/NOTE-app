const createNewNoteButton = document.querySelector('#createNewNote');
const section0 = document.querySelector('#section0');
const section1 = document.querySelector('#section1');

const button0 = document.querySelector('#button0');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

const cancel0 = document.querySelector('#cancel0');
const cancel1 = document.querySelector('#cancel1');
const cancel2 = document.querySelector('#cancel2');

const confirm2 = document.querySelector('#confirm2');

const fButton00 = document.querySelector('#fButton00');
const fButton01 = document.querySelector('#fButton01');
const fButton02 = document.querySelector('#fButton02');

const lastNotesMenu = document.querySelector('#lastNotesMenu');
const overlay = document.querySelector('#overlay');

const menu = document.querySelector('#sButton0');
const filters = document.querySelector('#sButton1');
const back = document.querySelectorAll('.return');

const tool0 = document.querySelector('#tool0');
const tool5 = document.querySelector('#tool5');
const tool6 = document.querySelector('#tool6');

let sections = ['section0', 'section1'];
let Allthumbnails = [];
let dates = [];

let notes = 0;
let newNoteId = 0;
let newThumbnailId = 0;
let activeNote = null;
let selectedItemId = null;

let toolBarVisible = true;

const createNewSection = () => {
  const notePattern = document.querySelector('.notePattern');
  const el = notePattern.content.cloneNode(true);
  const notes = document.querySelector('#notes');
  const note = el.querySelector('.note');

  const noteNameInput = el.querySelector('.noteNameInput');
  const noteArea = el.querySelector('.noteArea');
  const noteContainer = el.querySelector('.noteContainer');

  noteNameInput.value = 'New note ' + newNoteId;

  note.setAttribute('id', `note${newNoteId}`);

  sections.push(`note${newNoteId}`);
  activeNote = `note${newNoteId}`;

  notes.appendChild(el);

  setTimeout(() => {
    noteContainer.style.animation = 'none';
  }, 500);

  newNoteId++;

  noteArea.addEventListener('input', function () {
    this.style.height = (this.scrollHeight) + 'px';
  });

  noteNameInput.addEventListener('input', () => {
    const title = document.querySelector(`#thumbnail${selectedItemId} .thumbnailTitle`);

    title.textContent = noteNameInput.value;
  });
  noteArea.addEventListener('input', () => {
    const text = document.querySelector(`#thumbnail${selectedItemId} .thumbnailText`);

    text.textContent = noteArea.value;
  });
}

const createNewThumbnail = () => {
  const notePattern = document.querySelector('.thumbnailPattern');
  const el = notePattern.content.cloneNode(true);
  const thumbnails = document.querySelector('#thumbnails');

  const thumbnail = el.querySelector('.thumbnail');
  const thumbnailTitle = el.querySelector('.thumbnailTitle');
  const searchInput0 = document.querySelector('#searchInput0');

  const thumbnailTitles = el.querySelectorAll('.thumbnailTitle');
  const thumbnailss = el.querySelectorAll('.thumbnail');

  thumbnailTitle.textContent = `New note ${newThumbnailId}`;

  thumbnail.setAttribute('id', `thumbnail${newThumbnailId}`);
  Allthumbnails.push(`thumbnail${newThumbnailId}`);

  thumbnails.appendChild(el);

  setTimeout(() => {
    thumbnail.style.animation = 'none';
  }, 500);

  newThumbnailId++;

  thumbnail.addEventListener('click', () => {
    selectedItemId = parseInt(thumbnail.getAttribute('id').split('thumbnail')[1]);
    switchSection('section0', `note${selectedItemId}`);
    functionalButtons('0', 'open');
    showToolBar();
    goDown();
  });

  searchInput0.addEventListener('input', () => {
    const searchText = searchInput0.value.toLowerCase();

    for (let i = 0; i < thumbnailTitles.length; i++) {
      const titleArea = thumbnailTitles[i];
      const thumbnail = thumbnailss[i];

      const text = titleArea.textContent.toLowerCase();

      if (text.includes(searchText)) {
        thumbnail.classList.remove('hidden');
      } else {
        thumbnail.classList.add('hidden');
      }
    }
  });
}

const saveDatas = () => {
  let date = new Date();

  dates.push(date.getDate() + ' ' + (date.getMonth() + 1) + ' '+ date.getFullYear());
}

const createNewNote = () => {
  createNewSection();
  createNewThumbnail();
  saveDatas();
  showToolBar();

  notes++;
  selectedItemId = (newNoteId - 1);

  notes != 0 ? updateNotesStatus('my') : updateNotesStatus('nothing');
}

createNewNoteButton.addEventListener('click', () => {
  createNewNote();

  switchSection('section0', sections[(newNoteId + 1)]);
  functionalButtons('0', 'open');
});

const switchSection = (from, to) => {
  const sectionA = document.querySelector(`#${from}`);
  const sectionB = document.querySelector(`#${to}`);

  if (from == 'all') {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] != '--deleted--') {
        document.querySelector(`#${sections[i]}`).style.display = 'none';
      }
    }
    sectionB.style.display = 'block';
  } else {
    if (sections.indexOf(to) != -1) {
      sectionA.style.display = 'none';
      sectionB.style.display = 'block';
    } else {
      console.log(`Sekcja "${to}" nie istnieje lub została usunięta.`);
    }
  }
}

button0.addEventListener('click', () => {
  hideToolBar('manual');
  switchSection('all', 'section0');
  functionalButtons('0', 'close');
  toolBarVisible = true;
});

lastNotesMenu.addEventListener('click', () => {
  lastNotesMenu.style.transform = 'translateX(-300px)';
});

menu.addEventListener('click', () => {
  lastNotesMenu.style.transform = 'translateX(62px)';
});

const toggleOverlay = (action) => {
  const overlay = document.getElementById('overlay');
  if (!overlay) {
    console.error('Overlay element not found');
    return;
  }

  if (action === 'show') {
    overlay.style.display = 'block';
    setTimeout(() => overlay.style.opacity = 1, 100);
  } else if (action === 'hide') {
    overlay.style.opacity = 0;
    setTimeout(() => overlay.style.display = 'none', 300);
  } else {
    console.error('Invalid action:', action);
  }
}

const openModal = (e) => {
  const modal = document.querySelector(`#modal${e}`);

  modal.style.display = 'block';
  modal.style.animation = 'openModal 0.5s forwards';

  toggleOverlay('show');
}

const closeModal = (e) => {
  const modal = document.querySelector(`#modal${e}`);

  modal.style.animation = 'closeModal 0.5s forwards';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);

  toggleOverlay('hide');
}

filters.addEventListener('click', () => openModal('0'));

cancel0.addEventListener('click', () => closeModal('0'));

button1.addEventListener('click', () => openModal('1'));

cancel1.addEventListener('click', () => closeModal('1'));

function saveToStorage(key, data) {
  try {
    const jsonData = JSON.stringify(data);
    
    localStorage.setItem(key, jsonData);
    
    console.log(`Dane zostały zapisane pod kluczem "${key}"`);
  } catch (error) {
    console.error('Błąd podczas zapisywania danych:', error);
  }
}

function loadFromStorage(key) {
  try {
    const jsonData = localStorage.getItem(key);
    
    if (jsonData !== null) {
      return JSON.parse(jsonData);
    } else {
      console.log(`Brak danych pod kluczem "${key}"`);
      return null;
    }
  } catch (error) {
    console.error('Błąd podczas odczytywania danych:', error);
    return null;
  }
}

const functionalButtons = (num, action) => {
  const fButtons = document.querySelector(`#functional${num}`);

  if (action == 'open') {
    fButtons.style.transform = 'translateX(0)';
  } else if (action == 'close') {
    fButtons.style.transform = 'translateX(-62px)';
  }
}

fButton02.addEventListener('click', () => openModal('2'));

cancel2.addEventListener('click', () => closeModal('2'));

const deleteNote = () => {
  const thumbnails = document.querySelector('#thumbnails');
  const notes = document.querySelector('#notes');

  const thumbnail = document.querySelector(`#thumbnail${selectedItemId}`);
  const note = document.querySelector(`#note${selectedItemId}`);

  const noteIndex = sections.indexOf(`note${selectedItemId}`);
  if (noteIndex != -1) {
    sections[noteIndex] = '--deleted--';
  }

  notes.removeChild(note);
  thumbnails.removeChild(thumbnail);
}

confirm2.addEventListener('click', () => {
  deleteNote();
  closeModal('2');
  switchSection('all', 'section0');
  functionalButtons('0', 'close');
  hideToolBar();
  toolBarVisible = true;
});

const toolBar = document.querySelector('#toolBar');

const hideToolBar = (type) => {
  toolBar.style.transform = 'translate(-320px)';
  if (type == 'manual') {
    setTimeout(() => {
      document.querySelector(`#note${selectedItemId} .container`).style.margin = '0 0 0 72px';
    }, 1);
  }
  resetToInitialState();
}

const showToolBar = () => {
  toolBar.style.transform = 'translate(62px)';
  setTimeout(() => {
    document.querySelector(`#note${selectedItemId} .container`).style.margin = '0 0 0 372px';
  }, 1);
}

fButton00.addEventListener('click', () => {
  if (toolBarVisible) {
    showToolBar();
  } else {
    hideToolBar('manual');
  }

  toolBarVisible = !toolBarVisible;
});

const tools = document.querySelector('#tools');
const fToolBars = [
  document.querySelector('#fToolBar0'),
  document.querySelector('#fToolBar1'),
  document.querySelector('#fToolBar2'),
  document.querySelector('#fToolBar3'),
  document.querySelector('#fToolBar4'),
  document.querySelector('#fToolBar5')
];

function switchArea(index) {
  if (fToolBars[index] && fToolBars[index].style.transform == 'translateX(0px)') {
    fToolBars[index].style.transform = 'translateX(300px)';
    tools.style.transform = 'translateX(0px)';
  } else if (fToolBars[index]) {
    // W przeciwnym razie pokaż wybrany obszar funkcji i ukryj #tools
    fToolBars[index].style.transform = 'translateX(0px)';
    tools.style.transform = 'translateX(-300px)';
  }
}

for (let i = 0; i < fToolBars.length; i++) {
  const button = document.querySelector(`#tool${i}`);
  if (button) {
    button.addEventListener('click', () => switchArea(i));
  }
}

function resetToInitialState() {
  tools.style.transform = 'translateX(0px)';
  for (let i = 0; i < fToolBars.length; i++) {
    if (fToolBars[i]) {
      fToolBars[i].style.transform = 'translateX(300px)';
    }
  }
}

for (let i = 0; i < back.length; i++) {
  back[i].addEventListener('click', () => {
    resetToInitialState();
  });
}

let selectedColor = 0;

const colors = document.querySelector('#colors');
const color = document.querySelectorAll('.color');
const selected = document.querySelector('.selected');

for (let i = 0; i < color.length; i++) {
  color[i].addEventListener('click', () => {
    const parent = selected.parentElement;

    const borderColor = window.getComputedStyle(color[i]).borderColor;
    const backgroundColor = window.getComputedStyle(color[i]).backgroundColor;
    selected.style.backgroundColor = borderColor;

    parent.removeChild(selected);
    color[i].appendChild(selected);

    const id = color[i].id
    selectedColor = parseInt(id.replace('color', ''));

    document.querySelector(`#note${selectedItemId} .noteContainer`).style.backgroundColor = backgroundColor;
    document.querySelector(`#note${selectedItemId} .noteContainer`).style.borderColor = borderColor;

    document.querySelector(`#thumbnail${selectedItemId}`).style.backgroundColor = backgroundColor;
    document.querySelector(`#thumbnail${selectedItemId}`).style.borderColor = borderColor;
  });
}

tool5.addEventListener('click', () => {
  let textToDownload = document.querySelector(`#note${selectedItemId} .noteArea`).value;
  let blob = new Blob([textToDownload], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);
            
  let a = document.querySelector('#tool5');
  
  let fileName = document.querySelector(`#note${selectedItemId} .noteNameInput`).value + '.txt';
  
  a.setAttribute('download', fileName);
  a.href = url;
});

tool6.addEventListener('click', () => {
  switchArea('5');
});

const goDown = () => {
  const note = document.querySelector(`#note${selectedItemId}`);
  const textareaInsideElement = note.querySelector('.noteArea');

  if (note) {
    const scrollHeight = textareaInsideElement.scrollHeight;
    const clientHeight = textareaInsideElement.clientHeight;

    if (scrollHeight > clientHeight) {
      textareaInsideElement.scrollTop = scrollHeight - clientHeight;
    }
    
    if (textareaInsideElement) {
      textareaInsideElement.focus();
    }
  }
}

fButton01.addEventListener('click', () => goDown());

const font = document.querySelectorAll('.font');
let selectedFont = 'Roboto';

for (let i = 0; i < font.length; i++) {
  font[i].addEventListener('click', () => {
    for (let j = 0; j < font.length; j++) {
      font[j].classList.remove('selectedFont');
    }

    const fontFamily = window.getComputedStyle(font[i]).fontFamily;
    
    font[i].classList.add('selectedFont');

    document.querySelector(`#thumbnail${selectedItemId} .thumbnailTitle`).style.fontFamily = fontFamily;
    document.querySelector(`#thumbnail${selectedItemId} .thumbnailText`).style.fontFamily = fontFamily;
    document.querySelector(`#note${selectedItemId} .noteArea`).style.fontFamily = fontFamily;
    document.querySelector(`#note${selectedItemId} .noteNameInput`).style.fontFamily = fontFamily;
  });
}

const updateNotesStatus = (action) => {
  const notesStatus = document.querySelector('#notesStatus');

  if (action == 'nothing') {
    notesStatus.textContent = 'Nothing here yet!';
  } else if (action == 'my') {
    notesStatus.textContent = 'My notes';
  }
}

button3.addEventListener('click', () => {
  switchSection('all', 'section1');
  functionalButtons('0', 'close');
  hideToolBar();
});

const widthInput = document.querySelector('#widthInput');
const heightInput = document.querySelector('#heightInput');

widthInput.addEventListener('input', () => {
  document.querySelector(`#thumbnail${selectedItemId}`).style.width = widthInput.value + 'px';
});

heightInput.addEventListener('input', () => {
  document.querySelector(`#thumbnail${selectedItemId}`).style.height = heightInput.value + 'px';
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
  });
}

const load0 = document.querySelector('#load0');

load0.addEventListener('click', () => {
  loadScript('modules/terminal.js');
});