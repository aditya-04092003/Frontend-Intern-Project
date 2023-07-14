import React, { useState } from 'react';

const RadioButton = ({ sections, setSections, dummySectionIndex , itemIndex, isBold, isItalic, isHidden, validationOption,label}) => {
  const [selectedValue, setSelectedValue] = useState('true');

  const handleRadioChange = (event) => {
    console.log("Radio button value")
    console.log(event.target.value)
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = (sectionIndex) => {
    
    console.log("Section INDex and item index")
    console.log(sectionIndex,itemIndex)
    const copiedState = [...sections];
    let dummyitemaddindex = copiedState[sectionIndex].titles.length;
    let dummyindextoadd=null;
    let dummySectionIndex=null;

    if (itemIndex==-1)
    { 
      
  
      dummyindextoadd= dummyitemaddindex.toString(10);
      dummySectionIndex=(sectionIndex+1).toString(10);
      isBold=isBold.toString();
       isItalic=isItalic.toString();
      validationOption=validationOption.toString();
      isHidden=isHidden.toString();
       
       let dummyType="boolean";
       let tmp = {
         id: dummyindextoadd,
         sectionId: dummySectionIndex,
         label: label,
         booleanValue: selectedValue,
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
        newState[itemIndex].type="boolean";
        newState[itemIndex].validation=validationOption;
        newState[itemIndex].booleanValue=selectedValue;
        newState[itemIndex].label=label;
        console.log("new state", newState);
        copiedState[sectionIndex].titles = newState;
        setSections((prevState) => {
          return copiedState;
        });

    }
  };

  return (
    <div style={{margin: '10px 20px',
    padding:'10px'}}>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name="toggle"
          value="true"
          checked={selectedValue === 'true'}
          onChange={handleRadioChange}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          name="toggle"
          value="false"
          checked={selectedValue === 'false'}
          onChange={handleRadioChange}
        />
        False
      </label>
      <br />
      <button
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={()=>{handleButtonClick(dummySectionIndex);}}
      >
        Submit
      </button>
    </div>
  );
};
export default RadioButton;
