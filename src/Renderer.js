/**
 * Renderer constructor
 * @param canvas {Object} The canvas on which to draw
 * @param [options] {Object}
 * @constructor
 */
const Renderer = function(canvas , options = {canvasWidth: 300, boardSize: 10}) {
    this.canvas = canvas
    this.context = canvas.getContext(`2d`);
    this.width = options.canvasWidth
    this.size = options.boardSize
    canvas.setAttribute(`width`, this.width)
    canvas.setAttribute(`heigth`, this.width)
}
Renderer.prototype.render = function(){
    for(var i = 0; i < this.size; i++){
        //Vertical grid
        this.context.strokeRect( i*this.width/this.size, 0, this.width/this.size, this.width)
        //Horizontal grid
        this.context.strokeRect( 0, i*this.width/this.size, this.width, this.width/this.size)
    }
}

module.exports = Renderer
