// testing help
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationContext from '../context/LocationContext'

// to test
import Bookmark from './Bookmark'

describe('The <Bookmark>', function() {
    let location
    beforeEach(() => {
        location = {
            navigate: jest.fn()
        }
        render(
            <LocationContext.Provider value={location}>
                <Bookmark label="Dank Meme Document" />
            </LocationContext.Provider>
        )
    })
    it('should change the location on click', function() {
        let button = screen.getByRole("button", { name: "Dank Meme Document"})
        userEvent.click(button)
        expect(location.navigate).toHaveBeenCalled()
    })
    it('should open a delete dialong on right click', function() {
        let button = screen.getByRole("button", { name: "Dank Meme Document"})
        fireEvent.contextMenu(button)
        let dialog = screen.getByRole("dialog", { name: "Delete Bookmark"})
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Cancel"})
        userEvent.click(closeButton)
    })
})