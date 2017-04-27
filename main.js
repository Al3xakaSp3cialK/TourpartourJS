const Game = require(`src/Game.js`)
const Renderer = require(`src/Renderer.js`)

const canvasWidth = 100
const boardSize = 10
const canvas = document.getElementById(`game`)

const game = new Game(new Renderer(canvas, {canvasWidth, boardSize}))

game.initialize()

