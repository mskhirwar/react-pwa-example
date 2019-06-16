/**
 * index.js
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

// logo icon path - https://www.flaticon.com/free-icon/think_1373027
import logo from './logo.svg';
import './styles.css';

const Page = ({ title }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>{title}</h2>
    </div>
    <p className="App-intro">
      {`This is the ${title} page.`}
    </p>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/about">About</Link>
    </p>
    <p>
      <Link to="/settings">Settings</Link>
    </p>
  </div>
);

Page.defaultProps = {
  title: '',
};

Page.propTypes = {
  title: PropTypes.string,
};

const Home = () => (
  <Page title="Home" />
);

const About = () => (
  <Page title="About" />
);

const Settings = () => (
  <Page title="Settings" />
);

const App = () => (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/settings" component={Settings} />
  </Router>
);

// const MainApp = () => (
//   <h1>React.js Progressive Web App</h1>
// );

// render app
render(<App />, document.getElementById('app'));
