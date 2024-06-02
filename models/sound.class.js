class Sound {
  volume = 0;
  muter = 1;
  character;
  obj;

  constructor(character, obj) {
    this.character = character;
    this.obj = obj;
  }

  adjustSoundVolumeByDistance() {
    this.obj.forEach((enemy) => {
      if (!enemy.alreadyDead) {
        this.adjustSoundVolumeByDistanceHelper(enemy);
      }
    });
  }

  adjustSoundVolumeByDistanceHelper(enemy) {
    let distance = Math.sqrt(
      Math.pow(this.character.x - enemy.x, 2) + Math.pow(this.character.y - enemy.y, 2)
    );
    if (distance <= 650) {
      let volume;
      if (distance > 100) {
        volume = (700 - distance) / 600;
      } else {
        volume = 1;
      }
      enemy.volume = volume;
    } else {
      enemy.volume = 0;
    }
  }

  playSound(sound, volume) {
    if (sound) {
      if (volume === undefined) {
        volume = 1;
      }
      sound.volume = volume * this.volume * this.muter;

      //sound.play();
    }
  }

  stopSound(sound) {
    if (sound) {
      sound.pause();
    }
  }
}
