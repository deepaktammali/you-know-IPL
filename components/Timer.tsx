import React, { useState, useEffect } from 'react'

function Timer({timeLeft}) {
    return (
        <span className="text-9xl w-28 flex items-center justify-center">{timeLeft}</span>
    )
}

export default Timer
