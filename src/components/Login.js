import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import {Link, Redirect} from 'react-router-dom'

class Login extends Component {
 
  state = {
  	username: '',
    isLogged: false
  }
  
  handleSubmit = (e) => {
  e.preventDefault()
    const {username} = this.state
    const {dispatch} = this.props
    
    if (username !== "") {
            dispatch(setAuthedUser(username))
            this.setState(() => ({isLogged: true}))
        }
  }
	handleChange = (e) => {
    	const username = e.target.value
        this.setState(() => ({username}))
    }
  
  render(){
    const {from} = this.props
    const {isLogged} = this.state

	if (isLogged) {
      return <Redirect to='/'/>
    }

    return (
      <div className='container mt-4'>
        <form className='form-signin' onSubmit={this.handleSubmit}>
      		<h3>Would You Rather?</h3>
      		<p className='text-secondary'>Please Sign in </p>
            <label>User:</label>
            <select className='form-control' id='username' 
      			value={this.state.username}
				onChange={this.handleChange}>
				<option value='' disabled>Select</option>
                        {this.props.users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        )}
                    </select>
            
            <input className='btn btn-light mt-3' type="submit" value="Submit" />
			<Link to="/register" className='float-right mt-3'>Sign Up</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}){
	return {
        users: Object.values(users).map((user) => {
            return ({
                id: user.id,
                name: user.name
            })
        }),
        username: authedUser
    }
}
export default connect(mapStateToProps)(Login)