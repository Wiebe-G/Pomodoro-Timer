const startKnop = document.getElementById('startKnop');
const stopKnop = document.getElementById('stopKnop');
const timerPlek = document.getElementById('timer');
const statusP = document.getElementById('status');
const Focus = document.getElementById('focus');
const Pauze = document.getElementById('pauze');
let intervalID;
let isRunning = false;


startKnop.addEventListener('click', () => {
    if (isRunning) return; // voorkomen van functie meerdere keren uitvoeren
    isRunning = true;
    startTimer();
})

stopKnop.addEventListener('click', () => {
    isRunning = false;
    stopTimer();
})

let timerSeconden;

// TODO:
// maak het zodat het de tijd niet vergeet
const pasTimerAanInput = document.getElementById('focus-tijd');
const pasTimerAanKnop = document.getElementById('focus-tijd-knop');

pasTimerAanKnop.addEventListener('click', () => {
    let nieuweTimerTijd = pasTimerAanInput.value * 60;
    if (!typeof nieuweTimerTijd == 'number') {
        console.log('oh oh, niet een int');
    };
    timerSeconden = nieuweTimerTijd;
    console.log(`Nieuwe focustijd is: ${timerSeconden}`);
    updateTimer(timerSeconden);
    return (timerSeconden);
});

function startTimer() {
    intervalID = setInterval(updateTimer, 1000);
};

function stopTimer() {
    clearInterval(intervalID);
};

function berekenTimerSeconden() {
    if (Focus.classList.contains('fatHeader')) {
        timerSeconden = 25 * 60;
    } else {
        timerSeconden = 300;
    };
    updateTimer(timerSeconden);
};

berekenTimerSeconden();

function updateTimer() {
    // bereken minuten, seconden, en tijd formatteren
    const minuten = Math.floor(timerSeconden / 60);
    const seconden = timerSeconden % 60;
    // minder dan 10 seconden, voeg een nul toe aan het begin
    const geformateerdeTijd = `${minuten}:${seconden < 10 ? '0' : ''}${seconden}`;
    timerPlek.textContent = geformateerdeTijd;
    // 1 seconde minder
    timerSeconden--;
    if (timerSeconden < 0) {
        stopTimer();
        statusP.textContent = "Timer is voorbij";
        Focus.classList.toggle('fatHeader');
        Pauze.classList.toggle('fatHeader');
        berekenTimerSeconden()
        isRunning = false;
        let ping = new Audio('./Sounds/ping.mp3');
        ping.play();
    };
};

Focus.addEventListener('click', () => {
    Pauze.classList.remove('fatHeader');
    Focus.classList.add('fatHeader');
    berekenTimerSeconden();
});

Pauze.addEventListener('click', () => {
    Focus.classList.remove('fatHeader');
    Pauze.classList.add('fatHeader');
    berekenTimerSeconden();
});

