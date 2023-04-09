const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const erase = document.querySelector(".eraser");
const paint = document.querySelector(".paint");
const deletePage = document.querySelector(".del");
const colorChips = document.querySelectorAll(".color-chip");
const inputRange = document.querySelector(".rangeInput");
canvas.width = 610;
canvas.height = 460;

let isPainting = false;
let isFillMode = false;
ctx.lineCap = "round";

colorChips.forEach((color) => {
  color.addEventListener("click", function (event) {
    console.log(event.target.dataset.color);
    const colorPick = event.target.dataset.color;
    ctx.fillStyle = colorPick;
    ctx.strokeStyle = colorPick;
  });
});

//drawing
function onMoveMouse(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function mouseDown() {
  isPainting = true;
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

function checkLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

inputRange.addEventListener("change", checkLineWidth);
deletePage.addEventListener("click", deleteAllPage);
canvas.addEventListener("click", fillPage);
paint.addEventListener("click", handleFillMode);
erase.addEventListener("click", eraserBtn);
canvas.addEventListener("mousemove", onMoveMouse);
canvas.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
