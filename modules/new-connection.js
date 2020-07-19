const {findItemFromList, addItemToList, removeItemFromList, updateItemFromList} = require("./data-store");
const sendMessage = require("./send-message");
const sendAllActions = require("./send-all-actions");
const recieveMessage = require("./recieve-message");

const newConnection = (_ws) =>{
    let ws = addItemToList({socket:_ws}, 'openSockets');
    ws.socket.id = ws.id; //attaching the id to the socket directly... 
    ws.socket.on('message', (msg)=>recieveMessage(msg, ws));

    sendMessage('connected', {socket_id:ws.id}, ws.id);

    ws.socket.on('close', ()=>{
        let updated_ws = findItemFromList(ws.id, 'openSockets');
        updateItemFromList({socket:null},updated_ws.userId, 'users');//removes socket from user
        removeItemFromList(ws.id, 'openSockets');
        sendAllActions(updated_ws.userId);//tells everybody that they are no longer connected
    })
}

module.exports = newConnection;