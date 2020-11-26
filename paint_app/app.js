const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsFill");
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = '#2c2c2c';


canvas.width = 800;
canvas.height = 500;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = INITIAL_COLOR
ctx.strokeStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();

  }

}

// 개발자모드로 보면 속성에 ClientX,Y 와 OffsetX,Y가 있다.

// 클라이언트 XY는 전체 윈도우에서의 마우스 좌표이고,

// 오프셋XY는 캔버스 위에서의 좌표이다.

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleFillClick() {
  if (filling === true) {
    filling = false;
    fill.innerText = "Fill";
  } else {
    filling = true;
    fill.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  // const image = canvas.toDataURL("image/jpeg");
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
  canvas.addEventListener("click", handleCanvasClick)
  canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
  range.addEventListener("input", handleRangeChange)
}

if (fill) {
  fill.addEventListener("click", handleFillClick)
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}