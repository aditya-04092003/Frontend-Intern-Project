import NavBar from "../NavBar/NavBar";
import React from "react";
import { useCookies } from "react-cookie";
import '../App.css';
import Calendar from "../FormDisplyComponenets/Calendar";
import Multiselect from "../FormDisplyComponenets/Multiselect";
import TextBox from "../FormDisplyComponenets/TextBox";
import CheckBox from "../FormDisplyComponenets/CheckBox";
import "./UserFormTemplateData.css"; // Import CSS file for component-specific styles
import { Button } from "@material-ui/core";

const UserFormTemplateData = () => {
  const [data, setData] = React.useState();
  const [cookies, setCookie] = useCookies([]);
  const [fieldValues, setFieldValues] = React.useState({});

  React.useEffect(() => {
    const jsonData = localStorage.getItem("sections");
    if (!data) {
      console.log("Changing Data")
      setData(JSON.parse(jsonData));
      // Set Field Values also with the default values from data
      const updatedfieldValues = {};
      JSON.parse(jsonData).forEach((section) => {
        section.titles.forEach((item) => {
          if(item.type.toLowerCase() === "boolean")
            updatedfieldValues[item.BlumeId] = item.booleanValue.toLowerCase() === "true";
          else if(item.type.toLowerCase() === "date")
            updatedfieldValues[item.BlumeId] = item.dateValue;
          else if(item.type.toLowerCase() === "multiselect")
            updatedfieldValues[item.BlumeId] = item.optionsValue[0];
          else
          {
            updatedfieldValues[item.BlumeId]=item.textValue;
          }
        });
      }
      );
      setFieldValues(updatedfieldValues);
    }
  }, [data]);

  const Section = ({ section, index }) => {
    const handleFieldChange = (field, value) => {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [field]: value,
      }));
    };

    return (
      <>
      <div className="Heading">
        <h1>{section?.title}</h1>
        </div>

      <div className={`section ${section?.className}`} style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {section.titles.length === 0 && <EmptySectionPlaceholder />}
        {section.titles.map((item, itemIndex) => {
          if (item.type.toLowerCase() === "multiselect") {
            return (
              <Multiselect
                key={itemIndex}
                label={item.label}
                options={item.optionsValue}
                defaultValue={item.textValue}
                onChange={(value) => {
                  console.log("VALUE: " + value);
                  const updatedData = [...data];
                  updatedData[index].titles[itemIndex].textValue = value;
                  console.log("Updated Data: " + updatedData)
                  setData(updatedData);
                  handleFieldChange(item.BlumeId, value)
                }}
              />
            );
          } else if (item.type.toLowerCase() === "date") {
            return (
              <Calendar
                key={itemIndex}
                label={item.label}
                defaultValue={item.dateValue}
                onChange={(value) => {
                  const updatedData = [...data];
                  updatedData[index].titles[itemIndex].dateValue = value;
                  console.log("Updated Data: " + updatedData)
                  setData(updatedData);


                  handleFieldChange(item.BlumeId, value)}}
              />
            );
          } else if (item.type.toLowerCase() === "boolean") {
            return (
              <CheckBox
                key={itemIndex}
                label={item.label}
                defaultValue={item.booleanValue.toLowerCase() === "true"}
                onChange1={(value) => {
                  console.log("VALUE: " + value)
                  const updatedData = [...data];
                  updatedData[index].titles[itemIndex].booleanValue = value;
                  console.log("Updated Data: " + updatedData)
                  setData(updatedData);

                  console.log(data)
                  handleFieldChange(item.BlumeId, value)}}
              />
            );
          } else {
            return (
              <React.Fragment key={itemIndex}>
                <TextBox
                  label={item.label}
                  defaultValue={item.textValue}
                  isBold={item.isBold}
                  isItalic={item.isItalic}
                  hidden={item.hidden}
                  validationOption={item.validationOption}
                  onChange1={(value) =>{
                    console.log("VALUE: " + value)
                    console.log("INdex: " + itemIndex)
                    console.log("Section Index"+ index)
                    // Update the textValue of item at ItemIndex in section at index
                    const updatedData = [...data];
                    updatedData[index].titles[itemIndex].textValue = value;
                    console.log("Updated Data: " + updatedData)
                    setData(updatedData);


                    handleFieldChange(item.BlumeId, value)}}
                    
                />
                <br />
              </React.Fragment>
            );
          }
        })}
      </div>
      </>
    );
  };

  const EmptySectionPlaceholder = () => {
    return <div className="empty-section-placeholder">Drag items here</div>;
  };

  const handleSubmit = () => {
    console.log("Submit Clicked");
    console.log(fieldValues);
    // Perform form submission logic here using fieldValues
  };

  return (
    <>
      <NavBar />
      <div className="user-form-template-data">
        {data?.map((section, index) => (
          <Section key={section.id} section={section} index={index} />
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default UserFormTemplateData;
