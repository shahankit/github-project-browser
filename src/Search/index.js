import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class Search extends Component {
  static navigationOptions = {
    title: 'Search Results'
  };

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

export default Search;
