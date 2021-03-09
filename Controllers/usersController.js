const {fetchUsers} = require('../Models/usersModel')


exports.getUsers =(req, res, next)=>{
    const username = req.params.username
    fetchUsers(username).then((users)=>{
        res.status(200).send({users})
    })
}