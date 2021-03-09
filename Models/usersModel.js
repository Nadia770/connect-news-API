
const dbConnection = require('../db/dbConnection')

exports.fetchUsers = (username)=>{
    return dbConnection.select('username', 'avatar_url', 'name').from('users')
    .where('username', username)
};