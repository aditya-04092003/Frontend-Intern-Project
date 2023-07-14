import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from "./Modal.module.css";
// import DateFnsUtils from '@date-io/date-fns';
// import {DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Calendar({ sections, setSections, dummySectionIndex,itemIndex, isBold, isItalic, isHidden, validationOption,label }) {
  const [shipmentDate, setShipmentDate] = useState(null);
  const handleDateChange = (event) => {
    setShipmentDate(event.target.value);
  };

  const handleButtonClick = (sectionIndex) => {
    if (shipmentDate) {

      const copiedState = [...sections];
      let dummyitemaddindex = copiedState[sectionIndex].titles.length;
      let dummyindextoadd=null;
      let dummySectionIndex=null;
  
      if (itemIndex==-1)
      { dummyindextoadd= dummyitemaddindex.toString(10);
        dummySectionIndex=(sectionIndex+1).toString(10);
        isBold=isBold.toString();
         isItalic=isItalic.toString();
        validationOption=validationOption.toString();
        isHidden=isHidden.toString();
         
         let dummyType="Date";
         let tmp = {
           id: dummyindextoadd,
           sectionId: dummySectionIndex,
           label: label,
           dateValue:shipmentDate,
           type: dummyType,
           isBold:isBold,
           isItalic:isItalic,
           hidden:isHidden,
           validation:validationOption,
         };
     
         if (tmp.label==="")
         return;
     
         if (tmp.isBold==="")
         tmp.isBold="false";
     
         if (tmp.isItalic==="")
         tmp.isItalic="false";
     
         if (tmp.hidden==="")
         tmp.hidden="false";
     
         if(tmp.type==="")
         tmp.type="String";
     
         if (tmp.validation==="")
         tmp.validation="true";
     
     
         copiedState[sectionIndex].titles.push(tmp);
         console.log(copiedState[sectionIndex].titles);  
         setSections(() => {
           return copiedState;
         });  
      
      }
  
      else
      {   validationOption=validationOption.toString();
          const copiedState = [...sections];
          console.log("copied state before =>", copiedState)
          const newState=copiedState[sectionIndex].titles;
          newState[itemIndex].type="Date";
          newState[itemIndex].validation=validationOption;
          newState[itemIndex].dateValue=shipmentDate;
          newState[itemIndex].label=label;
          console.log("new state", newState);
          copiedState[sectionIndex].titles = newState;
          setSections((prevState) => {
            return copiedState;
          });
  
      }
    }
  };


  return (
    <div style={{ padding: '20px' }}>
     <label htmlFor="shipmentDate" style={{  marginRight: '10px', fontWeight: 'bold' }}>
        Shipment Date :
      </label>
      <input
        type="date"
        id="shipmentDate"
        name="shipmentDate"
        onChange={handleDateChange}
        style={{  marginRight: '10px',padding: '5px' }}
      />

      <Button
        onClick={()=>{handleButtonClick(dummySectionIndex)}}
        disabled={!shipmentDate}
        style={{ padding: '5px' }}
        variant="contained"
      >
        Submit
      </Button>
        </div>
  );
}

export default Calendar;