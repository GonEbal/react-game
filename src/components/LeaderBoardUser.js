import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

class LeaderBoardUser extends Component {
    render() {
        const { user, answered, created } = this.props
        return (
            <Fragment>
				<div className="leaderboard-inner">
					<div className="left-column-result">
						<img
							src={user.avatarURL}
							alt={`Avatar of ${user.name}`}
							className="avatar"
						/>
					</div>
					<div className='result-main'>
						<div className='leader-name'>
							<span>{user.name}</span>
						</div>
						<div>
							<span className='points-table'>Answered Questions</span>
							<span>{answered}</span>
						</div>
						<div>
							<span className='points-table'>Created Questions</span>
							<span>{created}</span>
						</div>
					</div>
					<div className="right-column-result">
						<div className='score'>
							<span>Score</span>
						</div>
						<div className='points'>
								<div className='points-circle'>
									{created+answered}
								</div>
						</div>
					</div>
				</div>
			</Fragment>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    const user = users[id]
    const answered = Object.values(user.answers).length
    const created = Object.values(user.questions).length
    return {
        user,
        answered,
        created
    }
}

export default connect(mapStateToProps)(LeaderBoardUser)