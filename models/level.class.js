class Level {
  enemies = [];
  drones = [];
  decorations = [
    new DecorationObject(-830, 280, 300, 150, "/img/objects/cars/yellow-car.png"),
    new DecorationObject(-560, 350, 60, 80, "/img/objects/water-hydrant/001-003.png"),
    new FireAnimation(-590, 220, 50, 150),
    new DecorationObject(700, 351, 170, 80, "/img/objects/bench/002.png"),
    new DecorationObject(650, 390, 40, 40, "/img/objects/basket/001.png"),
    new DecorationObject(2310, 388, 45, 45, "/img/objects/box/dead/005-002.png"),
    new FireAnimation(2310, 293, 40, 120),
    new Bird(-270, 52),
    new Bird(393, 158),
    new Bird(3910, 112),
    new Bird(3950, 106),
    new Cat(2240, 375, "dark"),
    new DecorationObject(
      4230,
      60,
      880,
      600,
      "/img/objects/enemy-ship/Ship3.png",
      "/audio/objects/alien-ship.mp3"
    ),
  ];
  backgroundObjects1 = [];
  backgroundObjects2 = [];
  backgroundObjects3 = [];
  backgroundObjects4 = [];
  backgroundObjects5 = [];
  level_end_x = 4300;

  /**
   * Creates a new level with specified numbers of enemies and drones.
   * @param {number} enemiesAmount - Number of enemies in the level.
   * @param {number} dronesAmount - Number of drones in the level.
   */
  constructor(enemiesAmount, dronesAmount) {
    this.generateLevel(enemiesAmount, dronesAmount);
    this.constructBackground();
    this.generateStreetLights();
    this.generateAdvertising();
  }

  /**
   * Generates advertising decoration objects and adds them to decorations.
   */
  generateAdvertising() {
    this.decorations.push(
      new DecorationObject(-130, 240, 90, 45, "/img/objects/advertising/128x64/5.png"),
      new DecorationObject(1970, 110, 120, 68, "/img/objects/advertising/128x64/12.png"),
      new DecorationObject(2765, 287, 105, 75, "/img/objects/advertising/128x64/1.png"),
      new DecorationObject(3643, 155, 90, 45, "/img/objects/advertising/128x64/3.png"),
      new DecorationObject(401, 190, 40, 80, "/img/objects/advertising/22x40/4.png"),
      new DecorationObject(2500, 162, 40, 70, "/img/objects/advertising/22x40/15.png"),
      new DecorationObject(3923, 210, 30, 80, "/img/objects/advertising/22x40/6.png"),
      new DecorationObject(4682, 113, 60, 143, "/img/objects/advertising/22x40/14.png"),
      new DecorationObject(-390, 295, 40, 40, "/img/objects/advertising/64x64/10.png"),
      new DecorationObject(1348, 258, 55, 55, "/img/objects/advertising/64x64/8.png")
    );
  }

  /**
   * Generates street lights decoration objects and adds them to decorations.
   */
  generateStreetLights() {
    for (let i = -280; i < 6000; i += 880) {
      let streetLight = new DecorationObject(i, 80, 50, 350, "/img/objects/street-lamp/003.png");
      this.decorations.push(streetLight);
    }
  }

  /**
   * Generates enemies and drones for the level.
   * @param {number} enemiesAmount - Number of enemies to generate.
   * @param {number} dronesAmount - Number of drones to generate.
   */
  generateLevel(enemiesAmount, dronesAmount) {
    let enemies = [];
    let drones = [];
    for (let i = 0; i < enemiesAmount; i++) {
      enemies.push(new SmallEnemy());
      this.enemies = enemies;
    }
    for (let i = 0; i < dronesAmount; i++) {
      drones.push(new Drone(9500));
      this.drones = drones;
    }
  }

  /**
   * Constructs background objects for the level.
   */
  constructBackground() {
    let backgroundImages = [[], [], [], [], []];
    this.constructBackgroundLayers(backgroundImages);
    this.constructGroundTiles(backgroundImages);
    this.setBackgroundObjects(backgroundImages);
  }

  /**
   * Constructs background layers and populates them into the provided backgroundImages array.
   * @param {Array<Array<BackgroundObject>>} backgroundImages - Array of arrays to store background objects for each layer.
   */
  constructBackgroundLayers(backgroundImages) {
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
  }

  /**
   * Constructs ground tiles and populates them into the provided backgroundImages array.
   * @param {Array<Array<BackgroundObject>>} backgroundImages - Array of arrays to store background objects for each layer.
   */
  constructGroundTiles(backgroundImages) {
    for (let i = -15; i < 100; i++) {
      backgroundImages[0].push(
        new BackgroundObject("/img/background/ground/Tile_02.png", 50 * i, 429, 50, 50)
      );
    }
  }

  /**
   * Sets the background objects arrays for different layers from the provided backgroundImages.
   * @param {Array<Array<BackgroundObject>>} backgroundImages - Array of arrays containing background objects for each layer.
   */
  setBackgroundObjects(backgroundImages) {
    this.backgroundObjects1 = backgroundImages[0];
    this.backgroundObjects2 = backgroundImages[1];
    this.backgroundObjects3 = backgroundImages[2];
    this.backgroundObjects4 = backgroundImages[3];
    this.backgroundObjects5 = backgroundImages[4];
  }
}
