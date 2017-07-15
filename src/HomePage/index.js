import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchButton: {
    height: 50,
    width: 120,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9c99f',
  },
  textInput: {
    marginTop: 20,
    alignSelf: 'stretch',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 20,
  }
});

export default class GithubProjectBrowser extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Home'
  };

  onChangeText = text => (this.searchString = text);

  onSearchPressed = () => {
    const searchString = this.searchString;
    const { navigate } = this.props.navigation;
    navigate('Search', { searchString });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit src/index.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.textInput}
          placeholder={'Enter search text'}
        />
        <TouchableOpacity style={styles.searchButton} onPress={this.onSearchPressed}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
