const initUser = {}

const reducer = (state = initUser, action) => {
    let newUser = { ...state }
    switch (action.type) {
        case 'SET_USER':
            return action.user
        default:
            return newUser
    }
}

export default reducer