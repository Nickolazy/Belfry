document.addEventListener('DOMContentLoaded', () => {
  const buttonsData = [
    {className: 'a', audioId: '38-kg', src: '38-kg.mp3', img: '5-bell.jpg', key: 'KeyW'},
    {className: 'b', audioId: '16-kg', src: '16-kg.mp3', img: '4-bell.jpg', key: 'KeyE'},
    {className: 'c', audioId: '12-kg', src: '12-kg.mp3', img: '3-bell.jpg', key: 'KeyI'},
    {className: 'd', audioId: '9-kg', src: '9-kg.mp3', img: '2-bell.jpg', key: 'KeyO'},
    {className: 'e', audioId: '5-kg', src: '5-kg.mp3', img: '1-bell.jpg', key: 'KeyP'},
    {className: 'f', audioId: '60-kg', src: '60-kg.mp3', img: '6-bell.jpg', key: 'KeyQ'},
    {className: 'g', audioId: '160-kg', src: '160-kg.mp3', img: '7-bell.jpg', key: 'KeyN'},

    {className: 'x', audioId: 'x', src: '160-kg.mp3', img: '', key: ''},
    {className: 'y', audioId: 'y', src: '60-kg.mp3', img: '', key: ''},
    {className: 'z', audioId: 'z', src: '38-kg.mp3', img: '', key: ''}
  ];

  const wayToMp3 = 'src/assets/mp3/';
  const wayToJpg = 'src/assets/jpg/';
  const mainJpg = 'main.jpg';

  const smallBellsContainer = document.getElementById('small-bells-container');
  const bigBellsContainer = document.getElementById('big-bells-container');
  const easterBellsContainer = document.getElementById('easter-bells-container');
  const curImg = document.getElementById("img");

  const keyToButtonData = {};

  buttonsData.forEach(button => {

    const audioElement = document.createElement('audio');
    audioElement.id = button.audioId;
    audioElement.src = wayToMp3 + button.src;
    audioElement.preload = 'auto';
    document.body.appendChild(audioElement);

    const buttonElement = document.createElement('button');
    buttonElement.className = `bell ${button.className}`;
    buttonElement.style.width = button.width;
    buttonElement.style.height = button.height;

    buttonElement.addEventListener('click', () => {
      playBell(button);
    });
    
    keyToButtonData[button.key] = button;

    let container;
    if (button.className === 'f' || button.className === 'g') {
      container = bigBellsContainer;
    } else if (button.className === 'x' || button.className === 'y' || button.className === 'z') {
      container = easterBellsContainer;
    } else {
      container = smallBellsContainer;
    }
    container.appendChild(buttonElement);
  });

  document.addEventListener('keydown', (event) => {
    const button = keyToButtonData[event.code];
    if (button) {
      playBell(button);
    }
  });

  function playBell(button) {
    const audio = document.getElementById(button.audioId);
    if(audio) {
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
      });
    }

    if (button.className !== 'x' && button.className !== 'y' && button.className !== 'z') {
      if (curImg) {
        curImg.src = wayToJpg + button.img;
        setTimeout(() => {
          curImg.src = wayToJpg + mainJpg;
        }, 1000);
      }
    }
  }  

  const toggleButton = document.getElementById('toggleButton');
  const frequencyRadios = document.querySelectorAll('input[name="frequency"]');
  let intervalId = null;
  let isPlaying = false;

  function changeText() {
    const selectedFrequency = document.querySelector('input[name="frequency"]:checked').value;
    const text = document.querySelector('.metronome__text');
    if(selectedFrequency === '43') {
      text.textContent = 'Ростовские звоны';
    } else if(selectedFrequency === '52') {
      text.textContent = 'Троице-Сергиева Лавра';
    } else {
      text.textContent = '';
    }
  }

  function startMetronome() {
    const selectedFrequency = document.querySelector('input[name="frequency"]:checked').value;
    const bpm = parseInt(selectedFrequency, 10);
    const interval = 60000 / bpm;
    const selectedButton = keyToButtonData['KeyN'];

    if(selectedButton) {
      intervalId = setInterval(() => {
        playBell(selectedButton);
      }, interval);
      toggleButton.textContent = 'ВКЛ';
    }

    changeText();
  }

  function stopMetronome() {
    clearInterval(intervalId);
    intervalId = null;
    toggleButton.textContent = 'ВЫКЛ';
  }

  toggleButton.addEventListener('click', () => {
    if(isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
    isPlaying = !isPlaying;
  });

  frequencyRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if(isPlaying) {
        stopMetronome();
        startMetronome();
      } else {
        changeText();
      }
    });
  });
});
