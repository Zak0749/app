import { useState } from 'react';
import {
  IoClose, FaBars, FaUserAlt, FaChevronLeft,
} from 'react-icons/all';
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
            <FaBars className="nav-bar-icon" onClick={showSideBar} fontWeight="bold" />
          </div>

          <div className="back-button">
            <FaChevronLeft className="nav-bar-icon" onClick={back} fontWeight="bold" />
          </div>
        </div>

        <Link to={loggedIn ? '/session' : '/login'} className="user-icon">
          {
            loggedIn
              ? <FaUserAlt className="nav-bar-icon" fontWeight="bold" />
              : <h3 className="login-button">Login</h3>
          }
        </Link>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <button type="button" className="menu-bars" onClick={showSideBar}>
              <IoClose className="nav-bar-icon" />
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
