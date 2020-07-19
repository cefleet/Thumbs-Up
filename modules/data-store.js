const { v4: uuidv4 } = require('uuid');

let store = {
    openSockets:[],
    users:[{username:"cefleet",password:'sss',name:"clint",status:null, message:"",socket:null, id:'1234-5678-91011',admin:true, room:"1"},{username:"sss",name:"sss",password:'sss', status:null, message:"",socket:null, id:'1234-5678-91012', 'room':"1"}],
    rooms:[{id:"1", name:"Main", selfAdd:true, public:true, owner:null }, {id:"2", name:"Clints", selfAdd:true, public:true, owner:'1234-5678-91011'}]
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

const findAllItemFromListByAttribute = (attrib, attribValue, list)=>{
    return store[list].filter(item=>item[attrib] === attribValue);
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
    findItemFromListByAttribute,
    findAllItemFromListByAttribute
}