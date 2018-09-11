import { Actions } from 'react-native-router-flux';

import { 
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';

let userEmployees = [{                           
    id: 7,
    userId: 1,
    name: 'Bhaumik',
    phone: '9429828884',
    shift: 'Monday'
}];

const fetchEmployees = (userId) => {
    return new Promise((resolve, reject) => {
        const employees = userEmployees.filter(userEmp => userEmp.userId === userId)
        setTimeout(() => {
            resolve (employees);
        }, 2000);
    });
}

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
}

export const employeeCreate = ({ name, phone, shift, user }) => {
    return (dispatch) => {
        userEmployees.push({id: Math.random(), userId: user.id ,name, phone, shift });

        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
    }
}

export const employeesFetch = (user) => {
    return (dispatch) => {
        fetchEmployees(user.id)
            .then(res => {
                dispatch({
                    type: EMPLOYEES_FETCH_SUCCESS,
                    payload: res
                })
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export const employeeSave = ({ name, phone, shift, id }) => {
    let empIndex = userEmployees.findIndex(emp => emp.id === id);

    return (dispatch) => {
        userEmployees[empIndex] = {
            ...userEmployees[empIndex],
            name,
            phone,
            shift,
        }
        dispatch({
            type: EMPLOYEES_FETCH_SUCCESS,
            payload: userEmployees
        })
        dispatch({
            type: EMPLOYEE_SAVE_SUCCESS
        })
        Actions.employeeList({ type: 'reset' });
    }
        
}

export const employeeDelete = ({ id }) => {
    let empIndex = userEmployees.findIndex(emp => emp.id === id);

    userEmployees.splice(empIndex, 1);

    return(dispatch) => {
        dispatch({
            type: EMPLOYEES_FETCH_SUCCESS,
            payload: userEmployees
        });

        dispatch({
            type: EMPLOYEE_SAVE_SUCCESS
        });

        Actions.employeeList({ type: 'reset' });
    }
}
