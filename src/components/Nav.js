import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import {logout} from "../actions/authedUser"
import { connect } from 'react-redux'

class Nav extends Component {
  state = {
        redirectLogin: false
    }

  logout = (e) => {
    e.preventDefault()
    this.props.dispatch(logout())
   	this.setState(() => ({
            redirectLogin: true
    }))
  }
  render(){
    const {redirectLogin} = this.state

   if (redirectLogin === true) {
   	return (<Redirect to="/login"/>)
   }
    return (
      <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
     	<img src="http://grupormm.com.br/fotos/avatar/question.png" className="navbar-brand" />
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink to='/' exact activeClassName='active' className='nav-link'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/new' activeClassName='active' className='nav-link'>
              New Question
            </NavLink>
          </li>
          <li className='nav-item'> 
            <NavLink to='/leaderboard' activeClassName='active' className='nav-link'>
              Leader Board
            </NavLink>
          </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <NavLink to='/login' onClick={this.logout} activeClassName='active' className='nav-link'>
                Logout
              </NavLink>
            </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
    return {
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav)