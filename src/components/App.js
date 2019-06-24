import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import './assets/App.css'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Login from './Login'
import Nav from './Nav'
class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    const { authedUser, dispatch } = this.props;
    
    return (
      <Router>
      	<Fragment>
          <LoadingBar />
      		<div className='container-fluid p-0'>
            {!authedUser
                        ? <Login />
                        : <div>
                            <Route path="/login" component={Login}/>
                            <Route path="/" exact component={Dashboard}/>
                        </div>}
          </div>
		</Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(App)
