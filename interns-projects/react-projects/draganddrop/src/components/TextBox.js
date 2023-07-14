import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const TextBox=({ sections, setSections, dummySectionIndex , itemIndex, isBold, isItalic, isHidden, validationOption, label}) =>{
  const [textInput, setTextInput] = React.useState('');

  const handleButtonClick = (sectionIndex) => {
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
       
       let dummyType="Text";
       let tmp = {
         id: dummyindextoadd,
         sectionId: dummySectionIndex,
         label: label,
         textValue: textInput,
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
        newState[itemIndex].type="Text";
        newState[itemIndex].validation=validationOption;
        newState[itemIndex].textValue=textInput;
        newState[itemIndex].label=label;
        console.log("new state", newState);
        copiedState[sectionIndex].titles = newState;
        setSections((prevState) => {
          return copiedState;
        });

    }
  };

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 4, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder='Enter Text Value here'
        value={textInput}
        onChange={handleChange}
      />

      <Button
        onClick={()=>{
        handleButtonClick(dummySectionIndex);}
    
    }
        style={{ padding: '5px' }}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
};


export default TextBox;
