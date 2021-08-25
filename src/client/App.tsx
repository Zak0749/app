import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import { Request } from './helpers/axios';
import Discover from './pages/Discover';
import Create from './pages/Create';
import Saved from './pages/Saved';
import Categorys from './pages/Categorys';
import Search from './pages/Search';
import Category from './pages/Category';
import Quiz from './pages/Quiz';
import User from './pages/User';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Session from './pages/Session';
import NotFound from './pages/NotFound';
import History from './pages/History';
import loggedInContext from './helpers/logged-in-context';
import New from './pages/New';

function App(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await Request({ method: 'GET', url: 'loggedin' });
        setLoggedIn(res.data);
      } catch {
        //
      }
    })();
  });

  return (
    <loggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Discover} />
          <Route path="/create" exact component={Create} />
          <Route path="/new" exact component={New} />
          <Route path="/history" exact component={History} />
          <Route path="/saved" exact component={Saved} />
          <Route path="/categories" exact component={Categorys} />
          <Route path="/search" exact component={Search} />
          <Route path="/category/:id" exact component={Category} />
          <Route path="/quiz/:id" exact component={Quiz} />
          <Route path="/user/:id" exact component={User} />
          <Route path="/login"><Login /></Route>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/session"><Session /></Route>
          <Route exact component={NotFound} />
        </Switch>
      </Router>
    </loggedInContext.Provider>
  );
}

export default App;
