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

  constructor() {
    super();
  }

  applyGravity(fallSpeed) {
    if (!gamePaused) {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration * fallSpeed;
      }
    }
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

  ifObjIsHurtApplyFilter(img, i) {
    if (i % 2 === 1 && this.isHurt()) {
      img = this.applyFilter(img);
    }
  }

  jump() {
    this.speedY = 8;
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
    return this.speedY > -8 ? true : false;
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

  playAnimation(images, animationSpeed) {
    const now = Date.now();
    if (now - this.lastFrameTime >= animationSpeed) {
      const currentIndex = this.currentImg % images.length;
      const imagePath = images[currentIndex];
      const img = this.imgCache[imagePath];
      if (img) {
        if (this.isHurt() && this.currentImg % 2 === 1) {
          this.img = this.applyRedFilter(img);
        } else {
          this.img = img;
        }
        this.currentImg++;
        this.lastFrameTime = now;
        this.animationRunOnce = this.currentImg >= images.length;
      } else {
        console.error(`Image not found in cache: ${imagePath}`);
      }
    }
  }

  applyRedFilter(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255;
      data[i + 1] = 20;
      data[i + 2] = 80;
    }

    ctx.putImageData(imageData, 0, 0);
    const filteredImg = new Image();
    filteredImg.src = canvas.toDataURL();
    return filteredImg;
  }

  setRandomXPosition() {
    this.x = 300 + Math.random() * 4100;
  }

  setRandomXSpeed() {
    this.speedX = 0.2 + Math.random() * 0.5;
  }
}
