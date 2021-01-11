export const SET_AUTHED_USER = "SET_AUTHED_USER"
export const REMOVE_AUTHED_USER = "REMOVE_AUTHED_USER"

export function setAuthedUser(id) {
	return {
		type: SET_AUTHED_USER,
		id,
	}
}

export function handleSetAuthedUser(id) {
	return (dispatch) => {
		dispatch(setAuthedUser(id))
	}
}

export function removeAuthedUser() {
	return {
		type: REMOVE_AUTHED_USER,
	}
}

export function handleRemoveAuthedUser() {
	return (dispatch) => {
		dispatch(removeAuthedUser())
	}
}
