import { Snake, Food } from './'
/**
 * TS declaration for referee module
 */
export type TReferee = {
  canvas: HTMLCanvasElement
  snake: Snake
  food: Food
}

/**
 * @public Function to observe interation between assets in game stage
 * @param canvas canvas element to officiate
 * @param snake snake instance asset to observe
 * @param food food instance asset to observe
 * @returns scoreboard object {score: number, failed: boolean}
 */
export default function referee(params: TReferee) {
  let foodCount = 0
  let gameOver = false

  //get current position of assets

  const tailCord = params.snake.getProps() as []
  const [xSnake, ySnake] = params.snake.getProps(['x', 'y']) as [number, number]
  const [xFood, yFood] = params.food.getProps(['x', 'y']) as [number, number]

  //determining when food is eaten
  if (xFood === xSnake && yFood === ySnake) {
    foodCount = 1
    params.food.setProps({ empty: true })
    params.snake.setProps({ addTail: true })
  } else {
    params.food.setProps({ empty: false })
    params.snake.setProps({ addTail: false })
  }

  // determine when new food lands on tail and call a re drop of food
  const tail = Object.values(tailCord[tailCord.length - 1])
  for (let i = 0; i < tail.length; i++) {
    const tailXY = Object.values(tail[i] ? tail[i] : { x: 0, y: 0 })
    if (tailXY[0] === xFood && tailXY[1] === yFood) {
      params.food.setProps({ empty: true })
    }
    if (xSnake !== 0 && tailXY[0] === xSnake && tailXY[1] === ySnake) {
      gameOver = true
    }
  }

  //determining boundary and obstatcle collision
  // no obstacles snake can move freely
  if (xSnake === params.canvas.width) {
    params.snake.setProps({ x: 0 })
  }
  if (xSnake < 0) {
    params.snake.setProps({ x: params.canvas.width })
  }
  if (ySnake === params.canvas.height) {
    params.snake.setProps({ y: 0 })
  }
  if (ySnake < 0) {
    params.snake.setProps({ y: params.canvas.height })
  }

  return {
    score: foodCount,
    failed: gameOver,
  }
}
