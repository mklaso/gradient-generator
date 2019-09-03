var bgColour = document.querySelector("h3");
var firstColour = document.querySelector('.first');
var secondColour = document.querySelector('.second');
var body = document.getElementById('gradient');
var button = document.querySelector("button");

const displayGradient = () => bgColour.textContent = body.style.background;

const colourAdjuster = () => {
    body.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;
    button.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;

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

const randomizer = () => {
    secondColour.value = rgbToHex();
    firstColour.value = rgbToHex();
    colourAdjuster();
    // console.log(randomizer);
}

firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
button.addEventListener("click", randomizer);