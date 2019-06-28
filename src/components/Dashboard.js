import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Question from './Question'
import { connect } from 'react-redux'

class Dashboard extends Component {
    state = { 
    	answeredQuestion: false 
    }
 
  render() {
    const { questionKeys, answeredQuestionKey } = this.props
	const { answeredQuestion } = this.state

	const ids = answeredQuestion
      ? questionKeys.filter(id => answeredQuestionKey.includes(id))
      : questionKeys.filter(id => !answeredQuestionKey.includes(id))

    return (
      <div>
        <LoadingBar className="loading-bar" />
        <Nav />
      	<div className="container">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" onClick={() => this.setState({answeredQuestion: false})} id="unanswered-tab" data-toggle="pill" href="#unanswered-tab" role="tab" aria-controls="pills-home" aria-selected="true">Unanswered Questions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => this.setState({answeredQuestion: true})} id="answered-tab" data-toggle="pill" href="#answered-tab" role="tab" aria-controls="pills-profile" aria-selected="false">Answered Questions</a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="unanswered" role="tabpanel" aria-labelledby="unanswered-tab">
				<ul>{ids.map(id => (<li key={id}><Question id={id}/></li>))}</ul>
			</div>
            <div className="tab-pane fade" id="answered" role="tabpanel" aria-labelledby="answered-tab">
				<ul>{ids.map(id => (<li key={id}><Question id={id}/></li>))}</ul>
			</div>
          </div>
		</div>
	  </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questionKeys: Object.keys(questions),
    answeredQuestionKey: users[authedUser]
    ? Object.keys(users[authedUser].answers)
    : []
  }
}

export default connect(mapStateToProps)(Dashboard)