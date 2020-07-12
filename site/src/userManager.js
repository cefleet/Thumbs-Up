import uuid from "./uuid.js"
let userId = localStorage.getItem('userId') || uuid()
localStorage.setItem('userId', userId);

export const getUserId = ()=>userId;

export const setUserId = (newUserId) => {
    localStorage.setItem('userId', userId)
    userId = newUserId;
    return userId;
}