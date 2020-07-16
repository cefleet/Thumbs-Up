const { v4: uuidv4 } = require('uuid');

let store = {
    openSockets:[],
    users:[],
    classRooms:[]
}

const getList = (list) =>{
    if(store[list])
        return [...store[list]]
    else {
        return false;
    }
}

const addItemToList = (item, list)=>{
    item.id = item.id || uuidv4();
    store[list] = [...store[list].filter(i=>i.id != item.id), item];//replaces an old one if there.
    return item;
}

const removeItemFromList = (itemId, list) =>{
    store[list] = [...store[list].filter(i=>i.id != itemId)];
    return itemId;
}

const findItemFromList = (id, list) =>{
    return store[list].find(s=>s.id === id)
}

const findItemFromListByAttribute = (attrib, attribValue, list)=>{
    return store[list].find(item=>item[attrib] === attribValue);
}

const updateItemFromList = (changes, itemId, list) =>{
    let item = store[list].find(s=>s.id === itemId)
    let newItem ={...item, ...changes}
    store[list] = [...store[list].filter(s=>s.id != itemId), newItem]
    return newItem;
}

module.exports = {
    getList,
    addItemToList,
    removeItemFromList,
    findItemFromList,
    updateItemFromList,
    findItemFromListByAttribute
}