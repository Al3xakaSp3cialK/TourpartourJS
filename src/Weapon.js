/**
 * A weapon constructor
 * @module Weapon
 */

/**
 *
 * @param name='wetGun' {String} Weapon name
 * @param power=0 {Number} Weapon strength
 * @constructor
 */
const Weapon = function (name = `wetGun`, power = 0) {
  this.name  = name
  this.power = power
}

module.exports = Weapon
