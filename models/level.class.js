class Level {
  enemies = [];
  drones = [];
  backgroundObjects1 = [];
  backgroundObjects2 = [];
  backgroundObjects3 = [];
  backgroundObjects4 = [];
  backgroundObjects5 = [];
  level_end_x = 4300;

  constructor(enemiesAmount, dronesAmount) {
    this.generateLevel(enemiesAmount, dronesAmount);
    this.constructBackground();
  }

  generateLevel(enemiesAmount, dronesAmount) {
    let enemies = [];
    let drones = [];
    for (let i = 0; i < enemiesAmount; i++) {
      enemies.push(new SmallEnemy());
      this.enemies = enemies;
    }
    for (let i = 0; i < dronesAmount; i++) {
      drones.push(new Drone());
      this.drones = drones;
    }
  }

  constructBackground() {
    let backgroundImages = [[], [], [], [], []];
    for (let i = -1; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        let obj = new BackgroundObject(
          `/img/background/background-layer/${i + 2}/Day/${j + 1}.png`,
          i * 719,
          0,
          430,
          720
        );
        backgroundImages[j].push(obj);
      }
    }
    for (let i = -15; i < 100; i++) {
      backgroundImages[0].push(
        new BackgroundObject("/img/background/ground/Tile_02.png", 50 * i, 429, 50, 50)
      );
    }
    this.backgroundObjects1 = backgroundImages[0];
    this.backgroundObjects2 = backgroundImages[1];
    this.backgroundObjects3 = backgroundImages[2];
    this.backgroundObjects4 = backgroundImages[3];
    this.backgroundObjects5 = backgroundImages[4];
  }
}
