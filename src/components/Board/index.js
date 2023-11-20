import React, { useState, useEffect } from 'react';
import './index.css';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getListStyle } from '../../styles';
import { getLocalData, setLocalData } from '../../LocalData';

import Card from '../Card';

function Board(props) {
    
    const { boardName } = props;

    const [itens, setItens] = useState(getLocalData() ? getLocalData() : []);
    const [activeAdd, setActiveAdd] = useState('hidden');
    const [textContent, setTextContent] = useState('');

    function dragEnd(result, itens, setItens) {
        if(!result.destination) return;
        
        const { source, destination } = result;
        const copiedItems = itens;
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
    
        setItens(copiedItems);
        setLocalData(itens);
    }

    function addTask() {
      setActiveAdd( 'show' );
    }

    function handleCloseModal(e) {
      if(e.keyCode === 27) {
        setActiveAdd('hidden');
        setTextContent('');
        return;
      }

      if(e.target.className.startsWith('text')) {
        setActiveAdd('hidden');
        setTextContent('');
        return;
      }
    }

    function handleTaskcontent(e) {
      setTextContent( e.target.value );
    }

    function handleNewTask() {
      setActiveAdd( 'hidden' );

      if(textContent) {
        const newItem = [...itens, {
          id:`${Date.now()}`,
          content: `${textContent}`
        }];
        
        setLocalData(newItem);
        
        const savedNewItem = getLocalData();

        setItens(savedNewItem);
      }

      setTextContent('');
    }

    return (
        <div className="board">
          <DragDropContext onDragEnd={result => dragEnd(result, itens, setItens)}>
            <span className="board-title" >{`${boardName}`}</span>
            <button className="add" onClick={addTask}>+</button>
            
            {/* area to add some text to a card */}
            <div onClick={handleCloseModal} className={`text-card ${activeAdd}`}>
              <div className="text-area-container">
                <textarea onChange={handleTaskcontent} onKeyDown={handleCloseModal} value={textContent} className="add-text"></textarea>
                <button onClick={handleNewTask} className="apply-text">ADD</button>
              </div>
            </div>

            <Droppable droppableId='droppable'>

              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)} 
                >
                  
                  { itens.map((item, index) => (
                    <Card 
                      item={item}
                      setItens={setItens}
                      key={index}
                      index={index}
                       />
                  )) }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
    )
}

export default Board;
