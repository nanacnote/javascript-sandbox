import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { SkillsSetLevel, MyContext } from '.'
import { useBreakPoint } from '../my_hooks'
import { projectsDictionary } from '../my_lib'
import { mainTextGSAP, tlMain } from '../my_animations'
import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import {
  Container,
  Row,
  Col,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import CountUp from 'react-countup'
import sortBy from 'lodash/sortBy'
import {
  FaQuestionCircle,
  FaSmile,
  FaSmileWink,
  FaPlayCircle,
  FaStepForward,
  FaReply,
} from 'react-icons/fa'

type TProps = {
  post: any
}

export const Introduction: React.FC<TProps> = (props): JSX.Element => {
  //instantiate useBreakPoint hook
  const [, currentViewportStandard, currentViewportSize] = useBreakPoint()

  //instantiate context api store
  const context = useContext(MyContext)

  //----all useState hooks below
  //control what is showing in the main text section when try somthing cool is clicked
  const [testDriveStage, settestDriveStage] = useState(undefined)
  //triggered when bottom right section is active
  const [showBottomRight, setshowBottomRight] = useState(false)
  // stores visitor location
  const [vistorLocation, setvistorLocation] = useState<string>('loading...')
  // stores visitor location
  const [vistorCount, setvistorCount] = useState<number>(0)

  // function to get visitors location and ISP
  const getVistorLocation = async () => {
    await fetch('http://ip-api.com/json')
      .then((res) => res.json())
      .then((data) => {
        setvistorLocation(data.country + ' - ' + data.isp)
      })
      .catch(() => {
        setvistorLocation('Request failed')
      })
  }

  // function to get visitors count
  const getVisitorCount = async () => {
    await fetch('/api/admin?function=getVisitorCount')
      .then((res) => res.json())
      .then((data) => {
        setvistorCount(+data.total)
      })
      .catch(() => {
        setvistorCount(0)
      })
  }

  //function to handle test drive stage pic on mouse in
  const testDriveMouseIn = (event: React.MouseEvent) => {
    const targetEl = event.target as HTMLElement
    gsap.set('.test-drive-header, .test-drive-name', { opacity: 0 })
    gsap.to(targetEl.parentElement, {
      duration: 0.25,
      height: 'auto',
    })
    const el = gsap.utils.toArray('.test-drive-img')
    el?.map((e) => {
      e !== targetEl
        ? gsap.to((e as HTMLElement).parentElement, {
            duration: 0.25,
            opacity: 0,
            height: 0,
          })
        : gsap
            .timeline()
            .set((e as HTMLElement).previousSibling, { display: 'flex' })
            .fromTo(
              (e as HTMLElement).previousSibling,
              { opacity: 0 },
              { duration: 0.25, opacity: 1 }
            )
    })
  }

  //function to handle test drive stage pic on mouse out
  const testDriveMouseOut = () => {
    gsap.set('.test-drive-header, .test-drive-name', { opacity: 1 })
    const el = gsap.utils.toArray('.test-drive-img')
    el?.map((e) => {
      gsap.to((e as HTMLElement).parentElement, {
        duration: 0.25,
        opacity: 1,
        height: '5vmax',
      })
      gsap.set((e as HTMLElement).previousSibling, { display: 'none' })
    })
  }

  // // gsap big idea scrolltrigger config
  // useEffect(() => {
  // gsap.registerPlugin(ScrollTrigger)
  //   const tlScrollViews = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '.grad-hr',
  //       scrub: 3,
  //       // markers: true,
  //       start: 'top top',
  //       end: '+=450',
  //       toggleActions: 'restart complete reverse none',
  //     },
  //   })
  //   // instantiate timeline for scroll animation of main-languages and main-numbers
  //   tlScrollViews
  //     .set('.main-languages-wrapper', { x: 0 })
  //     .set('.main-numbers-col', { yPercent: 0 })
  //     .set('.main-languages-header, .main-numbers-header', { opacity: 1 })
  //     .set('.main-languages-text', { opacity: 0 })
  //     .fromTo(
  //       '.main-languages-wrapper',
  //       { x: 0 },
  //       {
  //         duration: 1,
  //         x: (document.querySelector('.main-page-content') as HTMLElement)?.offsetWidth / 2,
  //         stagger: -0.025,
  //       }
  //     )
  //     .fromTo(
  //       '.main-numbers-col',
  //       { yPercent: 0 },
  //       { duration: 0.05, yPercent: -100 },
  //       '-=1'
  //     )
  //     .fromTo(
  //       '.main-languages-header, .main-numbers-header',
  //       { opacity: 1 },
  //       { duration: 0.05, opacity: 0 },
  //       '-=1'
  //     )
  //     .fromTo(
  //       '.main-languages-text',
  //       { opacity: 0 },
  //       { duration: 1, opacity: 1 },
  //       '-=0.5'
  //     )
  //   // return () => {
  //   //   tlScrollViews.kill()
  //   // }
  // }, [currentViewportSize, context.siderState])

  // gsap text video
  useEffect(() => {
    setTimeout(() => {
      // get visitors location on component mount
      getVistorLocation()

      // get visitors count
      getVisitorCount()
    }, 10000)

    // trigger gsap text animation
    !context.landingStatus ? mainTextGSAP(setshowBottomRight, true) : null

    return () => {
      tlMain.kill()
    }
  }, [])

  return (
    <div className="main-page-container">
      <div>
        <Container fluid>
          <Row className="mb-5">
            <Container fluid>
              <div className="main-text-row px-5 border-0 rounded">
                <div
                  className="skip-text-animation clickable-item py-0"
                  onClick={() =>
                    tlMain
                      .seek('skipTextAnimation')
                      .call(setshowBottomRight, [true])
                  }
                >
                  skip
                  <FaStepForward />
                </div>
                <div
                  className="replay-text-animation clickable-item py-0"
                  onClick={() => tlMain.restart().seek('replayTextAnimation')}
                >
                  <FaReply />
                  &nbsp;Replay
                </div>
                <div className="main-text-1">
                  <span>
                    <FaSmile className="t-a t-01" />
                  </span>
                  <span>
                    <FaSmileWink className="t-a t-02" />
                  </span>
                </div>
                <div className="main-text-2">
                  <span className="t-a t-03 h1"></span>
                  <span className="t-a t-04 h1">
                    <div className="main-text-heart">&#10084;</div>
                    <div>I LIKE</div>
                  </span>
                  <span className="t-a t-05 h1">DESiGN</span>
                  <span className="t-a t-06 h1">C0D1NG</span>
                  <span className="t-a t-07 h1">open source</span>
                  <span className="t-a t-08 h1">THINKERING</span>
                  <span className="t-a t-09 h1">Big Data</span>
                  <span className="t-a t-10 h1">LEARNING</span>
                  <span className="t-a t-11 h1">
                    <h6>FINANCIAL</h6>
                    <span>MODELING</span>
                  </span>
                  <span className="t-a t-12 h1">mathematics</span>
                </div>
                <div className="main-text-3">
                  <div className="test-drive-stage-intro">
                    <div className="test-drive-container">
                      <div className="test-drive-header">
                        <span>test drive a project</span>
                      </div>
                      <div
                        className={`px-2
                                ${
                                  context.currentViewport
                                    ? 'd-flex flex-column'
                                    : 'd-flex'
                                }
                              `}
                      >
                        {[...projectsDictionary['Web Development']]
                          .slice(0, 3)
                          .map((e) => (
                            <div
                              key={e.name}
                              className="test-drive-col"
                              onClick={() => settestDriveStage(e)}
                            >
                              <button data-no-decoration>
                                <div className="test-drive-name">{e.name}</div>
                                {context.currentViewport ? null : (
                                  <div
                                    className="test-drive-pic"
                                    onMouseEnter={testDriveMouseIn}
                                    onMouseLeave={testDriveMouseOut}
                                  >
                                    <div className="absolute-center-icon">
                                      <FaPlayCircle />
                                    </div>
                                    <img
                                      className="test-drive-img border-0 rounded"
                                      src={e?.imageLink}
                                      alt="project-pics"
                                      style={{
                                        height: 'auto',
                                        width: '100%',
                                      }}
                                    />
                                  </div>
                                )}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Row>

          <Row className="mb-5">
            <Container fluid>
              <Row className="main-languages-numbers">
                <Col className="main-languages">
                  <Row>
                    <div className="main-languages-header">
                      <span>languages under the belt</span>
                    </div>
                  </Row>
                  <Row className="main-languages-col">
                    <div className="main-languages-text">
                      <div className="main-languages-text-head">
                        <h3>The &quot;Big Idea`&quot;`</h3>
                      </div>
                      <div className="main-languages-text-body">
                        <span>
                          The idea behind my portfolio page is to implement
                          features and tools rather than just write about them.
                          <span className="bg-warning">
                            &nbsp;Click the&nbsp;
                            <FaQuestionCircle />
                            &nbsp;icon&nbsp;
                          </span>
                          &nbsp; next to a feature to learn more about it.
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap w-100">
                      <div className="main-languages-wrapper">
                        <img
                          src="/svg/21.svg"
                          alt="typescript"
                          style={{ maxWidth: '75%', height: '100%' }}
                        />
                      </div>
                      <div className="main-languages-wrapper">
                        <img
                          src="/svg/30.svg"
                          alt="javascript"
                          style={{ maxWidth: '75%', height: '100%' }}
                        />
                      </div>
                      <div className="main-languages-wrapper">
                        <img
                          src="/svg/28.svg"
                          alt="python"
                          style={{ maxWidth: '75%', height: '100%' }}
                        />
                      </div>
                      <div className="main-languages-wrapper">
                        <img
                          src="/svg/33.svg"
                          alt="r-lang"
                          style={{ maxWidth: '75%', height: '100%' }}
                        />
                      </div>
                      <div className="main-languages-wrapper">
                        <img
                          src="/svg/19.svg"
                          alt="java"
                          style={{ maxWidth: '75%', height: '100%' }}
                        />
                      </div>
                      <div className="main-languages-wrapper">
                        <img
                          src="/svg/34.svg"
                          alt="dart"
                          style={{ maxWidth: '75%', height: '100%' }}
                        />
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col className="main-numbers">
                  <Row>
                    <div className="main-numbers-header">
                      <span>some numbers for you</span>
                    </div>
                  </Row>
                  <Row className="main-numbers-col">
                    <div className="main-numbers-wrapper">
                      <h6>
                        <strong>Projects</strong>
                      </h6>
                      <span className="c-text-info h3">
                        <CountUp
                          end={
                            projectsDictionary['Web Development'].length +
                            projectsDictionary['Data Science'].length
                          }
                          redraw
                          delay={6}
                        />
                      </span>
                    </div>
                    <div className="main-numbers-wrapper">
                      <h6>
                        <strong>Vistors</strong>
                      </h6>
                      <span className="c-text-info h3">
                        <CountUp end={vistorCount} delay={6} />
                      </span>
                    </div>
                    <div className="main-numbers-wrapper">
                      <h6>
                        <strong>Your Location / ISP</strong>
                      </h6>
                      <span className="c-text-info h5">{vistorLocation}</span>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </div>

      {/* container for bottom/second part of right handside of page */}
      <div className="w-100">
        {showBottomRight ? (
          <Container fluid className="front-page-right-bottom">
            {[props.post.webDevelopmentSkill, props.post.dataScienceSkill].map(
              (E, I) => (
                <Row key={`skills-${I}`} className="mb-5 overflow-hidden">
                  <Container fluid className={`skills-row skills-row-${I}`}>
                    <Row>
                      <div
                        className={`d-flex ${
                          I % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        } w-100 pb-3`}
                      >
                        <div
                          className={`d-none d-xl-block ${
                            I % 2 === 0 ? 'mr-2' : 'ml-2'
                          }`}
                        >
                          <img
                            className="border-0 rounded"
                            src={`/pics/${I + 1}.jpg`}
                            alt="web-dev photo"
                            style={{
                              width: '400px',
                              height: '100%',
                            }}
                          />
                        </div>
                        <div className="w-100 d-flex flex-column">
                          <div className="w-100 p-3 mb-2">
                            <h4>
                              <strong>{E?.title}</strong>
                            </h4>
                            <p>{E?.subTitle}</p>
                          </div>
                          <div className="w-100 h-75 mb-2">
                            <Container fluid>
                              <Row>
                                <Col xs={12} lg={6} className="p-3 mb-2">
                                  <div>
                                    <h5>
                                      <strong>Frameworks</strong>
                                    </h5>
                                  </div>
                                  <SkillsSetLevel
                                    category={'frameworks'}
                                    skills={E}
                                  />
                                </Col>
                                <Col xs={12} lg={6} className="p-3 mb-2">
                                  <div>
                                    <h5>
                                      <strong>Libraries</strong>
                                    </h5>
                                  </div>
                                  <SkillsSetLevel
                                    category={'libraries'}
                                    skills={E}
                                  />
                                </Col>
                                <Col xs={12} lg={6} className="p-3 mb-2">
                                  <div>
                                    <h5>
                                      <strong>Technologies</strong>
                                    </h5>
                                  </div>
                                  <SkillsSetLevel
                                    category={'technologies'}
                                    skills={E}
                                  />
                                </Col>
                                <Col xs={12} lg={6} className="p-3 mb-2">
                                  <div>
                                    <h5>
                                      <strong>Tools</strong>
                                    </h5>
                                  </div>
                                  <SkillsSetLevel
                                    category={'tools'}
                                    skills={E}
                                  />
                                </Col>
                              </Row>
                            </Container>
                          </div>
                        </div>
                      </div>
                      <div className="w-100 p-3 border rounded mb-5">
                        <h5>
                          <strong>Projects</strong>
                        </h5>
                        <div>
                          {sortBy(projectsDictionary[E?.title], function (o) {
                            return o?.title
                          }).map((e) => (
                            <div key={e?.slug}>
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={function (props) {
                                  return (
                                    <Tooltip id="button-tooltip" {...props}>
                                      <h6 className="border-bottom">
                                        {e?.title?.split('|')[0]}
                                      </h6>
                                      <p>{e?.title?.split('|')[1]}</p>
                                    </Tooltip>
                                  )
                                }}
                              >
                                <div>
                                  <Link
                                    href={`/projects/[slug]?cat=${E?.title}`}
                                    as={`/projects/${e?.slug}?cat=${E?.title}`}
                                  >
                                    <a
                                      href="#"
                                      data-no-decoration
                                      data-inherit-color
                                    >
                                      {/* {currentViewportStandard === 'xs'
                                        ? `• ${e?.title?.slice(0, 15)} ...`
                                        : currentViewportStandard === 'sm'
                                        ? `• ${e?.title?.slice(0, 25)} ...`
                                        : currentViewportStandard === 'md'
                                        ? `• ${e?.title?.slice(0, 40)} ...`
                                        : currentViewportStandard === 'lg'
                                        ? `• ${e?.title?.slice(0, 55)} ...`
                                        : null} */}
                                      <div className="truncate-string py-2 position-relative">
                                        <span className="h5 clickable-item">
                                          {'• ' + e?.title?.split('|')[0]}
                                        </span>
                                        {/* <span className="">{'|'}</span> */}
                                        <span>
                                          {'|' + e?.title?.split('|')[1]}
                                        </span>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              </OverlayTrigger>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Row>
                  </Container>
                </Row>
              )
            )}
          </Container>
        ) : null}
      </div>
      <div>
        {/* modal for showing test app when currently test something cool is clicked */}
        <Container fluid className="test-drive-stuff-modal">
          <Modal
            size={testDriveStage?.size === 'custom' ? undefined : 'xl'}
            dialogClassName={
              testDriveStage?.size === 'custom' ? 'modal-90w' : undefined
            }
            show={testDriveStage ? true : false}
            onHide={() => {
              settestDriveStage(null)
            }}
            aria-labelledby="modal-for-test-drive-stuff"
          >
            <Modal.Header closeButton>
              <Modal.Title id="test-drive-stuff-title">
                {testDriveStage?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{testDriveStage?.component}</Modal.Body>
          </Modal>
        </Container>
      </div>
    </div>
  )
}
export default Introduction
