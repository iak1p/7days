/**

DOM elements for the game menus and canvas
@property {HTMLElement} mainMenuPage - Main menu page element
@property {HTMLElement} pauseMenuPage - Pause menu page element
@property {HTMLElement} settingsAfterGamePage - Settings page after game over element
@property {HTMLElement} settingsMenuPage - Settings menu page element
@property {HTMLElement} rulesPage - Rules menu page element
@property {HTMLElement} gameoverPage - Game over page element
@property {HTMLCanvasElement} cvs - Canvas element for the game
@property {HTMLCollectionOf<Element>} backToMainBtn - Collection of back-to-main buttons
@property {HTMLCollectionOf<Element>} rules - Collection of rules buttons
*/

const mainMenuPage = document.getElementsByClassName("main_menu")[0];
const pauseMenuPage = document.getElementsByClassName("pause_menu")[0];
const settingsAfterGamePage = document.getElementsByClassName(
  "settings_after_game_menu"
)[0];
const settingsMenuPage = document.getElementsByClassName("settings_menu")[0];
const rulesPage = document.getElementsByClassName("rules_menu")[0];
const gameoverPage = document.getElementsByClassName("gameover")[0];
const difficultyChoicePage = document.getElementsByClassName("difficulty_choice")[0];

const cvs = document.getElementById("canvas");

const backToMainBtn = document.getElementsByClassName("back_to_main");
const rules = document.getElementsByClassName("rules");

document.getElementsByClassName("settings")[0].addEventListener("click", () => {
  pauseMenuPage.style.display = "none";
  settingsMenuPage.style.display = "block";
  settingsAfterGamePage.style.display = "none";
  mainMenuPage.style.display = "none";
  difficultyChoicePage.style.display = "none";

  cvs.style.display = "none";
});

document.getElementsByClassName("start")[0].addEventListener("click", () => {
  difficultyChoicePage.style.display = "block";
  mainMenuPage.style.display = "none";
});

document.getElementsByClassName("settings_in_game")[0].addEventListener("click", () => {
  pauseMenuPage.style.display = "none";
  settingsMenuPage.style.display = "none";
  settingsAfterGamePage.style.display = "block";
  mainMenuPage.style.display = "none";
  difficultyChoicePage.style.display = "none";

  cvs.style.display = "none";
});

document.getElementsByClassName("pause")[0].addEventListener("click", () => {
  pauseMenuPage.style.display = "none";
  settingsMenuPage.style.display = "none";
  settingsAfterGamePage.style.display = "none";
  mainMenuPage.style.display = "none";
  difficultyChoicePage.style.display = "none";

  cvs.style.display = "block";
});

document.getElementsByClassName("back_to_main_lose")[0].addEventListener("click", () => {
  location.reload();
});

document.getElementsByClassName("restart_game")[0].addEventListener("click", () => {
  location.reload();
});

document.getElementsByClassName("back_to_game")[0].addEventListener("click", () => {
  pauseMenuPage.style.display = "block";
  settingsMenuPage.style.display = "none";
  settingsAfterGamePage.style.display = "none";
  mainMenuPage.style.display = "none";
  difficultyChoicePage.style.display = "none";

  cvs.style.display = "none";
});

for (let i = 0; i < rules.length; i++) {
  rules[i].addEventListener("click", () => {
    pauseMenuPage.style.display = "none";
    rulesPage.style.display = "block";
    settingsMenuPage.style.display = "none";
    settingsAfterGamePage.style.display = "none";
    mainMenuPage.style.display = "none";
    difficultyChoicePage.style.display = "none";

    cvs.style.display = "none";
  });
}

for (let i = 0; i < backToMainBtn.length; i++) {
  backToMainBtn[i].addEventListener("click", () => {
    pauseMenuPage.style.display = "none";
    gameoverPage.classList.remove("active");
    settingsMenuPage.style.display = "none";
    settingsAfterGamePage.style.display = "none";
    mainMenuPage.style.display = "block";
    rulesPage.style.display = "none";
    difficultyChoicePage.style.display = "none";

    cvs.style.display = "none";
  });
}

export const btnsHover = (GAME_VAR) => {
  const btns = document.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("mouseover", () => {
      if (GAME_VAR.audioIsPlaying) {
        const btnOn = new Audio("../audio/onBtn.mp3");
        btnOn.play();
        btnOn.volume = 0.2;
      }
    });
  }
};

export const muteBtns = (GAME_VAR) => {
  const muteBtns = document.getElementsByClassName("mute");
  for (let i = 0; i < muteBtns.length; i++) {
    muteBtns[i].addEventListener("click", () => {
      if (GAME_VAR.audioIsPlaying) {
        GAME_VAR.audioIsPlaying = false;
        GAME_VAR.menu.pause();
        GAME_VAR.main.pause();
        document.getElementsByClassName("sound")[0].innerHTML = "OFF";
        document.getElementsByClassName("sound")[1].innerHTML = "OFF";
      } else {
        GAME_VAR.audioIsPlaying = true;

        if (!GAME_VAR.inHome && GAME_VAR.enemies.length > 0) {
          GAME_VAR.main.play();
          GAME_VAR.main.volume = 0.2;
        } else {
          GAME_VAR.menu.play();
          GAME_VAR.menu.volume = 0.2;
        }

        document.getElementsByClassName("sound")[0].innerHTML = "ON";
        document.getElementsByClassName("sound")[1].innerHTML = "ON";
      }
    });
  }
};
