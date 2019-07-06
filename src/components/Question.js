import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from 'react-polls'

class Question extends Component {

  state = {
    pollAnswers: [
      { option: this.props.question.optionOne.text, votes: (this.props.question.optionOne.votes).length },
      { option: this.props.question.optionTwo.text, votes: (this.props.question.optionTwo.votes).length }
    ]
  }

	
  handleVote = voteAnswer => {
      const { pollAnswers } = this.state
    
      const newPollAnswers = pollAnswers.map(answer => {
        if (answer.option === voteAnswer) answer.votes++
        return answer
      })
      this.setState({
        pollAnswers: newPollAnswers
      })
    }

	
  render(){
    const { author, question, authedUser, answeredQuestion } = this.props

	const { pollAnswers } = this.state
	const pollQuestion = 'Would you rather'


  	return (
      <div className="card p-2 mx-auto">
      	<div className="row">
          <div className="col-12 col-md-5 text-center">
              <img src={author.avatarURL} className="img-fluid"/>
				<p className="text-center">{author.name}</p>
          </div>
          <div className="col-12 col-md-7">
{answeredQuestion
 ? <Poll question={pollQuestion} answers={pollAnswers} vote={ (authedUser === question.optionOne.votes) ?   this.props.question.optionOne.text :  this.props.question.optionTwo.text} onVote={this.handleVote}  />
: <Poll question={pollQuestion} answers={pollAnswers}  onVote={this.handleVote} />
}
          </div>
		</div>
      </div>
    )
  }
  
}
function mapStateToProps({ authedUser, users, questions }, { id, answeredQuestion }) {
  const question = questions[id];
  const author = question && question.author ? users[question.author] : null;
  return {
    authedUser,
    question,
    author,
    answeredQuestion
  };
}
export default connect(mapStateToProps)(Question)