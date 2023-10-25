import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="container-fluid p-1">
      {children}
      </div>
    </div>
  );
};
export default Layout;
