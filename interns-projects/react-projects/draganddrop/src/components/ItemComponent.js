import React from 'react';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import EditIcon from '@mui/icons-material/Edit';



const ItemComponent = ({ dummySectionIndex,dummyIndex,title, sectionIndex, index, moveItemHandler, editSection, handleDeleteTileButton, setIsOpen, setIsChangeOpen, isBold, isItalic, hidden, changeBold1, changeBold2, changeItalic1, changeItalic2, changeHidden1, changeHidden2, label, type, validation, isOpen }) => {

  const itemRef = React.useRef(null);

  // const [dummyIsBold, setDummyIsBold]=useState("");

  const [isBoldDisplayed, setIsBoldDisplayed] = useState(true);

  // const [currentBoldIndex, setCurrentBoldIndex] = useState(0);

  const displayBoldFunctions = [

    () => {

      // console.log("Display Function 1");

      changeBold1(dummySectionIndex, dummyIndex);

      // console.log(isBold);

    },

  ];

  const handleDisplayBoldClick = () => {



    displayBoldFunctions[0]();

    // setCurrentBoldIndex((currentBoldIndex + 1) % displayBoldFunctions.length);

  };






  const [isItalicDisplayed, setIsItalicDisplayed] = useState(true);

  const [currentItalicIndex, setCurrentItalicIndex] = useState(0);




  const displayItalicFunctions = [

    () => {

      console.log("Display Function 1");



      changeItalic1(dummySectionIndex, dummyIndex);

      // Add your code for the first function here

    },

    () => {

      console.log("Display Function 2");

      changeItalic2(dummySectionIndex, dummyIndex);

      // Add your code for the second function here

    },

  ];





  const handleDisplayItalicClick = () => {

    displayItalicFunctions[currentItalicIndex]();

    setCurrentItalicIndex((currentItalicIndex + 1) % displayItalicFunctions.length);

  };




  const [isHiddenDisplayed, setIsHiddenDisplayed] = useState(true);

  const [currentHiddenIndex, setCurrentHiddenIndex] = useState(0);




  const displayHiddenFunctions = [

    () => {

      console.log("Display Function 1");

      changeHidden1(dummySectionIndex, dummyIndex);

      // Add your code for the first function here

    },

    () => {

      console.log("Display Function 2");

      changeHidden2(dummySectionIndex, dummyIndex);

      // Add your code for the second function here

    },

  ];





  const handleDisplayHiddenClick = () => {

    displayHiddenFunctions[currentHiddenIndex]();

    setCurrentHiddenIndex((currentHiddenIndex + 1) % displayHiddenFunctions.length);

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

    <div ref={itemRef} className="shipment-card-div item" style={{ opacity }}>

      {title}

      {/* <p>isBold :{isBold}</p>

      <p>isItalic :{isItalic}</p>

      <p>isHidden :{hidden}</p>

      <p>label : {label}</p>

      <p>type : {type}</p>

      <p>validation : {validation}</p> */}

      {/* <p>Bold :{dummyIsBold}</p> */}



      <span className='editButtons' style={{

        "display": editSection ? "block" : "none"

      }}>



        <EditIcon className='edit-button' onClick={() => {



          handleEditClick();

          dummySectionIndex = sectionIndex;

          dummyIndex = index;

        }} />

        <button

          id="boldButton"

          className={`bold-button ${isBold === 'true' ? 'red' : ''}`}

          onClick={() => {

            dummySectionIndex = sectionIndex;

            dummyIndex = index;

            handleDisplayBoldClick();




            // var boldButton = document.getElementById('boldButton');




            // boldButton.classList.toggle('red', isBold === 'true');

          }}

        >b

        </button>





        <button

          id="italicButton"

          className={`italic-button ${isItalic === 'true' ? 'red' : ''}`}

          onClick={() => {

            dummySectionIndex = sectionIndex;

            dummyIndex = index;

            handleDisplayItalicClick();



            // var boldButton = document.getElementById('boldButton');



            // boldButton.classList.toggle('red', isBold === 'true');

          }}

        >i</button>





        <button

          id="hiddenButton"

          className={`hidden-button ${hidden === 'true' ? 'red' : ''}`}

          onClick={() => {

            dummySectionIndex = sectionIndex;

            dummyIndex = index;

            handleDisplayHiddenClick();



            // var boldButton = document.getElementById('boldButton');



            // boldButton.classList.toggle('red', isBold === 'true');

          }}



        >h</button>






      </span>

    </div>

  );

};


export default ItemComponent;