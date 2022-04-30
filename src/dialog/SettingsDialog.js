// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Slider from '@mui/material/Slider'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// custom
import SettingsContext from '../context/SettingsContext'

function SettingsDialog(props) {

    const settings = React.useContext(SettingsContext)

    const { open, close} = props

    const theme = useTheme()

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle align="center">
                Settings
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Default Page"
                    aria-label="default page"
                    fullWidth
                    value={settings.defaultTarget}
                    onChange={(event) => {
                        settings.setDefaultTarget(event.target.value)
                    }}
                    sx={{marginTop: theme.spacing(1)}}
                />
                <Box sx={{display: "flex", marginTop: theme.spacing(1), alignItems: "center"}}>
                    <Typography variant="h5" sx={{flexGrow: 1, justifySelf: "center"}}>
                        Dark Mode
                    </Typography>
                    <Switch 
                        color="primary"
                        checked={settings.darkMode}
                        inputProps={{"aria-label": "switch theme"}}
                        onChange={(event) => {settings.setDarkMode(!settings.darkMode)}}
                    />
                </Box>
                <Typography variant="h5">
                    Drawer Width
                </Typography>
                <Slider
                    aria-label='drawer width'
                    value={settings.drawerWidth}
                    onChange={(event) => {
                        settings.setDrawerWidth(event.target.value)
                    }}
                    valueLabelDisplay="auto"
                    min={120}
                    max={480}
                />
            </DialogContent>
        </Dialog>
    )

}

export default SettingsDialog