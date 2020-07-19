import {cancel,thumbsUp,thumbsDown,raiseHand} from "./icons.js";
import {sendMessage, addListener} from "./websocket.js";
import resultsComponent from "./resultsComponent.js";
import {fetchUserInfo} from "./userManager.js";
import adminComponent from "./adminComponent.js";
const html = 
`
<div id="additional"></div>
<h2>Class Room : <span id="room"></span></h2>
<div id="room-selector-container" class="selector-container">
    <label>Switch Class</label>
    <select id="room-selector"></select>
</div>
<div id="name-container" class="input-container">
    <input placeholder="Name" id="name" />
</div>
<div id="status-container" class="input-container">
    <input placeholder="Status Message" id="status-message" />
    <button id="clear-message">Clear</button>
</div>
<div class="main-content">
    <div class="actions">
        <div class="action-icon" id="thumbs-up">${thumbsUp}</div>
        <div class="action-icon" id="thumbs-down">${thumbsDown}</div>
        <div class="action-icon" id="raise-hand">${raiseHand}</div>
        <div class="action-icon" id="clear">${cancel}</div>
    </div>
    <div id="results" class="results"></div>
</div>
`

const getMyRoomName = ()=>fetch('/room-name/')
.then(resp=>resp.json())
.then(data=>{
    document.getElementById("room").innerText = data.name;
})

export default (parent, empty = true)=>{
    //if(nameValue) sendMessage('set-name', nameValue);

    if(empty) parent.innerHTML = "";
    parent.innerHTML = html;

    document.querySelectorAll('.action-icon')
    .forEach(icon=>icon.addEventListener('click',()=>sendMessage(icon.id, icon.id)))

    addListener('action-confirmed', (msg)=>{
        document.querySelectorAll('path').forEach(p=>p.setAttribute('fill', '#000'))
        let selected = document.querySelector(`#${msg.message} path`);
        if(selected) selected.setAttribute('fill', 'green');
    });

    addListener('room-changed', (msg)=>{
        let classSelector = document.getElementById('room-selector');
        classSelector.disabled = false;
        getMyRoomName();
    });

    let name = document.querySelector('#name');
    // name.setAttribute('value', nameValue || "");

    name.addEventListener('input', (evt)=>{
        localStorage.setItem('name', evt.target.value);
        sendMessage('set-name', evt.target.value);
    })

    let statusMessage = document.querySelector('#status-message');
    statusMessage.addEventListener('input', evt=>sendMessage('set-status-message', evt.target.value))

    document.querySelector('#clear-message').addEventListener('click', ()=>{
        sendMessage('set-status-message', "")
        document.querySelector('#status-message').value = "";
    });

    resultsComponent(document.querySelector('#results'));


    //get class list
    fetch('/list-rooms')
    .then(resp=>resp.json())
    .then(data=>{
        let rooms = data.map(c=>`<option value='${c.id}'>${c.name}</option>`).join("");
        let roomSelector = document.getElementById('room-selector');
        roomSelector.innerHTML = rooms;
        roomSelector.addEventListener('change', ()=>{
            sendMessage('change-room',roomSelector.value);
            roomSelector.disabled = true;
        })
    });

    getMyRoomName();
    fetchUserInfo()
    .then(userInfo=>{
        console.log(userInfo);
        name.setAttribute('value', userInfo.name || "");
        if(userInfo.admin){
            adminComponent(document.getElementById("additional"))
        }
    })
}