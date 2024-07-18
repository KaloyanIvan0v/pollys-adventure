/**
 * Class representing a sound manager.
 */
class Sound {
  /**
   * Distance-based volume multiplier for objects.
   * @type {number}
   */
  distanceVolume = 1;

  /**
   * Constructs a Sound object.
   */
  constructor() {}

  /**
   * Adjusts the volume of a sound based on the distance between two objects.
   * @param {DrawableObject} targetObj - The target object to calculate distance from.
   * @param {MovableObject} obj - The object whose volume needs adjustment based on distance.
   */
  adjustSoundVolumeByDistance(targetObj, obj) {
    if (!obj.alreadyDead) {
      this.adjustSoundVolumeByDistanceHelper(targetObj, obj);
    }
  }

  /**
   * Helper function to calculate and set the volume based on distance.
   * @param {DrawableObject} targetObj - The target object to calculate distance from.
   * @param {MovableObject} obj - The object whose volume needs adjustment based on distance.
   */
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

  /**
   * Plays a sound with adjusted volume.
   * @param {Audio} sound - The sound object to play.
   * @param {number} [objVolume=1] - Volume multiplier for the object.
   * @param {number} [soundVolume=1] - Volume multiplier for the sound.
   */
  /**
   * Plays a sound with adjusted volume.
   * @param {HTMLAudioElement} sound - The sound object (HTMLAudioElement) to play.
   * @param {number} [objVolume=1] - Volume multiplier for the object.
   * @param {number} [soundVolume=1] - Volume multiplier for the sound.
   */
  playSound(sound, objVolume, soundVolume) {
    objVolume = this.getObjVolume(objVolume);
    soundVolume = this.getSoundVolume(soundVolume);
    sound.volume = objVolume * soundVolume * this.distanceVolume;
    if (!muteSound && sound.paused) {
      activeSounds.push(sound);
      sound.play().catch((error) => {});
    } else if (muteSound && !sound.paused) {
      sound.pause();
    }
  }

  /**
   * Retrieves the volume multiplier for the object.
   * @param {number} objVolume - Volume multiplier for the object.
   * @returns {number} The adjusted volume multiplier for the object.
   */
  getObjVolume(objVolume) {
    if (objVolume === undefined) {
      objVolume = 1;
    }
    return objVolume;
  }

  /**
   * Retrieves the volume multiplier for the sound.
   * @param {number} soundVolume - Volume multiplier for the sound.
   * @returns {number} The adjusted volume multiplier for the sound.
   */
  getSoundVolume(soundVolume) {
    if (soundVolume === undefined) {
      soundVolume = 1;
    }
    return soundVolume;
  }

  /**
   * Stops a sound from playing.
   * @param {Audio} sound - The sound object to stop.
   */
  stopSound(sound) {
    if (sound) {
      sound.pause();
    }
  }
}
