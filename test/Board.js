const should = require(`chai`).should() //eslint-disable-line
const Board  = require(`../Board`)
const Player = require(`../Player`)
const Weapon = require(`../Weapon`)

describe(`board`, function () {
  const board = new Board(600, 10)
  
  it(`exists`, function () {
    board.should.exist()
    board.should.be.instanceof(Object)
    board.should.not.have.property(`render`)
    board.should.have.property(`width`)
    board.should.have.property(`squareSize`)
    board.should.have.property(`boardSize`)
    board.should.have.property(`weapons`)
    board.should.have.property(`characters`)
    board.should.have.property(`checkCollision`)
    board.should.have.property(`placeOnBoard`)
    board.should.have.property(`addWeapon`)
    board.should.have.property(`addCharacter`)
    board.should.have.property(`moveObj`)
  })
  it(`has all needed weapons`, function () {
    board.should.have.property(`weapons`)
    board.weapons.should.be.instanceof(Array)
    board.should.have.property(`addWeapon`)
  })
  it(`moves accordingly`, function () {
    const charIndex      = board.addCharacter(new Player(1, `1`))
    const charPosition   = [board.characters[charIndex].x, board.characters[charIndex].y]
    const weaponIndex    = board.addWeapon()
    const weaponPosition = [board.weapons[weaponIndex].x, board.weapons[weaponIndex].y]
    
    board.moveObj(board.characters[charIndex], `down`).should.deep.equal([charPosition[0], ++charPosition[1]])
    board.moveObj(board.characters[charIndex], `up`).should.deep.equal([charPosition[0], --charPosition[1]])
    board.moveObj(board.characters[charIndex], `right`).should.deep.equal([++charPosition[0], charPosition[1]])
    board.moveObj(board.characters[charIndex], `left`).should.deep.equal([--charPosition[0], charPosition[1]])
    
    board.moveObj(board.weapons[weaponIndex], `down`).should.deep.equal([weaponPosition[0], ++weaponPosition[1]])
    board.moveObj(board.weapons[weaponIndex], `up`).should.deep.equal([weaponPosition[0], --weaponPosition[1]])
    board.moveObj(board.weapons[weaponIndex], `right`).should.deep.equal([++weaponPosition[0], weaponPosition[1]])
    board.moveObj(board.weapons[weaponIndex], `left`).should.deep.equal([--weaponPosition[0], weaponPosition[1]])
  
    board.moveObj.should.throw(Error)
  })
  it(`should add Weapons accordingly`, function () {
    
    board.should.have.property(`weapons`)
    board.weapons.should.be.instanceOf(Array)
    board.addWeapon(`Fusil d'assaut`, 32).should.equal(1)
    board.weapons[1].name.should.equal(`Fusil d'assaut`)
  })
  it(`should remove a weapon accordingly`, function () {
    board.should.respondTo(`removeWeapon`)
    
    board.removeWeapon(`wetGun`).should.be.instanceOf(Weapon)
    board.weapons.length.should.equal(1)
    
    board.removeWeapon.bind(board, `noGun`).should.throw(Error)
  })
  it(`should check collision with other objects`)
  it(`should draw objects when added`)
  it(`should remove objects from the board when picked up`)
})
