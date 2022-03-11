import { ClipWindow, Footer } from '../my_components'

export const Home = (): JSX.Element => (
  <div className="home-page">
    <main>
      <div className="home-container">
        <ClipWindow />
      </div>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
)
export default Home
