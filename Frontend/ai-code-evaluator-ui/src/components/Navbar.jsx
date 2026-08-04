import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsCodeSquare, BsHouseDoor } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 font-weight-bold" to="/">
          <BsCodeSquare className="text-primary fs-3" />
          <span className="fw-bold tracking-tight">AI Code Evaluator</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 px-3 rounded ${
                    isActive ? 'active fw-bold text-white bg-primary bg-opacity-25' : 'text-light'
                  }`
                }
              >
                <BsHouseDoor className="mb-1" /> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
