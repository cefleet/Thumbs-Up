const db = require("./data-store");

const getPublicRooms = (req,res,next)=>{
    //just get the classes for now
    res.rooms = db.findAllItemFromListByAttribute("public",true, "rooms");
    next();
};

const getRoomNameFromUser = (req,res,next)=>{
    res.roomName = db.findItemFromList(req.user.room, 'rooms').name;
    next();
}

const createRoom = (req,res,next)=>{
    let newRoom = db.addItemToList({
        name:req.body.name,
        public:req.body.public,
        selfAdd:req.body.selfAdd,
        owner:req.user.id
    },'rooms');
    res.newRoom = newRoom;
}

module.exports ={ 
    createRoom,
    getPublicRooms,
    getRoomNameFromUser
}