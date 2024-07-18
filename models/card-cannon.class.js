class CardCannon extends MovableObject {
  x = 1680;
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

  /**
   * Constructor for initializing the Card Cannon object.
   */
  constructor() {
    super();
    this.loadImg("/img/objects/card_machine/active/1.png");
    this.loadImages(this.CARD_CANNON_IDLE);
    this.loadImages(this.CARD_CANNON_WAKE);
    this.loadImages(this.CARD_CANNON_SLEEP);
    this.loadImages(this.CARD_CANNON_ATTACK);
  }

  /**
   * Main loop function for the Card Cannon's behavior.
   * @param {Character} character - The main character object.
   * @param {Array<ThrowableObject>} throwableObjectsArray - Array of throwable objects.
   */
  objLoop(character, throwableObjectsArray) {
    if (this.distanceTo(character) < 250) {
      this.handleAttackState();
      this.throwEveryXSeconds(throwableObjectsArray);
    } else if (this.distanceTo(character) < 420) {
      this.handleWakeState(character);
    } else {
      this.handleSleepState();
    }
    this.adjustSoundVolumeByDistance(character, this);
  }

  distanceTo(character) {
    return this.calculateDistance(this, character);
  }

  /**
   * Handles the Card Cannon's attack state behavior.
   */
  handleAttackState() {
    if (!this.animationRunOnce) {
      this.attackAnimation();
      this.playSound(this.focusAudio);
    }
    this.currentState = "attack";
    this.updateAnimation();
  }

  /**
   * Handles the Card Cannon's wake state behavior.
   * @param {object} character - The character object that the Card Cannon interacts with.
   */
  handleWakeState(character) {
    // Runs wake animation and plays corresponding sound if animation hasn't run before.
    if (!this.animationRunOnce) {
      this.wakeAnimation();
      this.wakeSoundDependingOnPreviousState(character);
    }
    this.currentState = "wake";
    this.wakeAnimationDependingOnPreviousState();
  }

  /**
   * Plays wake sound based on character distance.
   * @param {object} character - The character object that the Card Cannon interacts with.
   */
  wakeSoundDependingOnPreviousState(character) {
    // Plays focusAudio if character is within 300 units, otherwise plays transformAudio with reduced volume.
    if (this.distanceTo(character) < 300) {
      this.playSound(this.focusAudio);
    } else {
      this.playSound(this.transformAudio, 0.3);
    }
  }

  /**
   * Updates wake animation based on previous state.
   */
  wakeAnimationDependingOnPreviousState() {
    // Updates animation to frame 4 if returning from "attack" state, otherwise updates normally.
    if (this.lastState === "attack") {
      this.updateAnimation(4); // Sets the current image to frame 4 to skip playing the whole "wake" animation when returning from attack state.
    } else {
      this.updateAnimation();
    }
  }

  /**
   * Handles the Card Cannon's sleep state behavior.
   */
  handleSleepState() {
    if (!this.animationRunOnce) {
      this.sleepAnimation();
      this.playSound(this.transformAudio, 0.3);
    }
    this.currentState = "sleep";
    this.updateAnimation();
  }

  /**
   * Plays the sleep animation of the Card Cannon.
   */
  sleepAnimation() {
    this.imgArrayLength = this.CARD_CANNON_SLEEP.length;
    this.playAnimation(this.CARD_CANNON_SLEEP, 182);
  }

  /**
   * Plays the wake animation of the Card Cannon.
   */
  wakeAnimation() {
    this.imgArrayLength = this.CARD_CANNON_WAKE.length;
    this.playAnimation(this.CARD_CANNON_WAKE, 182);
  }

  /**
   * Plays the attack animation of the Card Cannon.
   */
  attackAnimation() {
    this.imgArrayLength = this.CARD_CANNON_ATTACK.length;
    this.playAnimation(this.CARD_CANNON_ATTACK, 182);
  }

  /**
   * Updates the animation state of the Card Cannon.
   * @param {number} currentImg - The current image index for the animation.
   */
  updateAnimation(currentImg) {
    if (this.lastState != this.currentState) {
      this.lastState = this.currentState;
      this.animationRunOnce = false;
      currentImg ? (this.currentImg = currentImg) : (this.currentImg = 0);
    }
  }

  /**
   * Throws a card object into the throwable objects array.
   * @param {Array<ThrowableObject>} list - The array of throwable objects.
   */
  throwCard(list) {
    let x_Speed = -1 + Math.random() * -5;
    let card = new Card(this.x, this.y, x_Speed, 15, 40);
    card.harmful = false;
    this.playSound(this.throw);
    setTimeout(() => {
      card.collectable = true;
    }, 100);
    list.push(card);
  }

  /**
   * Throws a card object into the throwable objects array every 3 seconds.
   * @param {Array<ThrowableObject>} list - The array of throwable objects.
   */
  throwEveryXSeconds(list) {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastThrowTime >= 3000) {
      this.throwCard(list);
      this.lastThrowTime = currentTime;
    }
  }
}
