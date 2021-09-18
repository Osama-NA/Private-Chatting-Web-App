const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info.js");
const fs = require("fs");

exports.downloadChat = (req, res) => {
  const id = req.body.download;
  const email = userInfo.getItem("email");
  const role = userInfo.getItem("role");
  const filename = `${id}.txt`;

  if (id && email && role) {
    let messages = "";

    //Get saved messages from database then format it and create a txt file with the messages 
    //as the content and room id as the file name then download the file to the Client
    //then delete it from the server
    const query = `SELECT username, time, message FROM saved_messages WHERE room_id = '${id}' AND user_email = '${email}'`;
    pool.query(query, (error, result) => {
      if(error) console.log("Failed to select username, time, message from saved_messages: " + error);

      Object.keys(result).forEach((key) => {
        const username = result[key]["username"];
        const time = result[key]["time"];
        const text = result[key]["message"];

        let message = "[" + time + "] " + username + ": " + text + "\n";
        messages += message;
      });

      //Create txt file with room id as file name and the messages are passed as the content
      fs.appendFile(filename, messages, function () {
        //download file
        return res.download(filename, () => {
          //delete file after download
          fs.unlink(filename, () => console.log("FILE REMOVED!"));
        });
      });
    });
  }
};