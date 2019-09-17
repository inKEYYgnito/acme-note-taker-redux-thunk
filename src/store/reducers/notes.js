const initNotes = []

const reducer = (state = initNotes, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.notes
        case 'CREATE_NOTE':
            return [...state, action.note]
        case 'UPDATE_NOTE':
            return [...state.filter(note => note.id != action.note.id), action.note]
        case 'DESTROY_NOTE':
            return [...state.filter(note => note.id != action.note.id)]
        default:
            return state
    }

}

export default reducer