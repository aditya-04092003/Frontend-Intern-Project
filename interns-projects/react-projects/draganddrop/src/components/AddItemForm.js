import React, { useState } from "react";
import styles from "./AddItemForm.module.css";
import { RiCloseLine } from "react-icons/ri";
import Calendar from "./Calender";
import CheckBox from "./CheckBox";
import DropDown from "./DropDown";
import TextBox from "./TextBox";
import RadioButton from './RadioButton'

const AddItemFrom = ({
  setIsChangeOpen,
  dummySectionIndex,
  sections,
  setSections,
}) => {
  const [selectedOption, setSelectedOption] = useState("Text");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [validationOption, setValidationOption] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleBoldDeselect = () => {
    setIsBold(!isBold);
  };

  const handleItalicDeselect = () => {
    setIsItalic(!isItalic);
  };

  const handleHiddenDeselect = () => {
    setIsHidden(!isHidden);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
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

    if (tmp.isBold === "") tmp.isBold = "false";

    if (tmp.isItalic === "") tmp.isItalic = "false";

    if (tmp.hidden === "") tmp.hidden = "false";

    if (tmp.type === "") tmp.type = "String";

    if (tmp.validation === "") tmp.validation = "true";

    copiedState[sectionIndex].titles.push(tmp);
    console.log(copiedState[sectionIndex].titles);
    setSections(() => {
      return copiedState;
    });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsChangeOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}></div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsChangeOpen(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.TextInput}>
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

          <div>

<label htmlFor="text-input" className={styles.textfield}>
  Label:
<input
  id="text-input"
  type="text"
  value={textInput}
  placeholder="Enter Label here"
  onChange={handleTextChange}
  className={styles.textfield}
/>
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
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </label>
          </div>
          <div className={styles.radioOptions}>
            <label className={styles.boldBtn}>
              <input
                type="checkbox"
                checked={isBold}
                onChange={handleBoldDeselect}
              />
              is_Bold
            </label>
          </div>
          <div className={styles.radioOptions}>
            <label className={styles.italicBtn}>
              <input
                type="checkbox"
                checked={isItalic}
                onChange={handleItalicDeselect}
              />
              is_Italic
            </label>
          </div>
          <div className={styles.radioOptions}>
            <label className={styles.hiddenBtn}>
              <input
                type="checkbox"
                checked={isHidden}
                onChange={handleHiddenDeselect}
              />
              is_Hidden
            </label>
          </div>

          {selectedOption === "Text" && (
            <TextBox
              sections={sections}
              setSections={setSections}
              dummySectionIndex={dummySectionIndex}
              itemIndex={-1}
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
              itemIndex={-1}
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
              itemIndex={-1}
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
              itemIndex={-1}
              isBold={isBold}
              isItalic={isItalic}
              isHidden={isHidden}
              validationOption={validationOption}
              label={textInput}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddItemFrom;
