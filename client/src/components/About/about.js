import React from 'react'
import './about.scss'
import {images} from "../../constants" 
import TextField from '@mui/material/TextField';

function Login() {
  return (
    <>
  <div className="app__header app__flex">
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          {/* <div style={{ marginLeft: 20 }}>
            <p className="p-text">Lets Meet?</p>
            <h1 className="head-texter">Contact Us! </h1>
          </div> */}
        </div>

     <h3 className="head-text"><span>chat with us!</span></h3>
     <div className="app__footer-cards">
      <div className="app__footer-card ">
        <img src={images.email} alt="email" />
        <a href="mailto:hello@acert.com" className="p-text">hello@acert.com</a>
      </div>x
      <div className="app__footer-card">
        <img src={images.mobile} alt="phone" />
        <a href="tel:+1 (123) 456-7890" className="p-text">+1 (123) 456-7890</a>
      </div>
    </div>
    </div>
  </div>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  </>
  )
}

export default Login