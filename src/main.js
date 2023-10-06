import state from './state.js';
import { kitchenTimer } from './sounds.js';
import { forest } from './sounds.js';
import { rain } from './sounds.js';
import { fire } from './sounds.js';
import { coffee } from './sounds.js';

const getMin = document.getElementById('minutes');
const getSec = document.getElementById('seconds');

const controlsStart = document.querySelector('#toggleRunning');
const controlsPause = document.querySelector('#pause');
const controlsStop = document.querySelector('#stop');
const increaseMin = document.querySelector('#increase');
const decreaseMin = document.querySelector('#decrease');

const getCoffee = document.querySelector('.coffee');
const getForest = document.querySelector('.forest');
const getRain = document.querySelector('.rain');
const getFire = document.querySelector('.fire');

let minutes = Number(getMin.textContent);
let seconds = Number(getSec.textContent);

controlsStart.addEventListener('click', toggleRunning);
controlsPause.addEventListener('click', toggleRunning);
controlsStop.addEventListener('click', reset);
increaseMin.addEventListener('click', moreMinutes);
decreaseMin.addEventListener('click', minusMinutes);

function removeAllBackgrounds() {
  getCoffee.classList.remove('selectedsSound');
  getRain.classList.remove('selectedsSound');
  getForest.classList.remove('selectedsSound');
  getFire.classList.remove('selectedsSound');
}

getCoffee.addEventListener('click', coffeeSound);
getCoffee.addEventListener('click', () => {
    if (!state.isMutedCoffee == true){

      removeAllBackgrounds();
      getCoffee.classList.add('selectedsSound');
    } else {

      getCoffee.classList.remove('selectedsSound');
    }
});
getRain.addEventListener('click', rainSound);
getRain.addEventListener('click', () => {
  if (!state.isMutedRain == true){
    removeAllBackgrounds();
    getRain.classList.add('selectedsSound');
  } else {
    getRain.classList.remove('selectedsSound');
  }
});
getFire.addEventListener('click', fireSound);
getFire.addEventListener('click', () => {
  if (!state.isMutedFire == true){
    removeAllBackgrounds();
    getFire.classList.add('selectedsSound');
  } else {
    getFire.classList.remove('selectedsSound');
  }
});
getForest.addEventListener('click', forestSound);
getForest.addEventListener('click', () => {
  if (!state.isMutedForest == true){
    removeAllBackgrounds();
    getForest.classList.add('selectedsSound');
  } else {
    getForest.classList.remove('selectedsSound');
  }
});

function pauseAllSounds() {
  state.isMutedRain = true;
  state.isMutedFire = true;
  state.isMutedForest = true;
  state.isMutedCoffee = true;
  coffee.pause();
  rain.pause();
  fire.pause();
  forest.pause();
}

function coffeeSound(){
  if (state.isMutedCoffee === true) {
    pauseAllSounds()
    state.isMutedCoffee = false;
    coffee.play();
  } else {
    state.isMutedCoffee = true;
    pauseAllSounds();
    removeAllBackgrounds();
  }
}
function rainSound(){
  if (state.isMutedRain === true) {
    pauseAllSounds();
    state.isMutedRain = false;
    rain.play();
  } else {
    state.isMutedRain = true;
    pauseAllSounds();
    removeAllBackgrounds();
  }
}
function fireSound(){
  if (state.isMutedFire === true) {
    pauseAllSounds()
    state.isMutedFire = false;
    fire.play();
  } else {
    state.isMutedFire = true;
    pauseAllSounds();
    removeAllBackgrounds();
  }
}
function forestSound(){
  if (state.isMutedForest === true) {
    pauseAllSounds()
    state.isMutedForest = false;
    forest.play();
  } else {
    state.isMutedForest = true;
    pauseAllSounds();
    removeAllBackgrounds();
  }
}


function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle('running');

  if (!state.isRunning) {
    document.querySelector('.pause').classList.add('hide');
    document.querySelector('.play').classList.remove('hide');
    return;
  }

  document.querySelector('.play').classList.add('hide');
  document.querySelector('.pause').classList.remove('hide');

  countDown();
}

function reset() {
  state.isRunning = false;
  document.documentElement.classList.remove('running');

  document.querySelector('.pause').classList.add('hide');
  document.querySelector('.play').classList.remove('hide');
  
  if (state.minutes < 5) {
    state.minutes = 5;
    minutes = state.minutes;
    seconds = 0;
  } else {
    minutes = state.minutes;
    seconds = 0;
  }

  updateDisplay();
}

function countDown() {

    clearTimeout(state.countDownId);

    if (!state.isRunning) {
      return;
    }

    console.log(minutes, seconds);

    seconds--;

    if (seconds < 0){
        seconds = 59;
        minutes--;
    }

    if (minutes < 0){
        kitchenTimer.play();
        alert('Relógio zerado.');
        reset();
        return;
    }

    updateDisplay(minutes, seconds)

    state.countDownId = setTimeout(() => countDown(), 1000);
}

function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes;
  seconds = seconds ?? state.seconds;

  getMin.textContent = String(minutes).padStart(2, "0");
  getSec.textContent = String(seconds).padStart(2, "0");
}

function moreMinutes() {
  if (state.isRunning) {
    alert('Pare o cronômetro para adicionar minutos');
  } else {
    minutes = minutes + 5;
    state.minutes = minutes;
    console.log(minutes);
    updateDisplay(minutes, seconds);
  }
}

function minusMinutes() {

  if (state.isRunning) {
    alert('Pare o cronômetro para remover minutos.');
  } else {
    if (minutes <= 5){
      state.minutes = 5;
      state.seconds = 0;
      alert('5 minutos é o mínimo.');
      updateDisplay(minutes, seconds);
    } else {
      minutes = minutes - 5;
      state.minutes = minutes;
      updateDisplay(minutes, seconds);
    }
  }
}