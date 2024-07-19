document.addEventListener('DOMContentLoaded', () => {
  const buttonsData = [
    { className: 'a', audioId: '5-kg', src: '38-kg.mp3', img: '5-bell.jpg', key: 'KeyE'},
    { className: 'b', audioId: '9-kg', src: '16-kg.mp3', img: '4-bell.jpg', key: 'KeyR'},
    { className: 'c', audioId: '12-kg', src: '12-kg.mp3', img: '3-bell.jpg', key: 'KeyT'},
    { className: 'd', audioId: '16-kg', src: '9-kg.mp3', img: '2-bell.jpg', key: 'KeyY'},
    { className: 'e', audioId: '38-kg', src: '5-kg.mp3', img: '1-bell.jpg', key: 'KeyU'},
    { className: 'f', audioId: '60-kg', src: '60-kg.mp3', img: '6-bell.jpg', key: 'KeyW'},
    { className: 'g', audioId: '160-kg', src: '160-kg.mp3', img: '7-bell.jpg', key: 'KeyQ'}
  ];

  const wayToMp3 = 'src/assets/mp3/';
  const wayToJpg = 'src/assets/jpg/';
  const mainJpg = 'main.jpg';

  const smallBellsContainer = document.getElementById('small-bells-container');
  const bigBellsContainer = document.getElementById('big-bells-container');
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

    const container = (button.className === 'f' || button.className === 'g') ? 
      bigBellsContainer : smallBellsContainer;
        
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
  
    if(curImg) {
      curImg.src = wayToJpg + button.img;
      setTimeout(() => {
        curImg.src = wayToJpg + mainJpg;
      }, 1000);
    }
  }  
});
