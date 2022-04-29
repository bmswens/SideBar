// testing help
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookmarksContext from '../../context/BookmarksContext'

// to test
import AddNewFolderButton from './AddNewFolderButton'

describe('The <AddNewFolderButton>', function() {
    let bookmarksContext
    beforeEach(() => {
        bookmarksContext = {
            bookmarks: [],
            addBookmark: jest.fn(),
            getFolders: () => ["root", "Dank Memes"]
        }
        render(
            <BookmarksContext.Provider value={bookmarksContext}>
                <AddNewFolderButton />
            </BookmarksContext.Provider>
        )
    })
    it('should open the dialog when clicked', function() {
        let openButton = screen.getByRole("button", { name: "Add New Folder"})
        userEvent.click(openButton)
        let dialog = screen.getByRole("dialog", { name: "Add New Folder"})
        expect(dialog).not.toBeNull()
    })
})

describe('The <AddNewFolderButton> dialog', function() {
    let bookmarksContext
    beforeEach(() => {
        bookmarksContext = {
            bookmarks: [],
            addBookmark: jest.fn(),
            getFolders: () => ["root", "Dank Memes"]
        }
        render(
            <BookmarksContext.Provider value={bookmarksContext}>
                <AddNewFolderButton />
            </BookmarksContext.Provider>
        )
        let openButton = screen.getByRole("button", { name: "Add New Folder"})
        userEvent.click(openButton)
    })
    it('should allow the user to cancel', async function() {
        let cancelButton = screen.getByRole("button", { name: "Cancel"})
        userEvent.click(cancelButton)
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog", { name: "Add New Folder"})
            expect(dialog).toBeNull()
        })
    })
    it('should allow the user to submit a valid folder', async function() {
        let labelField = screen.getByLabelText("Label").querySelector('input')
        userEvent.type(labelField, "Dank Folder")
        let submitButton = screen.getByRole("button", { name: "Submit" })
        userEvent.click(submitButton)
        expect(bookmarksContext.addBookmark).toHaveBeenCalled()
    })
})