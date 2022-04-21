import React from 'react'
import './Upload.scss'
import { images } from "../../constants"
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function Upload() {
  return (
    <div className="app__header app__flex">
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Save you credentials forever.</p>
            <h1 className="head-texter">Upload them here!</h1>
          </div>
        </div>

        <div className="tag-cmp">
          <form>
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
            />

            <TextField
              id="outlined-basic"
              label="Batch"
              type="text"
            />
            <br></br>
            <br></br>
            <label> <h3>Choose the File to upload: </h3></label>
            <Input type="file" id="myFile" />
            <br></br>
            <br></br>
            <Button type="submit" variant="contained">Submit</Button>
          </form>

        </div>
      </div>


      <img src={images.node} alt="profile_bg" />


    </div>
  )
}

export default Upload