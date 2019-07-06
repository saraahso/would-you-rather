import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import './assets/App.css'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Login from './Login'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'


class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    
    return (
      <Router>
      	<Fragment>
          <LoadingBar className="loading-bar" />
      		<div className='container-fluid p-0 m-0'>
            {this.props.loading === true ? (
              <Login />
            ) : (
                <Switch>
                  <Route path="/" exact component={Dashboard} />
				  <Route path="/newQuestion" exact component={NewQuestion} />
				  <Route path="/leaderboard" exact component={Leaderboard} />
                </Switch>
            )}
          </div>
		</Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
