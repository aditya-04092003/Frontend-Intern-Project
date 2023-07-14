import React, { useState, useEffect } from 'react';
import './UserPage.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Cookies from 'universal-cookie';
import axios from "axios";
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import data1 from './User1.json';
import data2 from './User2.json';
import data3 from './User3.json';
const Section = ({ section, index,getValuebyTitle}) => {
  const sectionRef = React.useRef(null);

  const opacity =  1;

  return (

    <div ref={sectionRef} className={section?.className ? section.className + ' section' : section
    } style={{
      opacity,
      "grid-template-columns": "repeat(4, 1fr)",
    }}
    > 
      {section.titles.length === 0 && <EmptySectionPlaceholder />}
      {section.titles.map((title, itemIndex) => (
        <Item
          key={title?.id ? title.id : ""}
          title={title?.label ? title.label : ""}
          sectionIndex={index}
          index={itemIndex}
          isBold={title.isBold}
          isItalic={title.isItalic}
          hidden={title.hidden}
          label={title.label}
          type={title.type}
          validation={title.validation}
          getValuebyTitle={getValuebyTitle}
          
        />
      ))}
    </div>
  );
};

const EmptySectionPlaceholder = () => {
  return <div className="empty-section-placeholder">Drag items here</div>;
};

const Item = ({ title, sectionIndex, index ,isBold, isItalic, hidden,getValuebyTitle}) => {
  const itemRef = React.useRef(null);

  const opacity = 1;
  if (hidden === "true") {
    return null;
  }
  hidden=hidden.toString().toLowerCase();
  return (
    <>
    <div ref={itemRef} className={`shipment-card-div item ${hidden === "true" ? 'hidden' : ''}`} style={{ opacity }}>
    {title}
    <br />
    {1 && (
      <span
        style={{
          fontWeight: isBold.toString().toLowerCase() === "true" ? "bold" : "normal",
          fontStyle: isItalic.toString().toLowerCase() === "true" ? "italic" : "normal"
        }}
      > {getValuebyTitle(title)}
      </span>
    )}

        </div>
        </>
  );
};  

const MyPage = () => {

  const location = useLocation();
  const [cookies, setCookie] = useCookies([]);

  const username=cookies.user;

  const orgCode=location.orgCode;
  const [sections, setSections] = useState([]);
  const navigate=useNavigate();

  let data ;
  if(username==='user1@001.com') {
    data = data1;
  }
  else if(username==='user2@001.com'){
    data = data2;
  }
  else if(username==='user3@001.com'){
    data =data3;
  }
  
  const mode=data['results']['0']['shipmentLegs']['0']['mode'];
  const flattenObject = (obj) => {
    const result = {};
  
    const flatten = (data, prefix = "") => {
      Object.keys(data).forEach((key) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        const transformedKey = newKey.replace(/^.+\./, "").toUpperCase();
  
        if (typeof data[key] === "object" && !Array.isArray(data[key])) {
          flatten(data[key], newKey);
        } else if (Array.isArray(data[key])) {
          if (data[key].length > 0 && typeof data[key][0] === "object") {
            data[key].forEach((item, index) => {
              flatten(item, `${newKey}[${index}]`);
            });
          } else {
            result[transformedKey] = data[key];
          }
        } else {
          result[transformedKey] = data[key];
        }
      });
    };
  
    flatten(obj);
  
    return result;
  };
  function getValuebyTitle(title){
    const temp = flattenObject(data);
// console.log(temp);
    for(let key in temp){
      // console.log("key",key);
      
      if(key.toUpperCase()==title.toUpperCase()){        
        return temp[key];
      }
    
    }
    return '---';
  }


  const logout = () => {
    setCookie('token', null, { path: '/' });
    navigate('/login');
  }
  useEffect(() => {
    console.log("First call on mount...");
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const token=cookies.token;
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
      console.log(mode)
      await fetch("http://localhost:8080/json/getShipmentTemplate/"+mode+"/", requestOptions)
        .then(response => response.text())
        .then((result) => {
          console.log(result);
          let data = JSON.parse(result);
          let jsonData=JSON.parse(data.jsonData);
          setSections(jsonData);
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };


  return (
    <>
      <div className="container">
        <NavBar user={username} orgCode={orgCode}/>
        <DndProvider backend={HTML5Backend}>
          <div></div>
          {sections.map((section, index) => (
            <Section
              key={section.id}
              section={section}
              index={index} 
              getValuebyTitle={getValuebyTitle}   
            />
          ))}
        </DndProvider>
        </div>
      <div>
        <div className='logout-btn'><Button variant="contained"color="success" onClick={logout}>Logout</Button></div>
        
        
      </div  >
    </>
  );
};

export default MyPage;
