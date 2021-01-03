import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (authedUser, qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      qid,
      author: authedUser,
      answer
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function questionAswer ({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleAddQuestionAswer (info) {
  return (dispatch) => {
    dispatch(questionAswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAddQuestionAswer: ', e)
        dispatch(questionAswer(info))
        alert('The was an error. Try again.')
      })
  }
}