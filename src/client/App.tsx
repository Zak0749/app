import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Theme } from '..';
import NavigationBar from './components/Navbar';
import { useAxios } from './helpers/axios';
import getTheme from './helpers/get-theme';
import loggedInContext from './helpers/logged-in-context';
import themeContext from './helpers/theme-context';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Session from './pages/Session';

function App(): JSX.Element {
  const [theme, setTheme] = useState<Theme>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? getTheme('dark') : getTheme('light'),
  );

  useEffect(() => {
    const modeMe = (e: any) => {
      setTheme(e.matches ? getTheme('dark') : getTheme('light'));
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe);
  }, []);

  const [{ data: loggedIn }, refresh] = useAxios({
    method: 'GET',
    url: 'loggedin',
  });

  return (
    <themeContext.Provider value={theme}>
      <loggedInContext.Provider value={{ refresh, loggedIn }}>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/explore" exact component={Explore} />
            <Route path="/login" exact component={Login} />
            <Route path="/session" exact component={Session} />
            <Route path="/quiz/:id" exact component={Quiz} />
          </Switch>
        </Router>
      </loggedInContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
