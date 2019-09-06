var bgColour = document.querySelector("h3");
var firstColour = document.querySelector('.first');
var secondColour = document.querySelector('.second');
var body = document.getElementById('gradient');
var button = document.querySelector("button");
var copy = document.getElementById('copy');

const displayGradient = () => bgColour.textContent = body.style.background + ';';

const colourAdjuster = () => {
    body.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;
    button.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;
    copy.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;

    displayGradient();
}

colourAdjuster();

const generateRandomNumber = (number) => Math.floor(Math.random() * number);

const valueToHex = (c) => {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = () => {
    let r = valueToHex(generateRandomNumber(257))
    let g = valueToHex(generateRandomNumber(257))
    let b = valueToHex(generateRandomNumber(257))
    return `#${r}${g}${b}`
}

//produces a random gradient colour after pressing on 'randomize' button
const randomizer = () => {
    secondColour.value = rgbToHex();
    firstColour.value = rgbToHex();
    colourAdjuster();
}

//adds to clipboard after pressing on 'copy' button
const copied = () => {
    let copiedText = document.createElement('input');
    document.body.appendChild(temp)
    copiedText.value = "background: " + bgColour.textContent;
    copiedText.select();
    document.execCommand('copy');
    copiedText.remove();
}

firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
button.addEventListener("click", randomizer);
copy.addEventListener('click', copied);