/**
 * Game constructor
 * @module Game
 * @see module:Board
 * @see module:Player
 * @see module:Weapon
 */

const Board  = require(`./Board`)
const Player = require(`./Player`)
const Weapon = require(`./Weapon`)

/**
 * A game constructor
 * @param [options] {Object}
 * @constructor
 */
const Game = function (options = {}) {
  if (!this.board) {
    this.board = new Board(options.canvasWidth, options.boardSize)
  }
  this.board.addWeapon(new Weapon(`Fusil d'assaut`, 32))
  this.board.addWeapon(new Weapon(`Fusil à pompe`, 35))
  this.board.addWeapon(new Weapon(`Bazooka`, 45))
  this.players = []
}
/**
 * Starts the game
 * @todo Should it be in the Game class?
 * @return {Game} this
 */
Game.prototype.initialize = function () {
  this.addPlayer(1, `1`)
  this.addPlayer(2, `2`)
  return this
}
/**
 * Add a player to this.players
 * @param id {Number}
 * @param name {String}
 * @return {Player} The added player
 */
Game.prototype.addPlayer = function (id, name) {
  const player = new Player(id, name)
  this.players.push(player)
  this.board.addCharacter(player)
  return player
}
/**
 * Checks if game is over
 * @param playersHealth {Array}
 * @return {Boolean}
 */
Game.prototype.gameOver =
  (playersHealth) => !playersHealth.reduce((prev, current) => prev > 0 && current > 0)
/**
 * Checks which player is the winner
 * @param players {Array}
 * @return {Player} The winner of the game
 */
Game.prototype.winnerIs = function (players) {
  return players.reduce((prev, current) => current.health > 0 ? current : prev)
}
/**
 * Implements fighting between two players
 * @param attacker {Player} The attacker
 * @param defender {Player} The defender
 * @return {Number} Remaining health of the defender
 */
Game.prototype.fight = (attacker, defender) => {
  defender.health -= attacker.weapon.power
  return defender.health > 0 ? defender.health : 0
}

module.exports = Game
