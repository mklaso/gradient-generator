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

//direct hex to rgb conversion
const hexToRgb = (hex) => {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return [r, g, b].join();
};

const displayConversion = (event) => {
  if (event.keyCode === 13) {
    conversion_result.textContent = parseRgbString(converter_input.value);
    //conversion_result.textContent = converter_input.value;
  }
};

//builds the hex string given r,g,b values
const displayhexToRgb = () => {};

//parses rgb string for easier conversion to hex
const parseRgbString = (str) => {
  //maybe use regex here, way too many edge cases otherwise - or dont account for most cases since this isn't a serious project.
  //edge case for invalid rgb
  if (!(str[0] === "r" && str[1] === "g" && str[2] === "b")) {
    return "invalid";
  }

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

  //testing purposes
  console.log("Array looks like: [" + arr + "]");
  for (i = 0; i < arr.length; i++) {
    console.log("Array element at index " + i + " is " + arr[i] + ".");
  }
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
