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
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// Icons
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'

// custom
import SettingsContext from '../context/SettingsContext'
import BookmarksContext from '../context/BookmarksContext'


function UploadSnackBar(props) {

    const { success, open, close } = props

    let severity = "error"
    let message = "Error parsing the uploaded file."
    if (success) {
        severity = "success"
        message = "Upload successful!"
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
          return
        }
        close()
    }

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
        >
            <MuiAlert 
                onClose={handleClose} 
                severity={severity} 
                sx={{ width: '100%' }}
                variant="filled"
                elevation={6}
            >
                {message}
            </MuiAlert >
        </Snackbar>
    )

}

function UploadButton() {
    const bookmarksContext = React.useContext(BookmarksContext)
    const [open, setOpen] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    // verify
    function isValid(obj) {
        if (obj.label === undefined || obj.target === undefined) {
            return false
        }
        return true
    }

    function verify(data) {
        for (let obj of data) {
            let valid
            if (obj.bookmarks) {
                valid = verify(obj.bookmarks)
            }
            else {
                valid = isValid(obj)
            }
            if (!valid) {
                return false
            }
        }
        return true
    }

    // handle upload
    async function handleUpload(event) {
        let file = event.target.files[0]
        let text = await file.text()
        let content = JSON.parse(text)
        let valid = verify(content)
        if (valid) {
            setSuccess(true)
            bookmarksContext.setBookmarks(content)
        }
        else {
            setSuccess(false)
        }
        setOpen(true)
    }

    // handle click
    function handleClick() {
        let actual = document.getElementById('upload file')
        actual.click()
    }

    function close() {
        setOpen(false)
        setSuccess(false)
    }

    
    return (
        <React.Fragment>
            <input
                type="file"
                id="upload file"
                onChange={handleUpload}
                style={{display: "none"}}
            />
            <IconButton
                onClick={handleClick}
            >
                <UploadIcon sx={{fontSize: 48}} />
            </IconButton>
            <UploadSnackBar
                open={open}
                close={close}
                success={success}
            />
        </React.Fragment>
    )
}

function DownloadButton() {
    const bookmarksContext = React.useContext(BookmarksContext)
    const text = JSON.stringify(bookmarksContext.bookmarks)
    const file = new Blob([text], {type: "application/json"})
    const url = URL.createObjectURL(file)

    return (
        <a
            href={url}
            download="sidebar-bookmarks.json"
        >
            <IconButton>
                <DownloadIcon sx={{fontSize: 48}} />
            </IconButton>
        </a>
    )
}

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
                <Box 
                    sx={{
                        display:  "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <UploadButton />
                    <DownloadButton />
                </Box>
            </DialogContent>
        </Dialog>
    )

}

export default SettingsDialog