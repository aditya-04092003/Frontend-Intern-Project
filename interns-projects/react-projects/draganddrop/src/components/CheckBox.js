import React from 'react';
import styles from "./Modal.module.css";
import { Button } from '@mui/material';

function CheckBox( {sections, setSections, dummySectionIndex,itemIndex, isBold, isItalic, isHidden, validationOption ,label} ) {
  const [options, setOptions] = React.useState(['Option 1', 'Option 2']);

  const handleAddOption = () => {
    const newOptions = [...options, `Option ${options.length + 1}`];
    setOptions(newOptions);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

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
       
       let dummyType="MultiSelect";
       let tmp = {
         id: dummyindextoadd,
         sectionId: dummySectionIndex,
         label:label,
         optionsValue: options,
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
        newState[itemIndex].type="MultiSelect";
        newState[itemIndex].validation=validationOption;
        newState[itemIndex].optionsValue=options;
        newState[itemIndex].label=label;
        console.log("new state", newState);
        copiedState[sectionIndex].titles = newState;
        setSections((prevState) => {
          return copiedState;
        });

    }
  };

  return (
    <div className={styles.RadioBtn}>
      {options.map((option, index) => (
        <div key={index} className={styles.OptionItem}>
          <Button variant="outlined ">{option}</Button>
          <Button
            onClick={() => handleDeleteOption(index)}
            style={{ marginLeft: '15px' }}
            size="small"
            variant="contained"
          >
            Delete
          </Button>
        </div>
      ))}
      <Button
        onClick={handleAddOption}
        style={{ marginTop: '10px' }}
        variant="outlined"
      >
        Add Option
      </Button>

      <br />
      <br />

      

      <Button
        onClick={()=>{handleButtonClick(dummySectionIndex)}}
        style={{ marginTop: '10px' }}
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
}

export default CheckBox;
