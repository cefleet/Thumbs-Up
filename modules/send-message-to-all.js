const sendMessage = require("./send-message");
const {getList} = require("./data-store");

const sendMessageToAll = (type, message, users)=>{
    let openSockets = getList('openSockets');
    let sendTo = [...openSockets];
    if(users){
        sendTo = openSockets.filter(s=>users.find(u=>u.id === s.userId))
    }
    sendTo.forEach(s=>sendMessage(type, message, s.id))
}

module.exports = sendMessageToAll;