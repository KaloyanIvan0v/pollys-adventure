/**
 * Represents a button that can be interacted with on the canvas.
 * Extends the DrawableObject class.
 */
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
  pressed = false;

  /**
   * Constructs a Button instance.
   * @param {number} x - The x-coordinate of the button's position relative to canvas width.
   * @param {number} y - The y-coordinate of the button's position relative to canvas height.
   * @param {number} width - The width of the button relative to canvas width.
   * @param {number} height - The height of the button relative to canvas height.
   * @param {Array} images - Array of image paths for the button in its default and clicked state.
   */
  constructor(x, y, width, height, images) {
    super();
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

  /**
   * Animates the button based on mouse movement and click events.
   * @param {number} x_move - The x-coordinate of the last mouse movement.
   * @param {number} y_move - The y-coordinate of the last mouse movement.
   * @param {number} x_click - The x-coordinate of the last mouse click.
   * @param {number} y_click - The y-coordinate of the last mouse click.
   * @param {Function} functionToCall - The function to call when the button is clicked.
   */
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

  /**
   * Checks if the button is hovered by the mouse.
   * @param {number} x - The x-coordinate to check against the button's clickable area.
   * @param {number} y - The y-coordinate to check against the button's clickable area.
   * @returns {boolean} True if the button is hovered, false otherwise.
   */
  isHovered(x, y) {
    return (
      x >= this.x_click &&
      x <= this.x_click + this.width_click &&
      y >= this.y_click &&
      y <= this.y_click + this.height_click
    );
  }

  /**
   * Handles the animation and state change when the button is hovered.
   */
  buttonIsHovered() {
    this.lastHoverState = true;
    this.buttonHovered = true;
    this.hoveredAnimation();
    this.playSound(this.clickSound, 0.2, soundVolumeGUI);
  }

  /**
   * Handles the animation and state change when the button is no longer hovered.
   */
  buttonIsNotHovered() {
    this.idleAnimation();
    this.lastHoverState = false;
    this.buttonHovered = false;
  }

  /**
   * Checks if the button is clicked and executes the associated function.
   * @param {number} x - The x-coordinate to check against the button's clickable area.
   * @param {number} y - The y-coordinate to check against the button's clickable area.
   * @param {Function} functionToCall - The function to call when the button is clicked.
   */
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

  /**
   * Toggles between the default and clicked state images of the button.
   */
  toggleButtonImg() {
    if (this.img === this.imgCache[this.images[0]]) {
      this.img = this.imgCache[this.images[1]];
    } else {
      this.img = this.imgCache[this.images[0]];
    }
  }

  /**
   * Handles the animation when the button is hovered.
   */
  hoveredAnimation() {
    this.x -= 2;
    this.y -= 2;
    this.height += 4;
    this.width += 4;
  }

  /**
   * Handles the animation when the button is not hovered.
   */
  idleAnimation() {
    this.x += 2;
    this.y += 2;
    this.height -= 4;
    this.width -= 4;
  }

  /**
   * Handles the cursor style based on whether the button is hovered.
   */
  handleCursor() {
    if (this.isHovered(mouse.lastMove.x, mouse.lastMove.y)) {
      lastHoveredButton = this;
      canvas.style.cursor = "pointer";
    } else {
      if (lastHoveredButton === this || lastHoveredButton === null) {
        canvas.style.cursor = "default";
        lastHoveredButton = null;
      }
    }
  }

  /**
   * Checks if the button is touched by a touch event and executes the associated functions.
   * @param {Function} startFunction - The function to call when the button is touched.
   * @param {Function} endFunction - The function to call when the touch ends.
   */
  isTouched(startFunction, endFunction) {
    // Initializes the buttonHovered state to false.
    this.buttonHovered = false;

    // Iterates through all active touch points.
    activeTouchPoints.forEach((touch) => {
      // Checks if the button is hovered (touched).
      if (this.isHovered(touch.x, touch.y)) {
        // Sets the button as pressed and calls the start function.
        this.setButtonPressed(startFunction);
      }
    });

    // If the button is not hovered, resets the pressed state and calls the end function.
    if (!this.buttonHovered) {
      this.resetButtonPressed(endFunction);
    }
  }

  /**
   * Sets the button as pressed and calls the provided start function.
   * @param {Function} startFunction - The function to call when the button is touched.
   */
  setButtonPressed(startFunction) {
    // Sets the buttonHovered state to true.
    this.buttonHovered = true;

    // Checks if the button is not already pressed.
    if (!this.pressed) {
      // Sets the pressed state to true and calls the start function.
      this.pressed = true;
      startFunction(this.pressed);
    }
  }

  /**
   * Resets the button pressed state and calls the provided end function if available.
   * @param {Function} endFunction - The function to call when the touch ends.
   */
  resetButtonPressed(endFunction) {
    // Checks if the button is pressed.
    if (this.pressed) {
      // Resets the pressed state to false and calls the end function if available.
      this.pressed = false;
      if (endFunction) {
        endFunction(this.pressed);
      }
    }
  }
}
