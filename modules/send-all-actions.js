const {getList,findItemFromList} = require("./data-store");
const sendMessageToAll = require("./send-message-to-all");

const sendAllActions = () =>{
    let allUsers = getList("users");
    let collected = allUsers.map(user=>({
        id:user.id,
        name:user.name,
        status:user.status,
        message:user.message,
        connected:findItemFromList(user.socketId, 'openSockets') ? "true" :"false"
    }))

    sendMessageToAll('status-change', collected)
}

module.exports = sendAllActions;