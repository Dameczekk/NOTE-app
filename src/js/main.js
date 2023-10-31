const root = document.querySelector(':root');

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
const cancel3 = document.querySelector('#cancel3');
const cancel4 = document.querySelector('#cancel4');

const confirm2 = document.querySelector('#confirm2');
const confirm3 = document.querySelector('#confirm3');
const confirm4 = document.querySelector('#confirm4');

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

const textAlign = document.querySelector('#textAlign');
const titleAlign = document.querySelector('#titleAlign');
const lineSpacing = document.querySelector('#lineSpacing');
const fontSize = document.querySelector('#fontSize');

const switch0 = document.querySelector('#switch0');
const switch1 = document.querySelector('#switch1');

const addCategoryButton = document.querySelector('#addCategoryButton');
const categoryButton0 = document.querySelector('#categoryButton0');
const categoryArea0 = document.querySelector('#categoryArea0');

const menuDelete = document.querySelector('#delete');
const menuArchive = document.querySelector('#archive');
const menuView = document.querySelector('#view');
const menuInfo = document.querySelector('#info');
const menuEdit = document.querySelector('#edit');

let sections = ['section0', 'section1'];
let Allthumbnails = [];
let dates = [];
let categoryButtons = [categoryButton0];
let categoryAreas = [categoryArea0];

let notes = 0;
let newNoteId = 0;
let newThumbnailId = 0;
let newCategoryId = 1;
let activeNote = null;
let selectedItemId = null;
let lineNumber = 0;
let columnNumber = 0;
let scoringAllow = false;
let darkThemeAllow = false;
let activeCategory = 0;

let toolBarVisible = false;
let switch0Toggle = true;

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

  const handleInputEvent = () => {
    const cursorIndex = noteArea.selectionStart;
    const textBeforeCursor = noteArea.value.substr(0, cursorIndex);
    const lastNewLineIndex = textBeforeCursor.lastIndexOf("\n");
    lineNumber = (textBeforeCursor.match(/\n/g) || []).length + 1;
    columnNumber = cursorIndex - lastNewLineIndex;

    marker.textContent = `Ln: ${lineNumber}, Col ${columnNumber}, Marks ${noteArea.value.length}`;
    noteArea.style.height = (noteArea.scrollHeight) + 'px';
  };

  noteArea.addEventListener('input', handleInputEvent);
  noteArea.addEventListener('click', handleInputEvent);
  noteArea.addEventListener('keyup', handleInputEvent);

  noteArea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (scoringAllow) {
        event.preventDefault();
        const cursorIndex = noteArea.selectionStart;
        const textBeforeCursor = noteArea.value.substr(0, cursorIndex);
        const textAfterCursor = noteArea.value.substr(cursorIndex);
        const scoring = document.querySelector('#scoring');
    
        const newText = textBeforeCursor + `\n${scoring.value} ` + textAfterCursor;
    
        noteArea.value = newText;
    
        const newCursorIndex = cursorIndex + 3;
        noteArea.selectionStart = newCursorIndex;
        noteArea.selectionEnd = newCursorIndex;
      }
    }
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
  const thumbnails = document.querySelector(`#thumbnails${activeCategory}`);

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

  const contextMenu = document.getElementById("context-menu");

  thumbnail.addEventListener("contextmenu", (e) => {
    contextMenu.style.animation = 'openModal 0.3s forwards';
    e.preventDefault();
    contextMenu.style.left = `${e.clientX + 100}px`;
    contextMenu.style.top = `${e.clientY - 100}px`;
    contextMenu.style.display = "block";

    selectedItemId = parseInt(thumbnail.getAttribute('id').split('thumbnail')[1]);
  });

  document.addEventListener('click', () => {
    contextMenu.style.animation = 'closeModal 0.3s forwards';
    setTimeout(() => {
      contextMenu.style.display = 'none'
    }, 300);
  });
}

const saveDates = () => {
  let date = new Date();

  dates.push(date.getDate() + ' ' + (date.getMonth() + 1) + ' '+ date.getFullYear());
}

