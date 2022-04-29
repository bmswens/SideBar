// testing help
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookmarksContext from '../context/BookmarksContext'

// to test
import DeleteDialog from './DeleteDialog'

describe('The <DeleteDialog>', function() {
    let context
    let close
    beforeEach(() => {
        context = {
            deleteBookmark: jest.fn()
        }
        close = jest.fn()
        render(
            <BookmarksContext.Provider value={context}>
                <DeleteDialog
                    open={true}
                    close={close}
                    label="testing"
                />
            </BookmarksContext.Provider>
        )
    })
    it('should be able to close without deleting', function() {
        let button = screen.getByRole("button", { name: "Cancel"})
        userEvent.click(button)
        expect(close).toHaveBeenCalled()
    })
    it('should be able to delete the given file', async function() {
        let button = screen.getByRole("button", { name: "Confirm"})
        userEvent.click(button)
        await waitFor(() => {
            expect(context.deleteBookmark).toHaveBeenCalledWith("testing")
        })
    })
})