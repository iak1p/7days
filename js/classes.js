const ctx = document.getElementById("canvas").getContext("2d");

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
  constructor({
    position,
    speed,
    sprite,
    control,
    health,
    walls,
    width,
    height,
  }) {
    super({ position, speed, sprite, health, width, height });
    this.control = control;
    this.walls = walls;
    this.img = new Image();
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
    this.img.src = this.sprite;
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
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class Enemy extends GameObject {
  constructor({ position, speed, sprite, radius, health, width, height }) {
    super({ position, speed, sprite, health, width, height });
    this.radius = radius;
    this.vector = {
      x: 0,
      y: 0,
    };
    this.randomPos = {
      x: Math.floor(Math.random() * 1024),
      y: Math.floor(Math.random() * 524),
    };
    this.img = new Image();
  }

  draw() {
    this.img.src = this.sprite;
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
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
  constructor({ position, speed, cursorPos }) {
    super({ position, speed });
    this.cursorPos = cursorPos;
    this.angle = Math.atan2(
      this.cursorPos.y - this.position.y,
      this.cursorPos.x - this.position.x
    );
  }

  draw() {
    ctx.fillRect(this.position.x, this.position.y, 4, 4);
  }

  update() {
    this.position.x = this.position.x + Math.cos(this.angle) * this.speed;
    this.position.y = this.position.y + Math.sin(this.angle) * this.speed;

    this.draw();
  }

  checkColission({ bullet, wallsPodval, enemies, bullets }) {
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

    enemies.forEach((enemy) => {
      if (
        bullet.position.x < enemy.position.x + enemy.width &&
        bullet.position.x + 4 > enemy.position.x &&
        bullet.position.y < enemy.position.y + enemy.height &&
        bullet.position.y + 4 > enemy.position.y
      ) {
        enemy.health -= 10;
        const indexB = bullets.indexOf(bullet);
        if (indexB > -1) {
          bullets.splice(indexB, 1);
        }
        if (enemy.health <= 0) {
          const index = enemies.indexOf(enemy);
          if (index > -1) {
            enemies.splice(index, 1);
          }
        }
      }
    });
  }
}
