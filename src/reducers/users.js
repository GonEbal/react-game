import { RECEIVE_USERS } from "../actions/users"
import {
	ADD_QUESTION_ANSWER_USER,
	ADD_QUESTION_USER,
} from "../actions/questions"

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			}
		case ADD_QUESTION_ANSWER_USER:
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					answers: {
						...state[action.authedUser].answers,
						[action.qid]: action.answer,
					},
				},
			}
		case ADD_QUESTION_USER:
			return {
				...state,
				[action.question.authedUser]: {
					...state[action.question.authedUser],
					questions: state[action.question.authedUser].questions.concat([
						action.question.question.question.id,
					]),
				},
			}
		default:
			return state
	}
}
