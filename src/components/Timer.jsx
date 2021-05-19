import React from "react"
import { useTimer } from "../hooks/useTimer"
import { Typography, Button, Grid } from '@material-ui/core';
import TimePicker from "./TimePicker"
import { mode } from "../constants/mode"
import '../App.css';

const Timer = () => {

    const { onMeditationTimeChange, getMeditationBreakTimeLabel, onBreakTimeChange, isPause, getActualWorkTimeLabel, getActualBreakTimeLabel, onStopTimer, onWorkTimeChange, actualMode, getActualTimeOnActualMode } = useTimer()

    const getModeColor = actualMode => {
        switch (actualMode) {
            case mode.WORK:
                return "secondary"
            case mode.BREAK:
                return "default"
            case mode.MEDITATION:
                return "primary"
            default:
                return "secondary"
        }
    }

    const getModeAnimationClass = actualMode => {
        switch (actualMode) {
            case mode.WORK:
                return "work"
            case mode.BREAK:
                return "break"
            case mode.MEDITATION:
                return "meditation"
            default:
                return "work"
        }
    }
 

    return (
        <div className={getModeAnimationClass(actualMode)}>
            <Typography variant="h2" component="p" align="center">
                {getActualTimeOnActualMode()}
            </Typography>
            <Typography variant="h4" component="p" align="center" color={getModeColor(actualMode)}>
                {actualMode}
            </Typography>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item xs container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <TimePicker mode="MEDITATION" actualMode={actualMode} isPause={isPause} getTime={getMeditationBreakTimeLabel} onTimeChange={onMeditationTimeChange} />
                </Grid>
                <Grid item xs
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <TimePicker mode={mode.WORK} actualMode={actualMode} isPause={isPause} getTime={getActualWorkTimeLabel} onTimeChange={onWorkTimeChange} />
                </Grid>
                <Grid item xs container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <TimePicker mode={mode.BREAK} actualMode={actualMode} isPause={isPause} getTime={getActualBreakTimeLabel} onTimeChange={onBreakTimeChange} />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Button variant="contained" color="primary" onClick={onStopTimer} >
                    {isPause ? "start" : "pause"}
                </Button>
            </Grid>
        </div>
    )
}

export default Timer