class Sound {
  distanceVolume = 1;
  constructor() {}

  adjustSoundVolumeByDistance(targetObj, obj) {
    if (!obj.alreadyDead) {
      this.adjustSoundVolumeByDistanceHelper(targetObj, obj);
    }
  }

  adjustSoundVolumeByDistanceHelper(targetObj, obj) {
    let distance = Math.sqrt(Math.pow(targetObj.x - obj.x, 2));
    if (distance <= 650) {
      let volume;
      if (distance > 100) {
        volume = (700 - distance) / 600;
      } else {
        volume = 1;
      }
      obj.distanceVolume = volume;
    } else {
      obj.distanceVolume = 0;
    }
  }

  playSound(sound, objVolume, soundVolume) {
    if (sound) {
      if (objVolume === undefined) {
        objVolume = 1;
      }
      if (soundVolume === undefined) {
        soundVolume = 1;
      }
      sound.volume = soundVolume * objVolume * this.distanceVolume;
      if (!muteSound && sound.paused) {
        activeSounds.push(sound);
        sound.play();
      } else {
        if (muteSound) {
          sound.pause();
        }
      }
    }
  }

  stopSound(sound) {
    if (sound) {
      sound.pause();
    }
  }
}
