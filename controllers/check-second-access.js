const room = require("../utils/room");

//checks whether it's an access by the second user by checking the query string in the url
exports.checkSecondAccess = (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlData = url.split("?")[1]; //url is split to get the data in query string to check whether user joined through link

  //if urlData is available set id and access for second user
  if (urlData) {
    const id = urlData.split("&")[0].substring(3);
    const second = urlData.split("&")[1].substring(7);
    if (id && second) {
      room.setID(id);
      room.setAccessTwo(second);
    }
  }

  return next();
};