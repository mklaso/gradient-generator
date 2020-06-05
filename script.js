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

const valueToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

//direct hex to rgb conversion
const parseHexString = (str) => {
  //removes the # first character
  str = str.slice(1, str.length);
  var bigint = parseInt(str, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return setToRgbOrHex(r, g, b, "rgb");
};

//parses rgb string for easier conversion to hex
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
  return setToRgbOrHex(arr[0], arr[1], arr[2], "hex");
};

const setToRgbOrHex = (first, second, third, type) => {
  if (type.localeCompare("hex") === 0) {
    return `#${valueToHex(first)}${valueToHex(second)}${valueToHex(third)}`;
  } else if (type.localeCompare("rgb") === 0) {
    return `rgb(${first}, ${second}, ${third})`;
  }
};

const validateInput = (input_type) => {
  //regex patterns
  const hex_pattern = /^#([a-f]|[0-9]){6}$/;
  const rgb_pattern = /^rgb[(](0*1?[0-9]{1,2}|0*2[0-4][0-9]|0*25[0-5]),(0*1?[0-9]{1,2}|0*2[0-4][0-9]|0*25[0-5]),(0*1?[0-9]{1,2}|0*2[0-4][0-9]|0*25[0-5])[)]$/;

  input_type = input_type.toLowerCase().replace(/ /g, "");

  if (input_type.match(rgb_pattern)) {
    return "rgb";
  } else if (input_type.match(hex_pattern)) {
    return "hex";
  } else {
    return "invalid";
  }
};

const displayConversion = (event) => {
  if (event.keyCode === 13) {
    let input_result = converter_input.value;
    let status = validateInput(input_result);

    if (status.localeCompare("rgb") === 0) {
      conversion_result.textContent = parseRgbString(input_result);
    } else if (status.localeCompare("hex") === 0) {
      conversion_result.textContent = parseHexString(input_result);
    } else {
      conversion_result.textContent =
        "HEX format - #000000 | RGB format - rgb(0, 0, 0)";
    }
  }
};

const generateRandomNumber = (number) => Math.floor(Math.random() * number);

const generateRandomRGB = () => {
  let r = generateRandomNumber(257);
  let g = generateRandomNumber(257);
  let b = generateRandomNumber(257);
  return setToRgbOrHex(r, g, b, "hex");
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
    if (status.localeCompare("rgb") === 0) {
      event.target.value = parseRgbString(event.target.value);
      event.target === input1 ? leftSide() : rightSide();
    } else if (status.localeCompare("hex") === 0) {
      event.target === input1 ? leftSide() : rightSide();
    }
  }
};

//changes left n right side corresponding to the colours inputted
const LRSideColourChange = (colour, input) => {
  colour.value = input.value;
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

const copyLeft = () => copied("left");
const copyRight = () => copied("right");
const copyGradient = () => copied("gradient");
const leftSide = () => LRSideColourChange(firstColour, input1);
const rightSide = () => LRSideColourChange(secondColour, input2);

firstColour.addEventListener("input", colourAdjuster);
secondColour.addEventListener("input", colourAdjuster);
randomButton.addEventListener("click", randomizer);
gradientCopy.addEventListener("click", copied);
leftCopy.addEventListener("click", copyLeft);
rightCopy.addEventListener("click", copyRight);
input1.addEventListener("keypress", applyColourChange);
input2.addEventListener("keypress", applyColourChange);
converter_input.addEventListener("keypress", displayConversion);
