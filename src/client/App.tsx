import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import NavigationBar from './helpers/Navbar';

function App(): JSX.Element {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={() => <p>hi</p>} />
      </Switch>
    </Router>
  );
}

export default App;
