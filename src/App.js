import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter, Route, Switch, Link } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Head from 'react-helmet'

import './App.css';

const comp = text => props =>
  <div className="comp">
    <Head>
      <title>{props.location.pathname}</title>
    </Head>
    <h1>{text}</h1>
  </div>

const routes = [
  {
    path: '/',
    exact: true,
    component: comp('Home'),
  },
  {
    path: '/hello',
    component: comp('Hello world'),
  },
  {
    path: '/foo',
    component: comp('fooooooo'),
  },
  {
    path: '/bar',
    component: comp('bar'),
  },
]

@withRouter
export default class App extends Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
      pathname: PropTypes.string.isRequired,
    })
  }

  render() {
    return (
      <main>
        <Head titleTemplate="React Router Transitions Demo - %s" />
        <ul>
          {routes.map(route =>
            <li key={route.path}>
              <Link to={route.path}>{route.path}</Link>
            </li>
          )}
        </ul>
        <hr/>
        <div className="content">
          <CSSTransitionGroup
            transitionName="fadeInOut"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}
          >
            <Switch
              // key={this.props.location.key}  // Try uncommenting this!
              key={this.props.location.pathname}
              location={this.props.location}
            >
              {routes.map(route => <Route key={route.path} {...route} />)}
            </Switch>
          </CSSTransitionGroup>
        </div>
      </main>
    );
  }
}
