import React, { Component } from 'react'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

  state = {
    'optionOne': '',
    'optionTwo': '',
    'toHome': false
  }

	handleOptionOneChange = (e) => {
      const optionOne = e.target.value
      
      this.setState(()=>({
        optionOne
      }))
    }

	handleOptionTwoChange = (e) => {
      const optionTwo = e.target.value
      
      this.setState(()=>({
        optionTwo
      }))
	}

	handleAddQuestion = (e, optionOne, optionTwo) => {
      e.preventDefault()
      const { dispatch, authedUser } = this.props
      
      dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))
        .then(() =>
              this.setState({
        		'optionOne': '',
        		'optionTwo': '',
        		'toHome': true
      	}))
    }

	render() {
      const { optionOne, optionTwo } = this.state
	
		if ( this.state.toHome ){
          return <Redirect to='/' />
        }
	
		return (
          <div>
          	<LoadingBar className="loading-bar" />
        	<Nav />
          	<div className="card p-3 mx-auto mt-4">
          	<img src="http://grupormm.com.br/fotos/avatar/question.png" className="mx-auto mb-4 logoLogin" />
          	<h3 className="mt-2 text-center text-secondary">Add a new question</h3>
          	<form className="form-group m-2" onSubmit={(e) => this.handleAddQuestion(e, optionOne, optionTwo)}>
				<input id="optionOne"
					className="form-control m-1"
					type="text"
					placeholder="Type here you first option" 
					value={optionOne}
					onChange={this.handleOptionOneChange}/>
				<input id="optionTwo"
					className="form-control m-1" 
					type="text" 
					placeholder="Type here your second option" 
					value={optionTwo}
					onChange={this.handleOptionTwoChange}/>
					{ (optionOne && optionTwo)
						? <button className="btn btn-dark mt-2 ml-2" type="submit">Ask Question</button>
						: <button className="btn btn-dark mt-2 ml-2" type="button" disabled>Ask Question</button>
					}
				</form>
			</div>
		</div>
		)
	}
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(NewQuestion)