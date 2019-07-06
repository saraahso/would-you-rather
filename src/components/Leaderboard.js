import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'

class Leaderboard extends Component {

    render() {

		return (
          <div>
              <LoadingBar className="loading-bar" />
              <Nav />
              <div className="container">
                  <h3 className="text-center text-secondary mt-3 text-info">Leaderboard</h3>
                  {
                  this.props.users.map((user, index) => (
                  <div key={user.id} className="card leaderboard p-2 mx-auto mt-3">
                      <div className="row">
                          <div className="col-12 col-md-5 p-2 text-center">
                              <img src={user.avatarURL} alt="User Avatar" className="img-fluid" />
                          </div>
						  <div className="col-12 col-md-7 pt-3">
							<p className="text-center text-secondary">Position:</p>
							<h3 className="text-center text-info">{index + 1} {user.name}</h3>
							
                            <div className="row text-center">
                                <p className="text-secondary mx-auto">Questions Asked:{user.questions.length}</p>
                            </div>
                            <div className="row text-center">
                                <p className="text-secondary mx-auto">Questions Answered: {Object.keys(user.answers).length}</p>
                            </div>
						</div>
                      </div>
                  </div>
                  ))
                  }
              </div>
          </div>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
  return {
    users: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)).map((user) => users[user]),
    authedUser
  }
}
export default connect(mapStateToProps)(Leaderboard)