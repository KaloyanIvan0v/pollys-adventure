class Ground extends MovableObject {
  constructor() {}

  renderGround() {
    this.width = 50;
    this.height = 50;
    this.loadImg("/img/background/ground/ground.png");
    this.y = 430;
    this.x = 0;
  }
}
