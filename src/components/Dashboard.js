import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Question from './Question'

class Dashboard extends Component {
  
  constructor(){
  	super()
    this.state = { 
    	answeredQuestion: false 
    }
    this.toggle = this.toggle.bind(this)
  }
  
  toggle () {
    this.state.answeredQuestion ? this.setstate({  answeredQuestion: false }) : this.setState({ answeredQ: true })
    this.forceUpdate()
  }
  
  render() {
    const { unansweredQ, answeredQ, user } = this.props
    const { answeredQuestion } = this.state
    return (
      <div>
        <LoadingBar />
        <Nav />
      	<div className="container">
      		
      		 	<ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="unanswered-tab" data-toggle="tab" href="#unansweredtab" role="tab" aria-controls="unansweredtab" aria-selected="true">UNANSWERED QUESTIONS</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="answered-tab" data-toggle="tab" href="#answeredtab" role="tab" aria-controls="answeredtab" aria-selected="false">ANSWERED QUESTIONS</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="unansweredtab" role="tabpanel" aria-labelledby="unanswered-tab">
		{ answeredQuestion && answeredQ.map(question => (
              <Question question={question} answer=		{user.answers[question.id]} key={question.id} />
            ))}
      </div>
                  <div className="tab-pane fade" id="answeredtab" role="tabpanel" aria-labelledby="answered-tab">.w.</div>
                </div>
      		</div>
	  </div>
    )
  }
}

export default Dashboard