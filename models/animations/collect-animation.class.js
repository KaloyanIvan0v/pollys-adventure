class CollectAnimation extends DrawableObject {
  ITEM_IMG = [];
  height = 72;
  width = 72;

  constructor(x, y, width, height, imgPath) {
    super();
    this.x = x + 20;
    this.y = y;
    this.height = height;
    this.width = width;
    this.loadImg(imgPath);
  }

  animate() {
    setInterval(() => {
      console.log("animate");
      if (!gamePaused && world != undefined) {
        this.x + 200 > world.character.x ? this.x-- : null;
        this.y + 200 > world.character.y ? this.y-- : null;
      }
    }, 1000 / 60);
  }
}
