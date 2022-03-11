import { Component } from 'react'
import Matter from 'matter-js'
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaQuestionCircle, FaArrowUp } from 'react-icons/fa'

/**
 * typings declaration for props on NewtonsCradle module
 */
type TProps = {}

/**
 * typings declaration for state on NewtonsCradle module
 */
type TState = {
  viewCode: boolean
  showHide: string
}

export class NewtonsCradle extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      viewCode: false,
      showHide: 'Show',
    }
  }
  // ref for canvas wrapper
  private canvasRef: HTMLCanvasElement

  // module aliases
  private Engine = Matter.Engine
  private Render = Matter.Render
  private World = Matter.World
  private Bodies = Matter.Bodies
  private Constraint = Matter.Constraint
  private Mouse = Matter.Mouse
  private MouseConstraint = Matter.MouseConstraint

  // create an engine
  private engineM = this.Engine.create()
  // create the world
  private worldM = this.engineM.world
  // create the renderer
  private renderM: Matter.Render

  componentDidMount() {
    // create a renderer
    this.renderM = this.Render.create({
      canvas: this.canvasRef,
      engine: this.engineM,
      options: {
        width: 800,
        height: 400,
        background: 'transparent',
        wireframes: false,
        showAngleIndicator: true,
      } as any,
    })

    // create roof body and add to world
    const roof = this.Bodies.rectangle(400, 0, 810, 20, { isStatic: true })
    const ground = this.Bodies.rectangle(400, 400, 810, 20, { isStatic: true })
    const leftWall = this.Bodies.rectangle(0, 300, 20, 610, { isStatic: true })
    const rightWall = this.Bodies.rectangle(800, 300, 20, 610, {
      isStatic: true,
    })
    this.World.add(this.worldM, [roof, ground, leftWall, rightWall])

    const balls = []
    // create 5 balls body and add to world with constraints
    for (let i = 0; i < 5; i++) {
      balls.push(
        this.Bodies.circle(300 + i * 40, 300, 20, {
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0.0001,
          slop: 1,
        })
      )
    }

    // add constraints to the balls in the world
    balls.map((e, i) => {
      const constraint = this.Constraint.create({
        bodyA: e,
        pointB: { x: 300 + i * 40, y: 0 },
        length: 200,
        stiffness: 1,
        render: {
          strokeStyle: 'black',
        },
      } as any)
      this.World.add(this.worldM, [e, constraint])
    })

    // add click listener to canvas
    const mouseEvent = this.Mouse.create(this.canvasRef)
    const mouseConstraint = this.MouseConstraint.create(this.engineM, {
      mouse: mouseEvent,
      constraint: {
        stiffness: 0.2,
        angularStiffness: 0,
        render: {
          visible: false,
        },
      } as any,
    })
    this.World.add(this.worldM, mouseConstraint)

    // run the engine
    this.Engine.run(this.engineM)

    // run the renderer
    this.Render.run(this.renderM)
  }

  componentWillUnmount() {
    this.Engine.clear(this.engineM)
    this.Render.stop(this.renderM)
  }

  render() {
    const viewCodeHandler = async () => {
      await this.setState({ viewCode: !this.state.viewCode })
      switch (this.state.viewCode) {
        case true:
          this.setState({ showHide: 'Hide' })
          break
        case false:
          this.setState({ showHide: 'Show' })
          break
        default:
          break
      }
    }

    return (
      <div>
        <Container>
          <Row>
            <Col xs={12} xl={4}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                  <div>
                    <h5>
                      <strong>a simple physics simulation</strong>
                    </h5>
                  </div>

                  <hr />

                  <div>
                    <div className="mb-3">
                      This project was inspired by the thought of capturing some
                      fundamental physics laws using a visual and interactive
                      approach. After thinking on this for a while, I decided to
                      simulate the famous so-called Newtons cradle.
                    </div>
                    <div className="mb-3">
                      <div
                        className="py-1 position-relative clickable-item text-center text-primary border border-primary rounded"
                        onClick={viewCodeHandler}
                      >
                        {this.state.showHide} Source Code
                        <FaQuestionCircle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center align-items-center h-100">
                <canvas
                  className="modal-canvas"
                  ref={(div) => (this.canvasRef = div)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {this.state.viewCode ? (
              <div className="my-5 px-4 w-100">
                <hr />
                <div>
                  <div className="mb-3">
                    <span className="bg-warning">
                      Drag one of the balls at the ends and release to start the
                      simulation
                    </span>
                  </div>
                  <div>
                    <p>
                      This simple experiment explains a few fundamental laws of
                      physics.
                    </p>
                    <ul>
                      <li>
                        <b>Newton's first law</b>
                      </li>
                      <li>
                        <b>Newton's second law</b>
                      </li>
                      <li>
                        <b>Newton's third law</b>
                      </li>
                    </ul>
                    <p>However it takes quite a bit of code to implement.</p>
                    <p>
                      Luckily HTML5's canvas API coupled with the popular
                      JavaScript physics engine: Matter.js made coding this
                      fairly easy. But then again, an intermediate understanding
                      of Canvas API and Matter.js is needed.
                    </p>
                    <p>
                      I will focus on the{' '}
                      <i>
                        <u>Physics</u>
                      </i>{' '}
                      and{' '}
                      <i>
                        <u>Matter.js</u>
                      </i>{' '}
                      in this write up but if you require more information on
                      canvas checkout{' '}
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
                        target="_blank"
                        rel="noreferrer"
                      >
                        MDN web doc
                      </a>
                      . But in a nutshell the canvas API just like the name
                      suggest is a space within which you can render 2D and 3D
                      context.
                    </p>
                    <p>
                      <b>So what is Matter.js?</b>
                    </p>
                    <p>
                      Matter.js is a 2D physics engine for the web as described
                      on the{' '}
                      <a
                        href="https://brm.io/matter-js/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        matter.js website
                      </a>
                      . It can be used to simulate how rigid bodies will behave
                      in the real world. For example, using Matter.js you can
                      simulate what will happen when a force of x amount hits a
                      station body. This ability makes Matter.js useful in game
                      development, computer graphics and film.
                    </p>
                    <p>
                      In this project a few steps were necessary to simulate the
                      cradle.
                    </p>
                    <li>
                      <b>initialise instance</b>
                    </li>
                    <div className="p-3">
                      <p>
                        To start with, the Matter.js engine and the renderer
                        should be initialised. This website is built with
                        Next.js so to create an instance of Matter.js, the code
                        block should sit in the{' '}
                        <i>
                          <u>componentDidMount</u>
                        </i>{' '}
                        lifecycle method (ie when using a class-based
                        component). Also, this website is developed in strict
                        typescript mode hence all the typing and type casting
                        inside the code.
                      </p>
                      <div className="code-block">
                        <p>
                          ** module aliases
                          <br />
                          private Engine = Matter.Engine
                          <br />
                          private Render = Matter.Render
                          <br />
                          private World = Matter.World
                          <br />
                          private Bodies = Matter.Bodies
                          <br />
                          private Constraint = Matter.Constraint
                          <br />
                          private Mouse = Matter.Mouse
                          <br />
                          private MouseConstraint = Matter.MouseConstraint
                          <br />
                          <br />
                          ** create an engine
                          <br />
                          private engineM = this.Engine.create()
                          <br />
                          ** create the world
                          <br />
                          private worldM = this.engineM.world
                          <br />
                          ** create the renderer
                          <br />
                          private renderM: Matter.Render;
                          <br />
                          <br />
                          componentDidMount() &#123;
                          <br />
                          &emsp;** create a renderer
                          <br />
                          &emsp;this.renderM = this.Render.create(&#123;
                          <br />
                          &emsp;&emsp;canvas: this.canvasRef,
                          <br />
                          &emsp;&emsp;engine: this.engineM,
                          <br />
                          &emsp;&emsp;options: &#123;
                          <br />
                          &emsp;&emsp;&emsp;width: 800,
                          <br />
                          &emsp;&emsp;&emsp;height: 400,
                          <br />
                          &emsp;&emsp;&emsp;background: 'transparent',
                          <br />
                          &emsp;&emsp;&emsp;wireframes: false,
                          <br />
                          &emsp;&emsp;&emsp;showAngleIndicator: true,
                          <br />
                          &emsp;&emsp;&#125; as any,
                          <br />
                          &emsp;&#125;)
                          <br />
                          ...
                          <br />
                        </p>
                      </div>
                    </div>
                    <li>
                      <b>static roof</b>
                    </li>
                    <div className="p-3">
                      <p>
                        In matter.js a rigid body can be made to behave like a
                        wall by setting <code>isStatic: true</code> in the
                        options object of the bodies method. Using this I
                        positioned a roof at the top of the canvas to which I
                        subsequently attached the Pendulum. I also created three
                        other bodies to serve as walls and a ground.
                      </p>
                      <div className="code-block">
                        <p>
                          ...
                          <br />
                          ** create static roof body, ground and walls
                          <br />
                          const roof = this.Bodies.rectangle(400, 0, 810, 20,
                          &#123; isStatic: true &#125;)
                          <br />
                          const ground = this.Bodies.rectangle(400, 400, 810,
                          20, &#123; isStatic: true &#125;)
                          <br />
                          const leftWall = this.Bodies.rectangle(0, 300, 20,
                          610, &#123; isStatic: true &#125;)
                          <br />
                          const rightWall = this.Bodies.rectangle(800, 300, 20,
                          610, &#123; isStatic: true &#125;)
                          <br />
                          ...
                          <br />
                        </p>
                      </div>
                      <p>
                        After creating the bodies the next step was to add them
                        into the world
                      </p>
                      <div className="code-block">
                        <p>
                          ...
                          <br />
                          ** add bodies into world
                          <br />
                          this.World.add(this.worldM, [roof, ground, leftWall,
                          rightWall])
                          <br />
                          ...
                          <br />
                        </p>
                      </div>
                    </div>

                    <li>
                      <b>circle bodies</b>
                    </li>
                    <div className="p-3">
                      <p>
                        Matter.js has factory defined bodies. These can be
                        accessed through the bodies method. I decided to use the
                        circles body which renders a color filled circle onto
                        the canvas. The optional options object passed to this
                        method as a parameter is where the magic happens. To
                        achieve a real world case of solid spherical weighted
                        balls with the right elasticity, the options object
                        should look something like this.
                        <br />
                        <code>
                          &#123; inertia: Infinity, restitution: 1, friction: 0,
                          frictionAir: 0.0001, slop: 1 &#125;
                        </code>
                      </p>
                      <div className="code-block">
                        ...
                        <br />
                        const balls = []
                        <br />
                        ** create 5 balls body and add to world with constraints
                        <br />
                        for(let i=0; i&gt;5; i++) &#123;
                        <br />
                        &emsp;balls.push( <br />
                        &emsp;&emsp;this.Bodies.circle(
                        <br />
                        &emsp;&emsp;&emsp;300+ i*40 , 300, 20, <br />
                        &emsp;&emsp;&emsp;&#123; inertia: Infinity, restitution:
                        1, friction: 0, frictionAir: 0.0001, slop: 1 &#125;
                        <br />
                        &emsp;&emsp;)
                        <br />
                        &emsp;)
                        <br />
                        &#125;
                        <br />
                        ...
                        <br />
                      </div>
                    </div>
                    <li>
                      <b>constraints</b>
                    </li>
                    <div className="p-3">
                      <p>
                        After creating the circle bodies, there was one more
                        step left to complete the physical appearance of the
                        cradle. This was to add constraints to the balls and
                        attach them to the roof of the world. This step can be
                        achieved by calling the constraint method. In my case
                        with multiple balls I called the map function to map
                        over the balls array and attach a constraint to each
                        ball while immediately adding this new composite to the
                        world.
                      </p>
                      <div className="code-block">
                        ...
                        <br />
                        ** add constraints to the balls in the world
                        <br />
                        balls.map((e,i) =&gt; &#123;
                        <br />
                        &emsp;const constraint = this.Constraint.create(&#123;
                        <br />
                        &emsp;&emsp;bodyA: e,
                        <br />
                        &emsp;&emsp;pointB: &#123; x: 300 + i*40, y: 0 &#125;,
                        <br />
                        &emsp;&emsp;length: 200,
                        <br />
                        &emsp;&emsp;stiffness: 1,
                        <br />
                        &emsp;&emsp;render: &#123;
                        <br />
                        &emsp;&emsp;&emsp;strokeStyle: 'black',
                        <br />
                        &emsp;&emsp;&#125;
                        <br />
                        &emsp;&#125; as any);
                        <br />
                        &emsp;this.World.add(this.worldM, [e, constraint])
                        <br />
                        &#125;)
                        <br />
                        ...
                        <br />
                      </div>
                    </div>
                    <li>
                      <b>mouse event</b>
                    </li>
                    <div className="p-3">
                      <p>
                        Finally I attached the mouse and touch event handlers to
                        the canvas using the mouse and mouseEvent methods from
                        Matter.js. The code block below shows the syntax. I have
                        also included the code that triggers method that runs
                        the engine and renderer. and closed the{' '}
                        <i>
                          <u>componentDidMount</u>
                        </i>{' '}
                        life cycle method.
                      </p>
                      <div className="code-block">
                        ...
                        <br />
                        &emsp;** add click listener to canvas
                        <br />
                        &emsp;const mouseEvent =
                        this.Mouse.create(this.canvasRef)
                        <br />
                        &emsp;const mouseConstraint =
                        this.MouseConstraint.create(this.engineM, &#123;
                        <br />
                        &emsp;&emsp;mouse: mouseEvent,
                        <br />
                        &emsp;&emsp;constraint: &#123;
                        <br />
                        &emsp;&emsp;&emsp;stiffness: 0.2,
                        <br />
                        &emsp;&emsp;&emsp;angularStiffness: 0,
                        <br />
                        &emsp;&emsp;&emsp;render: &#123;
                        <br />
                        &emsp;&emsp;&emsp;&emsp;visible: false,
                        <br />
                        &emsp;&emsp;&emsp;&#125;
                        <br />
                        &emsp;&emsp;&#125; as any,
                        <br />
                        &emsp;&#125;)
                        <br />
                        &emsp;this.World.add(this.worldM, mouseConstraint);
                        <br />
                        <br />
                        &emsp;** run the engine
                        <br />
                        &emsp;this.Engine.run(this.engineM)
                        <br />
                        <br />
                        &emsp;** run the renderer
                        <br />
                        &emsp;this.Render.run(this.renderM)
                        <br />
                        <br />
                        &emsp;&#125;
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex flex-column justify-content-center align-items-start position-sticky"
                  style={{ bottom: '25px' }}
                >
                  <div>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={function (props) {
                        return (
                          <Tooltip id="button-tooltip" {...props}>
                            Hide Source Code
                          </Tooltip>
                        )
                      }}
                    >
                      <div
                        className="mt-5 clickable-item-circle"
                        onClick={viewCodeHandler}
                      >
                        <FaArrowUp />
                      </div>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            ) : null}
          </Row>
        </Container>
      </div>
    )
  }
}
export default NewtonsCradle
