const room = require("../utils/room");
const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");

//Used to set a value in localStorage from inside a query callback
//To be used later to route first user(room creator) to chat room 
//when second user joins the chat room
const localStorage = require("localStorage"); 

//Generates a url with room id for second user if room id and username are set
exports.waitingRoom = (req, res) => {
  const id = room.getRoom()["id"];
  const username = room.getRoom()["username"];

  if (id && username) {

    //Checks if second user joined, if yes then sets a 'User two joined' in localStorage
    pool.query("SELECT * FROM chat_rooms WHERE room_id= ?", [id], (error, results) => {
      if (error) console.log("Failed to select from chat_rooms: " + error);
        
      if (results.length > 0)
        localStorage.setItem("User two joined", true);
    });

    //Checks if 'User two joined' is set in localStorage, if yes then redirects first user(Room creator) to the chat room
    if(localStorage.getItem("User two joined") === 'true'){
      localStorage.setItem("User two joined", false);
      return res.redirect(`/chat-room?id=${id}&username=${username}`);
    }
    
    room.setAccessOne("true");
    
    //URL given to Second User To Join Chat Room by First User(Room creator)
    const url = `${req.protocol}://${req.get("host")}/url-get-name?id=${id}&second=true`;
    return res.render("waiting-room", { url: url });
  }
  
  return redirect(req, res);
};

function redirect(req, res) {
  if (req.isAuthenticated()) {
    let role = userInfo.getItem("role");
    if (role === "basic") {
      return res.redirect("/signed-index");
    }
    if (role === "admin") {
      return res.redirect("/admin-index");
    }
  }
  return res.redirect("/");
}