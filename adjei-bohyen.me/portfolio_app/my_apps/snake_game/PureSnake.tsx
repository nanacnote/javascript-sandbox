import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactSnake } from './ReactSnake'
import { FaPlayCircle, FaPauseCircle, FaReply, FaGithub } from 'react-icons/fa'

/**
 * TS declaration for props on PureSnake module
 */
type TProps = {}

/**
 * typings declaration for state on PureSnake module
 */
type TState = {
  io: boolean
  gameCycle: 'Start' | 'Pause' | 'Resume' | 'Stop' | 'Restart'
}

export const PureSnake: React.FC<TProps> = (): JSX.Element => {
  // declare power on, play and pause state varaible
  const [io, setio] = useState<TState['io']>(undefined)
  const [gameStateButton, setgameStateButton] = useState<TState['gameCycle']>(
    'Start'
  )
  const [gameCycle, setgameCycle] = useState<TState['gameCycle']>('Stop')

  // function to handle button click for play and pause
  const playHandler = () => {
    gameStateButton === 'Start'
      ? setgameStateButton('Pause')
      : gameStateButton === 'Pause'
      ? setgameStateButton('Resume')
      : gameStateButton === 'Resume'
      ? setgameStateButton('Pause')
      : null
    setgameCycle(
      (event.target as Element).textContent.trim() as TState['gameCycle']
    )
  }

  // function to handle button click for play and pause
  const restartHandler = () => {
    setgameCycle(
      (event.target as Element).textContent.trim() as TState['gameCycle']
    )
    setgameStateButton('Pause')
  }

  // power on the game with useEffect on mount and power of on unmount
  useEffect(() => {
    setio(true)
    return () => {
      setio(false)
      setgameCycle('Stop')
    }
  }, [])

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} xl={4}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div>
                <div>
                  <h5>
                    <strong>a simple snake game</strong>
                  </h5>
                </div>

                <hr />

                <div>
                  <div className="mb-3">
                    A snake game implemented with HTML5 and PureJS. No
                    dependecies. Use swipe gestures as controls for touch
                    devices.
                  </div>
                  <div className="mb-3">
                    <div>
                      <a
                        href="https://github.com/nanacnote/personal_site/tree/master/my_apps/snake_game"
                        target="_blank"
                        rel="noreferrer"
                        data-no-decoration
                      >
                        <div className="py-1 my-2 position-relative clickable-item text-center text-primary border border-primary rounded">
                          Source Code <FaGithub />
                        </div>
                      </a>
                    </div>
                    <div
                      className={`h4 py-1 my-2 position-relative clickable-item text-center border rounded 
                      ${
                        gameStateButton === 'Start' ||
                        gameStateButton === 'Resume'
                          ? 'text-success border-success'
                          : 'text-warning border-warning'
                      }`}
                      onClick={playHandler}
                    >
                      {gameStateButton}
                      {gameStateButton === 'Start' ||
                      gameStateButton === 'Resume' ? (
                        <FaPlayCircle />
                      ) : gameStateButton === 'Pause' ? (
                        <FaPauseCircle />
                      ) : null}
                    </div>
                    <div
                      className={`h4 py-1 my-2 position-relative clickable-item text-center border rounded text-secondary border-secondary ${
                        gameStateButton === 'Start' ? 'd-none' : 'd-block'
                      }`}
                      onClick={restartHandler}
                    >
                      Restart <FaReply />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-center align-items-center h-100">
              <ReactSnake
                input={{
                  io: io,
                  gameCycle: gameCycle,
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default PureSnake
