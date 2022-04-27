import React from 'react'
import './Navbar.scss'
import {images} from '../../constants'
import { BrowserRouter as Router, Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
        <p>aCERT</p>
      </div>
      <ul className="app__navbar-links">
        {['home', 'upload','verify','share','login'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`/${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar