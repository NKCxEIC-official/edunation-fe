import actions from './constants';

const loginUser = (payload) => {
    return {
        type: actions.LOGIN,
        payload: payload
    }
}

const logOutUser = () => {
    return {
        type: actions.LOGOUT
    }
}

const setUserData = (payload) => {
    return {
        type: actions.SET_USER,
        payload: payload
    }
}

export default { loginUser, logOutUser, setUserData };