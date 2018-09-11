import React, { Component } from 'react';
import { connect } from 'react-redux';

import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
    onButtonPress() {
        const { name, phone, shift, user } = this.props;

        this.props.employeeCreate({ name, phone, shift: shift || 'Monday', user });
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm
    const { user } = state.auth

    return { name, phone, shift, user };
}

export default connect(mapStateToProps, { 
    employeeUpdate,
    employeeCreate
})(EmployeeCreate);