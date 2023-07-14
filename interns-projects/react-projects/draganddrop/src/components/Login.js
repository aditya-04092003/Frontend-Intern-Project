import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";

import axios from "axios";

import { useCookies } from 'react-cookie';

import { useNavigate } from "react-router-dom";


export default function Login() {

    const [username, setUserName] = useState("");

    const [email,setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [redirectToHome, setRedirectToHome] = useState(false);

    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    function validateForm() {

        return email.length > 0 &&password.length > 0;

    }

    function handleSubmit(event) {

        event.preventDefault();

    }

    const getIds = () => {
      axios.post("http://localhost:8080/authenticate", {    
            username: username,
            password: password,
            email: email  

        })

        .then((response) => {
          console.log(response.data.statusCodeValue);
          if(response.data.statusCodeValue===400){
            alert("wrong user:(");
          }

          else {

            let orgCode=response.data.orgCode;
            let username=response.data.username;
            setCookie('token', response.data.jwt, { path: '/' });
            setCookie('orgCode', orgCode, { path: '/' });
            setCookie('user', username, { path: '/' });
            
            if(orgCode!=="admin")
            {
              navigate('/userTemplate');
            }
            else{
                navigate('/');
              }
          }

        })

        .catch((error) => {

          console.log(error);

        });

    };

    return (

     

      <div className="block">


       

      <div className="center">

      <h2 className="heading"> Login to Blume Global!</h2>

        <Form onSubmit={handleSubmit} className="form">

        <div className="form-row"><div className="form-group">

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

                onChange={(e) => setUserName(e.target.value)}

              />

            </div> */}

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

            <Button  className="button-container" type="submit" disabled={!validateForm()} onClick = {()=>getIds()}>

          Login!

        </Button>

        </Form>

      </div>

    </div>        

    );

   

   




}