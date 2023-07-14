import React, { useState,useEffect} from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button} from '@material-ui/core';
// import { css } from '@emotion/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

// CSS styles for the table cells
const cellStyles = {
  border: '1px solid #ccc',
  padding: '10px',
  fontWeight: 'bold',
};
const deleteContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

const deleteButtonStyles = {
  marginRight: '10px',
  color: 'black',
  backgroundColor: 'white',
};
const ListTemplateTable = ({ listTemplate }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  // const [selectedIds,setSelectedIds] =  useState([]);
  const navigate = useNavigate();
  console.log("listTemplate:",listTemplate);
  useEffect(() => {
    console.log('selectedRows2:', selectedRows);
  }, [selectedRows]);
  const handleEditButton = (id)=>{
    // console.log("id",id)
    try{
      axios.get(`http://localhost:8080/json/${id}`)
      .then((response)=>{
        // console.log(response);
        let data = response.data.jsonData;
        let orgCode = response.data.orgCode;
        let mode = response.data.mode;
        let templateName = response.data.templateName;
        // let id = response.data.id;
        data=JSON.parse(data);
        // console.log("response from the backend",orgCode);
        // navigate('/editTemplate', { state: { data } });
        navigate('/editLabelTemplate', { state: { data,orgCode,mode ,id,templateName} });
      });    
    }
    catch(error) {
      console.log("Error: " + error.message);
    }
  }
  const handleDeleteButton =()=>{
    console.log("entered delete button");
    let selectedIds = [];
    for(let i=0;i<selectedRows.length;i++) {
      console.log("selected-id",listTemplate[selectedRows[i]].id);
      // console.log("templateName: ".listTemplate[selectedRows[i]].templateName);
      if(selectedIds.indexOf(listTemplate[selectedRows[i]].id)===-1 ){
        selectedIds.push(listTemplate[selectedRows[i]].id);
      } 
      console.log("selectedIds:",selectedIds);
    }
    for(let i=0;i<selectedIds.length;i++){
      let deleteId = selectedIds[i];
      try{
        axios.delete(`http://localhost:8080/json/${deleteId}`)
        .then((response)=>{
           console.log(response);
        });    
      }
      catch(error) {
        console.log("Error: " + error.message);
      }
    }
    window.location.reload(); 
  }
  return (
    <div>
     
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{...cellStyles ,fontWeight: 'bold',backgroundColor:'rgb(0, 180, 0)'}}>S.no</TableCell>
          <TableCell style={{...cellStyles,fontWeight: 'bold',backgroundColor:'rgb(0, 180, 0)'}}>orgCode</TableCell>
          <TableCell style={{...cellStyles,fontWeight: 'bold',backgroundColor:'rgb(0, 180, 0)'}}>mode</TableCell>
          <TableCell style={{...cellStyles,fontWeight: 'bold',backgroundColor:'rgb(0, 180, 0)'}}>templateName</TableCell>
          {/* <TableCell style={{fontWeight :'bold'}}>Id</TableCell> */}
          <TableCell style={{...cellStyles,fontWeight: 'bold',backgroundColor:'rgb(0, 180, 0)'}}>Edit</TableCell>
          {/* <TableCell>id</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {listTemplate.map((template, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox" style={cellStyles}>
              <Checkbox
              checked={selectedRows.includes(index)}
                // checked={selectedRows.includes(template.id)}
                onChange={(e) => {
                  // console.log(index);
                  let copyarray = JSON.parse(JSON.stringify(selectedRows));
                  // console.log(copyarray.indexOf(index));
                  if (copyarray.indexOf(index)==-1)
                  {
                    copyarray.push(index);
                  }
                  else
                  {
                    copyarray=copyarray.filter((ele)=> ele!=index);
                  }
                  console.log("copyarray before the setter",copyarray);
                  setSelectedRows(copyarray);
                  // console.log("selectedRows1",selectedRows);
                  // console.log("template.id",template.id);
                  // let copyarray = JSON.parse(JSON.stringify(selectedRows));
                  // console.log(copyarray.indexOf(template.id));
                  // if (copyarray.indexOf(template.id)==-1)
                  // {
                  //   copyarray.push(template.id);
                  // }
                  // else
                  // {
                  //   copyarray=copyarray.filter((ele)=> ele!=template.id);
                  // }
                  // console.log("copyarray before the setter",copyarray);
                  // setSelectedRows(copyarray);
                  // console.log("selectedRows",selectedRows);
                }}
                
              />
            </TableCell>
            <TableCell style={cellStyles}>{template.orgCode}</TableCell>
            <TableCell style={cellStyles}>{template.mode}</TableCell>
            <TableCell style={cellStyles}>{template.templateName || 'N/A'}</TableCell>
       
            {/* <TableCell style={{ borderRight: '1px solid #ccc' }}>{template.id}</TableCell>    */}
            <TableCell style={cellStyles} >
            <Button
              variant="contained" 
              color="primary"
              onClick={()=>handleEditButton(template.id)}             
              
            >
            Edit
            </Button>
          </TableCell> 
        </TableRow>
        ))}
      </TableBody>
    </Table>
    <br></br>
    {/* <div>
    <Button 
      variant="contained" 
      color="primary"
      onClick ={()=>handleDeleteButton()}
    >DELETE SELECTED ITEMS 
    </Button>
    
                  <DeleteIcon sx={{ fontSize: '200%' }}/>
    </div> */}
    <div style={deleteContainerStyles}>
                
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteButton()}
                  style={deleteButtonStyles}
                >
                  <DeleteIcon sx={{ fontSize: '200%' }} />
                </Button>
              </div>
          </div>)
};

export default ListTemplateTable;
