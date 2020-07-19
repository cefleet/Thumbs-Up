const {findItemFromList, findAllItemFromListByAttribute} = require("./data-store");
const sendMessageToAll = require("./send-message-to-all");

const sendAllActions = (userId, room= null) =>{
    let userRoom = room || findItemFromList(userId,"users").room;
    let roomUsers = findAllItemFromListByAttribute("room",userRoom, "users");
    let collected = roomUsers.map(user=>({
        id:user.id,
        name:user.name,
        status:user.status,
        message:user.message,
        connected:user.socket ? true:false,
        room:user.room
    }))

    sendMessageToAll('status-change', collected, roomUsers)
}

module.exports = sendAllActions;