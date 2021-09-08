import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAxios } from './helpers/axios';
import loggedInContext from './helpers/logged-in-context';
import CategoryView from './pages/CategoryView';
import CategoriesView from './pages/CategoriesView';
import ExploreView from './pages/ExploreView';
import QuizView from './pages/QuizView';
import UserView from './pages/UserView';
import SearchView from './pages/SearchView';

function App(): JSX.Element {
  // Asks the server for the loggedIn staus
  const [{ data: status }, refresh] = useAxios<boolean>({
    method: 'GET',
    url: 'loggedin',
  });

  // Returns the content
  return (
    <loggedInContext.Provider value={{ status, refresh }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/explore" component={ExploreView} />
          <Route exact path="/categories" component={CategoriesView} />
          <Route exact path="/category/:id" component={CategoryView} />
          <Route exact path="/quiz/:id" component={QuizView} />
          <Route exact path="/user/:id" component={UserView} />
          <Route exact path="/search" component={SearchView} />
          <Route exact path="/"><Redirect to="/explore" /></Route>
        </Switch>
      </Router>
    </loggedInContext.Provider>
  );
}

export default App;
