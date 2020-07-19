let userId = null;

export const getUserId = ()=>userId;

export const setUserId = (id) =>userId = id;


export const fetchUserInfo = () =>fetch("/get-my-user-info").then(resp=>resp.json())
    