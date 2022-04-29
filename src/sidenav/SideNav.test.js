// testing help
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookmarksContext from '../context/BookmarksContext'

// to test
import SideNav from './SideNav'

describe('The <SideNav>', function() {
    let context
    beforeEach(() => {
        context = {
            bookmarks: [
                {
                    label: "Dank Meme Document",
                    target: "x"
                },
                {
                    label: "Dank Meme Folder",
                    bookmarks: []
                }
            ]
        }
        render(
            <BookmarksContext.Provider value={context}>
                <SideNav  />
            </BookmarksContext.Provider>
        )
    })
    it('should change the location on click', function() {
        let bookmark = screen.getByRole("button", { name: "Dank Meme Document"})
        expect(bookmark).not.toBeNull()
        let folder = screen.getByRole("button", { name: "Dank Meme Folder"})
        expect(folder).not.toBeNull()
    })
})