import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import DropDown from "./DropDown";
import TextBox from "./TextBox";
import Calendar from "./Calender";
import CheckBox from "./CheckBox";
import RadioButton from './RadioButton'


const Modal = ({ setIsOpen, dummySectionIndex, itemIndex, handleDeleteTileButton, sections, setSections }) => {
  let dummyTextInput = null;
  let dummyselectedOption = null;
  let dummyvalidationOption = null;
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Text");
  const [validationOption, setValidationOption] = useState("");
  let isBold = "";
  let isItalic = "";
  let isHidden = "";
  let tmp = -1;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleValidationChange = (e) => {
    setValidationOption(e.target.value);
  };

  const changeValidation = (sectionIndex, itemIndex, validationOption) => {
    const copiedState = [...sections];
    const newState = copiedState[sectionIndex].titles;
    newState[itemIndex].validation = validationOption;
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  };
  const handleTextChange = (e) => {

    setTextInput(e.target.value);

  };
  const changeTextype = (sectionIndex, itemIndex, selectedOption) => {
    const copiedState = [...sections];
    const newState = copiedState[sectionIndex].titles;
    newState[itemIndex].type = selectedOption;
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal} style={{
          height: "auto !important",
        }}>
          <div className={styles.modalHeader}></div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.TextInput} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
         <div>
          <label htmlFor="text-input" className={styles.textfield}>
            Label:
          <input
            id="text-input"
            type="text"
            value={textInput}
            placeholder={sections[dummySectionIndex].titles[itemIndex].label}
            onChange={handleTextChange}
            className={styles.textfield}
          />
          </label>
          </div>

            <label htmlFor="text-input" className={styles.typefield}>
              Type :
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className={styles.dropdown}
              >
                <option value="Text">Text</option>
                <option value="Radio">DropDown</option>
                <option value="Date">Date</option>
                <option value="Boolean">Boolean</option>
              </select>
            </label>
          </div>
          <div className={styles.ValidationType}>
            <label htmlFor="text-input" className={styles.validationfield}>
              Validation :
              <select
                value={validationOption}
                onChange={handleValidationChange}
                className={styles.dropdownvalid}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          </div>
          
          {selectedOption === "Text" && (
            <TextBox
              sections={sections}
              setSections={setSections}
              dummySectionIndex={dummySectionIndex}
              itemIndex={itemIndex}
isBold={isBold}
              isItalic={isItalic}
              isHidden={isHidden}
              validationOption={validationOption}
              label={textInput}
            />
          )}
          {selectedOption === "Date" && (
            <Calendar
              sections={sections}
              setSections={setSections}
              dummySectionIndex={dummySectionIndex}
              itemIndex={itemIndex}
              isBold={isBold}
              isItalic={isItalic}
              isHidden={isHidden}
              validationOption={validationOption}
               label={textInput}
            />
          )}
          {selectedOption === "Radio" && (
            <CheckBox
              sections={sections}
              setSections={setSections}
              dummySectionIndex={dummySectionIndex}
              itemIndex={itemIndex}
              isBold={isBold}
              isItalic={isItalic}
              isHidden={isHidden}
              validationOption={validationOption}
              label={textInput}
            />
          )}
          {selectedOption === "Boolean" && (
            <RadioButton
              sections={sections}
              setSections={setSections}
              dummySectionIndex={dummySectionIndex}
              itemIndex={itemIndex}
              isBold={isBold}
              isItalic={isItalic}
              isHidden={isHidden}
              validationOption={validationOption}
              label={textInput}
            />
          )}
          <div className={styles.actionsContainer}>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                setIsOpen(false);
                handleDeleteTileButton(dummySectionIndex, itemIndex);
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

export default Modal;
