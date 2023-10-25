// NavBar.js
import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const { user } = useAuth();
  const [searchBox, setSearchBox] = useState("");
  const navigate = useNavigate();

  const navigateToAccount = () => {
    if (user) {
      navigate('/AccountPage');
    } else {
      navigate('/LoginPage');
    }
  }

  function handleSearch(event) {
    //console.log(event);
    event.preventDefault();
    //console.log(searchBox);
    if (searchBox) {
      navigate("/search-result", { state: searchBox, replace: true });
    }
  }
    return (
      <React.Fragment>
        <nav
          //stick initally, then fixed on scroll???
          className="navbar navbar-expand-lg navbar-style p-0"
          data-bs-theme="dark"
          style={{ position: "stick", width: "100%", zIndex: "1" }}
        >
          <div className="container-fluid" style={{ height: "80px" }}>
            <a className="navbar-brand" href="/#">
              <h1>Galeria</h1>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle  pages-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-home" aria-hidden="true"></i>
                    &nbsp;Pages
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={() => navigate("/")}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => navigate("/")}>
                        Artist
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => navigate("/")}>
                        Art
                      </a>
                    </li>
                  </ul>
                </div>
              </ul>
  
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                />
              </form>
              <button
                className="btn btn-outline-light"
                type="submit"
                onClick={(e) => {
                  handleSearch(e);
                }}
              >
                Search
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle btn-account"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" onClick={navigateToAccount}>
                    {user ? "Account" : "Log In"}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => navigate("/")}>
                    Saved for later
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => navigate("/info")}>
                    Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }; 
  export default NavBar;
