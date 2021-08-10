const users = [];

//Join User To Chat
function userJoin(id, name, room) {
  const user = { id, name, room };
  users.push(user);
  return user;
}

//Get Current User
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//User Leaves Chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave
};