const createNewNote = () => {
  createNewSection();
  createNewThumbnail();
  saveDates();
  showToolBar();

  notes++;
  newNoteId++;
  newThumbnailId++;
  selectedItemId = (newNoteId - 1);
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
  const thumbnails = document.querySelector(`#thumbnails${activeCategory}`);
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
  if (selectedItemId != null) {
    if (type == 'manual') {
      setTimeout(() => {
        document.querySelector(`#note${selectedItemId} .container`).style.margin = '0 0 0 72px';
      }, 1);
    }
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

textAlign.addEventListener('input', () => {
  const note = document.querySelector(`#note${selectedItemId} .noteArea`);
  note.style.textAlign = textAlign.value;
});

titleAlign.addEventListener('input', () => {
  const note = document.querySelector(`#note${selectedItemId} .noteNameInput`);
  note.style.textAlign = titleAlign.value;
});

lineSpacing.addEventListener('input', () => {
  const note = document.querySelector(`#note${selectedItemId} .noteArea`);
  note.style.lineHeight = lineSpacing.value;
});

fontSize.addEventListener('input', () => {
  const noteArea = document.querySelector(`#note${selectedItemId} .noteArea`);
  const noteNameInput = document.querySelector(`#note${selectedItemId} .noteNameInput`);

  noteNameInput.style.fontSize = (fontSize.value * 1.2) + 'px';
  noteArea.style.fontSize = fontSize.value + 'px';
});

switch0.addEventListener('click', () => {
  const circle = switch0.querySelector('.circle');
  const scoring = document.querySelector('#scoring');

  if (switch0Toggle) {
    circle.style.margin = '0 0 0 60%';
    circle.style.background = 'var(--leadingColor)';
    switch0.style.background = 'var(--leadingColor2)';
    scoring.style.border = '2px solid var(--leadingColor)';
    scoringAllow = true;
  } else {
    circle.style.margin = '0';
    circle.style.background = '';
    switch0.style.background = '';
    scoring.style.border = '';
    scoringAllow = false;
  }

  switch0Toggle = !switch0Toggle;
})

addCategoryButton.addEventListener('click', () => {
  openModal('4');
});

cancel3.addEventListener('click', () => {
  const nameCategoryinput = document.querySelector('#nameCategoryInput');

  closeModal('4');
  setTimeout(() => {
    nameCategoryinput.value = '';
  }, 500);
});

const switchCategory = () => {
  const allCategories = document.querySelectorAll('.categoryArea');
  const active = document.querySelector(`#categoryArea${activeCategory}`);

  allCategories.forEach(e => {
    e.style.display = 'none';
  });

  active.style.display = 'block';
}

const createCategoryButton = () => {
  const categories = document.querySelector('#categoryButtons');
  const categoryButtonPattern = document.querySelector('.categoryButtonPattern');
  const el = categoryButtonPattern.content.cloneNode(true);
  const categoryButton = el.querySelector('.categoryButton');
  const nameCategoryinput = document.querySelector('#nameCategoryInput');

  categoryButton.setAttribute('id', `categoryButton${newCategoryId}`);
  categoryButton.textContent = nameCategoryinput.value;

  categories.appendChild(el);

  categoryButtons.push(document.querySelector(`#categoryButton${newCategoryId}`));

  const handleCategoryButtonClick = (event) => {
    categoryButtons.forEach((button) => {
        button.style.backgroundColor = '#ffffff00';
    });

    event.target.style.backgroundColor = 'var(--leadingColor2)';

    activeCategory = parseInt(event.target.getAttribute('id').split('categoryButton')[1]);

    document.querySelectorAll('.categoryArea').forEach(e => {
      e.style.display = 'none';
    });
    document.querySelector(`#categoryArea${activeCategory}`).style.display = 'block';
  };

  categoryButtons.forEach((button) => {
    button.addEventListener('click', handleCategoryButtonClick);
  });
}

const createCategoryArea = () => {
  const categories = document.querySelector('#categoryAreas');
  const categoryAreaPattern = document.querySelector('.categoryAreaPattern');
  const el = categoryAreaPattern.content.cloneNode(true);

  const categoryArea = el.querySelector('.categoryArea');
  const noteStatus = el.querySelector('.noteStatus');
  const thumbnails = el.querySelector('.thumbnails');

  categoryArea.setAttribute('id', `categoryArea${newCategoryId}`);
  noteStatus.setAttribute('id', `noteStatus${newCategoryId}`);
  thumbnails.setAttribute('id', `thumbnails${newCategoryId}`);

  categoryAreas.push(document.querySelector(`#categoryArea${newCategoryId}`));

  categories.appendChild(el);
}

const createNewCategory = () => {
  createCategoryButton();
  createCategoryArea();

  newCategoryId++;
}

confirm3.addEventListener('click', () => {
  const nameCategoryinput = document.querySelector('#nameCategoryInput');

  createNewCategory();
  closeModal('4');
  setTimeout(() => {
    nameCategoryinput.value = '';
  }, 500);
});

menuDelete.addEventListener('click', () => openModal('2'));
menuView.addEventListener('click', () => {
  switchSection('section0', `note${selectedItemId}`);
  functionalButtons('0', 'open');
  document.querySelector(`#note${selectedItemId} .container`).style.margin = '0 0 0 72px';
  goDown();
});
menuEdit.addEventListener('click', () => {
  switchSection('section0', `note${selectedItemId}`);
  functionalButtons('0', 'open');
  showToolBar();
  goDown();
});
menuInfo.addEventListener('click', () => {
  captureData();
  openModal('5');
});

const captureData = () => {
  const m5NoteName = document.querySelector('#m5NoteName');
  const creationDate = document.querySelector('#creationDate');

  const title = document.querySelector(`#note${selectedItemId} .noteNameInput`).value;
  const date = dates[selectedItemId];

  m5NoteName.textContent = title;
  creationDate.textContent = 'Creation date ' + date;
  start();
}

cancel4.addEventListener('click', () =>  closeModal('5'));
confirm4.addEventListener('click', () =>  closeModal('5'));

switch1.addEventListener('click', () => {
  const circle = switch1.querySelector('.circle');
  const toolBar = document.querySelector('#toolBar');

  if (switch0Toggle) {
    circle.style.margin = '0 0 0 60%';
    circle.style.background = 'var(--leadingColor)';
    switch1.style.background = 'var(--leadingColor2)';
    darkThemeAllow = true;
  } else {
    circle.style.margin = '0';
    circle.style.background = '';
    switch1.style.background = '';
    darkThemeAllow = false;
  }

  if (darkThemeAllow) {
    start();
    setTimeout(() => {
      toggleCSS();
    }, 1300);
  } else {
    start();
    setTimeout(() => {
      toggleCSS();
    }, 1300);
  }
  switch0Toggle = !switch0Toggle;
})

let cssLoaded = false;

function toggleCSS() {
  let link = document.getElementById("dynamicCSS");

  if (cssLoaded) {

    link.parentNode.removeChild(link);
    cssLoaded = false;
  } else {

    link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "src/css/darktheme.css";
    link.id = "dynamicCSS";

    document.head.appendChild(link);
    cssLoaded = true;
  }
}