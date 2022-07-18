// React
import React from 'react'

// MUI theming
import { createTheme, ThemeProvider } from '@mui/material/styles'

// storage
import { useLocalStorage } from '@rehooks/local-storage'

const defaultSettings = {
    defaultTarget: "https://bmswens.github.io/",
    setDefaultTarget: () => {},
    darkMode: true,
    setDarkMode: () => {},
    drawerWidth: 240,
    setDrawerWidth: () => {}
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

    // drawer width
    const [drawerWidth, setDrawerWidth] = useLocalStorage("drawerWidth", 240)

    return (
        <SettingsContext.Provider 
            value={{
                defaultTarget,
                setDefaultTarget,
                darkMode,
                setDarkMode,
                drawerWidth,
                setDrawerWidth
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