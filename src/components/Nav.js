import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends Component {	
  handleLogout = (e) => {
    e.preventDefault()
	
	const { dispatch } = this.props
	
	dispatch(setAuthedUser(null))
	
	this.props.history.push('/login')
  }
  render() {
    const {userProfile} = this.props
	return (
        <nav className='navbar navbar-expand-lg navbar-light py-0 mt-2'>
		  <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
			<span className='navbar-toggler-icon'></span>
		  </button>
		  <div className='collapse navbar-collapse' id='navbarSupportedContent'>
			<ul className='navbar-nav mr-auto'>
			  <li className='nav-item'>
				<NavLink to='/' exact activeClassName='active'>
					Home
				</NavLink>
			  </li>
			  <li className='nav-item'>
				<NavLink to='/add' activeClassName='active'>
					New Question
				</NavLink>
			  </li>
			  <li className='nav-item'>
				<NavLink to='/leaderboard' activeClassName='active'>
					Leader Board
				</NavLink>
			  </li>
			</ul>
			{userProfile === null
			  ? null : 
			<ul className='nav navbar-nav ml-auto nav-flex-icons'>
			  <li className='nav-item'>
				Hello, {userProfile.name}
			  </li>
			  <li className='nav-item'>
				<img src={userProfile.avatarURL} className='rounded-circle z-depth-0' alt={`Avatar of ${userProfile.name}`} width='30' />
			  </li>
			  <li className='nav-item'>
				<NavLink to='/logout' activeClassName='active' onClick={this.handleLogout}>
					Logout
				</NavLink>
			  </li>
			</ul>
			}
		  </div>
		</nav>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser,
    userProfile: (authedUser === null) ? null : users[authedUser]
  }
}

export default withRouter(connect(mapStateToProps)(Nav))