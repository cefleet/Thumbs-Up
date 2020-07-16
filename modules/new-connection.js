const {addItemToList, removeItemFromList} = require("./data-store");
const sendMessage = require("./send-message");
const recieveMessage = require("./recieve-message");

const newConnection = (_ws) =>{
    let ws = addItemToList({socket:_ws}, 'openSockets');
    ws.socket.id = ws.id; //attaching the id to the socket directly... 
    ws.socket.on('message', (msg)=>recieveMessage(msg, ws));

    sendMessage('connected', {socket_id:ws.id}, ws.id);

    ws.socket.on('close', ()=>{
       removeItemFromList(ws.id, 'openSockets')
    })
}

module.exports = newConnection;