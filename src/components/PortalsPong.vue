<template>
  <canvas ref="canvas" id="game" :width="width" :height="height">
    <p>Your browser does not support HTML5!</p>
  </canvas>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const props = defineProps<{ width: number; height: number }>(); // w 512 h 256

enum GAME_STATE {
  MENU = 'MENU',
  OVER = 'OVER',
  PAUSED = 'PAUSED',
  PLAY = 'PLAY',
}

const state = reactive({
  ctx: {} as CanvasRenderingContext2D,
  machine: GAME_STATE.MENU,
  sets: 15,
  score: { p1: 0, p2: 0 },
  speed: 2,
  winner: '',
  upArrowPressed: false,
  downArrowPressed: false,
});

const canvas = ref();
onMounted(() => {
  state.ctx = canvas.value.getContext('2d');
  state.ctx.fillStyle = 'white';
  gameLoop();
});

// TODO: get sounds
// const hitSfx = new Audio('/src/assets/sounds/hitSfx.wav');
// const wallHitSfx = new Audio('/src/assets/sounds/wallHitSfx.wav');
// const scoreSfx = new Audio('/src/assets/sounds/scoreSfx.wav');
// const teleportSfx = new Audio('/src/assets/sounds/teleportSfx.wav');
// const portalSfx = new Audio('/src/assets/sounds/portalSfx.wav');

enum KB {
  UP_ARROW = 87, // 38,
  DOWN_ARROW = 83, // 40,
  ESCAPE = 27,
}
function handleKeyDown(e: KeyboardEvent) {
  //e.preventDefault();
  switch (e.keyCode) {
    case KB.UP_ARROW:
      state.upArrowPressed = true;
      break;
    case KB.DOWN_ARROW:
      state.downArrowPressed = true;
      break;
    case KB.ESCAPE:
      state.machine = GAME_STATE.MENU;
      break;
  }
}
function handleKeyUp(e: KeyboardEvent) {
  //e.preventDefault();
  switch (e.keyCode) {
    case KB.UP_ARROW:
      state.upArrowPressed = false;
      break;
    case KB.DOWN_ARROW:
      state.downArrowPressed = false;
      break;
  }
}
onMounted(() => {
  document.addEventListener('keydown', (e) => handleKeyDown(e));
  document.addEventListener('keyup', (e) => handleKeyUp(e));
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
});

enum Color {
  BLUE = '#0065ff',
  ORANGE = '#ff5d00',
  WHITE = '#fff',
}

class Hud {
  x = 0;
  y = 0;
  score = 0;

  constructor(x: number, y: number, score: number) {
    this.x = x;
    this.y = y;
    this.score = score;
  }

  draw() {
    //state.ctx.fillStyle = Color.WHITE;
    //state.ctx.font = "20px sans-serif";
    state.ctx.fillText(this.score.toString(), this.x, this.y);
  }

  updateScore(score: number) {
    this.score = score;
  }
}

interface iBall {
  color?: Color;
  x: number;
  y: number;
  radius: number;
  speed: number;
}

class Ball {
  x = 0;
  y = 0;
  radius = 0;
  dx = Math.random() - 0.5;
  dy = Math.random() - 0.5;

  constructor(ball: iBall) {
    this.x = ball.x;
    this.y = ball.y;
    this.radius = ball.radius;
    this.dx *= ball.speed;
    this.dy *= ball.speed;
  }

  teleport(portal: Portal) {
    this.x = portal.x;
    this.y = portal.y;
  }

  draw() {
    state.ctx.beginPath();
    state.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    state.ctx.closePath();
    state.ctx.fill();
  }

