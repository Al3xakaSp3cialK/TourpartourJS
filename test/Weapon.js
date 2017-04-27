const should = require('chai').should() //eslint-disable-line

const Weapon = require(`../src/Weapon`)

describe(`Weapon`, function () {
  it(`exists`, function () {
    Weapon.should.exist()
    Weapon.should.be.instanceof(Function)
  })
  it(`creates a suitable weapon`, function () {
    const weapon = new Weapon()
    weapon.should.be.instanceof(Weapon)
    weapon.should.have.property(`name`)
    weapon.should.have.property(`power`)
  })
})
