import userComponent from "./src/userComponent.js";
import {addListener, openSocket} from "./src/websocket.js";
import {fetchUserInfo, setUserId} from "./src/userManager.js";

document.querySelector("#container").innerHTML = "loading..."

const start = async () =>{
    let user = await fetchUserInfo();
    setUserId(user.id);

    openSocket()    
    addListener('user-set', ()=>userComponent(document.querySelector("#container")));
}

start()