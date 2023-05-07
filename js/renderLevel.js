import { Enemy, OBSERVER } from "./classes.js";
import { first, fourth, second, third } from "./typesOfEnemies.js";

/**
Renders the enemies for a given game level
@function
@param {Object} level - Game level object
@param {Object} options - Object containing game options
@param {number} options.cvsWidth - Width of the game canvas
@param {number} options.cvsHeight - Height of the game canvas
@param {Object[]} options.enemies - Array of enemies for the game level
*/

const renderEnemy = (enemy, cvsWidth, cvsHeight) => {
  enemy.position = {
    x: Math.floor(Math.random() * cvsWidth),
    y: Math.floor(Math.random() * cvsHeight),
  };
  return new Enemy(enemy);
};

export const renderLevel = (level, { cvsWidth, cvsHeight, enemies }) => {
  let enemy = null;
  level.day.forEach(({ count, enemyType }) => {
    for (let i = 0; i < count; i++) {
      if (enemyType === 1) {
        enemy = renderEnemy(first, cvsWidth, cvsHeight);
      } else if (enemyType === 2) {
        enemy = renderEnemy(second, cvsWidth, cvsHeight);
      } else if (enemyType === 3) {
        enemy = renderEnemy(third, cvsWidth, cvsHeight);
      } else if (enemyType === 4) {
        enemy = renderEnemy(fourth, cvsWidth, cvsHeight);
      }
      OBSERVER.addObserver(enemy);
      enemies.push(enemy);
    }
  });
};
