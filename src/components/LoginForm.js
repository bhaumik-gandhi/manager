import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password })
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        const { email, password, error } = this.props;

        return (
            <Card>
                <CardSection>
                    <Input 
                        label='Email'
                        placeholder='email@gmail.com'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={email}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry
                        label='Password'
                        placeholder='password'
                        onChangeText={this.onPasswordChanged.bind(this)}
                        value={password}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProp = ({ auth }) => {
    const { email, password, error, loading } = auth;
    
    return {
        email,
        password,
        error, 
        loading
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default connect(mapStateToProp, { emailChanged, passwordChanged, loginUser })(LoginForm);