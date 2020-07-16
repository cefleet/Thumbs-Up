const {addItemToList, updateItemFromList} = require("./data-store");
const sendMessage = require("./send-message");
const sendAllActions = require("./send-all-actions");

const handleMessages = (msg,ws) =>{

    switch(msg.message) {
        case 'confirm-connected':
            updateItemFromList({userId:msg.userId}, ws.id, "openSockets");
            let newUser = {id:msg.userId, socketId:ws.id, name:"", status:"", message:""};
            addItemToList(newUser, 'users');
            sendMessage('user-set', newUser, ws.id); 
            sendAllActions()          
            break;
        
        case 'thumbs-up': case 'thumbs-down': case 'raise-hand':
            updateItemFromList({status:msg.payload},msg.userId, 'users');
            sendMessage('action-confirmed', msg.payload, ws.id);
            sendAllActions()
            break;

        case 'set-name':
            updateItemFromList({name:msg.payload},msg.userId, 'users');
            sendMessage('name-accepted', null, ws.id);
            sendAllActions();
            break;
        
        case 'set-status-message':
            updateItemFromList({message:msg.payload}, msg.userId, 'users');
            sendMessage('set-status-accepted', null, ws.id);
            sendAllActions();
            break;
        
        case 'clear':
            updateItemFromList({status:""},msg.userId, 'users');
            sendMessage('action-confirmed', null, ws.id);
            sendAllActions()
            break;

        default:
            console.log(msg)
            break;
    }
}

module.exports = handleMessages