  update() {
    if (this.x + this.radius > props.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > props.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

interface iPaddle {
  color?: Color;
  x: number;
  y: number;
  height: number;
  width: number;
  speed: number;
  score: number;
}

class Paddle {
  id = '';
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  dy = 0;
  score = 0;
  isComputer = false;
  color = Color.WHITE;

  constructor(paddel: iPaddle) {
    this.id = paddel.x < props.width / 2 ? 'P1' : 'P2';
    this.x = paddel.x;
    this.y = paddel.y;
    this.width = paddel.width;
    this.height = paddel.height;
    this.dy = paddel.speed;
    this.score = paddel.score;
    this.isComputer = false;
    this.color = paddel.color || Color.WHITE;
  }

  reset() {
    this.score = 0;
  }

  updateScore(value = 1) {
    this.score += value;
  }

  setComputer() {
    this.isComputer = true;
  }

  draw() {
    state.ctx.fillStyle = this.color;
    state.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ball?: Ball) {
    if (this.isComputer) {
      if (ball) {
        // && isTurn
        this.y += (ball.y - (this.y + this.height / 2)) * 0.088;
        this.y = clamp(this.y, 0, props.height - this.height);
      }
    } else {
      if (state.upArrowPressed) {
        this.y -= this.dy;
      } else if (state.downArrowPressed) {
        this.y += this.dy;
      }
      this.y = clamp(this.y, 0, props.height - this.height);
    }

    this.draw();
  }
}

class Portal {
  x = 0;
  y = 0;
  color = Color.BLUE;
  w = 5;
  h = 10;
  isCollidable = true;
  offset = 0;
  bounds = 50;

  constructor(x: number, y: number, color: Color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  toggleCollision() {
    setTimeout(() => {
      this.isCollidable = !this.isCollidable;
    }, 1000);
  }

  port() {
    this.x = random(this.bounds, props.width - this.bounds);
    this.y = random(this.bounds, props.height - this.bounds);

    // begin random port
    const ms = random(15, 30) * 1000;
    setTimeout(() => {
      this.port();
    }, ms);
  }

  draw() {
    state.ctx.save();
    state.ctx.translate(0.5, 0.5); // anti aliasing fix
    state.ctx.beginPath();
    state.ctx.setLineDash([2]);
    state.ctx.lineDashOffset = -this.offset;
    //state.ctx.arc(this.x, this.y, height-3, Math.PI*2, false);
    //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    state.ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, Math.PI * 2);
    state.ctx.strokeStyle = this.color;
    state.ctx.stroke();
    state.ctx.restore();
  }

  update() {
    this.offset++;
    if (this.offset > 16) {
      this.offset = 0;
    }

    this.draw();
  }
}

class MainMenu {
  hw = props.width / 2;
  hh = props.height / 2;

  portal_o = new Portal(this.hw - 33, this.hh - 5, Color.BLUE);
  pong_o = new Portal(this.hw + 25, this.hh - 5, Color.ORANGE);

  playBtn = { x: this.hw - 50, y: this.hh + 15, width: 100, height: 15 };

  init() {
    if (canvas.value) {
      canvas.value.addEventListener(
        'click',
        (e: MouseEvent) => {
          var mousePos = getMousePos(canvas.value, e);
          if (inHitbox(mousePos, this.playBtn)) {
            state.machine = GAME_STATE.PLAY;
          }
        },
        false
      );
    }
  }
  ui() {
    state.ctx.font = '50px';
    state.ctx.textAlign = 'center';
    state.ctx.fillText('P   RTALS    P   NG', this.hw, this.hh);

    this.portal_o.update();
    this.pong_o.update();

    state.ctx.font = '20px';
    state.ctx.fillText('click to start', this.hw, this.hh + 25);
    //state.ctx.fillText('move: ⬆️/⬇️ arrows, exit: ESC', this.hw, this.hh + 42);
    state.ctx.fillText('move: W/S keys, exit: ESC', this.hw, this.hh + 42);

    let initCalled = false;
    if (!initCalled) this.init();
    else initCalled = true;
  }
}

class GGMenu {
  hw = props.width / 2;
  hh = props.height / 2;

  restartBtn = { x: this.hw - 35, y: this.hh + 15, width: 70, height: 15 };

  init() {
    if (canvas.value) {
      canvas.value.addEventListener(
        'click',
        (e: MouseEvent) => {
          var mousePos = getMousePos(canvas.value, e);
          if (inHitbox(mousePos, this.restartBtn)) {
            state.machine = GAME_STATE.PLAY;
          }
        },
        false
      );
    }
  }

  ui() {
    state.ctx.font = '20px';
    state.ctx.textAlign = 'center';
    state.ctx.fillText('GAME OVER', this.hw, this.hh - 20);

    state.ctx.font = '40px';
    const text = `${state.winner === 'P1' ? 'You Win! 🍰' : 'You Lose ☹️'}`;
    state.ctx.fillText(text, this.hw, this.hh);

    state.ctx.font = '20px';
    state.ctx.fillText('play again?', this.hw, this.hh + 25);

    let initCalled = false;
    if (!initCalled) this.init();
    else initCalled = true;
  }
}

const radius = Math.ceil(props.width / 200);
const ballEntity = {
  color: Color.WHITE,
  x: props.width / 2 + radius,
  y: props.height / 2 + radius,
  radius,
  speed: state.speed,
} as iBall;

const offset = 4;
const paddelEntity = {
  color: Color.WHITE,
  height: Math.ceil(props.height / 7), // * difficulty
  width: Math.ceil(props.width / 100),
  speed: Math.sqrt(state.speed),
  score: 0,
} as iPaddle;

class Game {
  ball = new Ball(ballEntity);

  // right side
  p1Paddel = new Paddle({
    ...paddelEntity,
    x: props.width - (paddelEntity.width + offset),
    y: (props.height - paddelEntity.height) / 2,
  });
  p1Score = new Hud(props.width / 4, 25, this.p1Paddel.score);

  // left side
  p2Paddel = new Paddle({
    ...paddelEntity,
    x: 0 + offset,
    y: (props.height - paddelEntity.height) / 2,
  });
  p2Score = new Hud((props.width * 3) / 4, 25, this.p2Paddel.score);

  bluePortal = new Portal(99, 100, Color.BLUE);
  orangePortal = new Portal(props.width - 99, 200, Color.ORANGE);

  constructor() {
    this.p2Paddel.setComputer();
    this.orangePortal.port();
    this.bluePortal.port();
  }

  reset() {
    state.winner = '';
    state.score.p1 = 0;
    state.score.p2 = 0;

    this.ball = new Ball(ballEntity);

    // right side
    this.p1Paddel = new Paddle({
      ...paddelEntity,
      x: props.width - (paddelEntity.width + offset),
      y: (props.height - paddelEntity.height) / 2,
    });
    this.p1Score = new Hud(props.width / 4, 25, this.p1Paddel.score);

    // left side
    this.p2Paddel = new Paddle({
      ...paddelEntity,
      x: 0 + offset,
      y: (props.height - paddelEntity.height) / 2,
    });
    this.p2Score = new Hud((props.width * 3) / 4, 25, this.p2Paddel.score);

    this.bluePortal = new Portal(99, 100, Color.BLUE);
    this.orangePortal = new Portal(props.width - 99, 200, Color.ORANGE);

    game = new Game();
  }

  checkPaddleCollision = (paddle: Paddle) => {
    const ball = this.ball;
    return AABBIntersect(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.radius, ball.radius);
  };

  checkPortalCollision = (inPortal: Portal, outPortal: Portal) => {
    const ball = this.ball;
    const x = ball.x - inPortal.x;
    const y = ball.y - inPortal.y;

    const distance = Math.sqrt(x * x + y * y);

    if (distance < ball.radius + inPortal.w) {
      if (inPortal.isCollidable) {
        outPortal.isCollidable = false;
        ball.teleport(outPortal);
        outPortal.toggleCollision();
      }
    }
  };

  checkForWinner = (player: Paddle) => {
    //console.log(player.id + " score: " + player.score);
    if (player.score === state.sets) {
      state.winner = player.id;
      setTimeout(function () {
        state.machine = GAME_STATE.OVER;
      }, 1);
    }
  };

  draw() {
    // vertical divide (net)
    state.ctx.fillRect(props.width / 2, 0, 2, props.height);

    this.p1Paddel.draw();
    this.p1Score.draw();

    this.p2Paddel.draw();
    this.p2Score.draw();
  }

  update() {
    this.draw();

    this.ball.update();

    this.orangePortal.update();
    this.bluePortal.update();

    this.p1Paddel.update();
    this.p2Paddel.update(this.ball);

    // Check Boundary Collision
    if (this.ball.x + this.ball.radius > props.width) {
      //console.log('Player 1 Scores!');
      this.p1Paddel.updateScore();
      this.checkForWinner(this.p1Paddel);
      this.p1Score.updateScore(this.p1Paddel.score);
    }
    if (this.ball.x - this.ball.radius < 0) {
      //console.log('Player 2 Scores!');
      this.p2Paddel.updateScore();
      this.checkForWinner(this.p2Paddel);
      this.p2Score.updateScore(this.p2Paddel.score);
    }

    // Check Paddle Collision
    const p = this.ball.dx > 0 ? this.p1Paddel : this.p2Paddel;
    if (this.checkPaddleCollision(p)) {
      this.ball.dx *= -1;
    }

    // Check portal Collision
    this.checkPortalCollision(this.bluePortal, this.orangePortal);
    this.checkPortalCollision(this.orangePortal, this.bluePortal);
  }
}

let game = new Game();
const mainMenu = new MainMenu();
const overMenu = new GGMenu();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state.ctx.clearRect(0, 0, props.width, props.height);

  switch (state.machine) {
    case GAME_STATE.PLAY:
      return game.update();
    case GAME_STATE.OVER:
      return overMenu.ui();
    default:
      game.reset();
      return mainMenu.ui();
  }
}

// helpers
function random(min: number, max: number) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
function AABBIntersect(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && bx < ax + aw && ay < by + bh && by < ay + ah;
}

interface iPosition {
  x: number;
  y: number;
}

interface iRectangle extends iPosition {
  width: number;
  height: number;
}

function inHitbox(pos: iPosition, rect: iRectangle) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
}
function clamp(val: number, min: number, max: number) {
  return val < min ? min : val > max ? max : val;
}

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}
// TODO: TouchEvent
</script>

<style scoped>
#game {
  background-color: #000;
}
</style>
