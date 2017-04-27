/**
 * a board constructor
 * @module Board
 * @see module:Weapon
 * @see module:Player
 */

const Weapon = require(`./Weapon`)
/**
 * Board constructor to use with a Game
 * @param canvas {Object} Target canvas
 * @param width {Number} Width of the board
 * @param boardSize {Number} Number of squares per line
 * @constructor
 */
const Board  = function (width, boardSize) {

  this.width      = width
  this.squareSize = width / boardSize
  this.boardSize  = boardSize
  this.weapons    = []
  this.characters = []
  
}
/**
 * Places the object on the board by adding x & y properties to it
 * @param obj {Object} Target object
 * @returns {Number[]} An array containing the position [x, y] of the object
 */
Board.prototype.placeOnBoard = function (obj) {
  do {
    obj.x = Math.floor(Math.random() * this.boardSize)
    obj.y = Math.floor(Math.random() * this.boardSize)
  } while (this.checkCollision(0, 0))
  return [obj.x, obj.y]
}
/**
 * Adds & registers a new weapon to the Board
 * @param name The name of the weapon to add
 * @param power The weapon strength
 * @returns {number}
 */
Board.prototype.addWeapon = function (name, power) {
  const weapon = new Weapon(name, power)
  this.placeOnBoard(weapon)
  this.weapons.push(weapon)
  return this.weapons.indexOf(weapon)
}
/**
 * Removes a weapon from the game
 * @param weaponName {String} The weapon to remove
 * @returns {Weapon} The removed weapon
 * @throws {Error} if no such weapon is found
 */
Board.prototype.removeWeapon = function (weaponName) {
  const weaponIndex = this.weapons.findIndex((weapon, index) => weapon.name === weaponName)
  if (weaponIndex < 0) {
    throw new Error(`No such weapon registered`)
  }
  return this.weapons.splice(weaponIndex, 1)[0]
}
/**
 * Adds & registers a new character to the Board
 * @param character The charachter to add
 * @returns {number} The index of the character in the register
 */
Board.prototype.addCharacter = function (character) {
  this.placeOnBoard(character)
  this.characters.push(character)
  return this.characters.indexOf(character)
}
/**
 * Checks if the selected square is empty or not
 * @todo Implement this function
 * @param x {Number}
 * @param y {Number}
 * @returns {Boolean} true if an object is located at target position
 */
Board.prototype.checkCollision = function (x, y) {
  return false
}
/**
 * Moves the object on the board by changing its x & y properties
 * @param obj {Object} Target object
 * @param direction {String} The direction towards which the object should move
 * @returns {Object} An array containing the new position [x, y] of the object
 */
Board.prototype.moveObj = function (obj, direction) {
  switch (direction) {
    case `up`:
      obj.y -= 1
      break
    case `down`:
      obj.y += 1
      break
    case `right`:
      obj.x += 1
      break
    case `left`:
      obj.x -= 1
      break
    default :
      throw new Error(`Invalid move!`)
  }
  if (obj.speed) {
    obj.speed -= 1
  }
  return [obj.x, obj.y]
}

module.exports = Board
