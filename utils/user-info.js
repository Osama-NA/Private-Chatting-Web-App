let info = {};

const infoStorage = {
    setItem: (key, value) => info[key] = value,
    getItem: (key) => info[key],
    removeItem: (key) => delete info[key],
    deleteUser: () => info = {}
};

module.exports = infoStorage;