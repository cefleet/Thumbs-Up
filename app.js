const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 3001 });

let openSockets = [];
let userActions = [];
let users  = [];

const newConnection = (ws) =>{
    const id = uuidv4();
    ws.id = id;
    openSockets.push({id:id,socket:ws});

    ws.on('message', (msg)=>recieveMessage(msg, ws));

    sendMessage('connected', "You have been connected. Good luck.", id);

    ws.on('close', ()=>{
        console.log(ws.id,'Has Been closed');
        openSockets = openSockets.filter(oS=>oS.id !== ws.id);//removes the closed sockets
    })
}

const recieveMessage = (msg, ws)=>{
    let msgObj = JSON.parse(msg);
    handleMessages(msgObj, ws)
}

const sendMessage = (type, message,socketId) =>{
    let ws = openSockets.find(s=>s.id === socketId);
    ws.socket.send(JSON.stringify({type, message}))
}

const sendMessageToAll = (type, message)=>{
    openSockets.forEach(s=>sendMessage(type, message, s.id))
}

wss.on('connection', newConnection);

//Should be a module
const sendAllActions = () =>{
    let collected = users.map(u=>{
        let action = userActions.find(uA=>uA.userId == u.id) || {};
        return {
            id:u.id,
            name:u.name,
            status:action.status,
            statusMessage:u.statusMessage
        }
    })
    sendMessageToAll('status-change', collected)
}

const handleMessages = (msg,ws) =>{

    switch(msg.message) {
        case 'confirm-connected':
            ws.userId = msg.userId;
            //for now just make the user
            let newUser = {id:msg.userId, socketId:ws.id, name:""};
            users = [...users.filter(u=>u.id != msg.userId), {id:msg.userId, socketId:ws.id, name:""}];
            sendMessage('user-set', newUser, ws.id); 
            sendAllActions()          
            break;
        
        case 'thumbs-up': case 'thumbs-down':case 'raise-hand':
            userActions = [...userActions.filter(uA=>uA.userId != msg.userId), {userId:msg.userId, status:msg.message}]
            sendMessage('action-confirmed', msg.message, ws.id);
            sendAllActions()
            break;

        case 'clear':
            userActions = [...userActions.filter(uA=>uA.userId != msg.userId)];
            sendMessage('action-confirmed', msg.message, ws.id);
            sendAllActions()
            break;

        case 'set-name':
            users.find(u=>u.id === msg.userId).name = msg.payload;
            sendMessage('name-accepted', null, ws.id);
            sendAllActions();
            break;
        
        case 'set-status-message':
            users.find(u=>u.id === msg.userId).statusMessage = msg.payload;
            sendMessage('set-status-accepted', null, ws.id);
            sendAllActions();
            break;

        default:
            console.log(msg)
            break;
    }

}
