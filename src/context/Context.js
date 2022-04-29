// custom
import { BookmarksContextWrapper } from "./BookmarksContext";
import { LocationContextWrapper } from "./LocationContext";
import { SettingsContextWrapper } from "./SettingsContext";


function Context(props) {
    return (
        <SettingsContextWrapper>
            <BookmarksContextWrapper>
            <LocationContextWrapper>
                {props.children}
            </LocationContextWrapper>
            </BookmarksContextWrapper>
        </SettingsContextWrapper>
    )
}

export default Context