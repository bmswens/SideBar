// testing help
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationContext from '../../context/LocationContext'

// to test
import BackButton from './BackButton'

describe('the <BackButton> with history', function() {
    let location
    beforeEach(() => {
        location = {
            history: ['past'],
            back: jest.fn(),
            navigate: jest.fn(),
            target: ''
        }
        render(
            <LocationContext.Provider value={location}>
                <BackButton />
            </LocationContext.Provider>
        )
    })
    it('should go back to the previous context', function() {
        let button = screen.getByRole('button', { name: "Back Button"})
        userEvent.click(button)
        expect(location.back).toHaveBeenCalled()
    })
})

describe('the <BackButton> without history', function() {
    let location
    beforeEach(() => {
        location = {
            history: [],
            back: jest.fn(),
            navigate: jest.fn(),
            target: ''
        }
        render(
            <LocationContext.Provider value={location}>
                <BackButton />
            </LocationContext.Provider>
        )
    })
    it('should go back to the previous context', function() {
        let button = screen.getByRole('button', { name: "Back Button"})
        expect(button.disabled).toBe(true)
    })
})