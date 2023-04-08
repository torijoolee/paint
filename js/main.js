const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const erase = document.querySelector(".eraser");
const paint = document.querySelector(".paint");
canvas.width = 610;
canvas.height = 460;

let isPsinting = false;
let isFillMode = false;

//drawing
function onMoveMouse(event) {
  if (isPsinting) {
    console.log(event.offsetX, event.offsetY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function mouseDown() {
  isPsinting = true;
}
function mouseUp() {
  isPsinting = false;
  ctx.beginPath();
}
//erase
function eraserBtn() {
  ctx.strokeStyle = "white";
}
//paint
function fillMode() {
  isFillMode = true;
}
function fillPage() {
  if (isFillMode) {
    ctx.fillRect(0, 0, 610, 460);
  }
}

canvas.addEventListener("click", fillPage);
paint.addEventListener("click", fillMode);
erase.addEventListener("click", eraserBtn);
canvas.addEventListener("mousemove", onMoveMouse);
canvas.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
