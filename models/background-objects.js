class BackgroundObject extends MovableObject {
  constructor(imagePath, x_position, y_position, height, width) {
    super().loadImg(imagePath);

    this.y = y_position;
    this.x = x_position;
    this.height = height;
    this.width = width;
  }
}
