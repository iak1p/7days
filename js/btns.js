document.getElementsByClassName("settings")[0].addEventListener("click", () => {
  document.getElementsByClassName("pause_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_menu")[0].style.display = "block";
  document.getElementsByClassName("settings_after_game_menu")[0].style.display =
    "none";
  document.getElementsByClassName("main_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_after_game_menu")[0].style.display =
    "none";

  document.getElementById("canvas").style.display = "none";
});

document
  .getElementsByClassName("settings_in_game")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("pause_menu")[0].style.display = "none";
    document.getElementsByClassName("settings_menu")[0].style.display = "none";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "block";
    document.getElementsByClassName("main_menu")[0].style.display = "none";

    document.getElementById("canvas").style.display = "none";
  });

document.getElementsByClassName("pause")[0].addEventListener("click", () => {
  document.getElementsByClassName("pause_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_after_game_menu")[0].style.display =
    "none";
  document.getElementsByClassName("main_menu")[0].style.display = "none";
  document.getElementsByClassName("settings_after_game_menu")[0].style.display =
    "none";

  document.getElementById("canvas").style.display = "block";
});

document
  .getElementsByClassName("back_to_main")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("pause_menu")[0].style.display = "none";
    document.getElementsByClassName("settings_menu")[0].style.display = "none";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "none";
    document.getElementsByClassName("main_menu")[0].style.display = "block";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "none";

    document.getElementById("canvas").style.display = "none";
  });

document
  .getElementsByClassName("back_to_game")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("pause_menu")[0].style.display = "block";
    document.getElementsByClassName("settings_menu")[0].style.display = "none";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "none";
    document.getElementsByClassName("main_menu")[0].style.display = "none";
    document.getElementsByClassName(
      "settings_after_game_menu"
    )[0].style.display = "none";

    document.getElementById("canvas").style.display = "none";
  });
