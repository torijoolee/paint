const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const erase = document.querySelector(".eraser");
const paint = document.querySelector(".paint");
const deletePage = document.querySelector(".del");
const colorChips = document.querySelectorAll(".color-chip");
const inputRange = document.querySelector(".rangeInput");
const boxElem = document.querySelector(".box");
const brush = document.querySelector(".brush");
canvas.width = 610;
canvas.height = 460;
ctx.lineCap = "round";

let isPainting = false;
let isFillMode = false;
let boxDrawMode = false;

let rectX = 0;
let rectY = 0;
let canvasX = canvas.width;
let canvasY = canvas.height;

//color
colorChips.forEach((color) => {
  color.addEventListener("click", function (event) {
    console.log(event.target.dataset.color);
    const colorPick = event.target.dataset.color;
    ctx.fillStyle = colorPick;
    ctx.strokeStyle = colorPick;
  });
});

function mouseDown(event) {
  isPainting = true;
  rectX = event.offsetX;
  rectY = event.offsetY;
}

//drawing
function onMoveMouse(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  if (isPainting && boxDrawMode) {
    const x = event.offsetX;
    const y = event.offsetY;
    const width = x - rectX;
    const height = y - rectY;
    ctx.moveTo(x, y);
    ctx.fillRect(rectX, rectY, width, height);
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function brushTool() {
  boxDrawMode = false;
  isPainting = false;
}

function mouseUp() {
  isPainting = false;
  ctx.beginPath();
}

//paint
function handleFillMode() {
  if (isFillMode) {
    isFillMode = false;
  } else {
    isFillMode = true;
  }
}
function fillPage() {
  if (isFillMode) {
    ctx.fillRect(0, 0, 610, 460);
  }
}
//erase
function eraserBtn() {
  ctx.strokeStyle = "white";
  isFillMode = false;
}
//deletePage
function deleteAllPage() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 610, 460);
}

//lineWidth
function checkLineWidth(event) {
  ctx.lineWidth = event.target.value;
}
// box
function boxMode() {
  boxDrawMode = true;
  canvas.style.cursor = "crosshair";
}

brush.addEventListener("click", brushTool);
boxElem.addEventListener("click", boxMode);
inputRange.addEventListener("change", checkLineWidth);
deletePage.addEventListener("click", deleteAllPage);
canvas.addEventListener("click", fillPage);
paint.addEventListener("click", handleFillMode);
erase.addEventListener("click", eraserBtn);
canvas.addEventListener("mousemove", onMoveMouse);
canvas.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
