import { Bullet } from "./classes.js";

const createBullet = (e, GAME_VAR, PLAYER) => {
  return new Bullet({
    position: {
      x: PLAYER.position.x + 12,
      y: PLAYER.position.y + 12,
    },
    speed: 30,
    cursorPos: {
      x: e.clientX,
      y: e.clientY,
    },
    playerBullet: true,
    damage: GAME_VAR.levelNum * 2,
  });
};

export const playerShoot = (e, GAME_VAR, PLAYER) => {
  let bullet = null;
  if (GAME_VAR.canShoot && !GAME_VAR.inHome) {
    if (GAME_VAR.audioIsPlaying) {
      const piy = new Audio("../audio/shoot1.mp3");
      piy.volume = 0.5;
      piy.play();
    }
    if (GAME_VAR.levelNum <= 3) {
      bullet = createBullet(e, GAME_VAR, PLAYER);
    } else if (GAME_VAR.levelNum > 3 && GAME_VAR.levelNum <= 7) {
      bullet = createBullet(e, GAME_VAR, PLAYER);
      setTimeout(() => {
        bullet = createBullet(e, GAME_VAR, PLAYER);
        GAME_VAR.bullets.push(bullet);
      }, 100);
    } 
    GAME_VAR.bullets.push(bullet);
  }
};
