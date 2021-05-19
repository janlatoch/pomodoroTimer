import React from "react"
import { TextField } from '@material-ui/core';

const TimePicker = ({ actualMode, isPause, getTime, onTimeChange, mode }) => {

    return (
        <React.Fragment>
            {actualMode === mode && !isPause && <TextField
                id="time"
                type="time"
                disabled={true}
                value={getTime()}
                InputLabelProps={{
                    shrink: true,
                }}
            />}
            {(actualMode !== mode || isPause) && <TextField
                id="time"
                type="time"
                defaultValue={getTime()}
                onChange={onTimeChange}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300
                }}
            />}
        </React.Fragment>
    )
}

export default TimePicker