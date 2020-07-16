const {findItemFromList} = require("./data-store");

const sendMessage = (type, message,socketId) =>{
    let ws = findItemFromList(socketId, 'openSockets');
    ws.socket.send(JSON.stringify({type, message}))
}

module.exports = sendMessage;