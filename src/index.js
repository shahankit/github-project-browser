import { StackNavigator } from 'react-navigation';

import HomePage from './HomePage';
import SearchPage from './Search';
import RepositoryPage from './Repository';

console.disableYellowBox = true;

export default StackNavigator({
  Home: { screen: HomePage },
  Search: { screen: SearchPage },
  Repository: { screen: RepositoryPage },
});
