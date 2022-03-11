import { Stage, Timer } from '.'

/**
 * TS declaration for Renderer module
 */
export type TRenderer = {
  params: {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    scale: 10 | 20 | 30
  }
  props: {
    input: {
      directions: 'Up' | 'Down' | 'Right' | 'Left'
    }
    output?: {
      failed: boolean
      score: number
      timer: string
      level: number
      highest0score: string
    }
  }
}

export type TInstance = {
  stage: Stage
  seconds: Timer
  engine: NodeJS.Timeout
}

export type TState = 'active' | 'paused' | 'stopped'

/**
 * Create a new render to control game ui.
 */
export default class Renderer {
  /**
   * @param canvas - The dom canvas element the context is acting on
   * @param ctx - canvas context currently in use
   * @param scale - the grid size in pixels
   * @example
   *      const snake = new Stage({
   *          canvas: 'HTMLCanvasElemnt',
   *          ctx: 'CanvasRenderingContext2D',
   *          scale: 'number',
   *      })
   */
  constructor(params: TRenderer['params']) {
    this.params.canvas = params.canvas
    this.params.ctx = params.ctx
    this.params.scale = params.scale

    //instantiate new stage
    this.instance.stage = new Stage({
      canvas: this.params.canvas,
      ctx: this.params.ctx,
      scale: this.params.scale,
    })
    //instantiate new infinite count timer
    this.instance.seconds = new Timer(-1)
  }
  /**
   * variable for params use to create new renderer instance
   */
  private params: TRenderer['params'] = {
    canvas: undefined,
    ctx: undefined,
    scale: undefined,
  }
  //variable for holding props values
  private props: TRenderer['props'] = {
    input: {
      directions: undefined,
    },
    output: {
      failed: false,
      score: 0,
      timer: undefined,
      level: 2,
      highest0score: '-',
    },
  }
  //variable for instance of renderer and stage
  private instance: TInstance = {
    stage: undefined,
    seconds: undefined,
    engine: undefined,
  }
  //variable for state of renderer
  private state: TState = undefined
  /**
   * @public method to collect input data from user
   */
  public setProps(param: TRenderer['props']) {
    Object.assign(this.props, param)
  }

  /**
   * @public method return score board data from game
   */
  public getProps() {
    //get the current timer value
    this.props.output.timer = String(this.instance.seconds.currentHMS)
    return this.props.output
  }

  /**
   * @public draws a gameover screen to the canvas context
   */
  private drawGameOver() {
    //draw gameover overlay
    this.params.ctx.fillStyle = 'rgba(0, 0, 50, 0.75)'
    this.params.ctx.fillRect(
      this.params.scale * 4,
      this.params.scale * 4,
      this.params.canvas.width - this.params.scale * 8,
      this.params.canvas.height - this.params.scale * 8
    )
    this.params.ctx.strokeRect(
      this.params.scale * 4,
      this.params.scale * 4,
      this.params.canvas.width - this.params.scale * 8,
      this.params.canvas.height - this.params.scale * 8
    )
    setTimeout(() => {
      this.params.ctx.fillStyle = 'white'
      this.params.ctx.font = '50px ZillaSlab'
      this.params.ctx.fillText(
        'Game Over',
        this.params.canvas.width / 3.5,
        this.params.canvas.height / 2
      )
    }, 500)
  }

  /**
   * @public starts the renderer
   */
  public start() {
    //start scoreboard timer
    this.instance.seconds.start()
    //set renderer state
    this.state = 'active'
    //start the game instance
    this.instance.engine = setInterval(() => {
      if (!this.props.output.failed && this.state === 'active') {
        // call stage every interval pass it user input direction and it returns scoreboard
        const res = this.instance.stage.refresh({
          directions: this.props.input.directions,
        })
        // get scoreboard from stage every interval and assign it to props to be exposed publicly
        Object.assign(this.props.output, res)
      } else if (this.state === 'paused') {
        null
      } else if (this.state === 'stopped') {
        null
      } else {
        //stop scoreboard timer
        this.instance.seconds.stop()
        //draw gameover overlay
        this.drawGameOver()
        // stop renderer
        clearInterval(this.instance.engine)
      }
    }, 175)
  }
  /**
   * @public pause the renderer
   */
  public pause() {
    //set renderer state
    this.state = 'paused'
    // trigger assets freeze
    this.props.output.failed = true
    //stop scoreboard timer
    this.instance.seconds.stop()
  }

  /**
   * @public resume the renderer
   */
  public resume() {
    //set renderer state
    this.state = 'active'
    // trigger assets unfreeze
    this.props.output.failed = false
    //start scoreboard timer
    this.instance.seconds.start()
  }

  /**
   * @public stop the renderer
   */
  public stop() {
    //set renderer state
    this.state = 'stopped'
    // stop renderer
    clearInterval(this.instance.engine)
    //stop scoreboard timer
    this.instance.seconds.stop()
    //clear the ctx
    this.params.ctx.clearRect(
      0,
      0,
      this.params.canvas.width,
      this.params.canvas.height
    )
  }
}
