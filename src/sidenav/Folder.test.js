// testing help
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationContext from '../context/LocationContext'

// to test
import Folder from './Folder'

describe('The <Folder>', function() {
    let location
    beforeEach(() => {
        location = {
            navigate: jest.fn()
        }
        render(
            <LocationContext.Provider value={location}>
                <Folder label="Dank Meme Documents" bookmarks={[{label: "x", target: "y"}]}/>
            </LocationContext.Provider>
        )
    })
    it('should open on click', function() {
        let button = screen.getByRole("button", { name: "Dank Meme Documents"})
        userEvent.click(button)
        let newBookmark = screen.getByRole("button", { name: "x"})
        expect(newBookmark).not.toBeNull()
    })
    it('should open a delete dialong on right click', function() {
        let button = screen.getByRole("button", { name: "Dank Meme Documents"})
        fireEvent.contextMenu(button)
        let dialog = screen.getByRole("dialog", { name: "Delete Bookmark"})
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Cancel"})
        userEvent.click(closeButton)
    })
})