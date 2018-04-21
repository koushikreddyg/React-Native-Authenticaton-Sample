import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }
  onLoginFail() {
    this.setState({
      error: 'Authntication failed',
      loading: false
    });
  }
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button text="Login" onPress={this.onButtonPress.bind(this)} />;
  }
  render() {
    const { errorTextStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Input
            secureTextEntry={false}
            placeholder="user@email.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry={true}
            label="Password"
            placeholder="enter@password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}
const styles = {
  errorTextStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20
  }
};
export default LoginForm;
