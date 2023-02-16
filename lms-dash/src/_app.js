import './_app.global.css';
import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { GlobalData } from './context';
import { Layout, Header, Body, Footer } from './components/index';

class App extends Component {
  render() {
    return (
      <GlobalData>
        <Layout header={<Header />} body={<Body />} footer={<Footer />} />
      </GlobalData>
    );
  }
}

export default hot(module)(App);
