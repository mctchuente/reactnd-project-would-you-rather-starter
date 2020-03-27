import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import ViewPoll from './ViewPoll'

class QuestionPage extends Component {
  render() {
    const { id } = this.props
    const currentLocation = this.props.location.pathname;
	if (this.props.authedUser === null) {
      return <Redirect to={{
                pathname: '/login',
                state: {from: currentLocation}
            }}/>
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

export default withRouter(connect(mapStateToProps)(QuestionPage))