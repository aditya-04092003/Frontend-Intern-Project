
import React, { useState } from "react";
import styles from "./AddLabelItemForm.module.css";
import { RiCloseLine } from "react-icons/ri";

const AddLabelItemForm = ({
  setIsChangeOpen,
  dummySectionIndex,
  sections,
  setSections,
}) => {
  const [isBold, setIsBold] = useState("");
  const [isItalic, setIsItalic] = useState("");
  const [isHidden, setIsHidden] = useState("");
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [validationOption, setValidationOption] = useState("");

  const handleBoldDeselect = () => {
    setIsBold(isBold === "true" ? "" : "true");
  };

  const handleItalicDeselect = () => {
    setIsItalic(isItalic === "true" ? "" : "true");
  };

  const handleHiddenDeselect = () => {
    setIsHidden(isHidden === "true" ? "" : "true");
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleValidationChange = (e) => {
    setValidationOption(e.target.value);
  };

  const handleAddItemFromSubmit = (sectionIndex) => {
    const copiedState = [...sections];
    let dummyitemaddindex = copiedState[sectionIndex].titles.length;
    let dummyindextoadd = dummyitemaddindex.toString(10);

    let tmp = {
      id: dummyindextoadd,
      sectionId: sectionIndex,
      label: textInput,
      type: selectedOption,
      isBold: isBold,
      isItalic: isItalic,
      hidden: isHidden,
      validation: validationOption,
    };

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
  };

  return (
    <><div className={styles.darkBG} onClick={() => setIsChangeOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}></div>
          <button className={styles.closeBtn} onClick={() => setIsChangeOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div>
            <label htmlFor="text-input" className={styles.textfield}>
              Label:
              <input
                id="text-input"
                type="text"
                value={textInput}
                placeholder="Add your Text here"
                onChange={handleTextChange}
                className={styles.textfield}
              />
            </label>
          </div>
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
          <div className={styles.radioOptions}>
            <label className={styles.boldBtn}>
              <input
                type="radio"
                checked={isBold}
                onClick={handleBoldDeselect}
              />
              is_Bold
            </label>
          </div>
          <div className={styles.radioOptions}>
            <label className={styles.italicBtn}>
              <input
                type="radio"
                checked={isItalic}
                onClick={handleItalicDeselect}
              />
              is_Italic
            </label>
          </div>
          <div className={styles.radioOptions}>
            <label className={styles.hiddenBtn}>
              <input
                type="radio"
                checked={isHidden}
                onClick={handleHiddenDeselect}
              />
              is_Hidden
            </label>
          </div>
          <div className={styles.actionsContainer}>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                setIsChangeOpen(false);
                if (textInput!="")
                handleAddItemFromSubmit(dummySectionIndex);
              }}
            >Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLabelItemForm;




