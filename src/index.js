import './index.scss';
import RedHeadWalk from './assets/Female-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const CANVAS_W = 600;
const CANVAS_H = 600;
const SPRITE_W = 48;
const SPRITE_H = 48;
const clear = () => ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
const START_X = CANVAS_W / 2 - SPRITE_W / 2;
const START_Y = CANVAS_H / 2 - SPRITE_H / 2;
const DELTA_POSITION = 12;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let pY = 0;
let pX = 0;
let spriteY = 0;

const img = document.createElement('img');
img.src = RedHeadWalk;

function getKeyPress(e, isPressed) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      bottomPressed = isPressed;
      break;
    case 'Up':
    case 'ArrowUp':
      upPressed = isPressed;
      break;
    case 'Left':
    case 'ArrowLeft':
      leftPressed = isPressed;
      break;
    case 'Right':
    case 'ArrowRight':
      rightPressed = isPressed;
      break;
    default:
  }
}

function keyDownHandler(e) {
  getKeyPress(e, true);
}

function keyUpHandler(e) {
  getKeyPress(e, false);
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const move = (axis, position, spriteYLocal) => {
  if (axis === 'x') {
    pX += position;
  } else if (axis === 'y') {
    pY += position;
  }
  spriteY = spriteYLocal;
  cycle = (cycle + 1) % shots;
};

const moveX = (position, spriteYLocal) => move('x', position, spriteYLocal);
const moveY = (position, spriteYLocal) => move('y', position, spriteYLocal);

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed && pY + START_Y < CANVAS_H - SPRITE_H) {
      moveY(DELTA_POSITION, 0);
    }
    if (upPressed && pY + START_Y > 0) {
      moveY(-DELTA_POSITION, 144);
    }
    if (leftPressed && pX + START_X > 0) {
      moveX(-DELTA_POSITION, 48);
    }
    if (rightPressed && pX + START_X < CANVAS_W - SPRITE_W) {
      moveX(DELTA_POSITION, 96);
    }
    clear();
    ctx.drawImage(
      img,
      cycle * SPRITE_W,
      spriteY,
      SPRITE_W,
      SPRITE_H,
      START_X + pX,
      START_Y + pY,
      SPRITE_W,
      SPRITE_H,
    );
  }, 120);
});
