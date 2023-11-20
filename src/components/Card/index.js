import React, { useState } from 'react';
import './index.css';

import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '../../styles';
import { getLocalData, setLocalData } from '../../LocalData';

function Card(props) {

    const { item, index, setItens } = props;

    const [activeInput, setActiveInput] = useState('hidden');
    const [activeText, setActiveText] = useState('show');

    const [contentText, setContentText] = useState('');
    
    function handleDelete(e) {
        const allItems = getLocalData();
        const itemIndexToRemove = e.target.id;

        allItems.splice(itemIndexToRemove, 1);

        setLocalData(allItems);

        setItens(allItems);
    }

    function handleDoubleClick() {
        setContentText(item.content);

        setActiveInput('show');
        setActiveText('hidden');
    }

    function handleChange(e) {
        setContentText(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.keyCode === 27) {
            setActiveInput('hidden');
            setActiveText('show');
            return;
        }

        if (e.keyCode !== 13) return;

        const allItems = getLocalData();

        const foundIndex = allItems.findIndex(i => i.id === item.id);
        allItems[foundIndex].content = contentText;
        setItens(allItems);
        setLocalData(allItems);

        setActiveInput('hidden');
        setActiveText('show');
    }

    return (
        <>
            <Draggable className='card' key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                        <div className='content-container'>
                            <textarea type="text"
                                col="25"
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                className="edit-text"
                                value={contentText}
                                id={activeInput}
                                autoFocus />

                            <span onDoubleClick={handleDoubleClick}
                                id={item.id}
                                className={`item-text ${activeText}`}>
                                {item.content}
                            </span>

                            <div className="actions">
                                {/* delete */}
                                <a id={index} onClick={handleDelete}>
                                    x
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default Card;
