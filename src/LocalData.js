const getLocalData = () => {
    return JSON.parse(localStorage.getItem('items'));
};

const setLocalData = (item) => {
    localStorage.setItem('items', JSON.stringify(item));
};

module.exports = { getLocalData, setLocalData };
