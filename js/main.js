import { GameObject, Player, Enemy, Bullet } from "./classes.js";

const ctx = document.getElementById("canvas").getContext("2d");
const noPlayer = new Audio("../audio/no_enemy.mp3");
let menu;
const main = new Audio(`../audio/main${Math.round(Math.random() + 1)}.mp3`);
const door = new Audio("../audio/door.mp3");
let bullet;

const cvsWidth = 1536,
  cvsHeight = 864;

const pol = new Image();
const polPodval = new Image();
pol.src = "./img/pol.png";
polPodval.src = "./img/polPodval.png";

let bullets = [],
  enemies = [],
  canShoot = true,
  gameStart = false,
  audioIsPlaying = false,
  inHome = true,
  levelIsOver = true,
  countOfEnemies = 0,
  gameOver = false;
let anim;

const wallsHome = [
  { x: 264, y: 78, width: 961, height: 149, src: "./img/borderUp.png" },
  { x: 280, y: 763, width: 936, height: 55, src: "./img/borderBottom.png" },
  { x: 209, y: 118, width: 90, height: 659, src: "./img/borderLeft.png" },
  { x: 1198, y: 118, width: 54, height: 659, src: "./img/borderRight.png" },
];

const wallsPodval = [
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
];

const dayOne = {
  waveOne: [
    {
      count: 4,
      enemy: "first",
    },
  ],
  waveSecond: [
    {
      count: 3,
      enemy: 1,
    },
    {
      count: 2,
      enemy: 2,
    },
  ],
};

const control = {
  left: false,
  right: false,
  up: false,
  down: false,
};

const player = new Player({
  position: {
    x: 500,
    y: 350,
  },
  sprite: "./img/playerIdle1.png",
  speed: 10,
  control: control,
  walls: wallsHome,
  health: 100,
  width: 40,
  height: 68,
});

const animPlayer = () => {
  let i = 0;
  anim = setInterval(function () {
    i++;
    if (control.down || control.left || control.right || control.up) {
      player.width = 66;
      player.height = 66;
      if (i < 6) {
        player.sprite = `./img/playerRun${i}.png`;
      } else {
        i = 0;
      }
    } else {
      player.width = 40;
      player.height = 68;
      if (i <= 4) {
        player.sprite = `./img/playerIdle${i}.png`;
      } else {
        i = 0;
      }
    }
  }, 100);
};

document.getElementsByClassName("start")[0].addEventListener("click", () => {
  document.getElementsByClassName("main_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_menu")[0].style.display = "none";
  document.getElementById("canvas").style.display = "block";
  gameStart = true;
  animate();
  a();
  animPlayer();
});

const muteBtns = document.getElementsByClassName("mute");

for (let i = 0; i < muteBtns.length; i++) {
  muteBtns[i].addEventListener("click", () => {
    if (audioIsPlaying) {
      audioIsPlaying = false;
      menu.pause();
      main.pause();
      document.getElementsByClassName("sound")[0].innerHTML = "OFF";
      document.getElementsByClassName("sound")[1].innerHTML = "OFF";
    } else {
      audioIsPlaying = true;
      menu = new Audio("../audio/menu.mp3");
      if (!inHome && enemies.length > 0) {
        main.play();
        main.volume = 0.2;
      } else {
        menu.play();
        menu.volume = 0.2;
      }

      document.getElementsByClassName("sound")[0].innerHTML = "ON";
      document.getElementsByClassName("sound")[1].innerHTML = "ON";
    }
  });
}

const btns = document.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("mouseover", () => {
    if (audioIsPlaying) {
      const btnOn = new Audio("../audio/onBtn.mp3");
      btnOn.play();
      btnOn.volume = 0.2;
    }
  });
}

document
  .getElementsByClassName("back_to_main_lose")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("pause_menu")[0].style.display = "none";
    document.getElementsByClassName("gameover")[0].classList.remove("active");
    document.getElementsByClassName("settings_menu")[0].style.display = "none";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "none";
    document.getElementsByClassName("main_menu")[0].style.display = "block";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "none";
    document.getElementsByClassName("rules_menu")[0].style.display = "none";

    document.getElementById("canvas").style.display = "none";
    inHome = true;
    player.walls = wallsHome;
    gameOver = false;
    enemies = [];
    player.position = {
      x: 500,
      y: 350,
    };
    clearInterval(anim);
  });

