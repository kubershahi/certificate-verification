import React, { useState } from "react";
import "./Upload.scss";
import { images } from "../../constants";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";
import { Drizzle } from "@drizzle/store";
// import SHA256 from 'crypto-js/sha256';
// import { verifyProof } from "merkletree";
import merkletree from "merkletree";

import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;

function Upload(props) {
  const { drizzle, drizzleState } = props

  const [user, setUser] = useState({
    name: "",
    batch: "",
    certificate: [],
    merkleRoot: "",
  });

  const [msg, setMsg] = useState("");
  const [merkle, setMerkle] = useState("");
  const [batch_down, setBatch_down] = useState("");

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  let cert_length = 0
  var leaves = []

  const merkleTree = (cert) => {
    cert_length = Object.keys(cert).length

    for (let i = 0; i < cert_length; i++) {
      leaves.push(cert[i]["hash"])
    }
    //making leaves order
    leaves.reverse()

    const tree = merkletree(leaves)
    var root = tree.root()

    for (let i = 0; i < cert_length; i++) {
      cert[i]["proof"] = tree.proof(leaves[i])
    }

    // const verified = verifyProof(cert[2]["hash"],root,cert[2]["proof"])
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

  const addRoot = (batch, root) => {
    // console.log(batch,root)

    if (!drizzleState) return "Waiting for State Initialization";
    // console.log(drizzleState.drizzleStatus.initialized)

    if (drizzleState.drizzleStatus.initialized) {

      const account = drizzleState.accounts[0]
      // console.log(account)

      const contract = drizzle.contracts.Certificate;
      const stackId = contract.methods.addRoot.cacheSend(batch, root, { from: account })

      console.log(stackId)
      return stackId

    }

  }

  const getTransaction = (stackId) =>{

    console.log(drizzleState.transactionStack[stackId])

    if (drizzleState.transactionStack[stackId]) {
      console.log("exists")
      //   const txHash = drizzleState.transactionStack[stackId]

      //   console.log(drizzleState.transactions[txHash].status)
    }

  }

  var stackId
  const PostData = async (e) => {

    e.preventDefault();
    const { name, batch, certificate, merkleRoot } = user;
    axios.post("http://localhost:4000/certificates/upload", {
      name,
      batch,
      certificate,
      merkleRoot,
    })
      .then((res) => {
        console.log(res);
        stackId = addRoot(user.batch, user.merkleRoot)

        getTransaction(stackId)

      })
      .catch((error) => {
        console.log(error);
      });
    setUser({ ...user, name: "", batch: "", certificate: [] })
    setMsg("Uploaded Successfully!")

  };
  function copyText(entryText) {
    navigator.clipboard.writeText(entryText)
  }

  const areAllFieldsFilled = ((user.certificate.length !== 0) && (user.name !== "") && (user.batch !== ""));

  return (
    <>
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
              label="Name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleInputs}
            />
            <TextField
              label="Batch"
              name="batch"
              type="text"
              value={user.batch}
              onChange={handleInputs}
            />
            <br></br>
            <br></br>
            <label>
              <h3>Upload your certificates JSON file: </h3>
            </label>
            <Input
              type="file"
              name="certificate"
              id="myFile"
              accept=".json/*"
              // disabled={!areFieldsFilled}
              onChange={handleCert}
            />
            <br></br>
            <br></br>
            <Button
              type="submit"
              variant="contained"
              disabled={!areAllFieldsFilled}
              onClick={PostData}
            >
              Submit
            </Button>
            {msg}
            {/* <label>
              <h3>Contract Details:</h3>
            </label>
            Batch: {user.batch}
            <br></br>
            Root: {user.merkleRoot} */}
          </form>
          {/* <div>
            <ContractForm drizzle={drizzle} contract="Certificate" method="addRoot" />
          </div> */}
        </div>
      </div>
      <img src={images.node} alt="profile_bg" />
    </div>
    <h3 className="head-text">Download <span> <a href= "https://drive.google.com/file/d/1FTr_ezrg_IhcT1-2BOFI3PtpyF4tZ6FI/view?usp=sharing">script.py</a>  </span> and run it on your certicates folder <br/> To Obtain Your <span> JSON</span> </h3>
    <div className="code"> 
      <img src={images.code} alt="profile_bg"/>
    </div>
    </>
  );
}

export default Upload;