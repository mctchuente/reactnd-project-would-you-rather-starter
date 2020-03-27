import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ViewPoll from './ViewPoll'

class QuestionPage extends Component {
  render() {
    const { id } = this.props
    if (this.props.authedUser === null) {
      return <Redirect to='/login' />
    }
	return (
      <div>
        <ViewPoll id={id} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    authedUser,
	id
  }
}

export default connect(mapStateToProps)(QuestionPage)