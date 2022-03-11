// /**
//  * TS declaration for food module
//  */
export type TFood = {
  params: {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    scale: number
  }
  props: {
    x: number
    y: number
    empty: boolean
  }
}

/**
 * Create a new food class.
 */
export default class Food {
  /**
   * @param canvas - The dom canvas element the context is acting on
   * @param ctx - An instantiated canvas context
   * @param scale - Size in pixels to use for the food
   * @requires setProps() - call immediately after new instance passing it values for x and y
   * @example
   *      const food = new Food({
   *          canvas: HTML
   *          ctx: document.getElementById('canvas'),
   *          scale: 5
   *      })
   *      snake.setProps({x: 0, y: 0})
   */
  constructor(params: TFood['params']) {
    this.params.canvas = params.canvas
    this.params.ctx = params.ctx
    this.params.scale = params.scale
  }

  /**
   * smart default / initialiser values for params of the food class set to an object named param
   */
  private params: TFood['params'] = {
    canvas: undefined,
    ctx: undefined,
    scale: undefined,
  }
  /**
   *initial properties on food class set to an object named props, props can only be mutated through setter methods because they are private
   */
  private props: TFood['props'] = {
    x: undefined,
    y: undefined,
    empty: undefined,
  }

  /**
   * @public method to expose properties
   * @returns single current value of property passed as parameter, of array if parameter passed was array
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
  public setProps(param: { x?: number; y?: number; empty?: boolean }) {
    Object.assign(this.props, param)
  }

  /**
   *@private monitors to see when the food gets eaten and draws new one randomly within canvas
   */
  private drawFood() {
    if (this.props.empty) {
      this.props.x =
        (Math.floor(
          (Math.random() * this.params.canvas.width) / this.params.scale - 1
        ) +
          1) *
        this.params.scale
      this.props.y =
        (Math.floor(
          (Math.random() * this.params.canvas.height) / this.params.scale - 1
        ) +
          1) *
        this.params.scale
    } else {
      this.params.ctx.fillStyle = 'rgb(255, 7, 58)'
      this.params.ctx.fillRect(
        this.props.x,
        this.props.y,
        this.params.scale,
        this.params.scale
      )
    }
  }

  /**
   *@public redraws the food randomly onto the canvas context after it is eaten
   */
  public update() {
    this.drawFood()
  }
}
