const localStorage = require("localStorage");
let reload = true;

//before redirecting to chat room, check if user is joining a expired room
//value is set in localStorage in /controllers/check-room-data
exports.joiningExpiredRoom = (req, res, next) => {

    //reloading page once on every redirect to re check if room expired
    //Needed since, the value to check expired room is set in a asynchronous 
    //sql query callback, so the value wouldn't show up on the first redirect
    if (reload) {
        reload = false;
        return res.redirect(req._parsedOriginalUrl.path); //redirecting to current path
    }

    if (localStorage.getItem("joining expired room") === 'true') {
        reload = true; //resetting reload
        localStorage.removeItem("joining expired room", false);
        return res.redirect("/room-expired");
    }

    reload = true; //resetting reload
    return next();
}