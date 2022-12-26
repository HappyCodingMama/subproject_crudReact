import React from 'react';
import { Link } from 'react-router-dom';
//style
import { FiMenu } from 'react-icons/fi';
import { BsPersonCheck } from 'react-icons/bs';
import './header.scss';

const header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <div className='navbar-container'>
      <div className='navbar-logo'>
        <Link to='/'>
          <span className='mobile-navbar'>
            <FiMenu className='mobile-icon' />
            My Planet
          </span>
        </Link>
      </div>
      <div className='navbar-contents'>
        <ul className='navbar-nav-right'>
          <div className='nav-menu'>
            <Link to='/'>
              <li
                className={`nav-item ${active === 'home' ? 'active' : ''}`}
                onClick={() => setActive('home')}
              >
                Home
              </li>
            </Link>
          </div>
          <Link to='/create'>
            <li
              className={`nav-item ${active === 'create' ? 'active' : ''}`}
              onClick={() => setActive('create')}
            >
              Write
            </li>
          </Link>
          <span> | </span>

          {/* <Link to='/about'>
            <li
              className={`nav-item ${active === 'about' ? 'active' : ''}`}
              onClick={() => setActive('about')}
            >
              About
            </li>
          </Link> */}
          {userId ? (
            <>
              <div className='profile-logo'>
                <BsPersonCheck className='profile-item' />
                <p className='nav-username'>{user?.displayName}</p>
              </div>
              <li className='nav-item logout' onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <Link to='/auth'>
              <li
                className={`nav-item ${active === 'login' ? 'active' : ''}`}
                onClick={() => setActive('login')}
              >
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default header;
