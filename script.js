var bgColour = document.querySelector("h3");
var firstColour = document.querySelector('.first');
var secondColour = document.querySelector('.second');
var body = document.getElementById('gradient');
var button = document.querySelector("button");

function displayGradient() {
    bgColour.textContent = body.style.background;
}

function colourAdjuster() {
    body.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;
    button.style.background = `linear-gradient(to left, ${secondColour.value}, ${firstColour.value})`;

    displayGradient();
}

colourAdjuster();

function generateRandomNumber(number) {
    return Math.floor(Math.random() * number);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex() {
    r = generateRandomNumber(257)
    g = generateRandomNumber(257)
    b = generateRandomNumber(257)
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function randomizer() {
    secondColour.value = rgbToHex();
    firstColour.value = rgbToHex();
    colourAdjuster();
    // console.log(randomizer);
}


firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
button.addEventListener("click", randomizer);