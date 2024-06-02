class Level {
  enemies;
  drones;
  backgroundObjects1 = [];
  backgroundObjects2 = [];
  backgroundObjects3 = [];
  backgroundObjects4 = [];
  backgroundObjects5 = [];
  level_end_x = 4300;

  constructor(
    enemies,
    drones,
    backgroundObjects1,
    backgroundObjects2,
    backgroundObjects3,
    backgroundObjects4,
    backgroundObjects5
  ) {
    this.enemies = enemies;
    this.drones = drones;
    this.backgroundObjects1 = backgroundObjects1;
    this.backgroundObjects2 = backgroundObjects2;
    this.backgroundObjects3 = backgroundObjects3;
    this.backgroundObjects4 = backgroundObjects4;
    this.backgroundObjects5 = backgroundObjects5;
  }
}
