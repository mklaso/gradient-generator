var bgColour = document.querySelector("h3");
var firstColour = document.getElementById("first");
var secondColour = document.getElementById("second");
var body = document.getElementById("gradient");
var randomButton = document.getElementById("random");
var gradientCopy = document.getElementById("copyG");
var leftCopy = document.getElementById("copyL");
var rightCopy = document.getElementById("copyR");
var input1 = document.querySelector(".input1");
var input2 = document.querySelector(".input2");
var converter_input = document.querySelector(".converter_input");
var conversion_result = document.querySelector(".conversion_result");
var buttonL = document.getElementById("overlapL");
var buttonR = document.getElementById("overlapR");
const HEX_STATUS = "hex";
const RGB_STATUS = "rgb";
let orientation = "to right";

const displayGradient = () => {
  bgColour.textContent = "background: " + body.style.background + ";";
  buttonL.textContent = `${firstColour.value}`;
  buttonR.textContent = `${secondColour.value}`;
};

const gradientColour = (orientation) =>
  `linear-gradient(${orientation}, ${firstColour.value}, ${secondColour.value})`;

//sets and changes colours of background
const colourAdjuster = () => {
  body.style.background = gradientColour(orientation);
  randomButton.style.background = gradientColour(orientation);
  buttonL.style.background = firstColour.value;
  buttonR.style.background = secondColour.value;
  gradientCopy.style.background = gradientColour(orientation);
  leftCopy.style.background = firstColour.value;
  rightCopy.style.background = secondColour.value;
  displayGradient();
};

const changeOrientation = (event) => {
  if (!event.target.matches(".position_button")) return;

  if (event.target.matches(".tl")) {
    orientation = "to top left";
  } else if (event.target.matches(".tr")) {
    orientation = "to top right";
  } else if (event.target.matches(".tm")) {
    orientation = "to top";
  } else if (event.target.matches(".br")) {
    orientation = "to bottom right";
  } else if (event.target.matches(".bl")) {
    orientation = "to bottom left";
  } else if (event.target.matches(".bm")) {
    orientation = "to bottom";
  } else if (event.target.matches(".rs")) {
    orientation = "to right";
  } else if (event.target.matches(".ls")) {
    orientation = "to left";
  }
  gradientColour(orientation);
  colourAdjuster();
};

colourAdjuster();

const valueToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

//parses hex string for conversion to rgb
const parseHexString = (str) => {
  //removes the # first character
  str = str.slice(1, str.length);
  var bigint = parseInt(str, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return setToRgbOrHex(r, g, b, RGB_STATUS);
};

//parses rgb string for conversion to hex
const parseRgbString = (str) => {
  str = str.replace("(", "").replace(")", "").replace("rgb", "");
  str += ",";

  let sliced = "";
  let arr = [];
  let count = 0;
  let iteration = 0;

  while (iteration < 3) {
    if (str[count] === ",") {
      sliced = str.slice(0, count);
      arr.push(parseInt(sliced));
      str = str.slice(count + 1, str.length);
      count = 0;
      iteration++;
    }
    count++;
  }
  return setToRgbOrHex(arr[0], arr[1], arr[2], HEX_STATUS);
};

const setToRgbOrHex = (first, second, third, type) => {
  if (type.localeCompare(HEX_STATUS) === 0) {
    return `#${valueToHex(first)}${valueToHex(second)}${valueToHex(third)}`;
  } else if (type.localeCompare(RGB_STATUS) === 0) {
    return `rgb(${first}, ${second}, ${third})`;
  }
};

//checks if user input is of proper hex/rgb format
const validateInput = (input_type) => {
  //regex patterns
  const hex_pattern = /^#([a-f]|[0-9]){6}$/;
  const rgb_pattern = /^rgb[(](0*1?[0-9]{1,2}|0*2[0-4][0-9]|0*25[0-5]),(0*1?[0-9]{1,2}|0*2[0-4][0-9]|0*25[0-5]),(0*1?[0-9]{1,2}|0*2[0-4][0-9]|0*25[0-5])[)]$/;

  input_type = input_type.toLowerCase().replace(/ /g, "");

  if (input_type.match(rgb_pattern)) {
    return RGB_STATUS;
  } else if (input_type.match(hex_pattern)) {
    return HEX_STATUS;
  } else {
    return "invalid";
  }
};

const displayConversion = (event) => {
  if (event.keyCode === 13) {
    let input_result = converter_input.value;
    let status = validateInput(input_result);

    if (status.localeCompare(RGB_STATUS) === 0) {
      conversion_result.textContent = parseRgbString(input_result);
    } else if (status.localeCompare(HEX_STATUS) === 0) {
      conversion_result.textContent = parseHexString(input_result);
    } else {
      conversion_result.textContent =
        "HEX format - #000000 | RGB format - rgb(0, 0, 0)";
    }
  }
};

//helper for generating a random rgb val
const generateRandomNumber = (number) => Math.floor(Math.random() * number);

//creates a random colour in rgb
const generateRandomRGB = () => {
  let r = generateRandomNumber(257);
  let g = generateRandomNumber(257);
  let b = generateRandomNumber(257);
  return setToRgbOrHex(r, g, b, HEX_STATUS);
};

//produces a random gradient colour after pressing on 'randomize' button
const randomizer = () => {
  secondColour.value = generateRandomRGB();
  firstColour.value = generateRandomRGB();
  colourAdjuster();
};

const applyColourChange = (event) => {
  if (event.keyCode === 13) {
    let status = validateInput(event.target.value);
    if (status.localeCompare(RGB_STATUS) === 0) {
      event.target.value = parseRgbString(event.target.value);
      event.target === input1
        ? changeSideColour(firstColour, input1)
        : changeSideColour(secondColour, input2);
    } else if (status.localeCompare(HEX_STATUS) === 0) {
      event.target === input1
        ? changeSideColour(firstColour, input1)
        : changeSideColour(secondColour, input2);
    }
  }
};

//changes left or right side corresponding to the colours inputted
const changeSideColour = (colour, input) => {
  colour.value = input.value;
  colourAdjuster();
};

//adds to clipboard after pressing on one of the copy buttons.
const copied = (event) => {
  let copiedText = document.createElement("input");
  document.body.appendChild(copiedText);
  if (event.target === leftCopy) {
    copiedText.value = firstColour.value;
  } else if (event.target === rightCopy) {
    copiedText.value = secondColour.value;
  } else {
    copiedText.value = bgColour.textContent;
  }
  copiedText.select();
  document.execCommand("copy");
  copiedText.remove();
};

firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
randomButton.addEventListener("click", randomizer);
gradientCopy.addEventListener("click", copied);
leftCopy.addEventListener("click", copied);
rightCopy.addEventListener("click", copied);
input1.addEventListener("keypress", applyColourChange);
input2.addEventListener("keypress", applyColourChange);
converter_input.addEventListener("keypress", displayConversion);
document.addEventListener("click", changeOrientation);
