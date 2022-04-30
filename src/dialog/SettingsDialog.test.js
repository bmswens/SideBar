// testing help
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsContext from '../context/SettingsContext'

// to test
import SettingsDialog from './SettingsDialog'

describe('The <SettingsDialog>', function() {
    let context
    let close
    beforeEach(() => {
        context = {
            defaultTarget: '',
            setDefaultTarget: jest.fn(),
            darkMode: true,
            setDarkMode: jest.fn(),
            drawerWidth: 240,
            setDrawerWidth: jest.fn()
        }
        close = jest.fn()
        render(
            <SettingsContext.Provider value={context}>
                <SettingsDialog
                    open={true}
                    close={close}
                />
            </SettingsContext.Provider>
        )
    })
    it('should be able to close', function() {
        let dialog = screen.getByRole('dialog')
        userEvent.type(dialog, '{esc}')
        expect(close).toHaveBeenCalled()
    })
    it('should allow a user to set a new default page', function() {
        let defaultPageBox = screen.getByRole('textbox', { name: 'Default Page'})
        userEvent.type(defaultPageBox, "https://github.com/bmswens")
        expect(context.setDefaultTarget).toHaveBeenCalledTimes("https://github.com/bmswens".length)
    })
    it('should allow a user to change theme options', function() {
        let switchModeButton = screen.getByRole("checkbox", { name: "switch theme"})
        userEvent.click(switchModeButton)
        expect(context.setDarkMode).toHaveBeenCalled()
    })
    it('should allow a user to change drawer width', function() {
        let drawerSlider = screen.getByRole("slider", { name: "drawer width" })
        fireEvent.change(drawerSlider, { target: { value: 230}})
        expect(context.setDrawerWidth).toHaveBeenCalledWith(230)
    })
    it('should allow a user to download their current bookmarks', function() {

    })
    it('should allow a user to upload a new set of bookmarks', function() {

    })
})