class Cat extends MovableObject {
  CAT_DARK_IDLE = [
    "/img/characters/cats/cat-dark/idle/004-000.png",
    "/img/characters/cats/cat-dark/idle/004-001.png",
    "/img/characters/cats/cat-dark/idle/004-002.png",
    "/img/characters/cats/cat-dark/idle/004-003.png",
  ];

  CAT_LIGHT_SLEEP = ["/img/characters/cats/cat-light/sleep/002-000.png"];
  catMiaow = new Audio("/audio/cat/cat-98721.mp3");
  catPurrs = new Audio("/audio/cat/cat-purrs.mp3");

  width = 55;
  height = 55;

  constructor(x, y, choseCat) {
    super();
    this.loadImg("/img/characters/dog/idle/004-000.png");
    this.x = x;
    this.y = y;
    this.choseCat = choseCat;
    this.loadImages(this.CAT_DARK_IDLE);
    this.loadImages(this.CAT_LIGHT_SLEEP);
    this.playAnimation(this.CAT_DARK_IDLE, 200);
  }

  objLoop() {
    if (this.choseCat == "light") {
      this.playAnimation(this.CAT_LIGHT_SLEEP, 200);
    } else {
      this.playAnimation(this.CAT_DARK_IDLE, 200);
    }
    this.handleSound();
  }

  handleSound() {
    if (this.calculateDistance(this, world.character) < 200) {
      this.playLastSound(this.catMiaow, 1, soundVolumeGame);
    } else {
    }
    this.playSound(this.catPurrs, 1, soundVolumeGame);
    this.adjustSoundVolumeByDistance(world.character, this);
  }
}
