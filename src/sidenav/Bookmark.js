// React
import React from 'react'

// MUI
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// MUI Icons
import DescriptionIcon from '@mui/icons-material/Description'

// custom
import LocationContext from '../context/LocationContext'
import DeleteDialog from '../dialog/DeleteDialog'

function Bookmark(props) {

    
    const location = React.useContext(LocationContext)
    
    const { label, target, indent } = props
    
    function handleClick() {
        location.navigate(target)
    }
    
    // right click
    const [open, setOpen] = React.useState(false)

    function handleRightClick(event) {
        event.preventDefault()
        setOpen(true)
    }

    function close() {
        setOpen(false)
    }

    let sx = {}
    if (indent) {
        sx.pl = 4
    }

    return (
        <React.Fragment>
            <ListItem button key={label} onClick={handleClick} onContextMenu={handleRightClick} sx={sx}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItem>
            <DeleteDialog
                label={label}
                open={open}
                close={close}
            />
        </React.Fragment>
    )
}

export default Bookmark