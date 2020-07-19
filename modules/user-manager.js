const db = require("./data-store");

//This is for the websockets
const addSocketToUser = (socketId, userId)=>{
    return db.updateItemFromList({socket:socketId}, userId, 'users');
}

///Middleware
const getUserInfo = (req,res,next) =>{
    let user = db.findItemFromList(req.user.id, "users");

    res.user = {
        name:user.name,
        username:user.username,
        id:user.id,
        room:user.room,
        admin:user.admin
    }
    next();
}

const createUser = (req,res,next)=>{
  //need to do a check against username
  let newUser = db.addItemToList({
      username:req.body.username, 
      name:req.body.name, 
      password :req.body.password,
      status:"",
      message:"",
      socket:null,
      room:"1",
      admin:false
    },'users');
  if(newUser){
      next();
  }else{
      res.send("errored!");
  }  
}

const isAdmin = (req,res,next)=>{
    let user = db.findItemFromList(req.user.id, "users");
    if(user.admin) return next();
    res.status = 401;
    res.send('Not Authorized');
}


//passport specific Items
const getUserStrategy = (username,password,callback)=>{
    let user = db.findItemFromListByAttribute('username', username, 'users');
    if(!user) return callback(null, false);
    if (user.password != password) return callback(null, false);
    return callback(null, user);
}

const serializeUser = (user,callback) =>callback(null, user.id);

const deserializeUser = (id, callback)=>{
    let user = db.findItemFromList(id, 'users');
    if(!user) return callback({"not-found":"No User With that id is found."});
    callback(null, user);
}


module.exports = {
    createUser,
    getUserStrategy,
    serializeUser,
    deserializeUser,
    addSocketToUser,
    getUserInfo,
    isAdmin
}