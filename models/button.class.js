class Button extends DrawableObject {
  x;
  y;
  width;
  height;
  images = [];
  img;
  lastHoverState = false;
  clickSound = new Audio("/audio/objects/button/button-click.mp3");

  constructor(x, y, width, height, images) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = images;
    this.loadImages(this.images);
    this.img = this.imgCache[this.images[0]];
  }

  animate(x_move, y_move, x_click, y_click, functionToCall) {
    if (this.isHovered(x_move, y_move) && !this.lastHoverState) {
      this.lastHoverState = true;
      this.hoveredAnimation();
      this.playSound(this.clickSound, 0.2, soundVolumeGUI);
    } else {
      if (this.lastHoverState && !this.isHovered(x_move, y_move)) {
        this.idleAnimation();
        this.lastHoverState = false;
      }
    }
    this.isClicked(x_click, y_click, functionToCall);
  }

  isClicked(x, y, functionToCall) {
    if (this.isHovered(x, y) && mouse.clickEnabled) {
      mouse.clickEnabled = false;
      functionToCall();
      this.toggleButtonImg();
    }
  }

  toggleButtonImg() {
    if (this.img == this.imgCache[this.images[0]]) {
      this.img = this.imgCache[this.images[1]];
    } else {
      this.img = this.imgCache[this.images[0]];
    }
  }

  isHovered(x, y) {
    let mouse_x = x;
    let mouse_y = y;
    return (
      mouse_x >= this.x &&
      mouse_x <= this.x + this.width &&
      mouse_y >= this.y &&
      mouse_y <= this.y + this.height
    );
  }
  hoveredAnimation() {
    this.x = this.x - 2;
    this.y = this.y - 2;
    this.height = this.height + 4;
    this.width = this.width + 4;
  }

  idleAnimation() {
    this.x = this.x + 2;
    this.y = this.y + 2;
    this.height = this.height - 4;
    this.width = this.width - 4;
  }
}
