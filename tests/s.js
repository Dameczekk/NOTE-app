const startScreen = document.querySelector('#startScreen');
const logos = document.querySelector('#logos');
const hr = document.querySelector('#hr');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const createNewThumbnails = (color, word) => {
  const notePattern = document.querySelector('.thumbnailPattern');
  const el = notePattern.content.cloneNode(true);
  const thumbnails = document.querySelector(`#thumbnails${activeCategory}`);

  const thumbnail = el.querySelector('.thumbnail');
  const thumbnailTitle = el.querySelector('.thumbnailTitle');
  const searchInput0 = document.querySelector('#searchInput0');

  const thumbnailTitles = el.querySelectorAll('.thumbnailTitle');
  const thumbnailss = el.querySelectorAll('.thumbnail');

  thumbnailTitle.textContent = `New note ${newThumbnailId}`;

  thumbnail.style.background = color;
  thumbnailTitle.textContent = word;
  thumbnail.style.border = `2px solid ${color}`;
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
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;
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



function generateRandomWord(length) {
  const imiona = [
    'Adam', 'Anna', 'Andrzej', 'Alicja', 'Bartek', 'Beata', 'Cezary', 'Daria', 'Daniel', 'Dominika',
    'Edward', 'Eliza', 'Filip', 'Gabriela', 'Grzegorz', 'Hanna', 'Hubert', 'Izabela', 'Jan', 'Julia',
    'Kamil', 'Karolina', 'Krzysztof', 'Katarzyna', 'Łukasz', 'Magdalena', 'Marcin', 'Monika', 'Michał', 'Natalia',
    'Paweł', 'Patrycja', 'Piotr', 'Paulina', 'Robert', 'Renata', 'Szymon', 'Sabina', 'Tomasz', 'Urszula',
    'Wojciech', 'Weronika', 'Zbigniew', 'Zofia', 'Zenon', 'Zuzanna', 'Adam', 'Anna', 'Andrzej', 'Alicja', 'Bartek',
    'Beata', 'Cezary', 'Daria', 'Daniel', 'Dominika', 'Edward', 'Eliza', 'Filip', 'Gabriela', 'Grzegorz', 'Hanna',
    'Hubert', 'Izabela', 'Jan', 'Julia', 'Kamil', 'Karolina', 'Krzysztof', 'Katarzyna', 'Łukasz', 'Magdalena', 'Marcin',
    'Monika', 'Michał', 'Natalia', 'Paweł', 'Patrycja', 'Piotr', 'Paulina', 'Robert', 'Renata', 'Szymon', 'Sabina',
    'Tomasz', 'Urszula', 'Wojciech', 'Weronika', 'Zbigniew', 'Zofia', 'Zenon', 'Zuzanna',
    // Tutaj dodaję kolejne 200 imion
    // ...
    // Dodaj kolejne 500 imion
    'Agata', 'Aleksander', 'Adrianna', 'Bartosz', 'Celina', 'Cyprian', 'Dorota', 'Eryk', 'Emilia', 'Fabian',
    'Gabriel', 'Gosia', 'Henryk', 'Igor', 'Jolanta', 'Janusz', 'Klaudia', 'Lukas', 'Malwina', 'Nikola',
    'Oskar', 'Olga', 'Paweł', 'Radosław', 'Stefania', 'Szymon', 'Tatiana', 'Urszula', 'Violetta', 'Wiktor',
    'Xawery', 'Yasmin', 'Zbyszek', 'Żaneta', 'Adela', 'Antoni', 'Barbara', 'Cezar', 'Celina', 'Dorian',
    'Dawid', 'Elwira', 'Felicja', 'Fryderyk', 'Greta', 'Hubert', 'Ida', 'Jerzy', 'Kamila', 'Leon',
    'Liliana', 'Marcin', 'Marta', 'Nikodem', 'Natalia', 'Oliwia', 'Patryk', 'Roksana', 'Sebastian', 'Sabina',
    'Tymoteusz', 'Ula', 'Witold', 'Weronika', 'Xavier', 'Yara', 'Zofia', 'Zenon', 'Zara', 'Adriana',
    'Agnieszka', 'Bogdan', 'Cecylia', 'Cyprian', 'Damian', 'Ewa', 'Franciszek', 'Grażyna', 'Helena', 'Iwona',
    'Jacek', 'Kornelia', 'Lucjan', 'Maja', 'Nikola', 'Oktawia', 'Piotr', 'Rafał', 'Sylwia', 'Tadeusz',
    'Urszula', 'Wacław', 'Zdzisława', 'Zygmunt', 'Aurelia', 'Bartłomiej', 'Celina', 'Dawid', 'Eliza', 'Felicja',
    'Filip', 'Greta', 'Hanna', 'Ida', 'Julian', 'Karina', 'Lidia', 'Marcin', 'Nina', 'Oscar',
    'Paulina', 'Rafał', 'Sara', 'Tomasz', 'Urszula', 'Władysław', 'Wiktoria', 'Xavier', 'Yasmin', 'Zbigniew',
    'Żaklina',
    // Dodaj kolejne 500 imion
    // ...
  ];
  const randomIndex = Math.floor(Math.random() * imiona.length);
  return imiona[randomIndex];
}

function generateRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const dev = () => {
  setInterval(() => {
    createNewThumbnails(generateRandomHexColor(), generateRandomWord(Math.floor(Math.random()*10)));
  }, 100);
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