
// MUI
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// Icons
import InfoIcon from '@mui/icons-material/Info'

// custom
import BackButton from './BackButton'
import AddNewBookmarkButton from './AddNewBookmarkButton'
import AddNewFolderButton from './AddNewFolderButton'
import SettingsButton from './SettingsButton'

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
            <SettingsButton />
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Box>
    )

}

export default TopButtons