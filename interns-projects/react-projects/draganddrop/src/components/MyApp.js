import React, { useState, useEffect } from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditIcon from '@mui/icons-material/Edit';
import Modal from './Modal';
import AddItemForm from './AddItemForm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { json, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import data2 from './UserFormTemplate.json';
let dummySectionIndex = null;
let dummyIndex = null;
let flag="admin";

const Section = ({ section, index, moveSectionHandler, isChangeEnabled, moveItemHandler, addItemHandler, checkDroppableSection, ChangeSectionName,checkItemDropEnabledSection, setEditSection, setIsOpen, setIsChangeOpen, editSection, handleEditSection, handleDeleteTileButton, changeBold1 , changeBold2, changeItalic1, changeItalic2, changeHidden1, changeHidden2, isOpen}) => {
  const sectionRef = React.useRef(null);
  
  const [dummyIsBold, setDummyIsBold]=useState("");
  
  const [sectionName, setSectionName] = useState(section?.title);

  const [, dropSection] = useDrop({
    accept: ['section', 'item'],
    drop(item) {
      if (!sectionRef.current) {
        return;
      }
      if (item?.title && item?.sectionIndex >= 0 && item?.sectionIndex !== index) {
        if (checkItemDropEnabledSection(item.sectionIndex, index)) { addItemHandler(item.index, item.sectionIndex, index); }
      }
      else if (!item?.title && item.sectionIndex !== index) {
        if (!checkDroppableSection(item.index, index))
          return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        moveSectionHandler(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
    canDrop: (item, monitor) => {
      return true;
    },
  });

  const handleItemDrop = (dragIndex, hoverIndex) => {
    moveItemHandler(dragIndex, hoverIndex, index);
  };

  const [, dropItem] = useDrop({
    accept: 'item',
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      handleItemDrop(dragIndex, hoverIndex);
    },
  });


  const [{ isDragging }, drag] = useDrag({
    item: { id: section.id, index },
    type: 'section',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => {
      return isChangeEnabled;
    },
  });
  const onChangeSectionName = (e) => {
    setSectionName(e.target.value);
    ChangeSectionName(index,e.target.value);
  };

  const opacity = isDragging ? 0.4 : 1;
  drag(dropSection(sectionRef));
  const [formText, setFormText] = useState("");

  return (

    <div ref={sectionRef} className={section?.className ? section.className + ' section' : section
    } style={{
      opacity,
      "grid-template-columns": editSection[index] ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
    }}
    > 
    <h2 className="edit-Name-section"><form><input placeholder={section?.title} onBlur={onChangeSectionName}></input></form></h2>
      <div className="edit-button-section">
        <button className='edit-button-button' onClick={() => {
          handleEditSection(index);
        }}>Edit</button>
      </div>
      {section.titles.length === 0 && <EmptySectionPlaceholder />}
      {section.titles.map((title, itemIndex) => (
        <Item
          key={title?.id ? title.id : ""}
          title={title?.label ? title.label : ""}
          sectionIndex={index}
          index={itemIndex}
          moveItemHandler={moveItemHandler}
          editSection={editSection[index]}
          handleDeleteTileButton={handleDeleteTileButton}
          setIsOpen={setIsOpen}
          setIsChangeOpen={setIsChangeOpen}
          isBold={title.isBold}
          isItalic={title.isItalic}
          hidden={title.hidden}
          changeBold1={changeBold1}
          changeBold2={changeBold2}
          changeItalic1={changeItalic1}
          changeItalic2={changeItalic2}
          changeHidden1={changeHidden1}
          changeHidden2={changeHidden2}
          label={title.label}
          type={title.type}
          validation={title.validation}
          isOpen={isOpen}
          
        />
      ))}

      <div className="add-form" style={{
        "display": editSection[index] ? "block" : "none"
      }}>
          <button type="submit" onClick={ ()=>
          {
            setIsChangeOpen(true);
            dummySectionIndex = index;
          }}>Add Item</button>
      </div>
    </div>
  );
};

const EmptySectionPlaceholder = () => {
  return <div className="empty-section-placeholder">Drag items here</div>;
};

const Item = ({ title, sectionIndex, index, moveItemHandler, editSection, handleDeleteTileButton, setIsOpen, setIsChangeOpen ,isBold, isItalic, hidden, changeBold1, changeBold2, changeItalic1, changeItalic2, changeHidden1, changeHidden2, label,type,validation, isOpen}) => {
  const itemRef = React.useRef(null);

  const [visible, setVisible] = useState(false);

  const handleDisplayVisibleClick = () => {
    setVisible(!visible);
  };

  const displayBoldFunctions = [
    () => {changeBold1(dummySectionIndex, dummyIndex);
    },
  ];
  const handleDisplayBoldClick = () => {
    displayBoldFunctions[0]();
  };

  const [currentItalicIndex, setCurrentItalicIndex] = useState(0);
  const displayItalicFunctions = [
    () => {changeItalic1(dummySectionIndex, dummyIndex);
    },
    () => {changeItalic2(dummySectionIndex, dummyIndex);
    },
  ];

  const handleDisplayItalicClick = () => {
    displayItalicFunctions[currentItalicIndex]();
    setCurrentItalicIndex((currentItalicIndex + 1) % displayItalicFunctions.length);
  };

  const [currentHiddenIndex, setCurrentHiddenIndex] = useState(1);
  const displayHiddenFunctions = [
    () => {changeHidden1(dummySectionIndex, dummyIndex);
    },
    () => {changeHidden2(dummySectionIndex, dummyIndex);
    },
  ];
  const handleDisplayHiddenClick = () => {
    displayHiddenFunctions[currentHiddenIndex]();
    setCurrentHiddenIndex((currentHiddenIndex + 1) % displayHiddenFunctions.length);
    // console.log(hidden);
  };

  const [, drop] = useDrop({
    accept: 'item',
    drop(item) {
      const dragSectionIndex = item.sectionIndex;
      const dragIndex = item.index;
      const hoverSectionIndex = sectionIndex;
      const hoverIndex = index;

      if (dragSectionIndex === hoverSectionIndex && dragIndex === hoverIndex) {
        return;
      }

      moveItemHandler(dragIndex, hoverIndex, dragSectionIndex, hoverSectionIndex);
      item.index = hoverIndex;
      item.sectionIndex = hoverSectionIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { title, sectionIndex, index },
    type: 'item',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  const handleEditClick = () => {
    setIsOpen(!isOpen);
  };
  
  drag(drop(itemRef));
  return (
    <div ref={itemRef} className={`shipment-card-div item `} style={{ opacity }}>
      {title} : {type} : {validation}
      
      <span className='editButtons' style={{ display: editSection ? 'block' : 'none' }}>
        <EditIcon
          className='edit-button'
          onClick={() => {
            handleEditClick();
            dummySectionIndex = sectionIndex;
            dummyIndex = index;
          }}
        />

        <button
          id="boldButton"
          className={`bold-button ${isBold === 'true' ? 'red' : ''}`}
          onClick={() => {
            dummySectionIndex = sectionIndex;
            dummyIndex = index;
            handleDisplayBoldClick();
          }}
        >
          b
        </button>

        <button
          id="italicButton"
          className={`italic-button ${isItalic === 'true' ? 'red' : ''}`}
          onClick={() => {
            dummySectionIndex = sectionIndex;
            dummyIndex = index;
            handleDisplayItalicClick();
          }}
        >
          i
        </button>

        {visible ? (
          <VisibilityOffIcon
            id="hiddenButton"
            className="hidden-button"
            onClick={() => {
              dummySectionIndex = sectionIndex;
              dummyIndex = index;
              handleDisplayHiddenClick();
              handleDisplayVisibleClick();
            }}
          />
        ) : (
          <VisibilityIcon
            id="hiddenButton"
            className="hidden-button"
            onClick={() => {
              dummySectionIndex = sectionIndex;
              dummyIndex = index;
              handleDisplayHiddenClick();
              handleDisplayVisibleClick();
            }}
          />
        )}
      </span>
    </div>
  );
};

const MyPage = () => {

  const location = useLocation();
  const { state1 } = useLocation();
  // const data = location.state?.data;
  const data = location.state?.data;
  const id=location.state?.id;
  console.log("id",id);
  const [selectedOption,setSelectedOption] = React.useState('');
  const mode = location.state?.mode ;
  const orgCode = location.state?.orgCode;
  const templateName = location.state?.templateName;
  const [orgName,setOrgName] =React.useState('');
  const [heading,setHeading] = React.useState('');
  // setOrgName(location.state?.orgCode) ;
  // const orgCode = location.state?.orgCode;
  console.log("state1: ",location.state);
  // console.log("orgCode:",orgCode);
  console.log("mode:",selectedOption); 
  const [isChangeEnabled, setIsChangeEnabled] = useState(true);
  const [sections, setSections] = useState(data2);
  console.log(sections);
  const [editSection, setEditSection] = useState([false, false, false, false, false]);
  
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate=useNavigate();
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const logout = () => {
    setCookie('token', null, { path: '/' });
    navigate('/login');
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1=()=>
  {
    const tmp="Dray";
    setSelectedOption(tmp);
    console.log(selectedOption);
  };

  const handleOptionChange2=()=>
  {
    const tmp="Rail";
    setSelectedOption(tmp);
    console.log(selectedOption);
  };

  const handleOptionChange3=()=>
  {
    const tmp="Ocean";
    setSelectedOption(tmp);
    console.log(selectedOption);
  };

  const handleSaveState = () => {
    // Perform save state logic here
    console.log('Selected option:', selectedOption);
  };

  useEffect(() => {
    console.log("First call on mount...")
    console.log("JSon data: ",data2)
    console.log(sections)
    let token=cookies.token;
    console.log(token);
    if(token==null || token=="" || token==undefined || token=="null")
    {
      console.log("Token is null");
      navigate('/login');
    }
    setSelectedOption(mode);
    setOrgName(orgCode);
    setHeading(templateName);
  }, []);


  const fetchJsonData = async () => {
    try {
      let token=cookies.token;
      console.log(token);
      if(token==null || token=="" || token==undefined || token=="null")
      {
        console.log("Token is null");
        navigate('/login');
      }
      const myHeaders = {
        "Authorization": "Bearer "+token,
        "Alow-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("http://localhost:8080/json/Dray/4", requestOptions)
        .then(response => response.text())
        .then((result) => {
          console.log(result);
          let data = JSON.parse(result);
          let jsonData=JSON.parse(data.jsonData);
          setSections(jsonData);
          console.log(sections);
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const checkItemDropEnabledSection = (dragSectionIndex, hoverSectionIndex) => {
    if (dragSectionIndex === hoverSectionIndex)
      return true;
    else if (sections[hoverSectionIndex].itemsDropEnabledSections) {
      let isDroppableSection = false;

      sections[hoverSectionIndex].itemsDropEnabledSections.forEach((section) => {
        if (section.id === sections[dragSectionIndex].id) {
          isDroppableSection = true;
        }
      });
      return isDroppableSection;
    }
    else {
      return false;
    }
  }

  const checkDroppableSection = (dragSectionIndex, hoverSectionIndex) => {
    if (sections[hoverSectionIndex].isDropEnabledAllSections) {
      return true;
    }
    else if (sections[hoverSectionIndex].dropEnabledSections?.length > 0) {
      let isDroppableSection = false;
      sections[hoverSectionIndex].dropEnabledSections.forEach((section) => {
        if (section.id === sections[dragSectionIndex].id) {
          isDroppableSection = true;
        }
      });
      return isDroppableSection;
    }
    else {
      return false;
    }
  }

  const moveSectionHandler = (dragIndex, hoverIndex) => {
    setSections((prevState) => {
      const copiedState = [...prevState];
      const [dragSection] = copiedState.splice(dragIndex, 1);
      copiedState.splice(hoverIndex, 0, dragSection);
      return copiedState;
    });
  };
  const addItemHandler = (itemIndex, sectionIndex, hoverSectionIndex) => {
    setSections((prevState) => {
      const copiedState = [...prevState];
      const [dragItem] = copiedState[sectionIndex].titles.splice(itemIndex, 1);
      copiedState[hoverSectionIndex].titles.push(dragItem);
      return copiedState;

    });
  }
  const moveItemHandler = (dragIndex, hoverIndex, dragSectionIndex, hoverSectionIndex) => {
    setSections((prevState) => {

      const copiedState = [...prevState];
      if (dragSectionIndex === hoverSectionIndex) {
        [copiedState[dragSectionIndex].titles[dragIndex], copiedState[hoverSectionIndex].titles[hoverIndex]] = [
          copiedState[hoverSectionIndex].titles[hoverIndex],
          copiedState[dragSectionIndex].titles[dragIndex],
        ];
      } else {
        const dragSection = copiedState[dragSectionIndex];
        const hoverSection = copiedState[hoverSectionIndex];
        const [dragItem] = dragSection.titles.splice(dragIndex, 1);
        hoverSection.titles.splice(hoverIndex, 0, dragItem);
      }
      console.log(copiedState);
      return copiedState;
    });
  };
  const saveSectionHandler = async () => {
    console.log("Save section handler called");
    localStorage.removeItem("sections");
    const labelToBlumeIdMap = {};

    let blumeId = 1;
    const updatedFormData = sections.map((section) => ({
      ...section,
      titles: section.titles.map((title) => {
        const { label, ...rest } = title;
        if (!labelToBlumeIdMap[label]) {
          labelToBlumeIdMap[label] = blumeId++;
        }
        return {
          ...rest,
          label,
          BlumeId: labelToBlumeIdMap[label],
        };
      }),
    }));
    console.log("Updated Form Data",updatedFormData);
    console.log("Prateek Randi", labelToBlumeIdMap);
    localStorage.setItem("sections", JSON.stringify(updatedFormData));
    alert("Template Saved")
  };

  const handleEditSection = (sectionIndex) => {
    console.log('Sectoin index: ' + sectionIndex);
    setEditSection((prevState) => {
      const copiedState = [...prevState];
      copiedState[sectionIndex] = !copiedState[sectionIndex];
      return copiedState;
    });
  };

  const changeBold1 = (sectionIndex, itemIndex) => {
    const copiedState = [...sections];
    const newState=copiedState[sectionIndex].titles;
    const tmp=newState[itemIndex].isBold;
    if (tmp==="true")
    newState[itemIndex].isBold="false";
    else
    newState[itemIndex].isBold="true";
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }

  const changeBold2 = (sectionIndex, itemIndex) => {
    const copiedState = [...sections];
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].isBold="true";
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }

  const changeItalic1 = (sectionIndex, itemIndex) => {
    const copiedState = [...sections];
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].isItalic="true";
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }

  const changeItalic2 = (sectionIndex, itemIndex) => {
    const copiedState = [...sections];
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].isItalic="false";
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }

  const changeHidden1 = (sectionIndex, itemIndex) => {
    const copiedState = [...sections];
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].hidden="true";
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }

  const changeHidden2 = (sectionIndex, itemIndex) => {
    const copiedState = [...sections];
    const newState=copiedState[sectionIndex].titles;
    newState[itemIndex].hidden="false";
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }


  const handleDeleteTileButton = (sectionIndex, itemIndex) => {
    console.log("Deleteing the tile from section");
    const copiedState = [...sections];
    console.log("copied state before =>", copiedState[sectionIndex].titles[itemIndex])
    const newState = copiedState[sectionIndex].titles.filter((item, index) => index !== itemIndex);
    console.log("new state", newState)
    copiedState[sectionIndex].titles = newState;
    setSections((prevState) => {
      return copiedState;
    });
  }
  const ChangeSectionName=(sectionIndex, value)=>{
    const copiedState = [...sections];
    copiedState[sectionIndex].title=value;
    setSections((prevState) => {
      return copiedState;
    });
  }
  const handleHomeButton=()=>{
    navigate('/');
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen]=useState(false);

  // const [orgName, setOrgName] = useState("");
  return (
    <>
    <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px', textAlign: 'center' }}>Edit Template</h1>

      <div className="container">
    
        
        <DndProvider backend={HTML5Backend}>
          <div className="row1">
          {sections.slice(0,2).map((section, index) => (
            <Section
              key={section.id}
              section={section}
              index={index}
              moveSectionHandler={moveSectionHandler}
              moveItemHandler={moveItemHandler}
              addItemHandler={addItemHandler}
              checkDroppableSection={checkDroppableSection}
              checkItemDropEnabledSection={checkItemDropEnabledSection}
              isChangeEnabled={isChangeEnabled}
              editSection={editSection}
              setEditSection={setEditSection}
              handleEditSection={handleEditSection}
              handleDeleteTileButton={handleDeleteTileButton}
              setIsOpen={setIsOpen}
              setIsChangeOpen={setIsChangeOpen}
              changeBold1={changeBold1}
              changeBold2={changeBold2}
              changeItalic1={changeItalic1}
              changeItalic2={changeItalic2}
              changeHidden1={changeHidden1}
              changeHidden2={changeHidden2}
              ChangeSectionName={ChangeSectionName}
              isOpen={isOpen}
            />
          ))}
          </div>
          <div className="row2">
          {sections.slice(2,).map((section, index) => (
            <Section
            key={section.id+2}
            section={section}
            index={index+2}
            moveSectionHandler={moveSectionHandler}
            moveItemHandler={moveItemHandler}
            addItemHandler={addItemHandler}
            checkDroppableSection={checkDroppableSection}
            checkItemDropEnabledSection={checkItemDropEnabledSection}
            isChangeEnabled={isChangeEnabled}
            editSection={editSection}
            setEditSection={setEditSection}
            handleEditSection={handleEditSection}
            handleDeleteTileButton={handleDeleteTileButton}
            setIsOpen={setIsOpen}
            setIsChangeOpen={setIsChangeOpen}
            changeBold1={changeBold1}
            changeBold2={changeBold2}
            changeItalic1={changeItalic1}
            changeItalic2={changeItalic2}
            changeHidden1={changeHidden1}
            ChangeSectionName={ChangeSectionName}
            changeHidden2={changeHidden2}
            isOpen={isOpen}
          />
          ))}
          </div>

        </DndProvider>
      </div>
      <div>
        {/* <div className='Fetch-Json-Button'>
          <Button variant="contained" color="success" onClick={fetchJsonData}>Fetch JSON data</Button>
        </div> */}
        
        
        {sections.length > 0 && (
        <div style={{
          "display": "flex",
          "flexDirection": "row",
          "justifyContent": "space-between",
          "width": "1000px",
          "marginLeft": "auto",
          "marginRight": "auto",
          "marginBottom": "20px"
        }}>
  <div>
    {templateName&&(
    <div style={{  padding: '5px', borderRadius: '5px',marginRight: '10px' }}>
      <b>Template-Name:</b> {templateName}
    </div>
      )}
      {!templateName&&(
        <div>
        <input placeholder="Template Name" className="input-field" onChange={(e) => setHeading(e.target.value)} />
        </div>
      )}
    {orgCode&&(<div style={{  padding: '5px', borderRadius: '5px',marginRight: '10px' }}>

<b>Org-Code:</b> {orgCode}


</div>)}
{!orgCode&&(
  <div>
    <input placeholder="Organization Code" className="input-field" onChange={(e) => setOrgName(e.target.value)} />
    </div>
)}
  
    {mode&&(  <div style={{  padding: '5px', borderRadius: '5px' }}>
    <b>Mode:</b> {mode}
  </div>)} 

  {!mode&&(

<div>
    <Button
      id="demo-customized-button"
      aria-controls={open ? 'demo-customized-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      variant="contained"
      color="primary"
      disableElevation
      onClick={handleClick}
      endIcon={<KeyboardArrowDownIcon />}
    >
      {selectedOption ? selectedOption : 'Select Mode'} {/* Display 'Select Mode' when no mode is selected */}
    </Button>
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={() => { handleClose(); handleOptionChange1(); }} disableRipple>
        Dray
      </MenuItem>
      <MenuItem onClick={() => { handleClose(); handleOptionChange2(); }} disableRipple>
        Rail
      </MenuItem>
      <MenuItem onClick={() => { handleClose(); handleOptionChange3(); }} disableRipple>
        Ocean
      </MenuItem>
    </StyledMenu>
  </div>
  )}

<div className='save-state'>
  <Button variant="contained" color="success" onClick={saveSectionHandler}>
    Save state
  </Button>
  </div>
  <div className='HomePage'>
  <HomeIcon  sx={{ fontSize: '200%' }} onClick={handleHomeButton}>
    Go to Home Page
  </HomeIcon>

  </div>
</div>

          <div className='Log-State-Button'>
          <Button variant="contained" color="success" onClick={() =>{
            let data=JSON.stringify(sections);
            // Download a Txt file
            const element = document.createElement("a");
            const file = new Blob([data], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "myFile.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            
          }}>Log state</Button>
        </div>
        <div className='Logout-Button'>
          <Button variant="contained" color="success" onClick={logout}>Logout</Button>
        </div>
          {isOpen && <Modal setIsOpen={setIsOpen} dummySectionIndex={dummySectionIndex} itemIndex={dummyIndex} handleDeleteTileButton={handleDeleteTileButton} sections={sections} setSections={setSections} />}
          {/* {isOpen && <NewModal setIsOpen={setIsOpen} dummySectionIndex={dummySectionIndex} dummyIndex={dummyIndex} handleDeleteTileButton={handleDeleteTileButton} sections={sections} setSections={setSections} />} */}
          {isChangeOpen && <AddItemForm setIsChangeOpen={setIsChangeOpen} dummySectionIndex={dummySectionIndex} sections={sections} setSections={setSections} />}
        </div>
      )}
      </div>
     
    </>
  );
};

export default MyPage;
