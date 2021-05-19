import React from "react"
import { getTimeMode, getTime, getTimeToSet } from "../services/timeServices"
import { mode } from "../constants/mode"

const initialWorkTime = 900
const initialMeditationTime = 30
const initialBreakTime = 300

const useTimer = () => {
    const [actualWorkTime, setActualWorkTime] = React.useState(initialWorkTime)
    const [settedWorkTime, setSettedWorkTime] = React.useState(initialWorkTime)
    const [actualBreakTime, setActualBreakTime] = React.useState(initialBreakTime)
    const [settedBreakTime, setSettedBreakTime] = React.useState(initialBreakTime)
    const [actualMeditationTime, setActualMeditationTime] = React.useState(initialMeditationTime)
    const [settedMeditationTime, setSettedMeditationTime] = React.useState(initialMeditationTime)

    const [actualMode, setActualMode] = React.useState(mode.MEDITATION)

    const [isPause, setIsPause] = React.useState(true)

    React.useEffect(() => {
        if (actualWorkTime < 0) {
            setActualMode(mode.BREAK)
            setActualWorkTime(settedWorkTime)
        }
    }, [actualWorkTime])

    React.useEffect(() => {
        if (actualBreakTime < 0) {
            setActualMode(mode.MEDITATION)
            setActualBreakTime(settedBreakTime)
        }
    }, [actualBreakTime])

    React.useEffect(() => {
        if (actualMeditationTime < 0) {
            setActualMode(mode.WORK)
            setActualMeditationTime(settedMeditationTime)
        }
    }, [actualMeditationTime])


    React.useEffect(() => {
        let timer = null;
        if (!isPause) {
            timer = setInterval(() => {
                if (actualMode === mode.WORK) {
                    setActualWorkTime(actualWorkTime => actualWorkTime - 1)
                } else if (actualMode === mode.MEDITATION) {
                    setActualMeditationTime(actualMeditationTime => actualMeditationTime - 1)
                } else {
                    setActualBreakTime(actualWorkTime => actualWorkTime - 1)
                }
            }, 1000)
        } else if (isPause) {
            clearInterval(timer)
        }

        return () => clearInterval(timer);
    }, [actualMode, isPause])

    const onStopTimer = () => {
        setIsPause(!isPause)
    }

    const getActualTimeOnActualMode = () => {
        const modeTime = getTimeMode({ modeToCheck: actualMode, actualWorkTime, actualBreakTime, actualMeditationTime })
        return getTime(modeTime)
    }

    const onWorkTimeChange = event => {
        const timeToSet = getTimeToSet(event)

        setActualWorkTime(timeToSet)
        setSettedWorkTime(timeToSet)
    }

    const onBreakTimeChange = event => {
        const timeToSet = getTimeToSet(event)

        setActualBreakTime(timeToSet)
        setSettedBreakTime(timeToSet)
    }

    const onMeditationTimeChange = event => {
        const timeToSet = getTimeToSet(event)

        setActualMeditationTime(timeToSet)
        setSettedMeditationTime(timeToSet)
    }

    const getActualWorkTimeLabel = () => {
        const modeTime = getTimeMode({ modeToCheck: mode.WORK, actualWorkTime, actualBreakTime, actualMeditationTime })
        return getTime(modeTime)
    }

    const getActualBreakTimeLabel = () => {
        const modeTime = getTimeMode({ modeToCheck: mode.BREAK, actualWorkTime, actualBreakTime, actualMeditationTime })
        return getTime(modeTime)
    }

    const getMeditationBreakTimeLabel = () => {
        const modeTime = getTimeMode({ modeToCheck: mode.MEDITATION, actualWorkTime, actualBreakTime, actualMeditationTime })
        return getTime(modeTime)
    }

    return { onMeditationTimeChange, getMeditationBreakTimeLabel, onBreakTimeChange, isPause, getActualWorkTimeLabel, getActualBreakTimeLabel, onStopTimer, onWorkTimeChange, actualMode, getActualTimeOnActualMode }
}

export { useTimer }