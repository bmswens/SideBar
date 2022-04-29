// testing  help
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// to test
import LocationContext from './LocationContext'
import { LocationContextWrapper } from './LocationContext'

function LocationContextTester() {
    const location = React.useContext(LocationContext)

    return (
        <div>
            <p data-testid="location">{location.target}</p>
            <p data-testid="history">{location.history.join(',')}</p>
            <button aria-label="go to new" onClick={() => location.navigate("newLocation")}>Navigate</button>
            <button aria-label="go back" onClick={() => location.back()}>Go Back</button>
        </div>
    )
}

describe('The <LocationContextWrapper>', function() {
    beforeEach(() => {
        render(
            <LocationContextWrapper>
                <LocationContextTester />
            </LocationContextWrapper>
        )
    })
    it('should start on the default page', function() {
        let location = screen.getByTestId("location")
        expect(location.innerHTML).toEqual("https://aia.mit.edu/")
        let history = screen.getByTestId("history")
        expect(history.innerHTML).toEqual("")
    })
    it('should be able to navigate to a new page', function() {
        let button = screen.getByRole("button", { name: "go to new"})
        userEvent.click(button)
        let location = screen.getByTestId("location")
        expect(location.innerHTML).toEqual("newLocation")
        let history = screen.getByTestId("history")
        expect(history.innerHTML).toEqual("https://aia.mit.edu/")
    })
    it('should be able to go back', function() {
        let button = screen.getByRole("button", { name: "go to new"})
        userEvent.click(button)
        let location = screen.getByTestId("location")
        expect(location.innerHTML).toEqual("newLocation")
        let history = screen.getByTestId("history")
        expect(history.innerHTML).toEqual("https://aia.mit.edu/")
        let goBack = screen.getByRole("button", { name: "go back"})
        userEvent.click(goBack)
        location = screen.getByTestId("location")
        expect(location.innerHTML).toEqual("https://aia.mit.edu/")
        history = screen.getByTestId("history")
        expect(history.innerHTML).toEqual("")
    })
})