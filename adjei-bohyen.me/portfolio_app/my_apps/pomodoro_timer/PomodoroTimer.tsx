import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {
  FaGithub,
  FaRegPlayCircle,
  FaRegPauseCircle,
  FaSync,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa'
import { gsap } from 'gsap'
import { Howl } from 'howler'

/**
 * typings declaration for props on PomodoroTimer module
 */
type TProps = {}

/**
 * typings declaration for state on PomodoroTimer module
 */
type TState = {
  break: string
  session: string
  timer: string
  inactive: boolean
  breakTime: boolean
}

export class PomodoroTimer extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      break: '05',
      session: '25',
      timer: '25:00',
      inactive: true,
      breakTime: false,
    }
    this.startTimer = this.startTimer.bind(this)
  }

  // variable to hold the present second count
  private currentTimer: NodeJS.Timeout
  // variable to hold sound object
  private sound: Howl

  // handlers timer logic
  private startTimer = () => {
    if (this.state.inactive) {
      // trigger counter active state to prevent further triggers
      this.setState({
        inactive: false,
      })

      //declare variables for min and sec
      let sec = +this.state.timer.slice(3, 5)
      let min = +this.state.timer.slice(0, 2)

      // determine if timer is in break time
      let breakTimeCounter = 0

      // instantiate second counter
      this.currentTimer = setInterval(() => {
        if (sec === 0) {
          sec = 59
          min -= 1
        } else {
          sec -= 1
        }
        if (min === 0 && sec === 0) {
          this.setState({
            timer: this.state.break + ':00',
            breakTime: true,
          })
          sec = 0
          min = +this.state.break
          breakTimeCounter += 1
          this.sound.play()
          gsap.to('.wiggle', {
            duration: 0.1,
            x: '+=20',
            yoyo: true,
            repeat: 5,
          })
          gsap.to('.wiggle', {
            duration: 0.1,
            x: '-=20',
            yoyo: true,
            repeat: 5,
          })
          if (breakTimeCounter === 2) {
            this.setState({
              break: '05',
              session: '25',
              timer: '25:00',
              inactive: true,
              breakTime: false,
            })
            clearInterval(this.currentTimer)
          }
        } else {
          this.setState({
            timer:
              (String(min).length < 2 ? '0' + String(min) : String(min)) +
              ':' +
              (String(sec).length < 2 ? '0' + String(sec) : String(sec)),
          })
        }
      }, 1000)
    }
  }

  componentDidMount() {
    this.sound = new Howl({
      src: ['/pomodoro_timer/alarm.wav'],
    })
  }

  componentWillUnmount() {
    clearInterval(this.currentTimer)
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                  <div>
                    <h5>
                      <strong>pomodoro time management</strong>
                    </h5>
                  </div>

                  <hr />

                  <div>
                    <div className="mb-3">
                      <p>
                        Up to 60 minutes adjustable pomodoro time management
                        clock.
                      </p>
                    </div>
                    <div className="mb-5">
                      <a
                        href="https://github.com/nanacnote/personal_site/tree/master/my_apps/pomodoro_timer"
                        target="_blank"
                        rel="noreferrer"
                        data-no-decoration
                      >
                        <div className="py-1 my-2 position-relative clickable-item text-center text-primary border border-primary rounded">
                          Source Code <FaGithub />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3 prevent-selection-double-tap">
            <Container fluid>
              <Row>
                <Container fluid>
                  <Row className="mx-4">
                    <Col xs={12} sm={6}>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="h2">
                          <strong>Break&nbsp;Length</strong>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div
                            className="clicker-lighten mx-1 h3"
                            onClick={() =>
                              this.setState((prevState) =>
                                prevState.inactive
                                  ? {
                                    break:
                                      String(+this.state.break + 1) === '61'
                                        ? '01'
                                        : String(+this.state.break + 1)
                                          .length < 2
                                          ? '0' + String(+this.state.break + 1)
                                          : String(+this.state.break + 1),
                                  }
                                  : null
                              )
                            }
                          >
                            <FaArrowUp />
                          </div>
                          <div
                            className="mx-3 h1 text-center"
                            style={{ width: '3rem' }}
                          >
                            <strong>{this.state.break}</strong>
                          </div>
                          <div
                            className="clicker-lighten mx-1 h3"
                            onClick={() =>
                              this.setState((prevState) =>
                                prevState.inactive
                                  ? {
                                    break:
                                      String(+this.state.break - 1) === '0'
                                        ? '60'
                                        : String(+this.state.break - 1)
                                          .length < 2
                                          ? '0' + String(+this.state.break - 1)
                                          : String(+this.state.break - 1),
                                  }
                                  : null
                              )
                            }
                          >
                            <FaArrowDown />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={6}>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="h2">
                          <strong>Session&nbsp;Length</strong>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div
                            className="clicker-lighten mx-1 h3"
                            onClick={() =>
                              this.setState((prevState) =>
                                prevState.inactive
                                  ? {
                                    session:
                                      String(+this.state.session + 1) === '61'
                                        ? '01'
                                        : String(+this.state.session + 1)
                                          .length < 2
                                          ? '0' +
                                          String(+this.state.session + 1)
                                          : String(+this.state.session + 1),
                                    timer:
                                      String(+this.state.session + 1) === '61'
                                        ? '01:00'
                                        : String(+this.state.session + 1)
                                          .length < 2
                                          ? '0' +
                                          String(+this.state.session + 1) +
                                          ':00'
                                          : String(+this.state.session + 1) +
                                          ':00',
                                  }
                                  : null
                              )
                            }
                          >
                            <FaArrowUp />
                          </div>
                          <div
                            className="mx-3 h1 text-center"
                            style={{ width: '3rem' }}
                          >
                            <strong>{this.state.session}</strong>
                          </div>
                          <div
                            className="clicker-lighten mx-1 h3"
                            onClick={() =>
                              this.setState((prevState) =>
                                prevState.inactive
                                  ? {
                                    session:
                                      String(+this.state.session - 1) === '0'
                                        ? '60'
                                        : String(+this.state.session - 1)
                                          .length < 2
                                          ? '0' +
                                          String(+this.state.session - 1)
                                          : String(+this.state.session - 1),
                                    timer:
                                      String(+this.state.session - 1) === '0'
                                        ? '60:00'
                                        : String(+this.state.session - 1)
                                          .length < 2
                                          ? '0' +
                                          String(+this.state.session - 1) +
                                          ':00'
                                          : String(+this.state.session - 1) +
                                          ':00',
                                  }
                                  : null
                              )
                            }
                          >
                            <FaArrowDown />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-center align-items-center my-3">
                    <div
                      className="wiggle c-border-info d-flex justify-content-center align-items-center p-4"
                      style={{
                        width: '275px',
                        height: '150px',
                        borderWidth: '5px',
                        borderRadius: '2.5rem',
                        fontSize: '5rem',
                      }}
                    >
                      <div
                        className={`d-flex w-100 text-center justify-content-center align-items-center digital-font ${
                          +this.state.timer.slice(0, 2) < 5 ? 'text-danger' : ''
                          }`}
                      >
                        <div className="w-100">
                          <strong>{this.state.timer[0]}</strong>
                        </div>
                        <div className="w-100">
                          <strong>{this.state.timer[1]}</strong>
                        </div>
                        <div className="w-100">
                          <strong>{this.state.timer[2]}</strong>
                        </div>
                        <div className="w-100">
                          <strong>{this.state.timer[3]}</strong>
                        </div>
                        <div className="w-100">
                          <strong>{this.state.timer[4]}</strong>
                        </div>
                      </div>
                    </div>
                    <div
                      className="position-absolute h4"
                      style={{ bottom: '10%', opacity: 0.5 }}
                    >
                      <strong>
                        {this.state.breakTime ? 'Break' : 'Session'}
                      </strong>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      className="clicker-lighten mx-1 h2"
                      style={{
                        opacity: ` ${this.state.inactive ? 1 : 0.25}`,
                      }}
                      onClick={this.startTimer}
                    >
                      <FaRegPlayCircle />
                    </div>
                    <div
                      className="clicker-lighten mx-1 h2"
                      onClick={() => {
                        this.setState({
                          inactive: true,
                        })
                        clearInterval(this.currentTimer)
                      }}
                    >
                      <FaRegPauseCircle />
                    </div>
                    <div
                      className="clicker-lighten mx-1 h2"
                      onClick={() => {
                        this.setState({
                          break: '05',
                          session: '25',
                          timer: '25:00',
                          inactive: true,
                        })
                        clearInterval(this.currentTimer)
                      }}
                    >
                      <FaSync />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
    )
  }
}
export default PomodoroTimer
