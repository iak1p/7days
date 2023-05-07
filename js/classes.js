const ctx = document.getElementById("canvas").getContext("2d");

export class Observer {
  #observers = [];

  addObserver(observer) {
    this.#observers.push(observer);
    observer.model = this;
  }

  removeObserver(observer) {
    this.#observers.splice(
      this.#observers.findIndex(function (o) {
        return o == observer;
      }),
      1
    );

    observer.model = null;
  }

  animEnemy(i) {
    this.#observers?.forEach((enemy) => {
      if (enemy.vector.x < 0) {
        if (enemy.type === 1) enemy.sprite = `./img/enemyLeft1_${i}.png`;
        else if (enemy.type === 2) enemy.sprite = `./img/enemyLeft2_${i}.png`;
        else if (enemy.type === 3) enemy.sprite = `./img/enemyLeft4_${i}.png`;
        else if (enemy.type === 4) enemy.sprite = `./img/enemyLeft3_${i}.png`;
      } else {
        if (enemy.type === 1) enemy.sprite = `./img/enemy1_${i}.png`;
        else if (enemy.type === 2) enemy.sprite = `./img/enemy2_${i}.png`;
        else if (enemy.type === 3) enemy.sprite = `./img/enemy4_${i}.png`;
        else if (enemy.type === 4) enemy.sprite = `./img/enemy3_${i}.png`;
      }
    });
  }

  update(GAME_VAR) {
    if (this.#observers.length != 0 && !GAME_VAR.inHome) {
      this.#observers.forEach((enemy) => {
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`${enemy.health}`, enemy.position.x + 12, enemy.position.y);
        enemy.update();
      });
    } else if (this.#observers.length == 0 && !GAME_VAR.inHome) {
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText("Level Completed", GAME_VAR.cvsWidth / 2 - 100, 100);
      GAME_VAR.canShoot = false;
      GAME_VAR.levelIsOver = true;
      GAME_VAR.bullets = [];
    }
  }
}

export const OBSERVER = new Observer();

export class GameVar {
  constructor({
    canShoot,
    gameStart,
    bullets,
    levelNum,
    inHome,
    audioIsPlaying,
    enemies,
    control,
    levelIsOver,
    wallsPodval,
    wallsHome,
    cvsWidth,
    cvsHeight,
    gameOver,
    main,
    menu,
    difficulty,
    playerSleep,
    cheat,
  }) {
    this.canShoot = canShoot;
    this.gameStart = gameStart;
    this.bullets = bullets;
    this.levelNum = levelNum;
    this.inHome = inHome;
    this.audioIsPlaying = audioIsPlaying;
    this.enemies = enemies;
    this.control = control;
    this.levelIsOver = levelIsOver;
    this.wallsPodval = wallsPodval;
    this.wallsHome = wallsHome;
    this.cvsWidth = cvsWidth;
    this.cvsHeight = cvsHeight;
    this.gameOver = gameOver;
    this.main = main;
    this.menu = menu;
    this.difficulty = difficulty;
    this.playerSleep = playerSleep;
    this.cheat = cheat;
  }
}

export class GameObject {
  constructor({ position, speed, sprite, health, width, height }) {
    this.position = position;
    this.speed = speed;
    this.sprite = sprite;
    this.health = health;
    this.width = width;
    this.height = height;
  }
}

export class Player extends GameObject {
  constructor({ position, speed, sprite, control, health, walls, width, height }) {
    super({ position, speed, sprite, health, width, height });
    this.control = control;
    this.walls = walls;
    this.left = false;
    this.img = new Image();
  }

  checkColissionHor(wall) {
    if (this.position.y + 68 > wall.y && this.position.y < wall.y + wall.height)
      return true;
    else return false;
  }

  checkColissionVer(wall) {
    if (this.position.x + 40 > wall.x && this.position.x < wall.x + wall.width)
      return true;
    else return false;
  }

  draw() {
    ctx.save();
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    ctx.restore();
  }

  move() {
    this.img.src = this.sprite;
    if (this.control.down)
      for (let i = 0; i < 2; i++) {
        if (this.checkColissionHor(this.walls[0])) {
          this.position.y += this.speed / 2;
        } else {
          this.position.y -= this.speed / 2;
        }
      }
    if (this.control.up) {
      for (let i = 0; i < 2; i++) {
        if (this.checkColissionHor(this.walls[1])) {
          this.position.y -= this.speed / 2;
        } else {
          this.position.y += this.speed / 2;
        }
      }
    }
    if (this.control.left) {
      this.left = true;
      for (let i = 2; i < 4; i++) {
        if (this.checkColissionVer(this.walls[2])) {
          this.position.x += this.speed / 2;
        } else {
          this.position.x -= this.speed / 2;
        }
      }
    }
    if (this.control.right) {
      this.left = false;
      for (let i = 2; i < 4; i++) {
        if (this.checkColissionVer(this.walls[3])) {
          this.position.x -= this.speed / 2;
        } else {
          this.position.x += this.speed / 2;
        }
      }
    }
    this.draw();
  }
}

