import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatUserBoard } from '../utils/helpers'
import { withRouter } from 'react-router-dom'

class Boarditem extends Component {
  render() {
    const { userItem } = this.props

    if (userItem === null) {
      return <div className='row mt-3'><div className='col col-xl-12 center'><p>404 page : This page doesn't existed</p></div></div>
    }

    const {
      name, avatar, questionCount, answerCount
    } = userItem

    const { range } = this.props
	let itemClassName = 'board'
	if (range === 0) {
	  itemClassName = 'board yellow-palm'
	} else if (range === 1) {
	  itemClassName = 'board green-palm'
	} else if (range === 2) {
	  itemClassName = 'board poi-palm'
	}
	return (
      <div className={itemClassName}>
	    <span className='badge-trophy'><i className='board-trophy'></i></span>
		<div className='row board-body'>
		  <div className='col col-xl-3 center'>
		    <img
			  src={avatar}
			  alt={`Avatar of ${name}`}
			  className='avatar'
		    />
		  </div>
		  <div className='col col-xl-6 bordered-left bordered-right'>
		    <div className='board-info'>
			  <div>
				<b className='poll-title-large'>{name}</b>
				<p className='mt-1'></p>
				<div className='row mt-4'>
				  <div className='col col-xl-10'><b>Answered questions</b></div>
				  <div className='col col-xl-2'><b>{answerCount}</b></div>
				</div>
				<p className='mt-1'></p>
				<p className='mt-1 line'></p>
				<div className='row mt-2'>
				  <div className='col col-xl-10'><b>Created questions</b></div>
				  <div className='col col-xl-2'><b>{questionCount}</b></div>
				</div>
			  </div>
		    </div>
		  </div>
		  <div className='col col-xl-3 center'>
		    <div className='board mt-1'>
			  <div className='board-heading'>
			    <div className='col col-xl-12'>
				  <b>Score</b>
				</div>
			  </div>
			  <div className='board-body'>
			    <div className='col col-xl-12'>
				  <div className='board-score'>
				    <b>{questionCount + answerCount}</b>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const userItem = users[id]

  return {
    authedUser,
    userItem: userItem
      ? formatUserBoard(userItem)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Boarditem))