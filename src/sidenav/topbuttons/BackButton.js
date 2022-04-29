// React
import React from 'react'

// MUI
import IconButton from '@mui/material/IconButton'

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// custom
import LocationContext from '../../context/LocationContext'

function BackButton() {
    const location = React.useContext(LocationContext)
    function handleClick() {
        location.back()
    }
    return (
        <IconButton
            aria-label="Back Button"
            onClick={handleClick}
            disabled={location.history.length === 0}
        >
            <ArrowBackIcon />
        </IconButton>
    )

}

export default BackButton