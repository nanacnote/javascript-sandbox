import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaGithub, FaEraser, FaInfoCircle } from 'react-icons/fa'
import { TextField } from './'
import { default as marked } from 'marked'

/**
 * typings declaration for props on MarkdownViewer module
 */
type TProps = {}

/**
 * typings declaration for state on MarkdownViewer module
 */
type TState = {
  inputData: string
  outputData: string
}

export class MarkdownViewer extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      inputData: '',
      outputData: '',
    }
    this.input = this.input.bind(this)
  }

  // this function accepts and process input from the TextField component
  private input(params: React.ChangeEvent) {
    this.setState({
      inputData: (params.currentTarget as HTMLTextAreaElement).value,
    })
  }

  componentDidUpdate(prevProps: TProps, prevState: TState) {
    if (this.state.inputData !== prevState.inputData) {
      this.setState({
        outputData: marked(this.state.inputData),
      })
    }
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
                      <strong>full Markdown code parser</strong>
                    </h5>
                  </div>

                  <hr />

                  <div>
                    <div className="mb-3">
                      <p>
                        This is a live markdown application, accepting user
                        input in a text field and concurrently returning
                        formated text.
                      </p>
                      <p>
                        <a
                          href="https://marked.js.org/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Marked JS
                        </a>{' '}
                        low-level markdown compiler API is used in the
                        background to parse user input.
                      </p>
                    </div>
                    <div className="mb-5">
                      <a
                        href="https://github.com/nanacnote/personal_site/tree/master/my_apps/markdown_viewer"
                        target="_blank"
                        rel="noreferrer"
                        data-no-decoration
                      >
                        <div className="py-1 my-2 position-relative clickable-item text-center text-primary border border-primary rounded">
                          Source Code <FaGithub />
                        </div>
                      </a>
                      <div
                        className="py-1 my-2 position-relative clickable-item text-center text-info border border-info rounded"
                        onClick={() =>
                          this.setState({
                            inputData: sampleMarkdown,
                          })
                        }
                      >
                        View Example
                        <FaInfoCircle />
                      </div>
                      <div
                        className="py-1 my-2 position-relative clickable-item text-center text-danger border border-danger rounded"
                        onClick={() =>
                          this.setState({
                            inputData: '',
                            outputData: '',
                          })
                        }
                      >
                        Clear Input <FaEraser />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6}>
              <div className="d-flex justify-content-center align-items-center h-100 overflow-auto">
                <TextField
                  type={'source'}
                  input={this.input}
                  output={this.state.inputData}
                />
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <div className="d-flex justify-content-center align-items-center h-100 overflow-auto">
                <TextField type={'parsed'} output={this.state.outputData} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default MarkdownViewer

export const sampleMarkdown = ` cheatsheet

---
# H1
## H2
### H3

**bold text**

*italicized text*

> blockquote

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

\`code\`

[Go to this link](http://www.adjei-bohyen.me/projects/MarkdownViewer?cat=Web%20Development)

![alt text](https://picsum.photos/100)

| Syntax | Description | Example |
| ----------- | ----------- | ----------- |
| Header | Title | A header
| Paragraph | Text | A text
&nbsp;
\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\`

term
: definition

~~The world is flat.~~

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
`
