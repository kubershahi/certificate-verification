import React from 'react'
import './Verify.scss'
import {images} from "../../constants" 
import TextField from '@mui/material/TextField';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import jssha from 'jssha'


let fileData;
function Login() {
  const handleCert = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(e.target.files[0]);
		fileReader.onload = (e) => {
			fileData = e.target.result
      var sha3 = new jssha("SHA3-256", "BYTES")
      sha3.update(fileData.toString());
      var hash = sha3.getHash("HEX")
      const SHA256 = require('crypto-js/sha256')
      const leaf = SHA256(hash)
      console.log(leaf)
		};
	};

  const PostData = async (e) => {
		e.preventDefault();
  }

  return (
<div className="app__header app__flex">
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Prove authenticity</p>
            <h1 className="head-texter">Verify Ceritficate!</h1>
          </div>
        </div>

        <div className="tag-cmp ">
          <Input
                type="file"
                name="certificate"
                id="myFile"
                onChange={handleCert}
          /> <br></br><br></br>
            <Button
							type="submit"
							variant="contained"
							onClick={PostData}
						>
							Submit
						</Button>
        </div>
      </div>
   
      <img src={images.react} alt="profile_bg" />

  </div>
  )
}

export default Login