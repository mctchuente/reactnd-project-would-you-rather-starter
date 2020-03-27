import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class Homepage extends Component {
  render() {
	if (this.props.authedUser === null) {
      return <Redirect to='/login' />
    }
	return (
	  <div>
		<section id='tabs'>
		  <div className='container'>
			<div className='row'>
			  <div className='col col-xs-12'>
				<nav className=''>
				  <div className='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
					<a className='nav-item nav-link active' id='nav-unanswered-tab' data-toggle='tab' href='#nav-unanswered' role='tab' aria-controls='nav-unanswered' aria-selected='true'>Unanswered Questions</a>
					<a className='nav-item nav-link' id='nav-answered-tab' data-toggle='tab' href='#nav-answered' role='tab' aria-controls='nav-answered' aria-selected='false'>Answered Questions</a>
				  </div>
				</nav>
				<div className='tab-content py-3 px-3 px-sm-0' id='nav-tabContent'>
				  <div className='tab-pane fade show active' id='nav-unanswered' role='tabpanel' aria-labelledby='nav-unanswered-tab'>
					<ul className='unanswered-list'>
					  {this.props.unansweredQuestionIds.map((id) => (
						<li key={id}>
						  <Question id={id}/>
						</li>
					  ))}
					</ul>
				  </div>
				  <div className='tab-pane fade' id='nav-answered' role='tabpanel' aria-labelledby='nav-answered-tab'>
					<ul className='answered-list'>
					  {this.props.answeredQuestionIds.map((id) => (
						<li key={id}>
						  <Question id={id}/>
						</li>
					  ))}
					</ul>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</section>
	  </div>
	)
  }
}

function mapStateToProps ({ questions, authedUser }) {
  const unansweredQuestions = {}
  const answeredQuestions = {}
  
  Object.keys(questions).forEach(key => {
	if ((questions[key].optionOne.votes.length === 0) && (questions[key].optionTwo.votes.length === 0))
		unansweredQuestions[questions[key].id] = questions[key]
	else if (((questions[key].optionOne.votes.length !== 0) && (questions[key].optionOne.votes.indexOf(authedUser) > -1)) || ((questions[key].optionTwo.votes.length !== 0) && (questions[key].optionTwo.votes.indexOf(authedUser) > -1)))
		answeredQuestions[questions[key].id] = questions[key]
	else
		unansweredQuestions[questions[key].id] = questions[key]
  })
  
  return {
	authedUser,
	unansweredQuestionIds: Object.keys(unansweredQuestions)
		  .sort((a,b) => unansweredQuestions[b].timestamp - unansweredQuestions[a].timestamp),
	answeredQuestionIds: Object.keys(answeredQuestions)
		  .sort((a,b) => answeredQuestions[b].timestamp - answeredQuestions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Homepage)