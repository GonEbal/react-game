import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'denissamokhin'

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({ users, questions }) => {
				dispatch(receiveUsers(users))
				dispatch(receiveTweets(questions))
				dispatch(setAuthedUser(AUTHED_ID))
				dispatch(hideLoading())
			})
	}
}