// React
import React from 'react'

// MUI theming
import { createTheme, ThemeProvider } from '@mui/material/styles'

// storage
import { useLocalStorage } from '@rehooks/local-storage'

const defaultSettings = {
    defaultTarget: "https://aia.mit.edu/",
    darkMode: true
}
const SettingsContext = React.createContext(defaultSettings)

function SettingsContextWrapper(props) {

    // default target
    const [defaultTarget, setDefaultTarget] = useLocalStorage("defaultTarget", defaultSettings.defaultTarget)

    // theming
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', defaultSettings.darkMode)

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
          }
    })

    return (
        <SettingsContext.Provider 
            value={{
                defaultTarget,
                setDefaultTarget,
                darkMode,
                setDarkMode
            }}
        >
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </SettingsContext.Provider>
    )
}

export default SettingsContext
export {
    SettingsContextWrapper
}