const should = require('chai').should() //eslint-disable-line
const Player = require(`../src/Player`)
const Weapon = require(`../src/Weapon`)

describe(`Player`, function () {
  const player = new Player()
  const wetGun = new Weapon(`WetGun`)
  it(`is a viable Person`, function () {
    player.should.be.instanceof(Player)
    player.should.have.property(`name`)
    player.should.have.property(`id`)
    player.should.have.property(`weapon`)
    player.should.have.property(`health`)
    player.should.have.property(`color`)
    player.should.have.property(`speed`)
    player.should.not.have.property(`move`)
    player.prototype.should.have.property(`leaveWeapon`)
    player.prototype.should.have.property(`setWeapon`)

  })
  it(`picks up weapons`, function () {
    player.setWeapon(wetGun).should.be.equal(wetGun)
  })
  it(`drops a weapon on the ground`, function () {
    player.leaveWeapon().should.be.equal(wetGun)
  })
})
