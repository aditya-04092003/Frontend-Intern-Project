import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { css } from '@emotion/react';
import { Container, Box, Typography, Button } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ListTemplateTable from './ListTemplateTable';

const selectTemplateContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
`;

const navStyles = css`
  position: sticky;
  top: 0;
  background-color: #007bff;
  padding: 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const navRightStyles = css`
  display: flex;
  align-items: center;
`;

const navCompanyStyles = css`
  margin-right: 20px;
`;

const mainHeadingStyles = css`
  font-size: 24px;
  margin-bottom: 10px;
`;

const subHeadingStyles = css`
  font-size: 16px;
  margin-bottom: 20px;
`;

const formContainerStyles = css`
  display: flex;
  justify-content: space-between;
  width: 600px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const labelStyles = css`
  font-size: 16px;
  margin-bottom: 10px;
`;

const selectStyles = css`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px !important;
  height: auto;
  min-height: 1.4375em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    letter-spacing: inherit;
    color: currentColor;
    padding: 4px 0 5px;
    border: 0;
    box-sizing: content-box;
    background: none;
    height: 1.4375em;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    display: block;
    min-width: 0;
    width: 100%;
    -webkit-animation-name: mui-auto-fill-cancel;
    animation-name: mui-auto-fill-cancel;
    -webkit-animation-duration: 10ms;
    animation-duration: 10ms;
    padding: 16.5px 14px;

`;

const buttonStyles = css`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function SelectTemplate() {
  const navigate = useNavigate();
  const [listTemplate, setListTemplate] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // const[token,setToken]=useState(null);
  const [orgCode, setOrgCode] = useState(null);
  const [username, setUsername] = useState(null);
  // const [templateName,setTemplateName] = useState('');
  // const [mode,setMode] = useState('');
  const [id,setId] = useState(0);
  // const [selectedLabel, setSelectedLabel] = useState(""); // State to store the selected label
  useEffect(() => {

    console.log("First call on mount...")
    console.log(cookies.orgCode)
    let token = cookies.token;
    setOrgCode(cookies.orgCode);
    setUsername(cookies.user);
    console.log("orgvode",orgCode)
    console.log(token);
    if(orgCode!=='admin'&&orgCode!==null)
    {
      // console.log("vhk1");
      navigate('/userTemplate');
    }
    if (token == null || token == "" || token == undefined || token == "null") {
      console.log("Token is null");
      navigate('/login');
    }
    handleList();
  }, []); 
  const logout = () => {
    setCookie('token', null, { path: '/' });
    navigate('/login');
  }
  function handleNewLabelTemplate() {
    console.log("entered the fetch json template")
    fetchJsonData();
    // navigate('/editTemplate');
  }
  function handleNewFormTemplate() {
    console.log("entered the fetch json template")
    fetchJsonFormData();
    // navigate('/editTemplate');
  }
  const fetchJsonFormData = async () => {
    try {
      let token=cookies.token;
      console.log(token);
      if(token==null || token=="" || token==undefined || token=="null")
      {
        console.log("Token is null");
        navigate('/login');
      }
      const myHeaders = {
        "Authorization": "Bearer "+token,
        "Alow-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("http://localhost:8080/json/getDefaultTemplate/", requestOptions)
        .then(response => response.text())
        .then((result) => {
          console.log(result);
          result=JSON.parse(result);
          let data=JSON.parse(result.jsonData);

            console.log(data);
            
      navigate('/editFormTemplate', { state: { data } });
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  const fetchJsonData = async () => {
    try {
      let token=cookies.token;
      console.log(token);
      if(token==null || token=="" || token==undefined || token=="null")
      {
        console.log("Token is null");
        navigate('/login');
      }
      const myHeaders = {
        "Authorization": "Bearer "+token,
        "Alow-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("http://localhost:8080/json/getDefaultTemplate/", requestOptions)
        .then(response => response.text())
        .then((result) => {
          console.log(result);
          result=JSON.parse(result);
          let data=JSON.parse(result.jsonData);

            console.log(data);
            
      navigate('/editLabelTemplate', { state: { data } });
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  console.log(listTemplate);
  // const handleLabelChange = (event) => {
  //   setId(event.target.value);
  //   console.log(id);
  //  // Update the selected label in state
  // };
  const handleList = ()=>{
    console.log("Orgcode",orgCode)
    console.log("Username",username)
    axios.get("http://localhost:8080/json")
    .then((response)=>{
      setListTemplate(response.data);
      console.log(listTemplate);
    });
  }
  const  handleFetchTemplate =()=>{
    try{
      axios.get(`http://localhost:8080/json/${id}`)
      .then((response)=>{
        console.log(response);
        let data = response.data.jsonData;
        data=JSON.parse(data);
        navigate('/editTemplate', { state: { data } });
      });    
    }
    catch(error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <Container css={selectTemplateContainerStyles}>
      <nav css={navStyles} style={{
        "display": "flex",
        "flex-direction": "row",
        "min-width": "90%",
        "justify-content": "space-between",
        "padding": "70px"
      }}>
        <Typography variant="h6" css={navCompanyStyles}>
          BLUME GLOBAL
        </Typography>
        <Box css={navRightStyles} style={{
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "space-between",
            "width": "500px"
        }}>
          <Typography variant="body1" css={navCompanyStyles}>
            {username}
          </Typography>
          <Typography variant="body1" css={navCompanyStyles}>
            {orgCode}
          </Typography>
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </nav>

      <Box textAlign="center" my={4}>
        <Typography variant="h4" css={mainHeadingStyles}>
          Welcome to the React Drag and Drop App
        </Typography>
        <Typography variant="h6" css={subHeadingStyles}>
          Select the Template to see the drag and drop functionality
        </Typography>
      </Box>

      <div css={formContainerStyles} style={{
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-gap": "20px",
        "margin": "100px 20px"
      }}>
        <form css={formStyles} style={{
            "display": "flex",
            "flex-direction": "column",
            "width": "60%"
        }}>
        <h2 css={labelStyles}>Select an Existing Template</h2> 
<ListTemplateTable listTemplate={listTemplate} />


        </form>

        <form css={formStyles} style={{
          display: "flex",
        }}>
          <Button variant="contained" color="primary" css={buttonStyles}  onClick={(e)=>{
            e.preventDefault();
            handleNewFormTemplate();
           
          }}  style={{
            marginTop: "auto",
            marginBottom:"auto"
          }}>
            Edit Form Template 
          </Button>
          <Button variant="contained" color="primary" css={buttonStyles}  onClick={(e)=>{
            e.preventDefault();
            handleNewLabelTemplate();
           
          }}  style={{
            marginTop: "auto",
            marginBottom:"auto"
          }}>
            Create New Label Template Using Default Json
          </Button>
        </form>
      </div>
    </Container>
  );
}