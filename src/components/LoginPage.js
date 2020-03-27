import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect, withRouter } from 'react-router-dom'
import logo from '../icons/logo.svg'

class LoginPage extends Component {
  state = {
	selectedUser: null
  }
  handleChange = (e) => {
    this.setState({
	  selectedUser: e.target.value
    })
  }
  handleSubmitLogin = (e) => {
    e.preventDefault()
	
	if (this.state.selectedUser === null || this.state.selectedUser === '') {
      return
    }
	
    const { dispatch } = this.props
	const { selectedUser } = this.state

    dispatch(setAuthedUser(selectedUser))
	
	this.setState(() => ({
      selectedUser: null
    }))
  }
  render() {
    const { authedUser, users } = this.props
	const { selectedUser } = this.state
	
	const optionList = Object.keys(users).map((data, index) => <option key={index} value={users[data].id}>{users[data].name}</option>)
	
    if (authedUser !== null) {
      return <Redirect to='/' />
    }
	
	return (
      <div className='login'>
		<div className='login-heading'>
		  <div className='col col-xl-12'>
		    <h2 className='center'><b>Welcome to the Would You Rather App!</b></h2>
		    <h4 className='center'>Please sign in to continue</h4>
		  </div>
		</div>
		<div className='row login-body'>
		  <div className='col col-xl-12'>
		    <div className='login-info'>
			  <div className='center'><img src={logo} className="react-logo" alt="logo" /></div>
			  <form className='login-submit' onSubmit={this.handleSubmitLogin}>
			    <h5 className='login-title-large center'>Sign in</h5>
			    <p className='mt-1'></p>
			    <div className="form-group">
				  <select 
					className='form-control'
					defaultValue={(selectedUser !== undefined && selectedUser !== '') ? selectedUser : ''} 
					onChange={this.handleChange}
					required>
					<option value=''>Select User</option>
					{optionList}
				  </select>
				</div>
				<p className='mt-1'></p>
			    <button 
				  className='btn btn-success btnsubmit mt-1' 
				  disabled={selectedUser === null}>
				  Submit
			    </button>
			  </form>
		    </div>
		  </div>
		</div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  return {
    authedUser,
	users
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage))