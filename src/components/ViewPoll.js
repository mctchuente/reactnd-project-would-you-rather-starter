import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestionPoll } from '../utils/helpers'
import { handleSaveQuestionAnswer } from '../actions/shared'
import { withRouter } from 'react-router-dom'

class ViewPoll extends Component {
  state = {
	selectedOption: null,
  }
  handleOptionChange = (e) => {
    this.setState({
	  selectedOption: e.target.value
    })
  }
  handleSubmitPoll = (e) => {
    e.preventDefault()
	
	if (this.state.selectedOption === null) {
      return
    }
	
    const { dispatch, question, authedUser } = this.props
	const selectedOption = this.state.selectedOption

    dispatch(handleSaveQuestionAnswer({
      authedUser,
      qid: question.id,
	  answer: selectedOption
    }))
  }
  render() {
    const { question } = this.props

    if (question === null) {
      return <div className='row mt-3'><div className='col col-xl-12 center'><p>404 page : This page doesn't existed</p></div></div>
    }

    const {
      name, avatar, textOne, textTwo, votesOneCount, votesTwoCount
    } = question

    const { isAnswered, myVote } = this.props
	let percentOne = (votesOneCount/(votesOneCount + votesTwoCount)) * 100
	let percentTwo = (votesTwoCount/(votesOneCount + votesTwoCount)) * 100
	percentOne = Number.isInteger(percentOne) ? percentOne : percentOne.toFixed(1)
	percentTwo = Number.isInteger(percentTwo) ? percentTwo : percentTwo.toFixed(1)
	return (
      <div className='question'>
		<div className='question-heading'>
		  <div className='col col-xl-12'>
		    {isAnswered ? `Asked by ${name}` : `${name} asks:`}
		  </div>
		</div>
		<div className='row question-body'>
		  <div className='col col-xl-5 center'>
		    <img
			  src={avatar}
			  alt={`Avatar of ${name}`}
			  className='avatar'
		    />
		  </div>
		  <div className='col col-xl-7 bordered-left'>
		    <div className='question-info'>
			{isAnswered
			  ? <div>
				  <b className='poll-title-large'>Results:</b>
				  <p className='mt-1'></p>
				  {myVote==='optionOne'
				    ? <div className="poll-option-one poll-option-chosen">
						<div className='my-vote'>Your vote</div>
						<p className='mt-1'><b>Would you rather {textOne} ?</b></p>
						<div className="progress-bar">
						  <div className="progress-inner center" style={{width: `${percentOne}%`}}>
							<span>{`${percentOne}%`}</span>
						  </div>
						</div>
						<p className='mt-0 center'><b>{`${votesOneCount} out of ${votesOneCount + votesTwoCount} vote(s)`}</b></p>
					  </div>
				    : <div className="poll-option-one">
						<p className='mt-1'><b>Would you rather {textOne} ?</b></p>
						<div className="progress-bar">
						  <div className="progress-inner center" style={{width: `${percentOne}%`}}>
							<span>{`${percentOne}%`}</span>
						  </div>
						</div>
						<p className='mt-0 center'><b>{`${votesOneCount} out of ${votesOneCount + votesTwoCount} vote(s)`}</b></p>
					  </div>
				  }
				  {myVote==='optionTwo'
				    ? <div className="poll-option-two poll-option-chosen">
						<div className='my-vote'>Your vote</div>
						<p className='mt-1'><b>Would you rather {textTwo} ?</b></p>
						<div className="progress-bar">
						  <div className="progress-inner center" style={{width: `${percentTwo}%`}}>
							<span>{`${percentTwo}%`}</span>
						  </div>
						</div>
						<p className='mt-0 center'><b>{`${votesTwoCount} out of ${votesOneCount + votesTwoCount} vote(s)`}</b></p>
					  </div>
				    : <div className="poll-option-two">
						<p className='mt-1'><b>Would you rather {textTwo} ?</b></p>
						<div className="progress-bar">
						  <div className="progress-inner center" style={{width: `${percentTwo}%`}}>
							<span>{`${percentTwo}%`}</span>
						  </div>
						</div>
						<p className='mt-0 center'><b>{`${votesTwoCount} out of ${votesOneCount + votesTwoCount} vote(s)`}</b></p>
					  </div>
				  }
			    </div>
			  : <form className='poll-submit' onSubmit={this.handleSubmitPoll}>
				  <b className='poll-title-large'>Would you rather ...</b>
				  <p></p>
				  <div className="radio">
				    <label>
					  <input type="radio" name="myvote" value="optionOne" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'optionOne'} required /> {textOne}
				    </label>
				  </div>
				  <div className="radio">
				    <label>
					  <input type="radio" name="myvote" value="optionTwo" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'optionTwo'} required /> {textTwo}
				    </label>
				  </div>
				  <button className='btn btn-success btnsubmit'>
				    Submit
				  </button>
			    </form>
			}
		    </div>
		  </div>
		</div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    isAnswered: users[authedUser].answers[id] !== undefined,
	myVote: (question.optionOne.votes.indexOf(authedUser) > -1) ? 'optionOne' : ((question.optionTwo.votes.indexOf(authedUser) > -1) ? 'optionTwo' : null),
    question: question
      ? formatQuestionPoll(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(ViewPoll))