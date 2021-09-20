import { useEffect, useState } from "react";

export default function useTimer(timeLimit,timeCompleteCallback){
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [timerRunning,setTimerRunning] = useState(false);

    useEffect(() => {
        if(timerRunning){
            if(timeLeft==0){
                setTimerRunning(false);
                timeCompleteCallback();
                return null;
            }
            const timeoutId = setTimeout(()=>setTimeLeft(timeLeft-1),1000);
            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [timeLeft,timerRunning]);

    const startTimer = ()=>setTimerRunning(true);
    const pauseTimer = ()=>setTimerRunning(false);
    const resetTimer = ()=>{
        setTimerRunning(false);
        setTimeLeft(timeLimit);
    }

    return {
        timeLeft,
        startTimer,
        pauseTimer,
        resetTimer
    };

}