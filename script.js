

let playerName;
let numbers = [];
let successes = 0;
let failures = 0;
let rounds = 0;
let attempts = 0;
let difficultyLevel;
const totalRounds = 20;

// Load sound effects
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

function startGame() {
    playerName = document.getElementById('player-name').value;
    difficultyLevel = parseInt(document.getElementById('difficulty-level').value);

    if (playerName) {
        document.getElementById('main-page').style.display = 'none';
        document.getElementById('game-page').style.display = 'block';
        showNumbers().style.color = 'lightgreen';
    } else {
        alert('Please enter your name.');
    }
}

function showNumbers() {
    numbers = generateNumbers(difficultyLevel);
    document.getElementById('number-display').innerText= numbers.join(' ');
    setTimeout(hideNumbers, 2500);
}

function hideNumbers() {
    document.getElementById('number-display').innerText = '';
}

function generateNumbers(count) {
    let nums = [];
    for (let i = 0; i < count; i++) {
        nums.push(Math.floor(Math.random() * 10));
    }
    return nums;
}

function submitNumbers() {
    let playerInput = document.getElementById('player-input').value.split('');
    attempts++; 
    document.getElementById('attempts-counter').innerText = `Attempts: ${attempts}`;

    if (playerInput.length === numbers.length && playerInput.every((val, index) => val == numbers[index])) {
        correctSound.play();
        alert('Correct!');
        successes++;
        if (successes % 3 === 0) {
            difficultyLevel++;
        }
    } else {
        incorrectSound.play();
        alert('Incorrect!');
        failures++;
    }
    rounds++;
    document.getElementById('player-input').value = '';
    if (rounds < totalRounds) {
        showNumbers();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    saveResults();
    displayResults();
}

function saveResults() {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({
        player: playerName,
        successes: successes,
        failures: failures,
        attempts: attempts,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('results', JSON.stringify(results));
}

function displayResults() {
    let resultTable = document.getElementById('result-table').getElementsByTagName('tbody')[0];
    let newRow = resultTable.insertRow();
    newRow.insertCell(0).innerText = playerName;
    newRow.insertCell(1).innerText = successes;
    newRow.insertCell(2).innerText = failures;
    newRow.insertCell(3).innerText = attempts;
   
}
