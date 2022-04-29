// testing help
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { writeStorage } from '@rehooks/local-storage'

// to test
import BookmarksContext from './BookmarksContext'
import { BookmarksContextWrapper } from './BookmarksContext'

function BookmarksContextWrapperTester() {
    let bookmarksContext = React.useContext(BookmarksContext)
    let folderItemsLen = 0
    for (let item of bookmarksContext.bookmarks) {
        if (item.isFolder) {
            folderItemsLen = item.bookmarks.length
        }
    }
    return (
        <div>
            <p data-testid="bookmarks-len">{bookmarksContext.bookmarks.length}</p>
            <p data-testid="folders-len">{bookmarksContext.getFolders().length}</p>
            <p data-testid="folder-items-len">{folderItemsLen}</p>
            <button aria-label="add bookmark" onClick={() => bookmarksContext.addBookmark({target: "x", label: "y"})}>Add Bookmark</button>
            <button aria-label="add folder" onClick={() => bookmarksContext.addBookmark({isFolder: true, label: "z", bookmarks: []})}>Add Folder</button>
            <button aria-label="add bookmark to folder" onClick={() => bookmarksContext.addBookmark({target: "x", label: "yy"}, "z")}>Add Bookmark To Folder</button>
            <button aria-label="delete bookmark" onClick={() => bookmarksContext.deleteBookmark("y")}>Delete Bookmark</button>
        </div>
    )
}

describe('The <BookmarksContextWrapper>', function() {
    beforeEach(() => {
        // warnings about act that are false
        console.error = jest.fn()
        render(
            <BookmarksContextWrapper>
                <BookmarksContextWrapperTester />
            </BookmarksContextWrapper>
        )
    })
    afterEach(() => {
        jest.restoreAllMocks()
        writeStorage("bookmarks", [])
    })
    it('should default to no bookmarks', function() {
        let text = screen.getByTestId('bookmarks-len')
        expect(text.innerHTML).toEqual("0")
        let folders = screen.getByTestId('folders-len')
        expect(folders.innerHTML).toEqual("1")
    })
    it('should be able to add new bookmarks', function() {
        let button = screen.getByRole('button', { name: "add bookmark"})
        userEvent.click(button)
        let text = screen.getByTestId('bookmarks-len')
        expect(text.innerHTML).toEqual("1")
    })
    it('should be able to add folders', function() {
        let button = screen.getByRole('button', { name: "add folder"})
        userEvent.click(button)
        let text = screen.getByTestId('folders-len')
        expect(text.innerHTML).toEqual("2")
    })
    it('should be able to add a bookmark to a folder', function() {
        let button = screen.getByRole('button', { name: "add folder"})
        userEvent.click(button)
        let text = screen.getByTestId('folders-len')
        expect(text.innerHTML).toEqual("2")
        let addButton = screen.getByRole('button', { name: "add bookmark to folder"})
        userEvent.click(addButton)
        let itemLength = screen.getByTestId("folder-items-len")
        expect(itemLength.innerHTML).toEqual("1")
    })
    it("shouldn't allow duplicate labels", function() {
        let button = screen.getByRole('button', { name: "add bookmark"})
        userEvent.click(button)
        let text = screen.getByTestId('bookmarks-len')
        expect(text.innerHTML).toEqual("1")
        userEvent.click(button)
        let refreshedText = screen.getByTestId('bookmarks-len')
        expect(refreshedText.innerHTML).toEqual("1")
    })
    it('should be able to delete by label', function() {
        let button = screen.getByRole('button', { name: "add bookmark"})
        userEvent.click(button)
        let text = screen.getByTestId('bookmarks-len')
        expect(text.innerHTML).toEqual("1")
        let deleteButton = screen.getByRole('button', { name: "delete bookmark"})
        userEvent.click(deleteButton)
        let refreshedText = screen.getByTestId('bookmarks-len')
        expect(refreshedText.innerHTML).toEqual("0")
    })
})