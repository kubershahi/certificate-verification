import React from 'react'
import './Upload.scss'
import {images} from "../../constants" 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function Login() {
  return (
<div className="app__header app__flex">
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Save you credentials forever.</p>
            <h1 className="head-texter">Upload them here!</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
    </Box>
        </div>
      </div>
   

      <img src={images.node} alt="profile_bg" />


  </div>
  )
}

export default Login