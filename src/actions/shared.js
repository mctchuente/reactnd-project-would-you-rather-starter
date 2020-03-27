import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, questionUser, answerUser } from '../actions/users'
import { receiveQuestions, addQuestion, answerQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

//const AUTHED_ID = 'tylermcginnis'
const AUTHED_ID = null

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleSaveQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {
		  dispatch(addQuestion(question))
		  dispatch(questionUser({
			authedUser : question.author,
			qid : question.id
		  }))
	  }).then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestionAnswer (info) {
  return (dispatch) => {
    dispatch(answerUser(info))
    dispatch(answerQuestion(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e)
        dispatch(answerUser(info))
        dispatch(answerQuestion(info))
        alert('The was an error answering the question. Try again.')
      })
  }
}