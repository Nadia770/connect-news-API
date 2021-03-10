const dbConnection = require('../db/dbConnection')

exports.fetchUsersByUsername = (username)=>{
    return dbConnection.select('username', 'avatar_url', 'name').from('users')
    .where('username', username)
}