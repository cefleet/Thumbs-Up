const {updateItemFromList, findItemFromList} = require("./data-store");
const {addSocketToUser} = require("./user-manager");

const sendMessage = require("./send-message");
const sendAllActions = require("./send-all-actions");

const handleMessages = (msg,ws) =>{

    switch(msg.message) {
        case 'confirm-connected':
            ws = updateItemFromList({userId:msg.userId}, ws.id, "openSockets"); 
            let updatedUser = addSocketToUser(ws.id, msg.userId);
            sendMessage('user-set', updatedUser, ws.id); 
            sendAllActions(msg.userId)          
            break;
        
        case 'thumbs-up': case 'thumbs-down': case 'raise-hand':
            updateItemFromList({status:msg.payload},msg.userId, 'users');
            sendMessage('action-confirmed', msg.payload, ws.id);
            sendAllActions(msg.userId)
            break;

        case 'set-name':
            updateItemFromList({name:msg.payload},msg.userId, 'users');
            sendMessage('name-accepted', null, ws.id);
            sendAllActions(msg.userId);
            break;
        
        case 'set-status-message':
            updateItemFromList({message:msg.payload}, msg.userId, 'users');
            sendMessage('set-status-accepted', null, ws.id);
            sendAllActions(msg.userId);
            break;
        
        case 'change-room':
            let oldRoom = findItemFromList(msg.userId, 'users').room; 
            updateItemFromList({room:msg.payload}, msg.userId, 'users');
            sendMessage('room-changed', null, ws.id);
            sendAllActions(null, oldRoom);
            sendAllActions(msg.userId);

        case 'clear':
            updateItemFromList({status:""},msg.userId, 'users');
            sendMessage('action-confirmed', null, ws.id);
            sendAllActions(msg.userId)
            break;

        default:
            console.log(msg)
            break;
    }
}

module.exports = handleMessages