const ctx = document.getElementById("canvas").getContext("2d");

export class GameObject {
  constructor({ position, speed, sprite, helth }) {
    this.position = position;
    this.speed = speed;
    this.sprite = sprite;
    this.helth = helth;
  }
}

export class Player extends GameObject {
  constructor({ position, speed, sprite, control, helth, walls }) {
    super({ position, speed, sprite, helth });
    this.control = control;
    this.walls = walls;
  }

  checkColissionHor(wall) {
    if (
      this.position.y + 68 > wall.y &&
      this.position.y < wall.y + wall.height
    ) {
      return true;
    } else return false;
  }

  checkColissionVer(wall) {
    if (
      this.position.x + 40 > wall.x &&
      this.position.x < wall.x + wall.width
    ) {
      return true;
    } else return false;
  }

  move() {
    if (this.control.down)
      for (let i = 0; i < 2; i++) {
        if (this.checkColissionHor(this.walls[i])) {
          this.position.y += this.speed / 2;
        } else {
          this.position.y -= this.speed / 2;
        }
      }
    if (this.control.up) {
      for (let i = 0; i < 2; i++) {
        if (this.checkColissionHor(this.walls[i])) {
          this.position.y -= this.speed / 2;
        } else {
          this.position.y += this.speed / 2;
        }
      }
    }
    if (this.control.left) {
      for (let i = 2; i < 4; i++) {
        if (this.checkColissionVer(this.walls[i])) {
          this.position.x += this.speed / 2;
        } else {
          this.position.x -= this.speed / 2;
        }
      }
    }
    if (this.control.right)
      for (let i = 2; i < 4; i++) {
        if (this.checkColissionVer(this.walls[i])) {
          this.position.x -= this.speed / 2;
        } else {
          this.position.x += this.speed / 2;
        }
      }
    ctx.drawImage(this.sprite, this.position.x, this.position.y, 40, 68);
  }
}

export class Enemy extends GameObject {
  constructor({ position, speed, sprite, radius, helth }) {
    super({ position, speed, sprite, helth });
    this.radius = radius;
    this.vector = {
      x: 0,
      y: 0,
    };
    this.randomPos = {
      x: Math.floor(Math.random() * 1024),
      y: Math.floor(Math.random() * 524),
    };
  }

  draw() {
    ctx.drawImage(this.sprite, this.position.x, this.position.y, 40, 66);
  }

  update() {
    this.vector.x = this.randomPos.x - this.position.x;
    this.vector.y = this.randomPos.y - this.position.y;

    let length = Math.sqrt(
      this.vector.x * this.vector.x + this.vector.y * this.vector.y
    );

    this.vector.x = this.vector.x / length;
    this.vector.y = this.vector.y / length;

    this.position.x = this.position.x + this.vector.x * this.speed;
    this.position.y = this.position.y + this.vector.y * this.speed;

    if (length >= 0 && length <= 5) {
      this.randomPos = {
        x: Math.floor(Math.random() * 1024),
        y: Math.floor(Math.random() * 524),
      };
    }

    this.draw();
  }
}

export class Bullet extends GameObject {
  constructor({ position, speed, sprite, cursorPos, enemies, bullets }) {
    super({ position, sprite, speed });
    this.cursorPos = cursorPos;
    this.enemies = enemies;
    this.bullets = bullets;
    this.vector = {
      x: 0,
      y: 0,
    };
    this.angle = Math.atan2(
      this.cursorPos.y - this.position.y,
      this.cursorPos.x - this.position.x
    );
  }

  draw() {
    ctx.drawImage(this.sprite, this.position.x, this.position.y);
  }

  update() {
    this.position.x = this.position.x + Math.cos(this.angle) * this.speed;
    this.position.y = this.position.y + Math.sin(this.angle) * this.speed;

    this.draw();
  }

  checkColission(bullet) {
    this.enemies.forEach((enemy) => {
      if (
        this.position.x + 4 > enemy.position.x &&
        enemy.position.x + 38 > this.position.x &&
        this.position.y + 4 > enemy.position.y &&
        enemy.position.y + 68 > this.position.y
      ) {
        const piy = new Audio("../audio/shoot2.mp3");
        piy.volume = 0.5;
        piy.play();
        enemy.helth -= 10;
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
          this.enemies.splice(index, 1);
        }
      }
    });
  }
}
