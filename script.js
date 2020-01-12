var bgColour = document.querySelector("h3");
var firstColour = document.querySelector('.first');
var secondColour = document.querySelector('.second');
var body = document.getElementById('gradient');
var button = document.querySelector("button");
var copy = document.getElementById('copy');
var input1 = document.querySelector('.input1');
var input2 = document.querySelector('.input2');

const displayGradient = () => bgColour.textContent = 'background: ' + body.style.background + ';';

const gradientColour = () => `linear-gradient(to right, ${firstColour.value}, ${secondColour.value})`;

const colourAdjuster = () => {
    body.style.background = gradientColour()
    button.style.background = gradientColour()
    copy.style.background = gradientColour()

    displayGradient();
}

colourAdjuster();

const generateRandomNumber = (number) => Math.floor(Math.random() * number);

const valueToHex = (c) => {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (first, second, third) => `#${valueToHex(first)}${valueToHex(second)}${valueToHex(third)}`;

const generateRandomRGB = () => {
    let r = generateRandomNumber(257);
    let g = generateRandomNumber(257);
    let b = generateRandomNumber(257);
    return rgbToHex(r, g, b);
}

//produces a random gradient colour after pressing on 'randomize' button
const randomizer = () => {
    secondColour.value = generateRandomRGB();
    firstColour.value = generateRandomRGB();
    colourAdjuster();
}

//adds to clipboard after pressing on 'copy' button
const copied = () => {
    let copiedText = document.createElement('input');
    document.body.appendChild(copiedText);
    copiedText.value = bgColour.textContent;
    copiedText.select();
    document.execCommand('copy');
    copiedText.remove();
}

const isValidInput = (event) => {
    let characterArray = event.target.value.toLowerCase().split('');
    //removes unwanted characters
    let filteredArray = characterArray.filter(i => ((i === '#') || (i >= 0 && i <= 9) || ((i >= 'a' && i <= 'f'))));
    //hex code
    if (event.target.value.length === 7 && filteredArray.length === 7 && filteredArray[0] === '#') {
        (input1.value === event.target.value) ? leftSide() : rightSide()
    }
}

const LRSideColourChange = (event, colour, input) => {
    if (event.keyCode === 13) {
        colour.value = input.value;
        colourAdjuster();
        displayGradient();
    }
}

const leftSide = () => {
    LRSideColourChange(event, firstColour, input1)
}

const rightSide = () => {
    LRSideColourChange(event, secondColour, input2)
}

firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
button.addEventListener("click", randomizer);
copy.addEventListener('click', copied);
input1.addEventListener('keypress', isValidInput);
input2.addEventListener('keypress', isValidInput);