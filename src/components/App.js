import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import './assets/App.css'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Dashboard from './Dashboard'
import Login from './Login'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      
      <Router>
      	<LoadingBar />
      	<div className='container'>
            <Nav />
            {this.props.loading === true ? 
             ( <Login /> )
              : (<div>
                  <Route path='/' exact component={Dashboard} />
                </div>)}
          </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
