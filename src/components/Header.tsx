import React, { useContext } from 'react'

import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../context/firebaseContext';


export const Header = () => {

  const { firebase, user } = useContext(FirebaseContext)

  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Logo hackernews" className="logo" />
        <NavLink to="/" className="header-title">
          Hacker News
        </NavLink>
        <NavLink to="/" className="header-link">
          new
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">
          top
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">
          search
        </NavLink>
        {user &&
          <>
            <div className="divider">|</div>
            <NavLink to="/create" className="header-link">
              submit
            </NavLink>
          </>}
      </div>
      <div className="flex">
        {user ? (
          <>
            <div className="header-name">{user.displayName}</div>
            <div className="divider">|</div>
            <div className="header-button" onClick={() => firebase.logout()}>logout</div>
          </>
        ) : <NavLink to="/login" className="header-link">
          login
        </NavLink>}
      </div>
    </div>
  );
}
