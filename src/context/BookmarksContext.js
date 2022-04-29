// React
import React from 'react'

// storage
import { useLocalStorage } from '@rehooks/local-storage'

const defaultBookmarks = {
    bookmarks: [],
    addBookmark: () => {},
    getFolders: () => {},
    deleteBookmark: () => {},
    bookmarkExists: () => {}
}
const BookmarksContext = React.createContext(defaultBookmarks)

function BookmarksContextWrapper(props) {

    const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])
    function addBookmark(bookmark, folder="root") {
        // only adds bookmarks if the label is unique
        let exists = bookmarkExists(bookmark.label)
        if (exists) {
            return false
        }
        let newBookmarks = [...bookmarks]
        if (folder === 'root') {
            newBookmarks.push(bookmark)
        }
        else {
            for (let item of newBookmarks) {
                if (item.label === folder) {
                    item.bookmarks.push(bookmark)
                }
            }
        }
        setBookmarks(newBookmarks)
        return true
    }

    function getFolders() {
        let output = ["root"]
        for ( let item of bookmarks) {
            if (item.isFolder) {
                output.push(item.label)
            }
        }
        return output
    }

    function bookmarkExists(label, searchItems=bookmarks) {
        for (let obj of searchItems) {
            if (obj.bookmarks) {
                let found = bookmarkExists(label, obj.bookmarks)
                if (found) {
                    return true
                }
            }
            else if (obj.label === label) {
                return true
            }
        }
        return false
    }

    function deleteBookmark(label, searchItems=bookmarks) {
        let items = []
        for (let obj of searchItems) {
            if (obj.label === label) {
                continue
            }
            else if (obj.bookmarks) {
                let bookmarkLabels = obj.bookmarks.map(bookmark => bookmark.label)
                let index = bookmarkLabels.indexOf(label)
                console.log(label, index)
                if (index !== -1) {
                    obj.bookmarks.splice(index, 1)
                }
            }
            items.push(obj)
        }
        setBookmarks(items)
    }

    return (
        <BookmarksContext.Provider
            value={{
                bookmarks,
                addBookmark,
                getFolders,
                deleteBookmark
            }}
        >
                {props.children}
            </BookmarksContext.Provider>
    )
}

export default BookmarksContext
export {
    BookmarksContextWrapper
}