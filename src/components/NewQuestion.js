import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/shared'
import { withRouter, Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
	optionOne: '',
	optionTwo: '',
	toHome: false,
  }
  handleOptionOneChange = (e) => {
    this.setState({
	  optionOne: e.target.value
    })
  }
  handleOptionTwoChange = (e) => {
    this.setState({
	  optionTwo: e.target.value
    })
  }
  handleSubmitQuestion = (e) => {
    e.preventDefault()
	
	if (this.state.optionOne === '' || this.state.optionTwo === '') {
      return
    }
	
    const { dispatch } = this.props
	const { optionOne, optionTwo } = this.state

    dispatch(handleSaveQuestion(optionOne, optionTwo))
	
	this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state

    const currentLocation = this.props.location.pathname;
	if (this.props.authedUser === null) {
      return <Redirect to={{
                pathname: '/login',
                state: {from: currentLocation}
            }}/>
    }
	
	if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='question'>
		<div className='question-heading'>
		  <div className='col col-xl-12'>
		    <h2 className='center'><b>Create New Question</b></h2>
		  </div>
		</div>
		<div className='row question-body'>
		  <div className='col col-xl-12'>
		    <div className='question-info'>
			  <form className='poll-submit' onSubmit={this.handleSubmitQuestion}>
			    <h5>Complete the question:</h5>
				<b className='poll-title-large'>Would you rather ...</b>
			    <p className='mt-1'></p>
			    <div className="form-group">
				  <input 
				    type="text" 
					name="optionOne" 
					className='form-control' 
					value={optionOne} 
					placeholder="Enter Option One Text Here" 
					onChange={this.handleOptionOneChange} 
					required 
				  />
				</div>
				<div className='row'>
				  <div className='col col-xl-5 py-2'>
				    <div className='line'>
				    </div>
				  </div>
				  <div className='col col-xl-2 center'>
				    <b>OR</b>
				  </div>
				  <div className='col col-xl-5 py-2'>
				    <div className='line'>
				    </div>
				  </div>
				</div>
			    <div className="form-group mt-2">
				  <input 
				    type="text" 
					name="optionTwo" 
					className='form-control' 
					value={optionTwo} 
					placeholder="Enter Option Two Text Here" 
					onChange={this.handleOptionTwoChange} 
					required 
				  />
				</div>
			    <button 
				  className='btn btn-success btnsubmit mt-1' 
				  disabled={(optionOne === '')&&(optionTwo === '')}>
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
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))