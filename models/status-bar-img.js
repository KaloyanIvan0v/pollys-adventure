class StatusBarImg extends DrawableObject {
  x = 0;
  y = 0;
  width = 30;
  height = 30;

  constructor(x, y, imgPath) {
    super();
    this.x = x;
    this.y = y;
    this.loadImg(imgPath);
  }
}
