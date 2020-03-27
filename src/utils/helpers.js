export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text: optionOne.text,
    avatar: avatarURL
  }
}

export function formatQuestionPoll (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    textOne: optionOne.text,
    votesOneCount: optionOne.votes.length,
    textTwo: optionTwo.text,
    votesTwoCount: optionTwo.votes.length,
    avatar: avatarURL
  }
}

export function formatUserBoard (user) {
  const { id, name, avatarURL, questions, answers } = user

  return {
    id,
    name,
    questionCount: questions.length,
    answerCount: Object.keys(answers).length,
    avatar: avatarURL
  }
}