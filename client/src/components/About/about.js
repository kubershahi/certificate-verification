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
        <a href="mailto:kuber.shahi_asp22@ashoka.edu.in" className="p-text">kuber.shahi_asp22@ashoka.edu.in</a>
      </div>x
      <div className="app__footer-card">
        <img src={images.email} alt="phone" />
        <a href="mailto:abhinav.nakarmi_asp22@ashoka.edu.in" className="p-text">abhinav.nakarmi_asp22@ashoka.edu.in</a>
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