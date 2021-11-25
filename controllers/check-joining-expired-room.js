const room = require("../utils/room");
const localStorage = require("localStorage");

//before redirecting to chat room, check if user is joining a expired room
//value is set in localStorage in /controllers/check-room-data
exports.joiningExpiredRoom = (req, res, next) => {

    //reloading page once if it's not room creator being redirected chat room
    //to re check if room expired. Needed since, the value to check expired 
    //room is set in a asynchronous sql query callback, so the value wouldn't 
    //show up on the first redirect
    if (!room.getRoom()["access-one"] === 'true') {
        return res.redirect(req._parsedOriginalUrl.path); //redirecting to current path
    }

    if (localStorage.getItem("joining expired room") === 'true') {
        localStorage.removeItem("joining expired room");
        return res.redirect("/room-expired");
    }

    return next();
}