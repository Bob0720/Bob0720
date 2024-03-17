document.addEventListener('DOMContentLoaded', (event) => {


    document.getElementById('startGame').addEventListener('click', function() {
        alert(`Welcome to the game. Here are the additional rules:
You can only start moving your plane if you roll a six on the dice. If you're playing with two dice, you must roll a total of twelve to start.
Each button can only be pressed once and cannot be reselected.
Players must follow the radio button path in sequential order.`);
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
    }); 
const backButton = document.createElement('button');
backButton.id = 'backButton';
backButton.textContent = 'Back to Start';
backButton.onclick = function() {

    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('welcomeScreen').style.display = 'block';
};


document.getElementById('gameScreen').appendChild(backButton);
document.getElementById('playerNamesForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const playerNumber = document.getElementById('playerNumber').value;
    let allNamesEntered = true;
    const playerNames = [];
    const uniqueNamesSet = new Set(); 

    for (let i = 1; i <= playerNumber; i++) {
        const playerNameInput = document.querySelector(`input[name="player${i}"]`);
        const name = playerNameInput.value.trim(); 

        
        if (name.length === 0) {
            alert(`Please enter a name for Player ${i}.`);
            playerNameInput.focus();
            allNamesEntered = false;
            break;
        }

        
        if (name.length > 20) {
            alert(`Please enter a name for Player ${i} with fewer than 20 characters.`);
            playerNameInput.focus();
            allNamesEntered = false;
            break;
        }

        
        if (uniqueNamesSet.has(name)) {
            alert(`Each player must have a unique name. "${name}" has already been entered.`);
            playerNameInput.focus();
            allNamesEntered = false;
            break;
        }

        
        playerNames.push(name);
        uniqueNamesSet.add(name);
    }


    if (allNamesEntered) {
        localStorage.setItem('playerNames', JSON.stringify(playerNames));
        alert('All player names saved successfully!');
        
            
	}
        if (allNamesEntered) {
            localStorage.setItem('playerNames', JSON.stringify(playerNames));
            alert('All player names saved successfully!');

            const playerImagesContainer = document.getElementById('playerImagesContainer');
            playerImagesContainer.innerHTML = '';

            playerNames.forEach((name, index) => {
                const img = document.createElement('img');
                img.src = `P${index + 1}.jpg`;
                img.alt = `Player ${index + 1}`;
                img.id = `playerImage${index + 1}`;
                img.className = 'player-image';
                playerImagesContainer.appendChild(img);

                const playerNameText = document.createElement('p');
                playerNameText.id = `player-name${index + 1}`;
                playerNameText.textContent = name;
                img.after(playerNameText);
            });

            generatePath(playerNumber);
        }
    });

function generatePath(playerNumber) {
    const pathContainer = document.getElementById('pathContainer');
    pathContainer.innerHTML = ''; 
    // Define the paths based on the player pairings you provided: 1-2, 2-4, 4-3, 3-1
    const paths = [
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 4, to: 3 },
        { from: 3, to: 1 }
    ];


    paths.forEach((path, index) => {
        const pathLength = 20; 
        const playerPathRow = document.createElement('div');
        playerPathRow.id = `pathRow-${path.from}-to-${path.to}`;

        for (let stepIndex = 0; stepIndex < pathLength; stepIndex++) {
            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.id = `path-${path.from}-to-${path.to}-step-${stepIndex}`;
            radioButton.name = `path-${path.from}-to-${path.to}`;
            radioButton.className = 'path-step';
            radioButton.value = stepIndex;

            playerPathRow.appendChild(radioButton);
        }

        pathContainer.appendChild(playerPathRow);
	setupPathButtonListeners();
    });
}
function setupPathButtonListeners() {
    const pathSteps = document.querySelectorAll('.path-step');
    pathSteps.forEach(button => {
        button.addEventListener('click', handlePathButtonClick);
    });
}


function handlePathButtonClick(event) {
    const button = event.target;
    button.disabled = true; // Disable the button after it is clicked
    const playerNumber = button.name.split('-')[1]; 
    incrementPlayerScore(playerNumber);
}


function incrementPlayerScore(playerNumber) {
    const scoreId = `player${playerNumber}Score`;
    const currentScore = parseInt(localStorage.getItem(scoreId) || '0');
    const newScore = currentScore + 1;
    localStorage.setItem(scoreId, newScore.toString());

    if (newScore === 20) {
        declareWinner(playerNumber);
        resetGame();
    }
}

function declareWinner(playerNumber) {
    alert(`Congratulations! Player ${playerNumber} has won the game!`);
}


function resetGame() {
    for (let i = 1; i <= 4; i++) {
        localStorage.removeItem(`player${i}Score`);
    }
    document.querySelectorAll('.path-step').forEach(button => {
        button.disabled = false;
        button.checked = false;
    });
}

    document.getElementById('playerNumber').addEventListener('change', function() {
        const playerNumber = this.value;
   	const playerNamesForm = document.getElementById('playerNamesForm');
        const playerNamesContainer = document.getElementById('playerNamesContainer');
        playerNamesContainer.innerHTML = ''; 
    	if (playerNumber) {
        playerNamesForm.style.display = 'block';
        for (let i = 1; i <= playerNumber; i++) {
            const inputContainer = document.createElement('div');
            const label = document.createElement('label');
            label.htmlFor = `player${i}`;
            label.textContent = `Player ${i} Name: `;
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `player${i}`;
            input.placeholder = `Player ${i} Name`;
            input.required = true; 
            inputContainer.appendChild(label);
            inputContainer.appendChild(input);
            playerNamesContainer.appendChild(inputContainer);
        }
     } else{
	playerNamesForm.style.display = 'none';
    }
}); 


    document.getElementById('rollDice').addEventListener('click', function() {
        const numDice = document.getElementById('diceNumber').value;
        let total = 0;
        let diceContainer = document.getElementById('diceContainer');
        diceContainer.innerHTML = ''; 
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            total += roll;
            let diceImg = document.createElement('img');
            diceImg.src = `${roll}.gif?${new Date().getTime()}`;
            diceImg.alt = `Dice showing ${roll}`;
            diceContainer.appendChild(diceImg);
        }

        let totalDisplay = document.createElement('p');
        totalDisplay.textContent = `Total: ${total}`;
        diceContainer.appendChild(totalDisplay);
    });

}); 

