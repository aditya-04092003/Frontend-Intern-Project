import React, { useState } from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const MovableItem = ({ item,index,columnName,moveCardHandler, setItems,returnItemNameForColumn }) => {
  const changeItemColumn = (currentItem, columnName) => {
    console.log(setItems)
    setItems((prevState) => {
      return prevState.map((item) => {
        if (item.id === currentItem.id) {
          return {
            ...item,
            column: columnName,
          };
        }
        return item;
      });
    });
  };
  const ref=React.useRef(null)
  //  Mofifying to work on only on onDropEnd
  const [dropvariable, drop] = useDrop({
    accept: 'Our first type',

    drop(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        if(item.id===returnItemNameForColumn(columnName)[hoverIndex].id)
        return;

        moveCardHandler(item.id, returnItemNameForColumn(columnName)[hoverIndex].id);
      
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
    },

});



  const [{ isDragging }, drag] = useDrag({
    item: { id: item.id },
    type: 'Our first type', // Added type property
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log('dropResult',dropResult)
      if (dropResult)
      {
        console.log(dropvariable)
        changeItemColumn(item,dropResult.name)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref))
  return (

    <>
        <div ref={ref} className={item?.value?.className + " movable-item"} style={{opacity}} >
    <span>{item?.value?.title}</span><br></br>
    <span>{item?.value?.value}</span>  
    {
      item?.childrens?.map((child,index)=>{
        return (<span key={index}>{child.title}</span>)
      }
      )
    }


    </div>
    </>
  );
};

const Column = ({ children, className, title,style}) => {
  const [, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
  });

  return (
    <div ref={drop} className={className} style={style}>
      {title}
      {children}
    </div>
  );
};

export const App = (props) => {


  const item=props.item
  const column=props.column
  const [items, setItems] = useState(item);
  const [columns, setColumns] = useState(column);

  const returnItemNameForColumn = (column) => {
    const ret= items.filter((item) => item.column === column)
    return ret
  };
  const returnItemsForColumn = (column) => {
    return items
      .filter((item) => item.column === column)
      .map((item,index) => (
        <MovableItem key={item.id} item={item} columnName={item.column} setItems={setItems} index={index} moveCardHandler={moveCardHandler} returnItemNameForColumn={returnItemNameForColumn}/>
      ));
  };
  const moveCardHandler = (dragCardId, hoverIndexId) => {

    const dragCard=items.filter((item) => item.id === dragCardId)[0]
    const hoverIndexCard=items.filter((item) => item.id === hoverIndexId)[0]
    // Swap the position of dragCard and HvoverIndexCard in items
    const dragCardIndex=items.indexOf(dragCard)
    const hoverIndexCardIndex=items.indexOf(hoverIndexCard)
    setItems((prevState) => {
      const coppiedState = [...prevState];
      [coppiedState[dragCardIndex],coppiedState[hoverIndexCardIndex]]=[coppiedState[hoverIndexCardIndex],coppiedState[dragCardIndex]]
      return coppiedState;
    });
    
    console.log('items',items)  
  };
 

  return (
    <div
    //  className='container'
    >
      <DndProvider backend={HTML5Backend}>

        { 
          columns?.map((column) => (
          <Column key={column.id} title={column.name}
            className={column?.className  ? column?.className : 'column'}
            style={column.style ? column.style : {}}
            >
            {returnItemsForColumn(column.name)} 
          </Column>
        ))}
      </DndProvider>
    </div>
  );
};

export default App;
