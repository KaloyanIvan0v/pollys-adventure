class CardCannon extends MovableObject {
  x = 400;
  y = 361;
  width = 80;
  height = 70;
  speedX = 0;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  currentState = "idle";
  lastState = "idle";
  playAnimationState = true;

  lastThrowTime = 0;

  focusAudio = new Audio("/audio/objects/card-cannon/focus-target.wav");
  transformAudio = new Audio("/audio/objects/card-cannon/transform.wav");
  throw = new Audio("/audio/objects/throw-card.mp3");

  CARD_CANNON_IDLE = [
    "/img/objects/card_machine/sleep/15.png",
    "/img/objects/card_machine/sleep/15.png",
  ];

  CARD_CANNON_WAKE = [
    "/img/objects/card_machine/active/1.png",
    "/img/objects/card_machine/active/2.png",
    "/img/objects/card_machine/active/3.png",
    "/img/objects/card_machine/active/4.png",
    "/img/objects/card_machine/active/5.png",
    "/img/objects/card_machine/active/6.png",
  ];

  CARD_CANNON_SLEEP = [
    "/img/objects/card_machine/sleep/10.png",
    "/img/objects/card_machine/sleep/11.png",
    "/img/objects/card_machine/sleep/12.png",
    "/img/objects/card_machine/sleep/13.png",
    "/img/objects/card_machine/sleep/14.png",
    "/img/objects/card_machine/sleep/15.png",
  ];

  CARD_CANNON_ATTACK = [
    "/img/objects/card_machine/sleep/8.png",
    "/img/objects/card_machine/sleep/8.png",
  ];

  constructor() {
    super();
    this.loadImg("/img/objects/card_machine/active/1.png");
    this.loadImages(this.CARD_CANNON_IDLE);
    this.loadImages(this.CARD_CANNON_WAKE);
    this.loadImages(this.CARD_CANNON_SLEEP);
    this.loadImages(this.CARD_CANNON_ATTACK);
  }

  objLoop(character, throwableObjectsArray) {
    const distance = this.calculateDistance(this, character);
    if (distance < 250) {
      this.handleAttackState();
      this.throwEveryXSeconds(throwableObjectsArray);
    } else if (distance < 420) {
      this.handleWakeState(distance);
    } else {
      this.handleSleepState();
    }
    this.adjustSoundVolumeByDistance(character, this);
  }

  handleAttackState() {
    if (!this.animationRunOnce) {
      this.attackAnimation();
      this.playSound(this.focusAudio);
    }
    this.currentState = "attack";
    this.updateAnimation();
  }

  handleWakeState(distance) {
    if (!this.animationRunOnce) {
      this.wakeAnimation();
      if (distance < 300) {
        this.playSound(this.focusAudio);
      } else {
        this.playSound(this.transformAudio, 0.3);
      }
    }
    this.currentState = "wake";
    if (this.lastState === "attack") {
      this.updateAnimation(4);
    } else {
      this.updateAnimation();
    }
  }

  handleSleepState() {
    if (!this.animationRunOnce) {
      this.sleepAnimation();
      this.playSound(this.transformAudio, 0.3);
    }
    this.currentState = "sleep";
    this.updateAnimation();
  }

  sleepAnimation() {
    this.imgArrayLength = this.CARD_CANNON_SLEEP.length;
    this.playAnimation(this.CARD_CANNON_SLEEP, 182);
  }

  wakeAnimation() {
    this.imgArrayLength = this.CARD_CANNON_WAKE.length;
    this.playAnimation(this.CARD_CANNON_WAKE, 182);
  }

  attackAnimation() {
    this.imgArrayLength = this.CARD_CANNON_ATTACK.length;
    this.playAnimation(this.CARD_CANNON_ATTACK, 182);
  }

  updateAnimation(currentImg) {
    if (this.lastState != this.currentState) {
      this.lastState = this.currentState;
      this.animationRunOnce = false;
      currentImg ? (this.currentImg = currentImg) : (this.currentImg = 0);
    }
  }

  throwCard(list) {
    let x_Speed = -3 + Math.random() * -7;
    let card = new Card(this.x, this.y, x_Speed, 25, 40);
    card.harmful = false;
    this.playSound(this.throw);
    setTimeout(() => {
      card.collectable = true;
    }, 100);
    list.push(card);
  }

  throwEveryXSeconds(list) {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastThrowTime >= 3000) {
      this.throwCard(list);
      this.lastThrowTime = currentTime;
    }
  }
}
