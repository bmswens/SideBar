// testing help
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {SettingsContextWrapper} from '../../context/SettingsContext'

// to test
import SettingsButton from './SettingsButton'

describe('the <SettingsButton> with history', function() {
    beforeEach(() => {
        render(
            <SettingsContextWrapper>
                <SettingsButton />
            </SettingsContextWrapper>
        )
    })
    it('should open and close the dialog', function() {
        let button = screen.getByRole("button", { name: "Settings Button"})
        userEvent.click(button)
        let dialog = screen.getByRole('dialog')
        expect(dialog).not.toBeNull()
        userEvent.type(dialog, '{esc}')
    })
})