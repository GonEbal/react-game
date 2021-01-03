import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION_ANSWER:
        	const { answer } = action
        	console.log(answer)
        	return {
        		...state,
                [action.qid]: {
                    ...state[action.qid],
                    optionOne: state[action.qid].optionOne.votes.concat([action.authedUser])
                }
        	}
        default:
            return state
    }
}