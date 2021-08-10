//Stores room information
let roomInfo = {};

const room = {
  setID: (id) => (roomInfo["id"] = id),
  setUsername: (username) => (roomInfo["username"] = username),
  setAccessOne: (cond) => (roomInfo["access-one"] = cond), //Is set when room creator joins chat room
  setAccessTwo: (cond) => (roomInfo["access-two"] = cond), //Is set when second user joins through link
  getRoom: () => roomInfo,
  deleteRoom: () => (roomInfo = {}),
};

module.exports = room;
