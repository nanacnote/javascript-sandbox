import { GetStaticProps } from 'next'
import { Layout, Introduction } from '../my_components'

export const Main = ({ post }): JSX.Element => (
  <div className="main-page">
    <main>
      <Layout siderAnimation>
        <Introduction post={post} />
      </Layout>
    </main>
  </div>
)

export default Main

export const getStaticProps: GetStaticProps = async () => {
  const post = (await import('../my_lib/profile.json')).default

  return {
    props: {
      post,
    },
  }
}
