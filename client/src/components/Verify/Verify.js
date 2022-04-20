import React from 'react'
import './Verify.scss'
import {images} from "../../constants" 
import TextField from '@mui/material/TextField';
function Login() {
  return (
<div className="app__header app__flex">
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Verify</p>
            <h1 className="head-texter">We make it possible!</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </div>
      </div>
   
      <img src={images.react} alt="profile_bg" />

  </div>
  )
}

export default Login