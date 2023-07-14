import React, { useState } from "react";
import styles from "./ModalLabel.module.css";
import { RiCloseLine } from "react-icons/ri";



const ModalLabel = ({ setIsOpen,dummySectionIndex, dummyIndex, handleDeleteTileButton, sections, setSections } ) => {
  
let dummyTextInput=null;
let dummyselectedOption=null;
let dummyvalidationOption=null;

  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [validationOption, setValidationOption] = useState("");

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleValidationChange = (e) => {
    setValidationOption(e.target.value);
  };
  

  const changeValidation = (sectionIndex, itemIndex, validationOption) => {
    const copiedState = [...sections];
    console.log("copied state before =>", copiedState)
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].validation=validationOption;
    console.log("new state", newState);
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });

  }

  const changeTextype = (sectionIndex, itemIndex, selectedOption) => {
    const copiedState = [...sections];
    console.log("copied state before =>", copiedState)
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].type=selectedOption;
    console.log("new state", newState);
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });

  }

  const changeLabel = (sectionIndex, itemIndex, textInput) => {
    const copiedState = [...sections];
    console.log("copied state before =>", copiedState)
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].label=textInput;
    console.log("new state", newState);
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });

  }


  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}></div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>      
       <div>
          <label htmlFor="text-input" className={styles.textfield}>
            Label:
          <input
            id="text-input"
            type="text"
            value={textInput}
            placeholder={sections[dummySectionIndex].titles[dummyIndex].label}
            onChange={handleTextChange}
            className={styles.textfield}
          />
          </label>
          </div>

          {/* Dropdown menu for text type */}
          <div className={styles.TextInput}>
          <label htmlFor="text-input" className={styles.typefield}>
            Type :
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className={styles.dropdown}
          >
            <option value="Text">Text</option>
            <option value="Int">Int</option>
            <option value="Date">Date</option>
            <option value="Boolean">Boolean</option>
          </select>
          </label>
          </div>
          {/* Dropdown menu for validation */}
          <div className={styles.ValidationType}>
          <label htmlFor="text-input" className={styles.validationfield}>
            Validation :
          <select
            value={validationOption}
            onChange={handleValidationChange}
            className={styles.dropdownvalid}
          >
            {/* <option value="">No Validation</option> */}
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          </label>
          </div>
       
           <div className={styles.actionsContainer}>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                setIsOpen(false);
                dummyvalidationOption=validationOption;
                dummyselectedOption=selectedOption;
                dummyTextInput= textInput;
                console.log("textInput: " + dummyTextInput);
                console.log("dummyselectedOption "+ dummyselectedOption);
                console.log("validationOption: " + dummyvalidationOption);
                changeValidation(dummySectionIndex, dummyIndex, validationOption);
                changeTextype(dummySectionIndex, dummyIndex, selectedOption);
                changeLabel(dummySectionIndex, dummyIndex, textInput);
              }}
            >  Save Changes
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                setIsOpen(false);
                handleDeleteTileButton(dummySectionIndex, dummyIndex);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLabel;



