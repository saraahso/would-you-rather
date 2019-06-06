import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = event => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.value));
  };

  render() {
    const { users } = this.props;

    return (
      <div className='login'>
				<h2 className='center'>Would You Rather...?</h2>
				<form className='login-form' onSubmit={this.handleLogin}>
					<input 
						id='username-input'
						className='input' 
						type='text' 
						placeholder='Who are you?' 
						value={users} 
						onChange={this.handleChange}
					/>
					{
						this.state.loginFail &&
							<p className='login-error'>Invalid Username. Try again.</p>
					}
					<div className='btn-login-group'>
						<button className='btn' type='submit'>Login</button>
						<button className='btn' type='button' onClick={this.showHelp}>Help</button>
					</div>
				</form>
			</div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users),
    users
  };
}

export default connect(mapStateToProps)(Login);