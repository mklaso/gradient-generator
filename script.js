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

const displayGradient = () => {
  bgColour.textContent = "background: " + body.style.background + ";";
  buttonL.textContent = `${firstColour.value}`;
  buttonR.textContent = `${secondColour.value}`;
};

const gradientColour = () =>
  `linear-gradient(to right, ${firstColour.value}, ${secondColour.value})`;

const colourAdjuster = () => {
  body.style.background = gradientColour();
  randomButton.style.background = gradientColour();
  buttonL.style.background = firstColour.value;
  buttonR.style.background = secondColour.value;
  gradientCopy.style.background = gradientColour();
  leftCopy.style.background = firstColour.value;
  rightCopy.style.background = secondColour.value;
  displayGradient();
};

colourAdjuster();

const generateRandomNumber = (number) => Math.floor(Math.random() * number);

const valueToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (first, second, third) =>
  `#${valueToHex(first)}${valueToHex(second)}${valueToHex(third)}`;

const hexToRgb = (first, second, third) => `rgb(${r}, ${g}, ${b})`;

const displayConversion = (event) => {
  //setup regex
  //set default message of something like: [hex format: #000000 and rgb format: rgb(num1, num2, num3)]
  if (event.keyCode === 13) {
    //if (converter_input.value matches regex of rgb) {
    //conversion_result.textContent = parseRgbString(converter_input.value);
    //} else if (converter_input.value matches regex of hex) {
    //conversion_result.textContent = parseHexString(converter_input.value);
    //} else {
    //conversion_result.textContent = "invalid entry.";
    //}
  }
};

//direct hex to rgb conversion
const parseHexString = (str) => {
  //removes the # first character
  str = str.slice(1, str.length);
  var bigint = parseInt(str, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

//parses rgb string for easier conversion to hex
const parseRgbString = (str) => {
  let difference = str.length == 16 ? 2 : 1;
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
      str = str.slice(count + difference, str.length);
      count = 0;
      iteration++;
    }
    count++;
  }

  alert("array values:");
  alert(arr[0]);
  alert(arr[1]);
  alert(arr[2]);
  return rgbToHex(arr[0], arr[1], arr[2]);
};

const generateRandomRGB = () => {
  let r = generateRandomNumber(257);
  let g = generateRandomNumber(257);
  let b = generateRandomNumber(257);
  return rgbToHex(r, g, b);
};

//produces a random gradient colour after pressing on 'randomize' button
const randomizer = () => {
  secondColour.value = generateRandomRGB();
  firstColour.value = generateRandomRGB();
  colourAdjuster();
};

//adds to clipboard after pressing on 'copy' button - helper function
const copied = (element) => {
  let copiedText = document.createElement("input");
  document.body.appendChild(copiedText);
  if (element === "left") {
    copiedText.value = firstColour.value;
  } else if (element === "right") {
    copiedText.value = secondColour.value;
  } else {
    copiedText.value = bgColour.textContent;
  }
  copiedText.select();
  document.execCommand("copy");
  copiedText.remove();
};

//left colour hex
const copyLeft = () => {
  copied("left");
};

//right colour hex
const copyRight = () => {
  copied("right");
};

//left + right towards right linear-gradient property
const copyGradient = () => {
  copied("gradient");
};

const isValidInput = (event) => {
  let characterArray = event.target.value.toLowerCase().split("");
  //removes unwanted characters
  let filteredArray = characterArray.filter(
    (i) => i === "#" || (i >= 0 && i <= 9) || (i >= "a" && i <= "f")
  );
  //checks for proper hex code format
  if (
    event.target.value.length === 7 &&
    filteredArray.length === 7 &&
    filteredArray[0] === "#"
  ) {
    input1.value === event.target.value ? leftSide() : rightSide();
  }
};

//changes left n right side corresponding to the colours inputted
const LRSideColourChange = (event, colour, input) => {
  if (event.keyCode === 13) {
    colour.value = input.value;
    colourAdjuster();
    displayGradient();
  }
};

const leftSide = () => {
  LRSideColourChange(event, firstColour, input1);
};

const rightSide = () => {
  LRSideColourChange(event, secondColour, input2);
};

firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
randomButton.addEventListener("click", randomizer);
gradientCopy.addEventListener("click", copied);
leftCopy.addEventListener("click", copyLeft);
rightCopy.addEventListener("click", copyRight);
input1.addEventListener("keypress", isValidInput);
input2.addEventListener("keypress", isValidInput);
converter_input.addEventListener("keypress", displayConversion);
