class Button extends DrawableObject {
  x;
  y;
  x_click;
  y_click;
  width;
  height;
  width_click;
  height_click;
  images = [];
  img;
  lastHoverState = false;
  buttonHovered = false;
  clickSound = new Audio("/audio/objects/button/button-click.mp3");
  x_multiplier = 1;
  y_multiplier = 1;
  buttonHovered = false;
  pressed = false;

  constructor(x, y, width, height, images) {
    super();
    this.x_multiplier = x;
    this.y_multiplier = y;
    this.x = x * canvas.width;
    this.y = y * canvas.height;
    this.x_click = x * canvasDimensions.width;
    this.y_click = y * canvasDimensions.height;
    this.width = width * canvas.width;
    this.height = height * canvas.height;
    this.width_click = width * canvasDimensions.width;
    this.height_click = height * canvasDimensions.height;
    this.images = images;
    this.loadImages(this.images);
    this.img = this.imgCache[this.images[0]];
  }

  animate(x_move, y_move, x_click, y_click, functionToCall) {
    if (this.isHovered(x_move, y_move) && !this.lastHoverState) {
      this.buttonIsHovered();
    } else {
      if (this.lastHoverState && !this.isHovered(x_move, y_move)) {
        this.buttonIsNotHovered();
      }
    }
    this.isClicked(x_click, y_click, functionToCall);
    this.handleCursor();
  }

  buttonIsHovered() {
    this.lastHoverState = true;
    this.buttonHovered = true;
    this.hoveredAnimation();
    this.playSound(this.clickSound, 0.2, soundVolumeGUI);
  }

  buttonIsNotHovered() {
    this.idleAnimation();
    this.lastHoverState = false;
    this.buttonHovered = false;
  }

  isClicked(x, y, functionToCall) {
    if (this.isHovered(x, y) && mouse.clickEnabled) {
      mouse.clickEnabled = false;
      functionToCall();
      this.toggleButtonImg();
      setTimeout(() => {
        canvas.style.cursor = "default";
      }, 20);
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
      mouse_x >= this.x_click &&
      mouse_x <= this.x_click + this.width_click &&
      mouse_y >= this.y_click &&
      mouse_y <= this.y_click + this.height_click
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

  handleCursor() {
    if (this.isHovered(mouse.lastMove.x, mouse.lastMove.y)) {
      lastHoveredButton = this;
      canvas.style.cursor = "pointer";
    } else {
      if (lastHoveredButton == this || lastHoveredButton == null) {
        canvas.style.cursor = "default";
        lastHoveredButton = null;
      }
    }
  }

  isTouched(startFunction, endFunction) {
    let anyTouchHovered = false;

    activeTouchPoints.forEach((touch) => {
      if (this.isHovered(touch.x, touch.y)) {
        anyTouchHovered = true;
        if (!this.pressed) {
          this.pressed = true;
          startFunction(this.pressed);
        }
      }
    });

    if (!anyTouchHovered) {
      if (this.pressed) {
        this.pressed = false;
        if (endFunction) {
          endFunction(this.pressed);
        }
      }
    }

    if (activeTouchPoints.size == 0) {
      this.pressed = false;
      if (endFunction) {
        endFunction(this.pressed);
      }
    }
  }
}
