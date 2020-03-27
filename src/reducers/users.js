import { RECEIVE_USERS, QUESTION_USER, ANSWER_USER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case QUESTION_USER :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: (state[action.authedUser].questions.indexOf(action.qid) > -1)
		    ? state[action.authedUser].questions
			: state[action.authedUser].questions.concat([action.qid])
        }
      }
    case ANSWER_USER :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: (state[action.authedUser].answers[action.qid] !== undefined)
		    ? state[action.authedUser].answers
			: {...state[action.authedUser].answers, [action.qid]: action.answer}
        }
      }
    default :
      return state
  }
}