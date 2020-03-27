import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import Boarditem from './Boarditem'

class Leaderboard extends Component {
  render() {
    if (this.props.authedUser === null) {
      return <Redirect to='/login' />
    }
	return (
      <div>
        <ul className='leaderboard-list'>
          {this.props.userIds.map((id, index) => (
            <li key={id}>
			  <Boarditem id={id} range={index} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
	userIds: Object.keys(users)
      .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
  }
}

export default withRouter(connect(mapStateToProps)(Leaderboard))