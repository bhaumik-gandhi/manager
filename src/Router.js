import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
    return (
        <Router sceneStyle={styles.sceneStyle} >
            <Scene key='auth'>
                <Scene key='login' title='Please Login' component={LoginForm} />
            </Scene>
            <Scene key='main'>
                <Scene 
                    rightTitle='Add'
                    onRight={() => Actions.employeeCreate()}
                    key='employeeList' 
                    component={EmployeeList} 
                    title='Employees'
                    initial
                />
                <Scene
                    key='employeeCreate' 
                    component={EmployeeCreate} 
                    title='Create Employee'
                />
                <Scene
                    key='employeeEdit' 
                    component={EmployeeEdit} 
                    title='Edit Employee' 
                />
            </Scene>
        </Router>
    );
}

const styles = {
    sceneStyle: {
        paddingTop: 55
    }
}

export default RouterComponent;