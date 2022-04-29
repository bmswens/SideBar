// React
import React from 'react'

// MUI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

// MUI Icons
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

// custom
import Bookmark from './Bookmark'
import DeleteDialog from '../dialog/DeleteDialog'

function Folder(props) {

    const { label, bookmarks } = props

    // open close state
    const [open, setOpen] = React.useState(false)
    
    function handleClick() {
        setOpen(!open)
    }

    // right click
    const [dialogOpen, setDialogOpen] = React.useState(false)

    function handleRightClick(event) {
        event.preventDefault()
        setDialogOpen(true)
    }

    function close() {
        setDialogOpen(false)
    }

    return (
        <React.Fragment>
            <ListItem button key={label} onClick={handleClick} onContextMenu={handleRightClick}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding>
                    {bookmarks.map(bookmark => <Bookmark {...bookmark} key={bookmark.label} indent />)}
                </List>
            </Collapse>
            <DeleteDialog
                label={label}
                open={dialogOpen}
                close={close}
            />
        </React.Fragment>
    )
}

export default Folder