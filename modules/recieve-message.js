const handleMessages = require("./handle-messages");

const recieveMessage = (msg, ws)=>{
    let msgObj = JSON.parse(msg);
    handleMessages(msgObj, ws)
}

module.exports = recieveMessage