const a = () => {
  if (gameStart) {
    window.onkeydown = (e) => {
      switch (e.keyCode) {
        case 68:
          control.right = true;
          break;
        case 65:
          control.left = true;
          break;
        case 83:
          control.up = true;
          break;
        case 87:
          control.down = true;
          break;
        case 27:
          if (!gameOver) {
            document.getElementsByClassName("pause_menu")[0].style.display =
              "block";
            document.getElementsByClassName("settings_menu")[0].style.display =
              "none";
            document.getElementsByClassName("main_menu")[0].style.display =
              "none";
            document.getElementsByClassName(
              "settings_after_game_menu"
            )[0].style.display = "none";
            document.getElementById("canvas").style.display = "none";
          }
        case 69:
          if (
            player.position.x + 40 < 1224 &&
            player.position.x + 40 > 1160 &&
            player.position.y + 68 < 560 &&
            player.position.y + 68 > 414 &&
            inHome
          ) {
            document
              .getElementsByClassName("decor_div")[0]
              .classList.add("active");

            if (audioIsPlaying) {
              door.play();
              door.volume = 0.2;
            }

            dayOne.waveSecond.forEach((el) => {
              while (countOfEnemies < el.count) {
                if (el.enemy == 2) {
                  const second = new Enemy({
                    position: {
                      x: Math.floor(Math.random() * 1024),
                      y: Math.floor(Math.random() * 524),
                    },
                    sprite: "./img/enemy2_1.png",
                    radius: 30,
                    speed: 5,
                    health: 40,
                    width: 40,
                    height: 66,
                  });

                  enemies.push(second);
                  countOfEnemies++;
                } else {
                  const first = new Enemy({
                    position: {
                      x: Math.floor(Math.random() * 1024),
                      y: Math.floor(Math.random() * 524),
                    },
                    sprite: "./img/enemy1_1.png",
                    radius: 30,
                    speed: 3,
                    health: 20,
                    width: 40,
                    height: 66,
                  });

                  enemies.push(first);
                  countOfEnemies++;
                }
              }
              countOfEnemies = 0;
            });

            setTimeout(() => {
              inHome = false;
              canShoot = true;
              levelIsOver = false;
              document
                .getElementsByClassName("decor_div")[0]
                .classList.remove("active");
              player.position.x = 37;
              player.position.y = 392;
              if (audioIsPlaying && enemies.length > 0) {
                menu.pause();
                main.volume = 0.2;
                main.play();
              }
            }, 1000);
          }

          if (
            player.position.x + 40 < 120 &&
            player.position.x + 40 > 33 &&
            player.position.y + 68 < 509 &&
            player.position.y + 68 > 366 &&
            levelIsOver &&
            !inHome
          ) {
            document
              .getElementsByClassName("decor_div")[0]
              .classList.add("active");

            if (audioIsPlaying) {
              door.play();
              door.volume = 0.2;
            }

            setTimeout(() => {
              inHome = true;
              document
                .getElementsByClassName("decor_div")[0]
                .classList.remove("active");
              player.position.x = 1148;
              player.position.y = 430;
              if (audioIsPlaying) {
                main.pause();
                menu.load();
                menu.play();
              }
            }, 1000);
          }
          break;
        case 81:
          const lose = document.getElementsByClassName("gameover")[0];
          lose.classList.add("active");
          gameOver = true;
          gameStart = false;
          break;
      }
    };
    document.body.onmousedown = (e) => {
      if (canShoot && !inHome) {
        if (audioIsPlaying) {
          const piy = new Audio("../audio/shoot1.mp3");
          piy.volume = 0.5;
          piy.play();
        }

        bullet = new Bullet({
          position: {
            x: player.position.x + 12,
            y: player.position.y + 12,
          },
          speed: 30,
          cursorPos: {
            x: e.clientX,
            y: e.clientY,
          },
        });

        bullets.push(bullet);
      }
    };
    window.onkeyup = (e) => {
      switch (e.keyCode) {
        case 68:
          control.right = false;
          break;
        case 65:
          control.left = false;
          break;
        case 83:
          control.up = false;
          break;
        case 87:
          control.down = false;
          break;
      }
    };
  }
};

function animate() {
  ctx.clearRect(0, 0, cvsWidth, cvsHeight);
  ctx.imageSmoothingEnabled = false;

  if (inHome) {
    player.walls = wallsHome;
    countOfEnemies = 0;

    wallsHome.forEach((wall) => {
      const img = new Image();
      img.src = wall.src;
      ctx.drawImage(img, wall.x, wall.y, wall.width, wall.height);
    });
    ctx.drawImage(pol, 295, 227, 907, 536);

    if (
      player.position.x + 40 < 1224 &&
      player.position.x + 40 > 1160 &&
      player.position.y + 68 < 560 &&
      player.position.y + 68 > 414
    ) {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Press E to enter podval",
        player.position.x - 40,
        player.position.y - 10
      );
    }
  } else {
    player.walls = wallsPodval;
    wallsPodval.forEach((wall) => {
      const img = new Image();
      img.src = wall.src;
      ctx.drawImage(img, wall.x, wall.y, wall.width, wall.height);
    });
    ctx.drawImage(polPodval, 33, 149, 1471, 700);

    if (
      player.position.x + 40 < 120 &&
      player.position.x + 40 > 33 &&
      player.position.y + 68 < 509 &&
      player.position.y + 68 > 366 &&
      levelIsOver
    ) {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Press E to enter home",
        player.position.x - 20,
        player.position.y - 10
      );
    }
  }

  player.move();

  if (bullets.length != 0) {
    bullets.forEach((bullet) => {
      bullet.checkColission({ bullet, wallsPodval, enemies, bullets });
      bullet.update();
    });
  }

  if (enemies.length != 0 && !inHome) {
    enemies.forEach((enemy) => {
      enemy.update();
    });
  } else if (enemies.length == 0 && !inHome) {
    ctx.font = "32px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("Level Completed", cvsWidth / 2 - 100, 100);
    canShoot = false;
    levelIsOver = true;
  }
  if (!gameOver) requestAnimationFrame(animate);
  else return 0;
}
