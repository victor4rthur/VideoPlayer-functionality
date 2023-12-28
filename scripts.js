// Get the elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressbar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenButton = document.querySelector('.screen__button'); // Substitua 'screen__button' pela classe real

/*Build the fuctions*/

// Turn on or off the paused state of a video
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//Changes the play button
function updateButton() {
  let icon;
  if (this.paused) {
    icon = "❚❚";
  } else {
    icon = "►";
  }
  
  toggle.textContent = icon;
}

//Skip the duration of the video 
function skip (){  
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}
function skipF (){  
  video.currentTime = video.currentTime + 10;
}
function skipB (){  
  video.currentTime = video.currentTime - 10;
}

// Changes the speed of the video
function handleRangeUpdate(){
  video[this.name] = this.value; 
}

//Changes the duration percentage bar 
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressbar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//Activate the fullscreen 
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Se não estiver em tela cheia, solicita o modo de tela cheia.
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari e Opera
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // Internet Explorer/Edge
      video.msRequestFullscreen();
    }
  } else {
    // Se já estiver em tela cheia, sai do modo de tela cheia.
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

/*Hook up the event listeners*/

// If the user clicks on the video will play/pause
video.addEventListener("click", togglePlay);

//Makes the Play button work
toggle.addEventListener("click", togglePlay);

// Waits for a click on the spacebar button
document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === 32) {
    event.preventDefault();
    togglePlay();
  }
});

// Waits for a click on the arrow right button
document.addEventListener("keydown", (event => {
  if (event.code === "ArrowRight" || event.key === 39){
    event.preventDefault();
    skipF();
  }
}));

// Waits for a click on the arrow left button
document.addEventListener("keydown", (event => {
  if (event.code === "ArrowLeft" || event.key === 37){
    event.preventDefault();
    skipB();
  }
}));

//Change the play button during when pause is hit
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

//Skip the duration of the video with the button on screen
skipButtons.forEach(button => button.addEventListener('click', skip));

//Waits for a change in the volume or speed
ranges.forEach (range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach (range => range.addEventListener('mousemove', handleRangeUpdate));

//changes the durantion
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Adiciona um ouvinte de eventos para o clique no botão de tela cheia.
fullscreenButton.addEventListener('click', toggleFullscreen);

