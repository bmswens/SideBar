// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'

// Icons
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

// custom
import BookmarksContext from '../../context/BookmarksContext'


function AddNewFolderDialog(props) {

    const bookmarksContext = React.useContext(BookmarksContext)

    const { open, close } = props

    const [label, setLabel] = React.useState('')

    const invalid = label === ''

    function handleClose() {
        setLabel('')
        close()
    }

    function submit() {
        bookmarksContext.addBookmark({label, bookmarks: [], isFolder: true})
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                Add New Folder
            </DialogTitle>
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    aria-label="Label"
                    label="Label"
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    sx={{marginTop: 1}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" >Cancel</Button>
                <Button onClick={submit} disabled={invalid} variant="contained" >Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function AddNewFolderButton() {

    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <IconButton 
                aria-label="Add New Folder"
                onClick={() => setOpen(true)}
            >
                <CreateNewFolderIcon />
            </IconButton>
            <AddNewFolderDialog
                open={open}
                close={close}
            />
        </React.Fragment>
    )
}

export default AddNewFolderButton
export {
    AddNewFolderDialog
}