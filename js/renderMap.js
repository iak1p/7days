export const renderMap = (GAME_VAR, PLAYER) => {
  const ctx = document.getElementById("canvas").getContext("2d");
  const pol = new Image();
  const polPodval = new Image();
  const bed = new Image();
  pol.src = "./img/pol.png";
  polPodval.src = "./img/polPodval.png";
  bed.src = "./img/bed.png";

  if (GAME_VAR.inHome) {
    PLAYER.walls = GAME_VAR.wallsHome;
    if (GAME_VAR.cheat) {
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "red";
      ctx.fillText(`Cheat mode`, 300, 30);
    }

    GAME_VAR.wallsHome.forEach((wall) => {
      const img = new Image();
      img.src = wall.src;
      ctx.drawImage(img, wall.x, wall.y, wall.width, wall.height);
    });
    ctx.drawImage(pol, 295, 227, 907, 536);
    ctx.drawImage(bed, 300, 230);


    if (
      PLAYER.position.x + 40 < 1224 &&
      PLAYER.position.x + 40 > 1160 &&
      PLAYER.position.y + 68 < 560 &&
      PLAYER.position.y + 68 > 414 &&
      GAME_VAR.playerSleep
    ) {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Press E to enter basement",
        PLAYER.position.x - 40,
        PLAYER.position.y - 10
      );
    } else if (
      PLAYER.position.x + 40 < 500 &&
      PLAYER.position.x + 40 > 300 &&
      PLAYER.position.y + 68 < 550 &&
      PLAYER.position.y + 68 > 300 &&
      !GAME_VAR.playerSleep
    ) {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText("Press E to sleep", PLAYER.position.x - 20, PLAYER.position.y - 10);
    } else {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(`${PLAYER.health}`, PLAYER.position.x, PLAYER.position.y);
    }
  } else {
    PLAYER.walls = GAME_VAR.wallsPodval;
    GAME_VAR.wallsPodval.forEach((wall) => {
      const img = new Image();
      img.src = wall.src;
      ctx.drawImage(img, wall.x, wall.y, wall.width, wall.height);
    });
    if (GAME_VAR.cheat) {
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "red";
      ctx.fillText(`Cheat mode`, 300, 30);
    }
    ctx.drawImage(polPodval, 33, 149, 1471, 700);
    ctx.font = "32px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Day ${GAME_VAR.levelNum}`, 20, 30);

    if (
      PLAYER.position.x + 40 < 120 &&
      PLAYER.position.x + 40 > 33 &&
      PLAYER.position.y + 68 < 509 &&
      PLAYER.position.y + 68 > 366 &&
      GAME_VAR.levelIsOver
    ) {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Press E to enter home",
        PLAYER.position.x - 20,
        PLAYER.position.y - 10
      );
    } else {
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(`${PLAYER.health}`, PLAYER.position.x, PLAYER.position.y);
    }
  }
};
