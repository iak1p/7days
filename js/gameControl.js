import { renderLevel } from "./renderLevel.js";
import {
  level_1,
  level_2,
  level_3,
  level_4,
  level_5,
  level_6,
  level_7,
} from "./levels.js";
import { enemyShootig } from "./enemyShooting.js";
const door = new Audio("../audio/door.mp3");

const mainMenuPage = document.getElementsByClassName("main_menu")[0];
const pauseMenuPage = document.getElementsByClassName("pause_menu")[0];
const settingsAfterGamePage = document.getElementsByClassName(
  "settings_after_game_menu"
)[0];
const settingsMenuPage = document.getElementsByClassName("settings_menu")[0];
const decorDiv = document.getElementsByClassName("decor_div")[0];

const cvs = document.getElementById("canvas");

export const gameControl = (e, GAME_VAR, PLAYER) => {
  switch (e.keyCode) {
    /**
    Go right when D key pressed
     */
    case 68:
      GAME_VAR.control.right = true;
      break;
    /**
    Go left when A key pressed
     */
    case 65:
      GAME_VAR.control.left = true;
      break;
    /**
    Go up when W key pressed
     */
    case 83:
      GAME_VAR.control.up = true;
      break;
    /**
    Go down when S key pressed
     */
    case 87:
      GAME_VAR.control.down = true;
      break;

    case 81:
      GAME_VAR.cheat = !GAME_VAR.cheat;
      break;
    /**
    Open pause page when ESC pressed
     */
    case 27:
      if (!GAME_VAR.gameOver) {
        pauseMenuPage.style.display = "block";
        settingsMenuPage.style.display = "none";
        mainMenuPage.style.display = "none";
        settingsAfterGamePage.style.display = "none";
        cvs.style.display = "none";
      }
    /**
    Go home/Go basement when E pressed
     */
    case 69:
      if (
        PLAYER.position.x + 40 < 1224 &&
        PLAYER.position.x + 40 > 1160 &&
        PLAYER.position.y + 68 < 560 &&
        PLAYER.position.y + 68 > 414 &&
        GAME_VAR.inHome &&
        GAME_VAR.playerSleep
      ) {
        decorDiv.classList.add("active");

        if (GAME_VAR.audioIsPlaying) {
          door.play();
          door.volume = 0.2;
        }

        GAME_VAR.main = new Audio(
          `../audio/main${Math.round(Math.random() * 2 + 1)}.mp3`
        );

        if (GAME_VAR.levelIsOver) GAME_VAR.levelNum += 1;

        if (GAME_VAR.levelNum === 1) {
          renderLevel(level_1, GAME_VAR);
        } else if (GAME_VAR.levelNum === 2) {
          renderLevel(level_2, GAME_VAR);
        } else if (GAME_VAR.levelNum === 3) {
          renderLevel(level_3, GAME_VAR);
        } else if (GAME_VAR.levelNum === 4) {
          renderLevel(level_4, GAME_VAR);
        } else if (GAME_VAR.levelNum === 5) {
          renderLevel(level_5, GAME_VAR);
        } else if (GAME_VAR.levelNum === 6) {
          renderLevel(level_6, GAME_VAR);
        } else if (GAME_VAR.levelNum === 7) {
          renderLevel(level_7, GAME_VAR);
        }
        setTimeout(() => {
          if (GAME_VAR.levelNum === 8) {
            document.getElementsByClassName("win")[0].classList.add("active");
            GAME_VAR.gameOver = true;
            GAME_VAR.gameStart = false;
            GAME_VAR.canShoot = false;
          }

          GAME_VAR.canShoot = true;
          GAME_VAR.inHome = false;
          GAME_VAR.levelIsOver = false;
          GAME_VAR.playerSleep = false;
          decorDiv.classList.remove("active");
          PLAYER.position.x = 37;
          PLAYER.position.y = 392;

          if (GAME_VAR.audioIsPlaying && GAME_VAR.enemies.length > 0) {
            GAME_VAR.menu.pause();
            GAME_VAR.main.volume = 0.2;
            GAME_VAR.main.play();
          }
          enemyShootig(PLAYER, GAME_VAR);
        }, 1000);
      }

      if (
        PLAYER.position.x + 40 < 120 &&
        PLAYER.position.x + 40 > 33 &&
        PLAYER.position.y + 68 < 509 &&
        PLAYER.position.y + 68 > 366 &&
        GAME_VAR.levelIsOver &&
        !GAME_VAR.inHome
      ) {
        decorDiv.classList.add("active");

        if (GAME_VAR.audioIsPlaying) {
          door.play();
          door.volume = 0.2;
        }

        setTimeout(() => {
          GAME_VAR.inHome = true;
          decorDiv.classList.remove("active");
          PLAYER.position.x = 1148;
          PLAYER.position.y = 430;
          if (GAME_VAR.audioIsPlaying) {
            GAME_VAR.main.pause();
            GAME_VAR.menu.load();
            GAME_VAR.menu.play();
          }
          enemyShootig(PLAYER, GAME_VAR);
        }, 1000);
      }

      if (
        PLAYER.position.x + 40 < 500 &&
        PLAYER.position.x + 40 > 300 &&
        PLAYER.position.y + 68 < 550 &&
        PLAYER.position.y + 68 > 300 &&
        !GAME_VAR.playerSleep &&
        GAME_VAR.levelIsOver &&
        GAME_VAR.inHome
      ) {
        decorDiv.classList.add("active");
        if (GAME_VAR.difficulty === "hard") PLAYER.health = PLAYER.health;
        else if (GAME_VAR.difficulty === "medium") PLAYER.health += 25;
        else PLAYER.health = 50;
        if (PLAYER.health > 50) PLAYER.health = 50;
        setTimeout(() => {
          GAME_VAR.playerSleep = true;
          decorDiv.classList.remove("active");
        }, 1000);
      }
      break;
  }
};
