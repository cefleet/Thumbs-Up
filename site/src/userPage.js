import {cancel,thumbsUp,thumbsDown,raiseHand} from "./icons.js";
import {sendMessage, addListener} from "./websocket.js";
import resultsPage from "./resultsPage.js";

let nameValue = localStorage.getItem('name');

const html = 
`
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

export default (parent, empty = true)=>{
    if(nameValue) sendMessage('set-name', nameValue);

    if(empty) parent.innerHTML = "";
    parent.innerHTML = html;

    document.querySelectorAll('.action-icon')
    .forEach(icon=>icon.addEventListener('click',()=>sendMessage(icon.id, icon.id)))

    addListener('action-confirmed', (msg)=>{
        document.querySelectorAll('path').forEach(p=>p.setAttribute('fill', '#000'))
        if(msg.message != 'clear'){
            document.querySelector(`#${msg.message} path`).setAttribute('fill', 'green')
        }
    })

    let name = document.querySelector('#name');
    name.setAttribute('value', nameValue || "");

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

    resultsPage(document.querySelector('#results'))
}