import userPage from "./src/userPage.js";
import adminPage from "./src/adminPage.js";

import {addListener} from "./src/websocket.js";
document.querySelector("#container").innerHTML = "loading..."
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);
if(searchParams.get('admin') == 'true'){
    addListener('user-set', ()=>adminPage(document.querySelector("#container")));
} else {
    addListener('user-set', ()=>userPage(document.querySelector("#container")));
}