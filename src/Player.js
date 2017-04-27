/**
 * A player constructor
 * @module Player
 * @see module:Weapon
 */

const Weapon = require(`./Weapon`)

/**
 *
 * @param id {Number} Player number
 * @param name {String} Player name
 * @param [health=100] {Number} Player HP
 * @param [couleur='#FFFFFF']{String} Player color
 * @constructor
 */
const Player   = function (id, name, health = 100, couleur = `#FFFFFF`) {
  this.id     = id
  this.name   = name
  this.weapon = new Weapon(`Pistolet`, 10)
  this.health = health
  this.color  = couleur
  this.speed  = 3
}

/**
 * @name Player.prototype.leaveWeapon
 * @description Drops the current weapon
 * @function
 * @returns weapon {Weapon}
 */
Player.prototype.leaveWeapon = function() {
    const weapon = this.weapon
    delete this.weapon
    return weapon
}
/**
 * @name Player.prototype.setWeapon
 * @description Drop the current weapon and give a weapon to a player
 * @param weapon {Weapon}
 * @returns this {Player}
 */
Player.prototype.setWeapon = function(weapon){
    this.leaveWeapon()
    this.weapon = weapon
    return this
}
module.exports = Player

  /*  this.leaveWeapon       = function (arme) {
   if (arme == pistolet) {
   if (!pistolet.x && !pistolet.y) {
   pistolet.x = Math.floor(Math.random() * Board.boardSize)
   pistolet.y = Math.floor(Math.random() * Board.boardSize)
   }
   } else if (arme == fusilAssaut) {
   fusilAssaut.x = Math.floor(Math.random() * Board.boardSize)
   fusilAssaut.y = Math.floor(Math.random() * Board.boardSize)
   }
   else if (arme == fusilPompe) {
   fusilPompe.x = Math.floor(Math.random() * Board.boardSize)
   fusilPompe.y = Math.floor(Math.random() * Board.boardSize)
   }
   else if (arme == bazooka) {
   bazooka.x = Math.floor(Math.random() * Board.boardSize)
   bazooka.y = Math.floor(Math.random() * Board.boardSize)
   }
   }
  this.dessiner  = function () {
   context.strokeStyle = this.color
   context.beginPath()
   context.lineWidth = 3
   context.arc(this.x * tailleCase + tailleCase / 2, this.y * tailleCase + tailleCase / 2, tailleCase / 2 - 2, 0,
   2 * Math.PI)
   context.stroke()
   context.fillStyle = 'white'
   context.font      = '20px Georgia'
   context.fillText(this.id, this.x * tailleCase + 25, this.y * tailleCase + 27)
   }*/
