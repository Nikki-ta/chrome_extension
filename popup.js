document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedOption = document.querySelector('input[name="color"]:checked').value;
    document.getElementById('result').innerText = `You selected: ${selectedOption}`;
    // document.getElementById('pollForm').style.flexGrow=1;
});
let timer;
let isRunning = false;
let timeLeft = 1500; // 25 minutes in seconds
let initialTime = 1500;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const notificationSound = document.getElementById('notification-sound');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
shortBreakButton.addEventListener('click', startShortBreak);
longBreakButton.addEventListener('click', startLongBreak);

updateDisplay();

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                notificationSound.play(); // Play notification sound
                alert('Time\'s up!');
            }
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = initialTime;
    updateDisplay();
}

function startShortBreak() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 300; // 5 minutes in seconds
    initialTime = timeLeft;
    updateDisplay();
    startTimer();
}

function startLongBreak() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 900; // 15 minutes in seconds
    initialTime = timeLeft;
    updateDisplay();
    startTimer();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
// script.js
document.getElementById('stepsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const steps = parseInt(document.getElementById('steps').value, 10);
    
    // Save data to local storage
    let stepsData = JSON.parse(localStorage.getItem('stepsData')) || [];
    stepsData.push({ date, steps });
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
    
    // Update the display
    displaySteps();
    updateHealthSummary();
});

function displaySteps() {
    const stepsList = document.getElementById('stepsList');
    // Clear existing data
    stepsList.innerHTML = '';
    
    let stepsData = JSON.parse(localStorage.getItem('stepsData')) || [];
    
    stepsData.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date}: ${entry.steps} steps`;
        stepsList.appendChild(listItem);
    });
}

function updateHealthSummary() {
    const healthSummary = document.getElementById('healthSummary');
    let stepsData = JSON.parse(localStorage.getItem('stepsData')) || [];
    
    if (stepsData.length === 0) {
        // healthSummary.textContent = 'No data available.';
        return;
    }
    
    // Calculate total steps and average steps
    let totalSteps = 0;
    stepsData.forEach(entry => totalSteps += entry.steps);
    
    const averageSteps = totalSteps / stepsData.length;
    
    // Define health recommendations
    let recommendation = '';
    if (averageSteps < 5000) {
        recommendation = 'You are below the recommended daily steps. Try to be more active!';
    } else if (averageSteps < 10000) {
        recommendation = 'Good job! Keep up the good work!';
    } else {
        recommendation = 'Excellent! You are meeting the daily steps goal!';
    }
    
    healthSummary.innerHTML = `
        <p>Total Steps: ${totalSteps}</p>
        <p>Average Steps per Day: ${Math.round(averageSteps)}</p>
        <p>${recommendation}</p>
    `;
}

// Display stored data on page load
document.addEventListener('DOMContentLoaded', function() {
    displaySteps();
    updateHealthSummary();
});

document.addEventListener('DOMContentLoaded', function() {
    // Clear local storage
    localStorage.removeItem('stepsData');
    
    displaySteps();
    updateHealthSummary();
});
// script.js
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookTitle = document.getElementById('bookTitle').value;
    const quote = document.getElementById('quote').value;
    const source = document.getElementById('source').value;

    // Save data to local storage
    let booksData = JSON.parse(localStorage.getItem('booksData')) || [];
    booksData.push({ bookTitle, quote, source });
    localStorage.setItem('booksData', JSON.stringify(booksData));

    // Clear input fields
    document.getElementById('bookForm').reset();

    // Update the display
    displayBooks();
});

document.getElementById('clearData').addEventListener('click', function() {
    // Clear local storage
    localStorage.removeItem('booksData');
    
    // Update the display
    displayBooks();
});

function displayBooks() {
    const booksList = document.getElementById('books');
    booksList.innerHTML = '';

    let booksData = JSON.parse(localStorage.getItem('booksData')) || [];

    booksData.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${entry.bookTitle}</strong><br>
            <em>"${entry.quote}"</em><br>
            <a href="${entry.source}" target="_blank">Read more</a>
        `;
        booksList.appendChild(listItem);
    });
}

// Display stored data on page load
document.addEventListener('DOMContentLoaded', displayBooks);
document.addEventListener('DOMContentLoaded', function() {
    const pollCheckbox = document.getElementById('pollCheckbox');
    const pollContainer = document.querySelector('.poll-container');
    const maiDiv = document.querySelector('.mai');
  
    pollCheckbox.addEventListener('change', function() {
      if (pollCheckbox.checked) {
        // Hide all elements in the mai div except for the poll-container
        maiDiv.querySelectorAll('div').forEach(div => {
          if (div !== pollContainer) {
            div.classList.add('hidden');
          }
        });
        pollContainer.classList.remove('hidden');
      } else {
        // Show all elements in the mai div
        maiDiv.querySelectorAll('div').forEach(div => {
          div.classList.remove('hidden');
        });
      }
    });
  });
  