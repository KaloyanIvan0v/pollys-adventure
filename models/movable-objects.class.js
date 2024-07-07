class MovableObject extends DrawableObject {
  speedX = 0;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  flipImg = false;
  currentCollisionState;
  collisionDetected;
  alreadyDead = false;
  onGround = true;
  collectible = false;

  constructor() {
    super();
  }

  applyGravity(fallSpeed) {
    setInterval(() => {
      if (!gamePaused) {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }
    }, 1000 / fallSpeed);
  }

  isAboveGround() {
    return this.y + this.height < 430;
  }

  moveRight(speedMultiplier) {
    this.x += this.speedX * speedMultiplier;
    this.flipImg = false;
  }

  moveLeft(speedMultiplier, flipImg) {
    this.x -= this.speedX * speedMultiplier;
    this.flipImg = flipImg;
  }

  playAnimation(images, animationSpeed) {
    const now = Date.now();
    if (now - this.lastFrameTime >= animationSpeed) {
      let i = this.currentImg % images.length;
      let path = images[i];
      let img = this.imgCache[path];
      this.ifObjIsHurtApplyFilter(img, i);
      this.img = img;
      this.currentImg++;
      this.lastFrameTime = now;
    }
  }

  ifObjIsHurtApplyFilter(img, i) {
    if (i % 2 === 1 && this.isHurt()) {
      img = this.applyFilter(img);
    }
  }

  jump() {
    this.speedY = 13;
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  isDead() {
    return this.energy <= 0 ? true : false;
  }

  isHurt() {
    return this.currentCollisionState;
  }

  isJump() {
    return this.speedY > -13 ? true : false;
  }

  objMoves() {
    return this.speedX != 0 ? true : false;
  }

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

  setCurrentImgToZeroOnce() {
    if (!this.playedAnimationOnce) {
      this.playedAnimationOnce = true;
      this.currentImg = 0;
    }
  }

  setDeadState(sound) {
    this.alreadyDead = true;
    this.speedX = 0;
    if (sound) {
      this.stopSound(sound);
    }
  }

  applyFilter(img) {
    const { canvas, ctx } = this.createCanvasWithImage(img);
    this.filterImageData(ctx, canvas.width, canvas.height);
    return this.createImageFromCanvas(canvas);
  }

  createCanvasWithImage(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return { canvas, ctx };
  }

  filterImageData(ctx, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  createImageFromCanvas(canvas) {
    const filteredImg = new Image();
    filteredImg.src = canvas.toDataURL();
    return filteredImg;
  }

  setRandomXPosition() {
    this.x = 300 + Math.random() * 4000;
  }

  setRandomXSpeed() {
    this.speedX = 0.2 + Math.random() * 0.5;
  }
}
