import React from 'react'

function Score({userScore}) {
    return (
        <div className="my-2 flex flex-col text-lg items-center">
            <span>Score</span>
            <span>{userScore}</span>
        </div>
    )
}

export default Score
