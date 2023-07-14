import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import './App.css';
import styles from "./Modal.module.css";


const DropDown = ({ sections, setSections, dummySectionIndex }) => {
  const [selectedOption, setSelectedOption] = useState("DropDown");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
        color:'blue'
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log(selectedOption);
    handleClose();
  };

  const handleButtonClick = (sectionIndex) => {
    const copiedState = [...sections];
    let dummyitemaddindex = copiedState[sectionIndex].titles.length;
    let dummyindextoadd = dummyitemaddindex.toString(10);
    let dummySectionIndex=(sectionIndex+1).toString(10);
    
    let dummyType="DropDown";
    let tmp = {
      id: dummyindextoadd,
      sectionId: dummySectionIndex,
      label: selectedOption,
      type: dummyType,
    };

    if (tmp.label==="DropDown")
    return;
    copiedState[sectionIndex].titles.push(tmp);
    console.log(copiedState[sectionIndex].titles);  
    setSections(() => {
      return copiedState;
    });  

  };


  return (
    <>
      {/* <div className='enter-button'> */}
        {/* <Button variant="contained" color="success" onClick={onEnterMode}>
          Enter
        </Button> */}
      {/* </div> */}
      <div className={styles.modebtn}>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          // color="success"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {selectedOption}
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
          <MenuItem onClick={() => handleOptionChange("Option 1")} disableRipple>
            Option 1
          </MenuItem>
          <MenuItem onClick={() => handleOptionChange("Option 2")} disableRipple>
            Option 2
          </MenuItem>
          <MenuItem onClick={() => handleOptionChange("Option 3")} disableRipple>
            Option 3
          </MenuItem>
        </StyledMenu>

        <br />
      <br />

      <Button
        onClick={()=>{handleButtonClick(dummySectionIndex)}}
        style={{ marginTop: '30px',
      marginLeft:'20px' }}
        variant="contained"
      >
        Submit
      </Button>
      </div>

      <div>

      </div>
    </>
  );
};

export default DropDown;
