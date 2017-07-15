import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  searchBar: {
    flex: 1
  },
  searchButton: {
    width: 60,
    alignSelf: 'stretch',
    backgroundColor: '#e1e8ee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class Search extends Component {
  static navigationOptions = {
    title: 'Search Results'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            containerStyle={styles.searchBar}
            lightTheme={true}
            noIcon={true}
            onChangeText={this.onChangeText}
            placeholder={'Enter search text...'}
            defaultValue={this.props.navigation.state.params.searchString}
            clearIcon={{ color: '#86939e', name: 'clear' }}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Search;
