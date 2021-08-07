//Stores room information
let roomInfo = {};

const room = {
  setID: (id) => (roomInfo["id"] = id),
  setUsername: (username) => (roomInfo["username"] = username),
  setAccessOne: (cond) => (roomInfo["access-one"] = cond),
  setAccessTwo: (cond) => (roomInfo["access-two"] = cond),
  getRoom: () => roomInfo,
  deleteRoom: () => (roomInfo = {}),
};

module.exports = room;
