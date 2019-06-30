import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Question from './Question'
import { connect } from 'react-redux'

class Dashboard extends Component {

constructor(props) {
    super(props);

    this.state = {
      answeredQuestion: false 
    }
  }
 
  render() {
    const { answeredQuestionId, unansweredQuestionId  } = this.props
	const { answeredQuestion } = this.state

    return (
      <div>
        <LoadingBar className="loading-bar" />
        <Nav />
      	<div className="container ">
          <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
            <li className="nav-item mt-3">
              <a className={answeredQuestion ? 'nav-link btn btn-info btn-lg' : 'nav-link btn btn-info btn-lg active'} onClick={() => this.setState({answeredQuestion: false})} id="unanswered-tab" data-toggle="pill" href="#unanswered-tab" role="tab" aria-controls="pills-home" aria-selected="true">Unanswered Questions</a>
            </li>
            <li className="nav-item mt-3">
              <a className={answeredQuestion ? 'nav-link btn btn-info btn-lg active' : 'nav-link btn btn-info btn-lg'} onClick={() => this.setState({answeredQuestion: true})} id="unanswered-tab" data-toggle="pill" href="#unanswered-tab" role="tab" aria-controls="pills-profile" aria-selected="false">Answered Questions</a>
            </li>
          </ul>
          <div className="tab-content text-center" id="pills-tabContent">
            <div className="tab-pane fade show active" id="unanswered" role="tabpanel" aria-labelledby="unanswered-tab">
				{
					answeredQuestion
					? answeredQuestionId.map((id) => (
						<li key={id}><Question id={id} answeredQuestion={this.state.answeredQuestion}/></li>
					))
					: unansweredQuestionId.map((id) => (
						<li key={id}><Question id={id} answeredQuestion={this.state.answeredQuestion}/></li>
					))
				}
			</div>
          </div>
		</div>
	  </div>
    )
  }
}

function mapStateToProps({ questions, authedUser }) {
  
  const notAnsweredQuestions = Object.values(questions).filter((question) =>
        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))

    const answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    )
    
  return {
        unansweredQuestionId: Object.values(notAnsweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        answeredQuestionId: Object.values(answeredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
    }
}

export default connect(mapStateToProps)(Dashboard)