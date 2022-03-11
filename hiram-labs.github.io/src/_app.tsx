import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './_app.global.css';
import { Layout, Header, Body, Footer } from './components/index';
import { AppProvider } from './hooks';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <div className={'app-wrapper font-lato '}>
          <Layout header={<Header />} body={<Body />} footer={<Footer />} />
        </div>
      </AppProvider>
    );
  }
}

export default hot(module)(App);
