import React, { useState } from "react";
import "./Upload.scss";
import { images } from "../../constants";
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";
import MerkleTree from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';

function Upload() {

  const [user, setUser] = useState({
    name: " ",
    batch: " ",
    certificate: [],
    merkleRoot: " ",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  let cert_length = 0
  let leaves_arr = []

  const merkleTree = (cert) => {
    cert_length = Object.keys(cert).length

    for (let i = 0; i < cert_length; i++) {
      leaves_arr.push(cert[i]["hash"])
    }
    const leaves = leaves_arr.map(x => SHA256(x))
    const tree = new MerkleTree(leaves, SHA256)
    var root = tree.getRoot().toString('hex')

    for (let i = 0; i < cert_length; i++) {
      const leaf = SHA256(cert[i]["hash"])
      const proof = tree.getProof(leaf)
      cert[i]["proof"] = proof
    }
    // console.log(tree.verify(proof, leaf, root)) // true

    return [cert, root]
  }

  const handleCert = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      var rawCert = JSON.parse(e.target.result)
      var [cert, root] = merkleTree(rawCert)
      setUser({ ...user, certificate: cert, merkleRoot: root })
    };
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, batch, certificate, merkleRoot } = user;
    axios
      .post("http://localhost:4000/certificates/upload", {
        name,
        batch,
        certificate,
        merkleRoot,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <TextField id="outlined-basic"
              label="Name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleInputs}
            />
            <TextField
              id="outlined-basic"
              label="Batch"
              name="batch"
              type="text"
              value={user.batch}
              onChange={handleInputs}
            />
            <br></br>
            <br></br>
            <label>
              {" "}
              <h3>Choose the File to upload: </h3>
            </label>
            <Input
              type="file"
              name="certificate"
              id="myFile"
              onChange={handleCert}
            />
            <br></br>
            <br></br>
            <Button
              type="submit"
              variant="contained"
              onClick={PostData}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <img src={images.node} alt="profile_bg" />
    </div>
  );
}

export default Upload;