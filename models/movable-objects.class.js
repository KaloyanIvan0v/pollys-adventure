class MovableObject extends DrawableObject {
  speedX = 0;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  flipImg = false;
  currentCollisionState = false;
  collisionDetected;
  alreadyDead = false;
  onGround = true;
  collectable = false;

  /**
   * Constructs a new movable object.
   */
  constructor() {
    super();
  }

  /**
   * Applies gravity to the object, causing it to fall if not grounded or jumping.
   * @param {number} fallSpeed - The rate at which the object falls.
   */
  applyGravity(fallSpeed) {
    if (!gamePaused) {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration * fallSpeed;
      }
    }
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    return this.y + this.height < 430;
  }

  /**
   * Moves the object to the right.
   * @param {number} speedMultiplier - Multiplier for the movement speed.
   */
  moveRight(speedMultiplier) {
    this.x += this.speedX * speedMultiplier;
    this.flipImg = false;
  }

  /**
   * Moves the object to the left.
   * @param {number} speedMultiplier - Multiplier for the movement speed.
   * @param {boolean} flipImg - Flag indicating if the image should be flipped.
   */
  moveLeft(speedMultiplier, flipImg) {
    this.x -= this.speedX * speedMultiplier;
    this.flipImg = flipImg;
  }

  /**
   * Initiates a jump action for the object, setting its vertical speed.
   */
  jump() {
    this.speedY = 8;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {*} obj - The object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  /**
   * Checks if the object is dead based on its energy level.
   * @returns {boolean} True if energy is zero or less, false otherwise.
   */
  isDead() {
    return this.energy <= 0 ? true : false;
  }

  /**
   * Checks if the object is currently hurt.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    return this.currentCollisionState;
  }

  /**
   * Checks if the object is jumping.
   * @returns {boolean} True if the object is jumping, false otherwise.
   */
  isJump() {
    return this.speedY > -8 ? true : false;
  }

  /**
   * Checks if the object is moving horizontally.
   * @returns {boolean} True if the object's horizontal speed is not zero, false otherwise.
   */
  objMoves() {
    return this.speedX != 0 ? true : false;
  }

  /**
   * Plays an animation once for the object.
   * @param {*} imgArray - Array of images for the animation frames.
   * @param {number} animationSpeed - Speed of the animation in milliseconds.
   * @param {*} sound - Optional sound to play with the animation.
   */
  playAnimationOnce(imgArray, animationSpeed, sound) {
    if (!this.alreadyDead) {
      this.setCurrentImgToZeroOnce();
      if (this.currentImg < imgArray.length) {
        this.playAnimation(imgArray, animationSpeed);
        this.framesPlayed++;
      } else {
        this.setDeadState(sound);
      }
    }
  }

  /**
   * Sets the current image index to zero once when starting an animation.
   */
  setCurrentImgToZeroOnce() {
    if (!this.playedAnimationOnce) {
      this.playedAnimationOnce = true;
      this.currentImg = 0;
    }
  }

  /**
   * Sets the object's state to dead, stopping any associated sound.
   * @param {*} sound - Optional sound to stop when setting dead state.
   */
  setDeadState(sound) {
    this.alreadyDead = true;
    this.speedX = 0;
    if (sound) {
      this.stopSound(sound);
    }
  }

  /**
   * Plays an animation for the object.
   * @param {*} images - Array of images for the animation frames.
   * @param {number} animationSpeed - Speed of the animation in milliseconds.
   * @returns {boolean} True if animation frame was successfully updated, false otherwise.
   */
  playAnimation(images, animationSpeed) {
    if (this.updateAnimationTime(animationSpeed)) {
      if (this.getNextAnimationFrame(images)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  /**
   * Updates the animation timing, determining if it's time to move to the next frame.
   * @param {number} animationSpeed - Speed of the animation in milliseconds.
   * @returns {boolean} True if enough time has passed for the next frame, false otherwise.
   */
  updateAnimationTime(animationSpeed) {
    const now = Date.now();
    if (now - this.lastFrameTime >= animationSpeed) {
      this.lastFrameTime = now;
      return true;
    }
    return false;
  }

  /**
   * Retrieves the next animation frame from the array of images.
   * @param {*} images - Array of images for the animation frames.
   * @returns {boolean} True if next animation frame was successfully retrieved, false otherwise.
   */
  getNextAnimationFrame(images) {
    const currentIndex = this.currentImg % images.length;
    const imagePath = images[currentIndex];
    const img = this.imgCache[imagePath];
    if (img) {
      this.applyFilterToEverySecondFrame(img);
      this.currentImg++;
      this.animationRunOnce = this.currentImg >= images.length;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Applies a red filter to every second frame of an image if the entity is hurt.
   * @param {Image} img - The image to apply the filter to.
   */
  applyFilterToEverySecondFrame(img) {
    if (this.isHurt() && this.currentImg % 2 === 1) {
      this.img = this.applyRedFilter(img);
    } else {
      this.img = img;
    }
  }

  /**
   * Applies a red filter to the given image.
   * @param {*} img - The image to apply the red filter to.
   * @returns {*} Filtered image with a red overlay.
   */
  applyRedFilter(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.setFilterColor(imageData);
    ctx.putImageData(imageData, 0, 0);
    const filteredImg = new Image();
    filteredImg.src = canvas.toDataURL();
    return filteredImg;
  }

  /**
   * Sets a specific filter color (red: 255, green: 20, blue: 80) to an ImageData object.
   * @param {ImageData} imageData - The ImageData object to set the filter color on.
   */
  setFilterColor(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255;
      data[i + 1] = 20;
      data[i + 2] = 80;
    }
  }

  /**
   * Sets a random X position for the object within a specified range.
   */
  setRandomXPosition() {
    this.x = 300 + Math.random() * 4100;
  }

  /**
   * Sets a random horizontal speed for the object within a specified range.
   */
  setRandomXSpeed() {
    this.speedX = 0.2 + Math.random() * 0.5;
  }
}
