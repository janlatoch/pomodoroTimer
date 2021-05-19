import {mode} from "../constants/mode"

export const getNewTime = time => {
    const newTime = time.split(":");
    if (newTime.length === 2) {
        newTime.push("00")
    }
    const hours = parseInt(newTime[0])
    const minutes = parseInt(newTime[1])
    const seconds = parseInt(newTime[2])
    return { hours, minutes, seconds }
}

const getSeconds = seconds => {
    const secondsToSet = seconds % 60
    return secondsToSet < 10 ? "0" + secondsToSet : secondsToSet
}

const getMinutes = seconds => {
    const minutes = Math.floor(seconds / 60)
    return minutes < 10 ? "0" + minutes : minutes
}

const getHours = seconds => {
    const hours = Math.floor(seconds / 3600)
    return hours < 10 ? "0" + hours : hours
}

export const getTimeMode = ({modeToCheck, actualWorkTime, actualBreakTime, actualMeditationTime}) => {
    switch (modeToCheck) {
        case mode.WORK:
            return actualWorkTime
        case mode.BREAK:
            return actualBreakTime
        case mode.MEDITATION:
            return actualMeditationTime
        default:
            return actualWorkTime
    }
}

export const getTime = time => `${getHours(time)}:${getMinutes(time)}:${getSeconds(time)}`
   
export const getTimeToSet = event => {
    const { hours, minutes, seconds } = getNewTime(event.target.value)
    const timeToSet = hours * 3600 + minutes * 60 + seconds

    return timeToSet
}