export class Enemy extends GameObject {
  constructor({ position, speed, sprite, type, health, width, height, wall }) {
    super({ position, speed, sprite, health, width, height });
    this.type = type;
    this.vector = {
      x: 0,
      y: 0,
    };
    this.randomPos = {
      x: Math.floor(Math.random() * 1536),
      y: Math.floor(Math.random() * 864),
    };
    this.img = new Image();
    this.wall = wall;
  }

  checkColissionHor(wall) {
    if (this.position.y + 68 > wall.y && this.position.y < wall.y + wall.height) {
      return true;
    } else return false;
  }

  checkColissionVer(wall) {
    if (this.position.x + 40 > wall.x && this.position.x < wall.x + wall.width) {
      return true;
    } else return false;
  }

  draw() {
    this.img.src = this.sprite;
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (
      this.checkColissionVer(this.wall[2]) ||
      this.checkColissionHor(this.wall[0]) ||
      this.checkColissionHor(this.wall[1]) ||
      this.checkColissionVer(this.wall[3])
    ) {
      this.randomPos = {
        x: Math.floor(Math.random() * 1536),
        y: Math.floor(Math.random() * 864),
      };
    }
    this.vector.x = this.randomPos.x - this.position.x;
    this.vector.y = this.randomPos.y - this.position.y;

    let length = Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y);

    this.vector.x = this.vector.x / length;
    this.vector.y = this.vector.y / length;

    this.position.x = this.position.x + this.vector.x * this.speed;
    this.position.y = this.position.y + this.vector.y * this.speed;

    if (length >= 0 && length <= 5) {
      this.randomPos = {
        x: Math.floor(Math.random() * 1536),
        y: Math.floor(Math.random() * 864),
      };
    }
    this.draw();
  }
}

export class Bullet extends GameObject {
  constructor({ position, speed, cursorPos, playerBullet, damage = 5 }) {
    super({ position, speed });
    this.cursorPos = cursorPos;
    this.playerBullet = playerBullet;
    this.damage = damage;
    this.angle = Math.atan2(
      this.cursorPos.y - this.position.y,
      this.cursorPos.x - this.position.x
    );
  }

  draw() {
    !this.playerBullet ? (ctx.fillStyle = "yellow") : (ctx.fillStyle = "white");
    ctx.fillRect(this.position.x, this.position.y, 4, 4);
  }

  update() {
    this.position.x = this.position.x + Math.cos(this.angle) * this.speed;
    this.position.y = this.position.y + Math.sin(this.angle) * this.speed;

    this.draw();
  }

  checkColission({ bullet, wallsPodval, enemies, bullets, PLAYER, GAME_VAR }) {
    wallsPodval.forEach((wall) => {
      if (
        bullet.position.x < wall.x + wall.width &&
        bullet.position.x + 4 > wall.x &&
        bullet.position.y < wall.y + wall.height &&
        bullet.position.y + 4 > wall.y
      ) {
        const index = bullets.indexOf(bullet);
        if (index > -1) {
          bullets.splice(index, 1);
        }
      }
    });

    if (
      bullet.position.x < PLAYER.position.x + PLAYER.width &&
      bullet.position.x + 4 > PLAYER.position.x &&
      bullet.position.y < PLAYER.position.y + PLAYER.height &&
      bullet.position.y + 4 > PLAYER.position.y &&
      !this.playerBullet
    ) {
      !GAME_VAR.cheat ? (PLAYER.health -= this.damage) : 0;
      const indexB = bullets.indexOf(bullet);
      if (indexB > -1) {
        bullets.splice(indexB, 1);
      }
    }

    enemies.forEach((enemy) => {
      if (
        bullet.position.x < enemy.position.x + enemy.width &&
        bullet.position.x + 4 > enemy.position.x &&
        bullet.position.y < enemy.position.y + enemy.height &&
        bullet.position.y + 4 > enemy.position.y &&
        this.playerBullet
      ) {
        enemy.health -= this.damage;
        const indexB = bullets.indexOf(bullet);
        if (indexB > -1) {
          bullets.splice(indexB, 1);
        }
        if (enemy.health <= 0) {
          OBSERVER.removeObserver(enemy);
          const index = enemies.indexOf(enemy);
          if (index > -1) {
            enemies.splice(index, 1);
          }
        }
      }
    });
  }
}
