export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export const setNotes = (notes) => {
    return {
        type: 'SET_NOTES',
        notes
    }
}

export const updateNote = (note) => {
    return {
        type: 'UPDATE_NOTE',
        note
    }
}

export const createNote = (note) => {
    return {
        type: 'CREATE_NOTE',
        note
    }
}

export const destroyNote = (note) => {
    return {
        type: 'DESTROY_NOTE',
        note
    }
}
