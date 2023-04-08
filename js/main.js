const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 610;
canvas.height = 460;

let isPsinting = false;

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
}
canvas.addEventListener("mousemove", onMoveMouse);
canvas.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
