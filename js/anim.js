import { OBSERVER } from "./classes.js";

/**

animPlayer - animates the player character's sprite based on the given control and animation values
@param {object} player - the player object with sprite and position properties
@param {object} control - the control object with left, right, up, and down boolean properties
@param {number} anim - the current animation frame number (defaults to 0)
@returns {undefined} - does not return a value
*/

export const animPlayer = (player, control, anim) => {
  let i = 0;
  let a = 0;
  anim = setInterval(function () {
    i++;
    a === 3 ? (a = 1) : a++;
    if (control.down || control.left || control.right || control.up) {
      player.width = 66;
      player.height = 66;
      if (i < 6) {
        player.left
          ? (player.sprite = `./img/playerRunLeft${i}.png`)
          : (player.sprite = `./img/playerRun${i}.png`);
      } else {
        i = 0;
      }
    } else {
      player.width = 40;
      player.height = 68;
      if (i <= 4) {
        player.left
          ? (player.sprite = `./img/playerIdle${i}_left.png`)
          : (player.sprite = `./img/playerIdle${i}.png`);
      } else {
        i = 0;
      }
    }
    OBSERVER.animEnemy(a);
  }, 100);
};
