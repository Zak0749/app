import { useState } from 'react';
import {
  CloseRounded, MenuRounded, AccountCircleRounded, ChevronLeftRounded,
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import sideBarData from '../helpers/sidebar-data';
import './css/Navbar.css';

function Navbar({ loggedIn }: loggedIn): JSX.Element {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();

  const showSideBar = () => setSidebar(!sidebar);
  const back = () => {
    history.goBack();
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div className="menu-bars">
            <MenuRounded className="nav-bar-icon" onClick={showSideBar} fontSize="large" />
          </div>

          <div className="back-button">
            <ChevronLeftRounded className="nav-bar-icon" onClick={back} fontSize="large" />
          </div>
        </div>

        <Link to={loggedIn ? '/session' : '/login'} className="user-icon">
          {
            loggedIn
              ? <AccountCircleRounded className="nav-bar-icon" fontSize="large" />
              : <h3 className="login-button">Login</h3>
          }
        </Link>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <button type="button" className="menu-bars" onClick={showSideBar}>
              <CloseRounded className="nav-bar-icon" fontSize="large" />
            </button>
          </li>

          <li className="navigationTitle nav-bar-title">Quizzes</li>
          {sideBarData.map((item) => (
            <li key={item.key} className={item.className}>
              <Link to={item.path} onClick={showSideBar}>
                <div className="nav-text-icon">{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </>
  );
}

export default Navbar;
