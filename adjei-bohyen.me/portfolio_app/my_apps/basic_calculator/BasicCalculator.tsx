import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa'
import { Housing } from './'

/**
 * typings declaration for props on BasicCalculator module
 */
type TProps = {}

/**
 * typings declaration for state on BasicCalculator module
 */
type TState = {
  outputTop: string
  outputBottom: string
  parenthesis: boolean
  answer: string
  answerState: boolean
}

export class BasicCalculator extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      outputTop: '',
      outputBottom: '',
      parenthesis: false,
      answer: '',
      answerState: false,
    }
    this.input = this.input.bind(this)
  }

  // this function recursively removes unnecessary zeros at the end of a calculation
  private recZero(params: string) {
    console.log(params)
    if (params[params.length - 1] === '0') {
      const newStr = params.slice(0, params.length - 1)
      return this.recZero(newStr)
    } else {
      return params
    }
  }

  // variable for instance of calculator
  private processor(params: string) {
    const args = params.split(' ')
    let ans = ''
    const stack = []
    let paren = false
    let parenStack = []

    try {
      args.map((e) => {
        if (e.length > 0) {
          if (e === '(ANS' || e === 'ANS' || e === 'ANS)') {
            e =
              e === '(ANS'
                ? '(' + this.state.answer
                : e === 'ANS'
                ? this.state.answer
                : e === 'ANS)'
                ? this.state.answer + ')'
                : null
          }
          if (e === '^') {
            e = '**'
          }
          if (e[0] === '(' || paren) {
            paren = true
            parenStack.push(e.replace('(', ''))
          }
          if (e[e.length - 1] === ')' && paren) {
            paren = false
            parenStack[parenStack.length - 1] = parenStack[
              parenStack.length - 1
            ].replace(')', '')
            stack.push(eval(parenStack.toString().replace(/,/g, ' ')))
            parenStack = []
          }
          if (e[e.length - 1] !== ')' && !paren) {
            stack.push(e)
          }
        }
      })
      const res = String(eval(stack.toString().replace(/,/g, ' ')))
      ans = res.includes('.')
        ? this.recZero(parseFloat(res).toFixed(7))
        : // ? parseFloat(res).toFixed(7)
          parseFloat(res).toFixed(1)

      return ans
    } catch (error) {
      return 'error'
    }
  }

  // recieves input from the calculator interface and passes it on to the processor
  private input(event: React.MouseEvent) {
    const currentInput = event.currentTarget.textContent
    const operands = [
      'ANS',
      '.',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ]
    const operators = ['^', '/', '*', '-', '+']

    // AC handler
    if (currentInput === 'AC' || this.state.answerState) {
      this.setState({
        outputTop: '',
        outputBottom: this.state.answerState
          ? operands.includes(currentInput)
            ? currentInput
            : operators.includes(currentInput)
            ? this.state.outputBottom + ' ' + currentInput + ' '
            : currentInput === '%'
            ? this.state.outputBottom + ' ' + '/ 100'
            : ''
          : '',
        parenthesis: false,
        answerState: false,
      })
      return
    }

    // DEL handler
    if (currentInput === 'DEL' && this.state.outputBottom.length > 0) {
      this.setState({
        outputBottom: this.state.outputBottom
          .slice(0, this.state.outputBottom.length - 1)
          .trim(),
      })
      return
    }

    // operator as first input edge case
    if (
      operators.filter((e) => e !== '-').includes(currentInput) &&
      this.state.outputBottom.length < 1
    )
      return
    // decimal edge case
    if (
      this.state.outputBottom.match(/[0-9.]*$/gi)[0].includes('.') &&
      currentInput === '.'
    )
      return
    // parenthesis edge case
    if (!this.state.parenthesis && currentInput === '(') {
      this.setState((prevState) => ({
        outputBottom:
          this.state.outputBottom.length < 1
            ? currentInput
            : operators.includes(
                this.state.outputBottom[this.state.outputBottom.length - 1]
              )
            ? prevState.outputBottom + ' ' + currentInput
            : prevState.outputBottom + ' ' + '*' + ' ' + currentInput,
        parenthesis: true,
      }))
    }
    if (this.state.parenthesis && currentInput === ')') {
      this.setState((prevState) => ({
        outputBottom: prevState.outputBottom + currentInput + ' ',
        parenthesis: false,
      }))
    }
    // percetage case
    if (
      currentInput === '%' &&
      !operators.includes(
        this.state.outputBottom[this.state.outputBottom.length - 2]
      )
    ) {
      this.setState((prevState) => ({
        outputBottom: prevState.outputBottom + '/ 100' + ' ',
      }))
    }
    // all other input cases
    if (operands.includes(currentInput)) {
      this.setState((prevState) => ({
        outputBottom: prevState.outputBottom + currentInput,
      }))
    }
    if (
      operators.includes(currentInput) &&
      !operators.includes(
        this.state.outputBottom[this.state.outputBottom.length - 2]
      )
    ) {
      this.setState((prevState) => ({
        outputBottom: prevState.outputBottom + ' ' + currentInput + ' ',
      }))
    }
    // handle return
    if (currentInput === '=') {
      const ans = this.state.parenthesis
        ? this.processor(this.state.outputBottom + ')')
        : this.processor(this.state.outputBottom)

      this.setState({
        outputTop: this.state.parenthesis
          ? this.state.outputBottom + ') ='
          : this.state.outputBottom + ' =',
        outputBottom: ans,
        parenthesis: false,
        answer: ans,
        answerState: true,
      })
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs={12} xl={4}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                  <div>
                    <h5>
                      <strong>basic mathematics calculator</strong>
                    </h5>
                  </div>

                  <hr />

                  <div>
                    <div className="mb-3">
                      <p>
                        An implementation of a basic mathematics calculator app,
                        purely composed in a React JS component.
                      </p>
                      <p>
                        The logic is handled by parsing the user input string to
                        a custom function which uses a stacking algorithm to
                        analyse and evaluate the input and returns an answer.
                      </p>
                      <p>
                        The design uses{' '}
                        <a
                          href="https://react-bootstrap.github.io/layout/grid/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Bootstrap's
                        </a>{' '}
                        grid system.
                      </p>
                      <div>
                        <strong>Key</strong>
                        <ul>
                          <li>
                            <span className="c-text-info">DEL</span> - clears
                            last entry
                          </li>
                          <li>
                            <span className="c-text-info">ANS</span> - holds
                            value of last computation
                          </li>
                        </ul>
                        <span>all others carry standard meaning</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <a
                        href="https://github.com/nanacnote/personal_site/tree/master/my_apps/basic_calculator"
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
            <Col>
              <div className="d-flex justify-content-center align-items-center h-100 overflow-auto">
                <Housing
                  input={this.input}
                  output={[this.state.outputTop, this.state.outputBottom]}
                  parenthesis={this.state.parenthesis}
                  answerState={this.state.answerState}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default BasicCalculator
