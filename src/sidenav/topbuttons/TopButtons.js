
// MUI
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// Icons
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'

// custom
import BackButton from './BackButton'
import AddNewBookmarkButton from './AddNewBookmarkButton'
import AddNewFolderButton from './AddNewFolderButton'

function TopButtons() {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <BackButton />
            <AddNewBookmarkButton />
            <AddNewFolderButton />
            <IconButton>
                <SettingsIcon />
            </IconButton>
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Box>
    )

}

export default TopButtons