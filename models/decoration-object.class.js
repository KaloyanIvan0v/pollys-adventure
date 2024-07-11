class DecorationObject extends MovableObject {
  OBJECT_IMG = [];

  constructor(x, y, width, height, OBJECT_IMG) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.OBJECT_IMG = OBJECT_IMG;
    this.loadImg(this.OBJECT_IMG);
  }

  animate() {}
}
