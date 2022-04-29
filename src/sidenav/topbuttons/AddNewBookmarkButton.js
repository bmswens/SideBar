// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

// Icons
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'

// custom
import BookmarksContext from '../../context/BookmarksContext'


function FolderSelector(props) {
    // state from parent
    const { folder, setFolder } = props
    // data
    const bookmarksContext = React.useContext(BookmarksContext)
    const folders = bookmarksContext.getFolders()
    return (
        <Autocomplete
            value={folder}
            onChange={(event, newValue) => {setFolder(newValue)}}
            options={folders}
            renderInput={(params) => <TextField {...params} sx={{marginTop: 1}} fullWidth label="Folder" />}
        />
    )
}

function AddBookmarkDialog(props) {

    const bookmarksContext = React.useContext(BookmarksContext)

    const { open, close } = props

    const [label, setLabel] = React.useState('')
    const [target, setTarget] = React.useState('')
    const [folder, setFolder] = React.useState('root')

    const invalid = label === '' || target === '' || folder === ''

    function handleClose() {
        setLabel('')
        setTarget('')
        setFolder("root")
        close()
    }

    function submit() {
        bookmarksContext.addBookmark({label, target}, folder)
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
                Add New Bookmark
            </DialogTitle>
            <DialogContent>
                <FolderSelector
                    folder={folder}
                    setFolder={setFolder}
                />
                <TextField
                    required
                    fullWidth
                    aria-label="Label"
                    label="Label"
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    sx={{marginTop: 1}}
                />
                <TextField
                    required
                    fullWidth
                    aria-label="Target"
                    label="Target"
                    value={target}
                    onChange={(event) => setTarget(event.target.value)}
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

function AddNewBookmarkButton() {

    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <IconButton 
                aria-label="Add New Bookmark"
                onClick={() => setOpen(true)}
            >
                <BookmarkAddIcon />
            </IconButton>
            <AddBookmarkDialog
                open={open}
                close={close}
            />
        </React.Fragment>
    )
}

export default AddNewBookmarkButton
export {
    AddBookmarkDialog
}