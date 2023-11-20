const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    padding: '8px 8px 8px 5px',
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? '#ddd' : '#fff',
    borderRadius: '5px',
    minHeight: '50px',
    maxHeight: '100px',
    boxShadow: '12px 12px 40px -38px #000',
    lineBreak: 'anywhere',
    textAlign: 'left',
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    padding: grid,
    width: '255px',
    borderRadius: '10px',
    maxHeight: '90%',
});

module.exports = { getItemStyle, getListStyle };
