import {socketUrl} from "../config.js";
import {getUserId} from "./userManager.js";
const listeners = [];

const socket = new WebSocket(socketUrl);

socket.onopen = ()=>{
    sendMessage('confirm-connected');
    socket.onmessage = messageRecived;
}

const messageRecived = (evt)=>{
    let evtDataObj = JSON.parse(evt.data);
    let list = listeners.filter(l=>l.type === evtDataObj.type)
    list.forEach(l=>l.onMessageAction(evtDataObj))
}

export const sendMessage = (message, payload)=>{
    socket.send(JSON.stringify({message,payload, userId:getUserId()}))
}

export const addListener = (type, onMessageAction) =>{
    listeners.push({type,onMessageAction})
}

export const removeListener = (message) =>{

}