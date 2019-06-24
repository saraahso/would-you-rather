import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'

class Dashboard extends Component {
  
  render() {
    return (
      <div>
        <LoadingBar />
        <Nav />
      	<h2>alo</h2>
	  </div>
    )
  }
}

export default Dashboard