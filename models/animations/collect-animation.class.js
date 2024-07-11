class CollectAnimation extends DrawableObject {
  ITEM_IMG = [];
  height = 72;
  width = 72;
  endPositionReached = false;

  constructor(x, y, width, height, imgPath) {
    super();
    this.x = x + 20;
    this.y = y;
    this.height = height;
    this.width = width;
    this.loadImg(imgPath);
    world.animations.push(this);
  }

  objLoop() {
    if (!gamePaused && world != undefined) {
      this.x + 120 > world.character.x ? (this.x -= 7) : null;
      this.y + 295 > world.character.y ? (this.y -= 7 * 1.7) : (this.endPositionReached = true);
    }
  }
}
