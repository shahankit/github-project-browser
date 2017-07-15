import React, { Component } from 'react';
import {
  StyleSheet,
  WebView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class GithubProjectBrowser extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    return (
      <WebView
        source={{ uri: this.props.navigation.state.params.url }}
        style={styles.container}
      />
    );
  }
}
