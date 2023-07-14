import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { css } from '@emotion/react';
import { Container, Box, Typography, Button } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
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



const NavBar = ({user,code}) => {
    const [orgCode, setorgCode] = useState([]);
    const [username, setUsername] = useState('');

    const [cookies, setCookie] = useCookies([]);
    const navigate = useNavigate();
    const logout = () => {
        setCookie('token', null, { path: '/' });
        navigate('/login');
      }
    
    useEffect(() => {
        setorgCode(code);
        setUsername(user);
    }, []);
    return (
        <>
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
          <b>OrgCode :</b> {orgCode}
          </Typography>
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
          <Button variant="contained" color="primary" onClick={()=>{
                navigate('/userFormTemplateData');
          }}>
            Show Form Data
          </Button>
        </Box>
      </nav>
    </Container>
        </>
    )}

export default NavBar;