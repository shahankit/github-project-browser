import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions
} from 'react-native';
import {
  SearchBar,
  Icon
} from 'react-native-elements';
import config from '../../config';

const windowWidth = Dimensions.get('window').width;
const contentPadding = 14;
const repoIconSize = 16;
const contentMargin = 14;
const starsWrapperWidth = 60;
const contentWidth = windowWidth - (2 * contentPadding) - (repoIconSize) - (2 * contentMargin) - starsWrapperWidth;

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
  },
  row: {
    flexDirection: 'row',
    padding: contentPadding,
  },
  itemContent: {
    width: contentWidth,
    marginHorizontal: contentMargin
  },
  repositoryName: {
    fontWeight: '600',
    color: '#0366d6',
    fontSize: 14,
    marginBottom: 3,
  },
  repositoryDescription: {
    color: '#586069',
    fontSize: 12
  },
  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: starsWrapperWidth,
  },
  starsCount: {
    fontSize: 11,
    color: '#6a737d',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#eaecef',
  },
  topicsWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  topicContainer: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginVertical: 4,
    marginRight: 8,
    backgroundColor: '#e7f3ff',
    borderRadius: 3
  },
  topicName: {
    fontSize: 12,
    color: '#0366d6'
  }
});

class Search extends Component {
  static navigationOptions = {
    title: 'Search Results'
  };

  constructor(props) {
    super(props);

    const searchString = this.props.navigation.state.params.searchString;
    this.searchString = searchString;
    this.fetchResults(searchString);
  }

  onChangeText = text => (this.intermediateSearchString = text);

  onSearchButtonPressed = () => {
    if (!this.intermediateSearchString) {
      return;
    }

    this.searchString = this.intermediateSearchString;
    this.fetchResults(this.searchString);
  }

  fetchResults = async (searchString) => {
    const query = `
      {
        search (
          first:100,
          query: "${searchString}",
          type: REPOSITORY
        ) {
          repositoryCount
          pageInfo {
            endCursor
          }
          edges {
            cursor
            node {
              ... on Repository {
                id
                nameWithOwner
                description
                stargazers {
                  totalCount
                }
                repositoryTopics(first: 100) {
                  nodes {
                    topic {
                      id
                      name
                    }
                  }
                }
                url
              }
            }
          }
        }
      }
    `;
    const payload = { query, variables: null, operationName: null };
    const response = await fetch('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${config.GITHUB_ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Got repsonse with status code: ' + response.status);
    }
    setTimeout(() => null, 0); // workaround for #issue-6679
    const responseObject = await response.json();

    console.log('responseObject is', responseObject);

    this.searchResults = responseObject.data.search;
    this.listViewData = this.searchResults.edges;
    this.setState({});
  }

  keyExtractor = item => item.node.id

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderTopic = ({ topic }) => (
    <View key={topic.id} style={styles.topicContainer}>
      <Text style={styles.topicName}>{topic.name}</Text>
    </View>
  )

  renderRow = ({ item }) => {
    const repository = item.node;
    return (
      <View style={styles.row}>
        <Icon type={'octicon'} name={'repo'} color={'#0366d6'} size={repoIconSize} />
        <View style={styles.itemContent}>
          <Text style={styles.repositoryName}>{repository.nameWithOwner}</Text>
          <Text style={styles.repositoryDescription}>{repository.description}</Text>
          <View style={styles.topicsWrapper}>
            {repository.repositoryTopics.nodes.map(this.renderTopic)}
          </View>
        </View>
        <View style={styles.starsWrapper}>
          <Text style={styles.starsCount}>{repository.stargazers.totalCount}</Text>
          <Icon type={'octicon'} name={'star'} color={'#6a737d'} size={repoIconSize} />
        </View>
      </View>
    );
  }

  renderList = () => {
    if (!this.listViewData) {
      return null;
    }

    return (
      <FlatList
        data={this.listViewData}
        renderItem={this.renderRow}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReached={this.onEndReached}
      />
    );
  }

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
          <TouchableOpacity style={styles.searchButton} onPress={this.onSearchButtonPressed}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        {this.renderList()}
      </View>
    );
  }
}

export default Search;
