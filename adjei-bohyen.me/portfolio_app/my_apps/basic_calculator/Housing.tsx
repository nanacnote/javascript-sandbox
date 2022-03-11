import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { gsap } from 'gsap'

type TProps = {
  input: (event: React.MouseEvent) => void
  output: [string, string]
  parenthesis: boolean
  answerState: boolean
}

export const Housing: React.FC<TProps> = (props): JSX.Element => {
  //controls animation when equals is pushed
  useEffect(() => {
    if (props.answerState) {
      gsap.fromTo(
        '.screen1',
        { fontSize: '1.5rem', yPercent: 25 },
        { duration: 0.15, fontSize: '1rem' }
      )
      gsap.fromTo(
        '.screen2',
        { yPercent: 50, opacity: 0 },
        { duration: 0.2, yPercent: 0, opacity: 1 }
      )
    }
  }, [props.answerState])

  return (
    <>
      <div className="housing">
        <Container className="border rounded bg-light">
          <Row>
            <Container className="m-3 overflow-hidden">
              <Row>
                <Col xs={12} className="p-0">
                  <div className="d-flex flex-column justify-content-center m-1 align-items-end border rounded bg-white overflow-hidden">
                    <code className="beta position-absolute">beta</code>
                    <div
                      className="screen1 text-secondary px-2 py-1 w-100 text-right"
                      dangerouslySetInnerHTML={{
                        __html: props.output[0] || '.',
                      }}
                    />
                    <div className="screen2 text-black px-2 py-1 w-100 text-right">
                      <span>
                        <strong
                          dangerouslySetInnerHTML={{
                            __html: props.output[1] || '0',
                          }}
                        />
                        <strong
                          className="text-secondary"
                          dangerouslySetInnerHTML={{
                            __html: props.parenthesis ? ')' : null,
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Row>
          <Row>
            <Container className="mx-3 mb-3 prevent-selection-double-tap">
              <Row>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    &nbsp;
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    ANS
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    DEL
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    AC
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    (
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    )
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    %
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    ^
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    7
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    8
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    9
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    /
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    4
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    5
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    6
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    *
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    1
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    2
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    3
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    -
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    0
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 light"
                    onClick={props.input}
                  >
                    .
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 darkest text-light"
                    onClick={props.input}
                  >
                    =
                  </div>
                </Col>
                <Col xs={3} className="p-0">
                  <div
                    className="pad d-flex justify-content-center align-items-center rounded py-2 m-1 dark"
                    onClick={props.input}
                  >
                    +
                  </div>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
      <style jsx>{`
        .housing {
          color: #293249;
          font-size: 1.25rem;
          width: 400px;
        }
        .light {
          background: #f7efed;
        }
        .dark {
          background: #ded2cf;
        }
        .darker {
          background: #aca1a1;
        }
        .darkest {
          background: #69656f;
        }
        .screen1,
        .screen2 {
          font-family: 'Digital', sans-serif;
          min-height: 2.75rem;
        }
        .screen1 {
          font-size: 1rem;
        }
        .screen2 {
          font-size: 1.75rem;
        }
        .pad:hover {
          filter: brightness(105%);
          cursor: pointer;
        }
        .beta {
          top: 0;
          left: 0;
          font-size: 0.75rem;
        }
      `}</style>
    </>
  )
}
export default Housing
