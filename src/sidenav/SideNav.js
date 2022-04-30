// React
import React from 'react'

// MUI
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'

// custom
import Bookmark from './Bookmark'
import TopButtons from './topbuttons/TopButtons'

// custom
import BookmarksContext from '../context/BookmarksContext'
import SettingsContext from '../context/SettingsContext'
import Folder from './Folder'

function SideNav() {

    const bookmarksContext = React.useContext(BookmarksContext)
    const settings = React.useContext(SettingsContext)
    const drawerWidth = settings.drawerWidth

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
        >
            <TopButtons />
            <Divider />
            <List>
                {bookmarksContext.bookmarks.map(bookmark => bookmark.isFolder ? <Folder {...bookmark} key={bookmark.label} /> : <Bookmark {...bookmark} key={bookmark.label} />)}
            </List>
        </Drawer>
    )
}

export default SideNav