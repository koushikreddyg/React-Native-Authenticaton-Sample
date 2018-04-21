import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import { Header, Button, Spinner } from './components/common';

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCLwcDG8ziJDQVRW2xm3CpnkVSGdnkLnbc',
      authDomain: 'authentication-818d7.firebaseapp.com',
      databaseURL: 'https://authentication-818d7.firebaseio.com',
      projectId: 'authentication-818d7',
      storageBucket: 'authentication-818d7.appspot.com',
      messagingSenderId: '514035083058'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        console.log('Logged in');
      } else {
        this.setState({ loggedIn: false });
        console.log('Logged out');
      }
    });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{ flexDirection: 'row' }}>
            <Button
              onPress={() => {
                firebase.auth().signOut();
              }}
              text="Logout!"
            />
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ flexDirection: 'row' }}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
export default App;
