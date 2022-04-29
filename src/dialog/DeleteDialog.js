// React
import React from 'react'

// MUI
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

// custom
import BookmarksContext from '../context/BookmarksContext'

function DeleteDialog(props) {
    // Sub menu was causing issues
    const { label, open, close } = props

    const bookmarks = React.useContext(BookmarksContext)

    function handleDelete() {
        bookmarks.deleteBookmark(label)
        close()
    }
    
    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                Delete Bookmark
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action will permanently delete the "{label}"" bookmark.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={close}>Cancel</Button>
                <Button variant="contained" onClick={handleDelete}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog