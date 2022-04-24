import React, { useState } from "react";
import "./Upload.scss";
import { images } from "../../constants";
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";


function Upload() {
    const [user, setUser] = useState({
        name: "",
        batch: "",
        certificate: [],
    });

    let name, value, certificate;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const merkleRoot = (certificate) => {

    }

    const handleCert = (e) => {

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            certificate = JSON.parse(e.target.result)
            // setUser({ ...user, certificate: certificate })
        };
        console.log(certificate)
        merkleRoot(certificate)

    };

    const PostData = async (e) => {
        e.preventDefault();

        const { name, batch, certificate } = user;
        axios
            .post("http://localhost:4000/certificates/upload", {
                name,
                batch,
                certificate,
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
