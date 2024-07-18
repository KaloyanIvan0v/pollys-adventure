class DrawableObject extends Sound {
  img;
  imgCache = {};
  currentImg = 0;
  playedAnimationOnce = false;
  animationRunOnce = false;
  startRenderImgAmount = 0;
  lastFrameTime = Date.now();
  harmful = false;
  collectable = false;
  lastSoundPlayedOnce = false;

  /**
   * Creates a new drawable object.
   */
  constructor() {
    super();
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from an array of paths.
   * @param {Array<string>} arr - The array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  /**
   * Draws a frame around the object if it's an instance of certain classes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {string} color - The color of the frame.
   */
  drawFrame(ctx, color) {
    if (this instanceof Character || this instanceof SmallEnemy || this instanceof EndBoss) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Generates an array of image paths.
   * @param {Array<string>} array - The array to store the image paths.
   * @param {number} arrayLength - The length of the array.
   * @param {string} imgPath - The base path of the images.
   */
  generateImgPathArray(array, arrayLength, imgPath) {
    for (let i = arrayLength; i >= 0; i--) {
      i < 10 ? array.push(imgPath + `/00${i}.png`) : array.push(imgPath + `/0${i}.png`);
    }
  }

  /**
   * Flips the image horizontally on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  flipImgHorizontally(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.scale(-1, 1);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
  }

  /**
   * Restores the canvas context after a horizontal flip.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  flipImgHorizontallyBack(ctx) {
    ctx.restore();
  }

  /**
   * Rotates the image on the canvas.
   * @param {Object} obj - The object to rotate.
   * @param {HTMLImageElement} img - The image to rotate.
   * @param {number} angle - The angle of rotation in degrees.
   */
  rotateImg(obj, img, angle) {
    world.ctx.save();
    world.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
    world.ctx.rotate((angle * Math.PI) / 180);
    world.ctx.drawImage(img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
    world.ctx.restore();
  }

  /**
   * Checks if the object has hit the ground.
   * @returns {boolean} True if the object has hit the ground, false otherwise.
   */
  hitGround() {
    if (this.y >= 400) {
      return true;
    }
  }

  /**
   * Removes an object from an array.
   * @param {Array} objectArray - The array of objects.
   * @param {Object} object - The object to remove.
   */
  removeObject(objectArray, object) {
    let index = objectArray.indexOf(object);
    if (index > -1) {
      objectArray.splice(index, 1);
    }
  }

  /**
   * Calculates the distance between two objects.
   * @param {Object} obj - The first object.
   * @param {Object} targetObj - The target object.
   * @returns {number} The distance between the objects.
   */
  calculateDistance(obj, targetObj) {
    return Math.sqrt(Math.pow(obj.x - targetObj.x, 2) + Math.pow(obj.y - targetObj.y, 2));
  }

  /**
   * Checks if the animation is still running.
   * @returns {boolean} True if the animation is still running, false otherwise.
   */
  animationStillRunning() {
    return !this.animationRunOnce;
  }

  /**
   * Plays the last sound if it has not been played once.
   * @param {HTMLAudioElement} sound - The sound to play.
   * @param {number} objVolume - The volume of the sound for the object.
   * @param {number} soundVolume - The overall volume of the sound.
   */
  playLastSound(sound, objVolume, soundVolume) {
    if (!this.lastSoundPlayedOnce) {
      this.playSound(sound, objVolume, soundVolume);
      this.lastSoundPlayedOnce = true;
    }
  }
}
