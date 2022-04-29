// React
import React from 'react'

const defaultLocation = {
    history: [],
    target: "https://aia.mit.edu/",
    back: () => {},
    navigate: () => {}
}
const LocationContext = React.createContext(defaultLocation)

function LocationContextWrapper(props) {

    const [target, setTarget] = React.useState("https://aia.mit.edu/")
    const [history, setHistory] = React.useState([])

    function back(){
        let newTarget = history[history.length - 1]
        setTarget(newTarget)
        let newHistory = [...history]
        newHistory.pop()
        setHistory(newHistory)
    }

    function navigate(newTarget) {
        let newHistory = [...history]
        newHistory.push(target)
        setHistory(newHistory)
        setTarget(newTarget)
    }

    return (
        <LocationContext.Provider value={{ history, target, back, navigate}}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationContext
export {
    LocationContextWrapper
}