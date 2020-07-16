const sendMessage = require("./send-message");
const {getList} = require("./data-store");

const sendMessageToAll = (type, message)=>{
    let openSockets = getList('openSockets');
    openSockets.forEach(s=>sendMessage(type, message, s.id))
}

module.exports = sendMessageToAll;