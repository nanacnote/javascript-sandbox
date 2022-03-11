import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '../../my_components'
import { projectsDictionary } from '../../my_lib'
import { Container, Row, Col } from 'react-bootstrap'
import sortBy from 'lodash/sortBy'

export const Projects = (): JSX.Element => {
  // router setup
  const router = useRouter()
  const { slug, cat } = router.query

  return (
    <div className="project-page">
      <main>
        <div className="project-container">
          <Layout>
            <div className="mb-5 d-flex">
              <div className="clickable-item p-1 position-relative">
                <Link href="/main">
                  <a href="#" data-no-decoration data-inherit-color>
                    Home
                  </a>
                </Link>
              </div>
              <div className="p-1 position-relative">|</div>
              <div
                className="clickable-item p-1 position-relative"
                onClick={() => window.history.back()}
              >
                <span>Back</span>
              </div>
            </div>
            <div className="mb-5">
              {projectsDictionary[
                cat as 'Web Development' | 'Data Science'
              ]?.map((e) => {
                return e.slug === slug ? e.component : undefined
              }) || (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="pb-4">
                    <img
                      src="/pics/404.png"
                      alt="404 error illustration"
                      style={{ width: '200px' }}
                    />
                  </div>
                  <div className="text-center">
                    <p>Hmm! seeing this text is a rare event &#x1f914;.</p>
                    <p>
                      You have navigated to an unlisted page directly &#x1f937;.
                    </p>
                    <p>
                      A user interaction is required to hydrate projects
                      pathslugs &#x1f4a7;.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-5 border rounded">
              <Container fluid>
                <Row className="px-2 py-2">
                  <Col>
                    <div>
                      <strong>List of all projects</strong>
                    </div>
                  </Col>
                </Row>
                <Row className="px-2 py-2">
                  <Container fluid>
                    <Row>
                      <Col>
                        <div className="c-text-primary py-3">
                          Web Development
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      {sortBy(projectsDictionary['Web Development'], function (
                        o
                      ) {
                        return o.name
                      }).map((e) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={e.slug}>
                          <Link
                            href="/projects/[slug]?cat=Web Development"
                            as={`/projects/${e?.slug}?cat=Web Development`}
                          >
                            <a href="#" data-no-decoration>
                              <div className="clickable-item py-0">
                                •&nbsp;{e.name}
                              </div>
                            </a>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                    <Row>
                      <Col>
                        <div className="c-text-primary py-3">Data Science</div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      {sortBy(projectsDictionary['Data Science'], function (o) {
                        return o.name
                      }).map((e) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={e.slug}>
                          <Link
                            href="/projects/[slug]?cat=Data Science"
                            as={`/projects/${e?.slug}?cat=Data Science`}
                          >
                            <a href="#" data-no-decoration>
                              <div className="clickable-item py-0">
                                •&nbsp;{e.name}
                              </div>
                            </a>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </Row>
              </Container>
            </div>
          </Layout>
        </div>
      </main>
    </div>
  )
}
export default Projects
