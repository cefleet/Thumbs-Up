import {addListener} from "./websocket.js";
import {thumbsUp,thumbsDown,raiseHand} from "./icons.js";
import {getUserId} from "./userManager.js";

const html = '<ul id="users"></ul>'


export default (parent, empty = true)=>{
    if(empty){
        parent.innerHTML = "";
    }
        
    parent.innerHTML = html;

    let cont = document.querySelector('#users');

    //constantly re-writting not too great
    addListener('status-change', (msg)=>{
        cont.innerHTML = "";
        let users = msg.message.sort((a,b)=>a.name - b.name)
        cont.innerHTML = users.filter(u=>u.id != getUserId()).map(u=>`
        <div class="user-status" id='${u.id}'>
            <div class="small-icon">${getIcon(u.status)}</div>
            <div class="user-name">${u.name}</div>
            <div class="status-message">${u.statusMessage || ""}
            </div>
        </div>`).join("")
    });

    const setStatus = (status)=>`${getIcon(status)}</div>`

    const getIcon = (status) =>{
        switch (status){
            case 'raise-hand':
                return raiseHand;            
            case 'thumbs-down':
                return thumbsDown;
            case 'thumbs-up':
                return thumbsUp;
            default:
                return ""
        }
    }
}