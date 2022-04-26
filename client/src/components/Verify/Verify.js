import React, { useState } from 'react'
import './Verify.scss'
import {images} from "../../constants" 
import TextField from '@mui/material/TextField';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import jssha from 'jssha'
import axios from 'axios';
import MerkleTree from 'merkletreejs';
let leaf_candidate;
let proof;
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


      axios.get("http://localhost:4000/certificates")
      .then((response) => {
        const userData =response.data
        let certificates = userData[0]["certificate"]
        let root = userData[0]["merkleRoot"]
        let cert_length = Object.keys(certificates).length
        for (let i = 0; i < cert_length; i++) {
          if (hash === certificates[i]["hash"]){
            leaf_candidate = hash
            proof = certificates[i]["proof"]
          }
          
        }
        const SHA256 = require('crypto-js/sha256')

        // Leaf of the pdf file
        const leaf = SHA256(leaf_candidate)
        const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
        const tree = new MerkleTree(leaves, SHA256)
        // console.log("verify",tree.verify(proof, leaf, root))


        // console.log(certificates)
        
        // for (let i = 0; i < cert_length; i++) {
        //   const leaf = SHA256(cert[i]["hash"])
        //   const proof = tree.getProof(leaf)
        //   cert[i]["proof"] = proof
        // }

      })
      
      .catch((error) => {
        console.log(error);
      });

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