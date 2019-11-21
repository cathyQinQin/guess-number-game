//console.log('The secret is loaded');
// teacher: kingston.fung.gmail.com
/*
    1. As the page loads, we need to 'wire up' the buttons
    2. Also, prepare a random number as the game starts
    3. As the user submits their answer:
        3a. We will take the input value, and compare it against our random number.
        3b. If the number matched, we will show the 'win' visuals
        3c. If it does not match, we will show the 'lose' visuals
        3d. If the user did not submit a number...
         3d-1: alert the user that the input is invalid.
        3e. keep count of their attempts
    4. If user clikc the restart button
        4a. clear off any win/lose visual indication
        4b. Reset the counter for number of attemps
        4c. Clear off previous inputs
    How to change the game visual?
        - we can point to the elements, and toggle the'hide' class
        - we also need to change the class between 'win' and 'lose'
*/
const generateRandomNumberwithinRange = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
const submitNumber = function(event){
    event.preventDefault();

    const numberTextInput = document.querySelector('#numberTextInput');
    const submitNumber = Number(numberTextInput.value);
    window.attempts = window.attempts + 1;
    // window.attempts += 1;
    // window.attempts ++;
    if (Number.isNaN(submitNumber)){
        window.alert('Please enter a number!');
        return;
    }
    
    if (submitNumber === window.randomNumber){
        console.log('YOU WIN!');
        updateUIWithStatus('win');
    } else{
        console.log('YOU LOSE!');
        updateUIWithStatus('lose');
    }
}
const restartGame = function(){
    const min = 1;
    const max = 5;
    window.randomNumber = generateRandomNumberwithinRange(min,max);
    window.attempts = 0;

    const inputLablel = document.querySelector('span.input-label');
    const labelText= inputLablel.textContent;
    console.log('label is '+ labelText);
    const newLable = labelText.replace('{x}',min).replace('{y}',max);
    inputLablel.textContent = newLable;

    const topBoarder = document.querySelector('.feedback-divider:first-child');
    const bottomBoarder = document.querySelector('.feedback-divider:last-child');
    const statusText = document.querySelector('.feedback-text .status');
    const attempsText = document.querySelector('.attempts');

    topBoarder.classList.add('hide');
    bottomBoarder.classList.add('hide');
    statusText.classList.add('hide');
    attempsText.classList.add('hide');
}

const updateUIWithStatus = function(status){
    // "status" will be either 'win' or 'lose'
    const topBoarder = document.querySelector('.feedback-divider:first-child');
    const bottomBoarder = document.querySelector('.feedback-divider:last-child');
    const statusText = document.querySelector('.feedback-text .status');
    const attempsText = document.querySelector('.attempts');
    let feedback;

    topBoarder.classList.remove('hide','win','lose');
    bottomBoarder.classList.remove('hide','win','lose');
    statusText.classList.remove('hide','win','lose');
    attempsText.classList.remove('hide');

    topBoarder.classList.add(status);
    bottomBoarder.classList.add(status);
    statusText.classList.add(status);
    // attempsText.textContent = attempsText.textContent.replace('{x}',window.attempts);
    const attempsSentence = `You tried ${window.attempts} time${window.attempts === 1 ? '':'s'}`;
    attempsText.textContent = attempsSentence;

    if (status === 'win'){
        feedback = 'You Win!';   
    } else if (status === 'lose'){
        feedback = 'You Lose!';
    }
    statusText.textContent = feedback;
}

document.querySelector('#taskForm').addEventListener('submit', submitNumber);
document.querySelector('#taskForm').addEventListener('reset', restartGame);
restartGame();