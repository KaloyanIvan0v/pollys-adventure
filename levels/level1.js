let level1 = new Level(
  [
    new SmallEnemy(),
    new SmallEnemy(),
    new SmallEnemy(),
    new SmallEnemy(),
    new SmallEnemy(),
    new SmallEnemy(),
    new SmallEnemy(),
  ],
  []
);
let backgroundImages = [[], [], [], [], []];

function constructBackground() {
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
  level1.backgroundObjects1 = backgroundImages[0];
  level1.backgroundObjects2 = backgroundImages[1];
  level1.backgroundObjects3 = backgroundImages[2];
  level1.backgroundObjects4 = backgroundImages[3];
  level1.backgroundObjects5 = backgroundImages[4];
}

constructBackground();
