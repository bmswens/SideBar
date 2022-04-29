// React
import React from 'react'

// custom
import LocationContext from './context/LocationContext'

function Frame() {

    const location = React.useContext(LocationContext)

    return (
        <iframe
            src={location.target}
            title="Bookmark Frame"
            style={{
                flexGrow: 1
            }}
        />
    )
}

export default Frame