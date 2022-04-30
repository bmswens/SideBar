// React
import React from 'react'

// custom
import SettingsContext from './SettingsContext'

const defaultLocation = {
    history: [],
    target: "https://aia.mit.edu/",
    back: () => {},
    navigate: () => {}
}
const LocationContext = React.createContext(defaultLocation)

function LocationContextWrapper(props) {

    const settings = React.useContext(SettingsContext)

    const [target, setTarget] = React.useState(settings.defaultTarget)
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

    React.useEffect(() => {
        setTarget(settings.defaultTarget)
    }, [settings.defaultTarget])

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