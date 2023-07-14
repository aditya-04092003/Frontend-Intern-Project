import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";

import axios from "axios";

import { Navigate } from "react-router-dom";

export default function SignUp() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [orgcode, setOrgcode] = useState("");

  const [redirectToHome, setRedirectToHome] = useState(false);

  function validateForm() {

    return (

        email.length > 0 &&  orgcode.length > 0 &&password.length > 0

    );  

  }

  function handleSubmit(event) {

    event.preventDefault();//console.log("Form submitted!");

  }

  const postIds = ()=>{

    axios.post("http://localhost:8080/signup", {

      email: email,

      password: password,

      orgCode : orgcode,

      username: username

    })

    .then((response) => {

      console.log(response);

      setRedirectToHome(true);

    })

    .catch((error) => {

      alert('User already registered!');

      setRedirectToHome(true);

    });  

}

  return (

    <div className="block">

      {redirectToHome && <Navigate to="/login" />}

     

      <div className="center">

      <h2 className="heading"> Welcome to Blume Global!</h2>

        <Form onSubmit={handleSubmit} className="form">

          <div className="form-row">

            <div className="form-group">

              <Form.Label className ='font'>Email-address</Form.Label>

              <Form.Control

                autoFocus

                placeholder="Enter email address"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

              />

            </div>

            {/* <div className="form-group">  

              <Form.Label className ='font'>UserName</Form.Label>

              <Form.Control

                placeholder="Enter username"

                value={username}

                onChange={(e) => setUsername(e.target.value)}

              />

            </div> */}

            <div className="form-group">

              <Form.Label className ='font'>Organisation Code</Form.Label>

              <Form.Control

                placeholder="Enter Orgcode"

                value={orgcode}

                onChange={(e) => setOrgcode(e.target.value)}

              />

            </div>

            <div className="form-group">

              <Form.Label className ='font'>Password</Form.Label>

              <Form.Control

                type="password"

                placeholder="Enter Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

              />

            </div>

          </div>

          <div className="button-margin">

        <Button  className="button-container" type="submit" disabled={!validateForm()} onClick = {()=>postIds()}>

          Sign-up

        </Button>

      </div>

        </Form>

      </div>

    </div>

  );

}