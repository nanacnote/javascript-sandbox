import { Snake, Food, referee } from './'

// /**
//  * TS declaration for Stage module
//  */
export type TStage = {
  params: {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    scale: number
  }
  props: {
    curKey: string
    prevKey: string
    scoreBoard: {
      failed: boolean
      score: number
    }
  }
}
export type TInput = {
  directions: 'Up' | 'Down' | 'Right' | 'Left'
}
export type TInstance = {
  snake: Snake
  food: Food
}

/**
 * Create a new stage class which will accept assets and create interactive world for them.
 */
export default class Stage {
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
  constructor(params: TStage['params']) {
    this.params.canvas = params.canvas
    this.params.ctx = params.ctx
    this.params.scale = params.scale

    //instantiate new snake
    this.instance.snake = new Snake({
      ctx: this.params.ctx,
      scale: this.params.scale,
    })
    this.instance.snake.setProps({ x: 0, y: 0 })

    //instantiate new food
    this.instance.food = new Food({
      canvas: this.params.canvas,
      ctx: this.params.ctx,
      scale: this.params.scale,
    })
    this.instance.food.setProps({ x: 0, y: 0 })
  }
  /**
   * smart default / initialiser values for params of the stage class set to an object named param
   */
  private params: TStage['params'] = {
    canvas: undefined,
    ctx: undefined,
    scale: undefined,
  }
  /**
   * class property variables initialiser set as a key value object
   */
  private props: TStage['props'] = {
    curKey: undefined,
    prevKey: undefined,
    scoreBoard: {
      failed: false,
      score: 0,
    },
  }
  /**
   * initialises asset require to run game
   */
  private instance: TInstance = {
    snake: undefined,
    food: undefined,
  }

  /**
   * @private accepts keyboard input and directs the snake accordingly
   * @param string
   */
  private directionInput(param: TInput['directions']) {
    //key press regulator
    const controls = [
      { key: 'Up', ops: 'Down' },
      { key: 'Down', ops: 'Up' },
      { key: 'Right', ops: 'Left' },
      { key: 'Left', ops: 'Right' },
    ]
    //set current direction
    this.props.curKey = param
    controls.map((e) => {
      if (this.props.curKey === e.key && this.props.prevKey !== e.ops) {
        this.instance.snake.setProps({ key: this.props.curKey })
        //set previous direction
        this.props.prevKey = param
      }
    })
  }

  /**
   * @public method to refresh the game stage called by the renderer
   * @param object directions value for key pressed or touch value
   * @return class parent class props scoreBoard item
   */
  public refresh(param: TInput) {
    //clear the ctx
    this.params.ctx.clearRect(
      0,
      0,
      this.params.canvas.width,
      this.params.canvas.height
    )
    //process direction input
    this.directionInput(param.directions)
    //run referee function
    const res = referee({
      canvas: this.params.canvas,
      snake: this.instance.snake,
      food: this.instance.food,
    })
    //assign scoreboard feedback from referee
    this.props.scoreBoard.score += res.score
    this.props.scoreBoard.failed = res.failed
    //update the assets
    this.instance.snake.update()
    this.instance.food.update()
    //return score on each call
    return this.props.scoreBoard
  }
}
