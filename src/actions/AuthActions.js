import { Actions } from 'react-native-router-flux';

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER
} from './types';


let users = [
    {
        id: 1,
        email: 'test@test.com',
        password: '123',
    }
]

const checkUserNameAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user = users.find(user => user.email === email);
            if (user && user.email) {
                if (password === user.password) {
                    resolve(user);
                } else {
                    reject('Authentication failed');
                }
            } else {
                resolve(false);
            }
        }, 2000)
    })
}

const createUserAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        if (email && password) {
            let id =  Math.random()
            users.push({id, email, password });
            setTimeout(() => {
                resolve({id, email, password});
            }, 2000)
        } else {
            reject(false);
        }
    });
}

// Export
export const emailChanged = (text) => { 
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch ({
            type: LOGIN_USER
        })

        checkUserNameAndPassword(email, password)
            .then(res => {
                if (res) {
                    return new Promise(resolve => resolve(res))
                } else {
                    return createUserAndPassword(email, password);
                }
            })
            .then(res => {
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: res
                });

                Actions.main();
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: LOGIN_USER_FAIL
                })
            });
    }
}
