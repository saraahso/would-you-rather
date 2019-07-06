import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'

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
            this.setState({value: event.target.value}, function () {
            });
        }
  }
	handleChange = (e) => {
    	const username = e.target.value
        this.setState(() => ({username}))
    }
  
  render(){
	const {from} = this.props.location.state || {from: {pathname: '/'}}
    const {isLogged} = this.state

        if (isLogged) {
            return <Redirect to={from}/>
        }

    return (
        <form className="bg-white rounded text-center form-signin pt-3 pb-4 mt-5" onSubmit={this.handleSubmit}>
			<img src="http://grupormm.com.br/fotos/avatar/question.png" className="mb-4 logoLogin" />
      		<h5 className="text-secondary text-left">Would you rather?</h5>
            <p className="text-secondary text-left">Please choose your user to sign in</p>
            <select className='form-control mb-2' id="username"
      			value={this.state.username}
				onChange={this.handleChange}>
				<option value='' disabled>Select</option>
                        {this.props.users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        )}
                    </select>
            
			
            	<input className="btn btn-info mt-3 btn-block" type="submit" value="Login" />
			
        </form>
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
export default withRouter(connect(mapStateToProps)(Login))