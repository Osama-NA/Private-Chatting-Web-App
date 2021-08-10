const moment= require('moment');

function formatMessage(username, message){
    return {
        username,
        message,
        time: moment().format('h:m:s a')
    }
}

module.exports = formatMessage;