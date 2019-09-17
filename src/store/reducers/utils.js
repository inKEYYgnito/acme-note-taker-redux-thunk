const initUser = {
    loading: false
}

const reducer = (state = initUser, action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'SET_LOADING':
            newState.loading = action.loading
            return newState
        default:
            return state
    }
}

export default reducer