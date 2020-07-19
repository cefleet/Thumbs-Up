
const html = `
<style>
    .hidden {
        display:none;
    }
</style>
<div id="admin" class="admin">
    <button id="toggle-rooms">Toggle Manage Rooms</button>
    <div id="room-controller" class="admin-controller hidden">
        <div id="rooms"></div>
        <div id="create-room">
            <h3>New Room</h3>
            <div><label for="room-name">Room Name</label><input id="room-name" name="name" placeholder="name" /></div>
            <div><input type="checkbox" value="true" /><label for="name">Public?</label></div>
            <div><input type="checkbox" value="true" /><label for="name">Self Add?</label></div>
            <button type="button">Create Room</button>
        </div>
    </div>
</div>
`

export default (parent, empty = true)=>{
    parent.innerHTML = html;

    parent.querySelector("#toggle-rooms").addEventListener('click', ()=>{
        parent.querySelector("#room-controller").classList.toggle("hidden") 
    })


    const createRoom = ()=>{

    }

};