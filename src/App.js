
// MUI
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

// custom
import SideNav from "./sidenav/SideNav"
import Frame from "./Frame"
import Context from './context/Context'

function App() {
  return (
    <Context>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex"
        }}
      >
        <CssBaseline />
        <SideNav />
        <Frame />
      </Box>
    </Context>
  );
}

export default App
