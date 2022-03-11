import { Container, Row, Col } from 'react-bootstrap'
import { ReactDrum } from './'
import { FaGithub } from 'react-icons/fa'

/**
 * TS declaration for props on PureSnake module
 */
type TProps = {}

export const DrumMachine: React.FC<TProps> = (): JSX.Element => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} xl={4}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div>
                <div>
                  <h5>
                    <strong>a simple drum machine</strong>
                  </h5>
                </div>

                <hr />

                <div>
                  <div className="mb-3">
                    <p>A drum machine application. UI built entirely in CSS.</p>
                    <p>
                      It utilises{' '}
                      <a
                        href="https://howlerjs.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        howler
                      </a>{' '}
                      audio API for audio files handling, and touch event
                      listner for adding pressure sensitve inputs on touch
                      devices.
                    </p>
                    <p>
                      <span className="bg-warning">
                        switch silent mode off on mobile devices to hear audio
                      </span>
                    </p>
                  </div>
                  <div className="mb-3">
                    <div>
                      <a
                        href="https://github.com/nanacnote/personal_site/tree/master/my_apps/drum_machine"
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
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-center align-items-center h-100">
              <ReactDrum />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default DrumMachine
