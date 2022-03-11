// /**
//  * TS declaration for Snake module
//  */
export type TSnake = {
  params: {
    ctx: CanvasRenderingContext2D
    scale: number
  }
  props: {
    x: number
    y: number
    key: string
    addTail: boolean
    tailLenght: number
    tail: Array<{ x: number; y: number }>
  }
}

/**
 * Create a new snake class.
 */
export default class Snake {
  /**
   * @param ctx - An instantiated canvas context
   * @param scale - Size in pixels to use for the snake
   * @requires setProps() - call immediately after new instance passing it values for x and y
   * @example
   *      const snake = new Snake({
   *          ctx: document.getElementById('canvas'),
   *          scale: 5
   *      })
   *      snake.setProps({x: 0, y: 0})
   */
  constructor(params: TSnake['params']) {
    this.params.ctx = params.ctx
    this.params.scale = params.scale
  }

  /**
   * smart default / initialiser values for params of the snake class set to an object named param
   */
  private params: TSnake['params'] = {
    ctx: undefined,
    scale: undefined,
  }
  /**
   *initial properties on snake class set to an object named props, props can only be mutated through setter methods because they are private
   */
  private props: TSnake['props'] = {
    x: undefined,
    y: undefined,
    key: undefined,
    addTail: undefined,
    tailLenght: 0,
    tail: [],
  }

  /**
   * @public method to expose properties
   * @returns single current value of property passed as parameter,
   * of array if parameter passed was array
   */
  public getProps(param: 'x' | 'y' | string[] = Object.keys(this.props)) {
    if (typeof param === 'string') {
      return this.props[param]
    } else {
      const curProps = param.map((e) => this.props[e])
      return curProps
    }
  }

  /**
   * @public method to set snake class properties
   */
  public setProps(param: {
    x?: number
    y?: number
    key?: string
    addTail?: boolean
  }) {
    Object.assign(this.props, param)
  }

  /**
   *@private sets the direction of the snake from current or previous input
   */
  private getDirection() {
    switch (this.props.key) {
      case 'Up':
        this.props.y -= this.params.scale * 1
        break
      case 'Down':
        this.props.y += this.params.scale * 1
        break
      case 'Left':
        this.props.x -= this.params.scale * 1
        break
      case 'Right':
        this.props.x += this.params.scale * 1
        break
      default:
        break
    }
  }

  /**
   *@private draws the snake head onto the canvas context provided as class param
   */
  private growSnake() {
    if (this.props.addTail) {
      this.props.tailLenght += 1
    }
    this.props.tail[this.props.tailLenght] = {
      x: this.props.x,
      y: this.props.y,
    }

    for (let i = 0; i < this.props.tail.length; i++) {
      this.props.tail[i - 1] = this.props.tail[i]
    }
  }
  /**
   *@private grows snakes length when food is eaten and set the tail coordinate for smooth snake motion
   */
  private drawHead() {
    this.params.ctx.strokeStyle = 'white'
    this.params.ctx.strokeRect(
      this.props.x,
      this.props.y,
      this.params.scale,
      this.params.scale
    )
    this.params.ctx.fillStyle = 'rgb(55, 150, 50)'
    this.params.ctx.fillRect(
      this.props.x,
      this.props.y,
      this.params.scale,
      this.params.scale
    )
  }
  /**
   *@private draws the snake tail onto the canvas context provided as class param
   */
  private drawTail() {
    for (let i = 0; i < this.props.tail.length; i++) {
      //   this.params.ctx.fillStyle = 'salmon'
      this.params.ctx.fillStyle =
        'rgb(' +
        Math.floor(255 - 100 * i) +
        ', ' +
        Math.floor(255 - 5 * i) +
        ', 0)'
      this.params.ctx.fillRect(
        this.props.tail[i].x,
        this.props.tail[i].y,
        this.params.scale,
        this.params.scale
      )
    }
  }

  /**
   *@public draws and moves the snake along the x and y plane
   */
  public update() {
    this.growSnake()
    this.drawTail()
    this.getDirection()
    this.drawHead()
  }
}
