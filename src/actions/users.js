export const RECEIVE_USERS = 'RECEIVE_USERS'
export const QUESTION_USER = 'QUESTION_USER'
export const ANSWER_USER = 'ANSWER_USER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function questionUser ({ authedUser, qid }) {
  return {
    type: QUESTION_USER,
    authedUser,
    qid
  }
}

export function answerUser ({ authedUser, qid, answer }) {
  return {
    type: ANSWER_USER,
    authedUser,
    qid,
    answer
  }
}

export function handleAnswerUser (info) {
  return (dispatch) => {
    dispatch(answerUser(info))
  }
}