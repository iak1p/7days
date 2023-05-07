import { Bullet } from "./classes.js";
let enemyShoot = null;

export function enemyShootig(player, GAME_VAR) {
  if (!GAME_VAR.levelIsOver) {
    enemyShoot = setInterval(() => {
      if (GAME_VAR.enemies.length > 0) {
        GAME_VAR.enemies?.forEach(({ type, position }) => {
          if (GAME_VAR.audioIsPlaying) {
            const piy = new Audio("../audio/shoot1.mp3");
            piy.volume = 0.5;
            piy.play();
          }
          const bullet = new Bullet({
            position: {
              x: position.x + 12,
              y: position.y + 12,
            },
            speed: type * 5,
            cursorPos: {
              x: player.position.x + player.width / 2,
              y: player.position.y + player.height / 2,
            },
            playerBullet: false,
            damage: type * 2,
          });
          GAME_VAR.bullets.push(bullet);
        });
      }
    }, Math.round(Math.random() * 500 + 800));
  } else {
    clearInterval(enemyShoot);
  }
}
