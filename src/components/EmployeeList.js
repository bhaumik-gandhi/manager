import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';

import { employeesFetch } from '../actions';
import ListItem from '../components/ListItem';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch(this.props.user);

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 
        })

        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <ListItem employee={employee} />
    }

    render() {
        return (
            <View>
                <ListView 
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { employees } = state;
    
    return { user, employees: employees}
}

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);