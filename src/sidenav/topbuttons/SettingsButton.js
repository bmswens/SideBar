// React
import React from 'react'

// MUI
import IconButton from '@mui/material/IconButton'

// Icons
import SettingsIcon from '@mui/icons-material/Settings'

// custom
import SettingsDialog from '../../dialog/SettingsDialog'


function SettingsButton() {
    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }
    
    return (
        <React.Fragment>
            <IconButton
                aria-label="Settings Button"
                onClick={() => {setOpen(true)}}
            >
                <SettingsIcon />
            </IconButton>
            <SettingsDialog
                open={open}
                close={close}
            />
        </React.Fragment>
    )

}

export default SettingsButton