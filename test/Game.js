const should = require(`chai`).should() //eslint-disable-line
const Game   = require(`../Game`)
const Player = require(`../Player`)

describe(`Game`, function () {
  it(`exists`, function () {
    Game.should.exist()
    Game.should.be.instanceof(Object)
  })
  it(`recognize when game is over`, function () {
    Game.should.respondTo(`gameOver`)
    Game.prototype.gameOver([0, 0]).should.equal(true)
    Game.prototype.gameOver([0, 1]).should.equal(true)
    Game.prototype.gameOver([1, 0]).should.equal(true)
    Game.prototype.gameOver([1, 1]).should.equal(false)
    Game.prototype.gameOver([-1, 1]).should.equal(true)
  })
  it(`implements fighting between two players`, function () {
    const attacker = new Player(1, `1`)
    const defender = new Player(2, `2`)
    const weakAtt  = new Player(3, `3`, 10)
    const weakDef  = new Player(4, `4`, 10)
    
    Game.should.respondTo(`fight`)
    Game.prototype.fight(attacker, defender).should.equal(90)
    Game.prototype.fight(defender, attacker).should.equal(90)
    Game.prototype.fight(defender, attacker).should.equal(80)
    Game.prototype.fight(weakAtt, weakDef).should.equal(0)
    Game.prototype.fight(weakAtt, weakDef).should.equal(0)
    Game.prototype.fight(weakDef, weakAtt).should.equal(0)
    Game.prototype.fight(weakDef, weakAtt).should.equal(0)
  })
  it(`registers players accordingly`, function () {
    const game = new Game()
    Game.should.respondTo(`addPlayer`)
    game.addPlayer(1, `1`).should.be.instanceof(Player)
  })
  it(`announces a winner`, function () {
    const game = new Game()
    game.should.respondTo(`winnerIs`)
  
    game.players.push([{health: 0}, {health: 1}])
    Game.prototype.winnerIs(game.players).should.equal(game.players[0])
  })
  it(`initialize with two players`, function () {
    const game = new Game()
    game.initialize().should.be.instanceOf(Game)
  })
})

