import userPage from "./src/userPage.js";

import {addListener} from "./src/websocket.js";
document.querySelector("#container").innerHTML = "loading..."

addListener('user-set', ()=>userPage(document.querySelector("#container")));
