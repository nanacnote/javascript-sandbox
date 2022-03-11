import { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { Footer } from '.'
import {
  landingGSAP,
  tlLanding,
  siderGSAP,
  tlSider,
  noSiderGSAP,
  tlNoSider,
} from '../my_animations'
import { MyContext, BannerDesign } from '.'
import { currentProject } from '../my_lib'
import {
  FaTimes,
  FaAlignJustify,
  FaDesktop,
  FaBoxOpen,
  FaGithub,
  FaCubes,
  FaNpm,
  FaServer,
  FaPalette,
  FaChrome,
  FaRocket,
  FaPlug,
  FaDatabase,
  FaWrench,
  FaUserCog,
  FaNetworkWired,
  FaTachometerAlt,
  FaLock,
} from 'react-icons/fa'

//type declaration for props
type TProps = {
  siderAnimation?: boolean
  currentProject?: {
    src: string
    title: string
    header: string
    body: string
  }
}

//type declaration for modal data
type TModalData = {
  src: string | undefined
  title: string | undefined
  header: string | undefined
  body: string | undefined
}

export const Layout: React.FC<TProps> = (props): JSX.Element => {
  //sider icons object
  const siderLinks = [
    {
      IDE: <FaDesktop />,
      Containers: <FaBoxOpen />,
      Git: <FaGithub />,
      Stack: <FaCubes />,
      npm: <FaNpm />,
      Hosting: <FaRocket />,
    },
    {
      Design: <FaPalette />,
      'Front-end': <FaChrome />,
      Microservices: <FaServer />,
      API: <FaPlug />,
      Database: <FaDatabase />,
    },
    {
      Functionality: <FaWrench />,
      Usability: <FaUserCog />,
      Interface: <FaNetworkWired />,
      Performance: <FaTachometerAlt />,
      Security: <FaLock />,
    },
  ]

  //instantiate context api store
  const context = useContext(MyContext)

  //----all useState hooks below
  //controls state of sider in small media
  const [siderShowHideIcon, setsiderShowHideIcon] = useState(<FaAlignJustify />)
  //controls modal popup
  const [modalShow, setmodalShow] = useState(false)
  const [modalContent, setmodalContent] = useState<TModalData>({
    src: undefined,
    title: undefined,
    header: undefined,
    body: undefined,
  })
  //controls iframes loading status
  const [iframeStatus, setiframeStatus] = useState(
    <Spinner animation="border" role="status" variant="primary" />
  )

  //function to handle modal iframe content displayed
  const modalIframeHandler = (arg: TModalData) => {
    setmodalContent(arg)
    setmodalShow(true)
  }

  //function to handle theme changer on click of a theme
  const themeChanger = (event: any) => {
    const themeProvider = document.querySelector('.theme-provider')
    themeProvider.className = `theme-provider theme-${event.target.innerText.toLowerCase()}`
  }

  // ref for transition element
  // let landingTransitionLeft: HTMLDivElement

  useEffect(() => {
    // transition animation controller
    if (context.landingStatus) {
      landingGSAP(context.setLandingStatus, false)
    }
    if (!context.landingStatus && props.siderAnimation) {
      siderGSAP()
    } else {
      noSiderGSAP()
    }

    // open / close menu icon display controller
    context.siderState
      ? setsiderShowHideIcon(<FaTimes />)
      : setsiderShowHideIcon(<FaAlignJustify />)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => {
      tlLanding?.kill()
      tlSider?.kill()
      tlNoSider?.kill()
    }
  }, [context.landingStatus, context.siderState, context.currentViewport])

  //banner html
  const bannerMarkup = (
    <div
      style={{
        position: 'fixed',
        zIndex: 200,
        // height: '50px',
        // width: '175px',
        top: '50px',
        left: `${context.currentViewport ? '5%' : '20%'}`,
        background: 'transparent',
      }}
    >
      <BannerDesign />
    </div>
  )

  //sider html
  const siderMarkup = (
    <div className="sider">
      <div className="sider-container">
        <div className="banner-container" />
        {siderLinks.map((e, i) => (
          <div key={i}>
            <div className="sider-section">
              {Object.entries(e).map((e) => (
                <div className="sider-btn" key={e[0]}>
                  <div className="sider-icon sider-badge pr-4">{e[1]}</div>
                  <div className="sider-link-badge">
                    <a href="#">{e[0]}</a>
                    <span className="sider-badge">
                      <span>{Math.floor(Math.random() * 7 + 1)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {i === siderLinks.length - 1 ? null : (
              <hr className="sider-divider" />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="layout">
      {context.landingStatus ? (
        // transition page markup
        <div>
          <Container fluid>
            <Row>
              <div className="landing-transition-container">
                <div className="landing-transition-left" />
              </div>
            </Row>
          </Container>
        </div>
      ) : (
        <Container fluid>
          <Row className="layout-page-container">
            {bannerMarkup}
            <Col xs={12} md={3} className="p-0">
              {context.currentViewport ? (
                context.siderState ? (
                  <>
                    <div className="siderShowHide">
                      <button
                        onClick={() =>
                          context.setSiderState(!context.siderState)
                        }
                      >
                        {siderShowHideIcon}
                      </button>
                    </div>
                    {siderMarkup}
                  </>
                ) : (
                  <div className="siderShowHide">
                    <button
                      onClick={() => context.setSiderState(!context.siderState)}
                    >
                      <FaAlignJustify />
                    </button>
                  </div>
                )
              ) : (
                <>{siderMarkup}</>
              )}
            </Col>
            <Col className="layout-page-right">
              <Container fluid className="layout-page-right-top">
                {!context.siderState || !context.currentViewport ? (
                  <div className="banner-container" />
                ) : null}
                <Row className="mb-5">
                  <Col>
                    <div className="theme-col">
                      <div className="theme-col-items theme-col-header">
                        <span>try some themes</span>
                      </div>
                      <div className="theme-col-items theme-col-link">
                        <span
                          className="clickable-item position-relative"
                          onClick={themeChanger}
                        >
                          <a href="#" data-no-decoration data-inherit-color>
                            Light
                          </a>
                        </span>
                        <span>&nbsp;| </span>
                        <span
                          className="clickable-item position-relative"
                          onClick={themeChanger}
                        >
                          <a href="#" data-no-decoration data-inherit-color>
                            Dark
                          </a>
                        </span>
                        <span>&nbsp;| </span>
                        <span
                          className="clickable-item position-relative"
                          onClick={themeChanger}
                        >
                          <a href="#" data-no-decoration data-inherit-color>
                            Dull
                          </a>
                        </span>
                        <span>&nbsp;| </span>
                        <span
                          className="clickable-item position-relative"
                          onClick={themeChanger}
                        >
                          <a href="#" data-no-decoration data-inherit-color>
                            Happy
                          </a>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="current-col">
                      <div className="current-col-items current-col-header">
                        <span>currently working on</span>
                      </div>
                      <div className="current-col-items current-col-link">
                        <span
                          className="clickable-item position-relative"
                          onClick={() =>
                            modalIframeHandler(props.currentProject)
                          }
                        >
                          <a href="#" data-no-decoration data-inherit-color>
                            {props.currentProject.header}
                          </a>
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <div className="grad-hr border-0 rounded"></div>
                </Row>
              </Container>
              {props.children}
              {/* container for footer of page */}
              <Container fluid>
                <Footer />
              </Container>
            </Col>
          </Row>
        </Container>
      )}
      {/* modal for showing iframe when currently working on is clicked */}
      <Container fluid className="iframe-modal">
        <Modal
          size="xl"
          show={modalShow}
          onHide={() => {
            setmodalShow(false)
            setiframeStatus(
              <Spinner animation="border" role="status" variant="primary" />
            )
          }}
          aria-labelledby="modal-for-current"
        >
          <Modal.Header closeButton>
            <Modal.Title id="currently-working-on-title">
              {modalContent.header}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {modalContent.body?.split('%').map((e, i) => (
                <p key={i}>{e}</p>
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="position-absolute">{iframeStatus}</div>
              <iframe
                src={modalContent.src}
                title={modalContent.title}
                onLoad={() => setiframeStatus(null)}
              />
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  )
}
export default Layout

//sets default props value for animation
Layout.defaultProps = {
  siderAnimation: false,
  currentProject: currentProject,
}
