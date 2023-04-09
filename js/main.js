const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const erase = document.querySelector(".eraser");
const paint = document.querySelector(".paint");
const deletePage = document.querySelector(".del");
const colorChips = document.querySelectorAll(".color-chip");
const inputRange = document.querySelector(".rangeInput");
const boxElem = document.querySelector(".box");
const brush = document.querySelector(".brush");
const imageFile = document.getElementById("save");
canvas.width = 690;
canvas.height = 460;

let isPainting = false;
let isFillMode = false;

let colorPick = "black";
ctx.lineCap = "round";
ctx.lineWidth = inputRange.value;

//color
colorChips.forEach((color) => {
  color.addEventListener("click", function (event) {
    colorPick = event.target.dataset.color;
    ctx.fillStyle = colorPick;
    ctx.strokeStyle = colorPick;
  });
});

function mouseDown(event) {
  isPainting = true;
  ctx.fillStyle = colorPick;
}

//drawing
function onMoveMouse(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

function mouseUp() {
  isPainting = false;
  ctx.beginPath();
}
//brush
function brushTool() {
  ctx.strokeStyle = colorPick;
  boxDrawMode = false;
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
  boxDrawMode = false;
}
//deletePage
function deleteAllPage() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  isFillMode = false;
  boxDrawMode = false;
}

//lineWidth
function checkLineWidth(event) {
  ctx.lineWidth = event.target.value;
}
//add file
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(
      image,
      canvas.width * 0.1,
      canvas.height * 0.1,
      canvas.width * 0.8,
      canvas.height * 0.8
    );
    imageFile.value = null;
  };
}

imageFile.addEventListener("change", onFileChange);
brush.addEventListener("click", brushTool);
inputRange.addEventListener("change", checkLineWidth);
deletePage.addEventListener("click", deleteAllPage);
canvas.addEventListener("click", fillPage);
paint.addEventListener("click", handleFillMode);
erase.addEventListener("click", eraserBtn);
canvas.addEventListener("mousemove", onMoveMouse);
canvas.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
