const dbConnection = require('../db/dbConnection')

exports.fetchUsersByUsername = (username)=>{
    return dbConnection.select('username', 'avatar_url', 'name').from('users')
    .where('username', username)
    .then((username)=>{
        if(!username.length) return Promise.reject({status: 404, msg: 'username does not exist'})
        else return username
    })
};