import { animPlayer } from "./anim.js";
import { btnsHover, muteBtns } from "./btns.js";
import { Player, Bullet, GameVar, OBSERVER } from "./classes.js";
import { gameControl } from "./gameControl.js";
import { playerShoot } from "./playerShoot.js";
import { renderMap } from "./renderMap.js";

const ctx = document.getElementById("canvas").getContext("2d");
let anim = null;

/**
An object representing the state of the game.
@typedef {Object} GameVar
@property {boolean} canShoot - Indicates whether the player can shoot.
@property {boolean} gameStart - Indicates whether the game has started.
@property {Array} bullets - An array containing the bullets in the game.
@property {number} levelNum - The current level number.
@property {boolean} inHome - Indicates whether the player is in the home area.
@property {boolean} audioIsPlaying - Indicates whether any audio is currently playing.
@property {Array} enemies - An array containing the enemies in the game.
@property {Object} control - An object representing the player's control inputs.
@property {boolean} levelIsOver - Indicates whether the current level is over.
@property {Array} wallsPodval - An array containing the wall objects in the basement area.
@property {Array} wallsHome - An array containing the wall objects in the home area.
@property {number} cvsWidth - The width of the canvas element in pixels.
@property {number} cvsHeight - The height of the canvas element in pixels.
@property {boolean} gameOver - Indicates whether the game is over.
@property {Audio} main - The main game audio object.
@property {Audio} menu - The menu audio object.
*/

export const GAME_VAR = new GameVar({
  canShoot: false,
  gameStart: false,
  bullets: [],
  levelNum: 0,
  inHome: true,
  audioIsPlaying: false,
  enemies: [],
  control: { left: false, right: false, up: false, down: false },
  levelIsOver: true,
  wallsPodval: [
    { x: 0, y: 0, width: 1536, height: 149, src: "./img/borderUpPodval.png" },
    {
      x: 9,
      y: 850,
      width: 1519,
      height: 32,
      src: "./img/borderBottomPodval.png",
    },
    { x: 0, y: 39, width: 37, height: 825, src: "./img/borderLeftPodval.png" },
    {
      x: 1504,
      y: 39,
      width: 33,
      height: 825,
      src: "./img/borderRightPodval.png",
    },
  ],
  wallsHome: [
    { x: 264, y: 78, width: 961, height: 149, src: "./img/borderUp.png" },
    { x: 280, y: 763, width: 936, height: 55, src: "./img/borderBottom.png" },
    { x: 209, y: 118, width: 90, height: 659, src: "./img/borderLeft.png" },
    { x: 1198, y: 118, width: 54, height: 659, src: "./img/borderRight.png" },
  ],
  cvsWidth: 1536,
  cvsHeight: 864,
  gameOver: false,
  main: new Audio(`../audio/main${Math.round(Math.random() * 2 + 1)}.mp3`),
  menu: new Audio("../audio/menu.mp3"),
  difficulty: "easy",
  playerSleep: true,
  cheat: false,
});

/**
Player class
@class
@constructor
@param {Object} options - Player parameters
@param {Object} options.position - Player position on the game field
@param {number} options.position.x - X coordinate of the player position on the game field
@param {number} options.position.y - Y coordinate of the player position on the game field
@param {string} options.sprite - Path to the player sprite image
@param {number} options.speed - Player movement speed
@param {Object} options.control - Object with player control parameters
@param {boolean} options.control.left - Flag for left control
@param {boolean} options.control.right - Flag for right control
@param {boolean} options.control.up - Flag for up control
@param {boolean} options.control.down - Flag for down control
@param {Object[]} options.walls - List of walls on the game field
@param {number} options.health - Player's health
@param {number} options.width - Player's width
@param {number} options.height - Player's height
*/

const PLAYER = new Player({
  position: {
    x: 500,
    y: 350,
  },
  sprite: "./img/playerIdle1.png",
  speed: 10,
  control: GAME_VAR.control,
  walls: GAME_VAR.wallsHome,
  health: 50,
  width: 40,
  height: 68,
});

document.getElementsByClassName("start_after_choice")[0].addEventListener("click", () => {
  document.getElementsByClassName("main_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_menu")[0].style.display = "none";
  document.getElementsByClassName("difficulty_choice")[0].style.display = "none";
  document.getElementById("canvas").style.display = "block";
  GAME_VAR.gameStart = true;
  GAME_VAR.bullets = [];
  GAME_VAR.enemies = [];
  GAME_VAR.difficulty = document.getElementsByTagName("select")[0].value;
  animate();
  control();
  animPlayer(PLAYER, GAME_VAR.control, anim);
});

btnsHover(GAME_VAR);
muteBtns(GAME_VAR);

const control = () => {
  if (GAME_VAR.gameStart) {
    window.addEventListener("keydown", (e) => gameControl(e, GAME_VAR, PLAYER));

    document.body.onmousedown = (e) => playerShoot(e, GAME_VAR, PLAYER);

    window.onkeyup = (e) => {
      switch (e.keyCode) {
        case 68:
          GAME_VAR.control.right = false;
          break;
        case 65:
          GAME_VAR.control.left = false;
          break;
        case 83:
          GAME_VAR.control.up = false;
          break;
        case 87:
          GAME_VAR.control.down = false;
          break;
      }
    };
  }
};

function animate() {
  ctx.clearRect(0, 0, GAME_VAR.cvsWidth, GAME_VAR.cvsHeight);
  ctx.imageSmoothingEnabled = false;
  renderMap(GAME_VAR, PLAYER);
  PLAYER.move();


  if (GAME_VAR.bullets?.length != 0) {
    GAME_VAR.bullets?.forEach((bullet) => {
      bullet?.checkColission({
        bullet,
        wallsPodval: GAME_VAR.wallsPodval,
        enemies: GAME_VAR.enemies,
        bullets: GAME_VAR.bullets,
        PLAYER,
        GAME_VAR,
      });
      bullet?.update();
    });
  }

  if (PLAYER.health <= 0) {
    const lose = document.getElementsByClassName("gameover")[0];
    lose.classList.add("active");
    GAME_VAR.gameOver = true;
    GAME_VAR.gameStart = false;
    GAME_VAR.canShoot = false;
    GAME_VAR.bullets = [];
    GAME_VAR.enemies = [];
    GAME_VAR.levelNum = 0;
  }

  OBSERVER.update(GAME_VAR);

  if (!GAME_VAR.gameOver) requestAnimationFrame(animate);
  else return 0;
}
