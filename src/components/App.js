import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Homepage from './Homepage'
import LoadingBar from 'react-redux-loading'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import LoginPage from './LoginPage'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container-fluid'>
		    <div className='container py-0'>
              <Nav authedUser={this.props.authedUser} users={this.props.users} />
			</div>
			<div className='nav-horiz-line'></div>
            <div className='container'>
			  <Route path='/' exact component={Homepage} />
			  <Route path='/question/:id' component={QuestionPage} />
			  <Route path='/add' component={NewQuestion} />
			  <Route path='/leaderboard' component={Leaderboard} />
			  <Route path='/login' component={LoginPage} />
			</div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser,
    users: users
  }
}

export default connect(mapStateToProps)(App)