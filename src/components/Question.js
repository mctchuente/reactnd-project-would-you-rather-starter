import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't existed</p>
    }

    const {
      name, avatar, text, id
    } = question

    return (
      <div className='question'>
		<div className='question-heading'>
		  <div className='col col-xl-12'>
		    {name} asks:
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
			  <div>
				<b>Would you rather</b>
				<p>...{text}...</p>
			  </div>
			  <Link to={`/question/${id}`} className='btn btn-default'>
			    View Poll
			  </Link>
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
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))