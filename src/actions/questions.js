import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function addQuestionAnswer (question) {
  return {
    type: ADD_QUESTION_ANSWER,
    question,
  }
}

export function handleAddTWEET (authedUser, qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestionAnswer({
      qid,
      author: authedUser,
      answer
    })
      .then((question) => dispatch(addQuestionAnswer(question)))
      .then(() => dispatch(hideLoading()))
  }
}