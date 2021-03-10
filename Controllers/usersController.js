const {fetchUsersByUsername} = require('../Models/usersModel')


exports.getUsersByUsername =(req, res, next)=>{
    const username = req.params.username
    fetchUsersByUsername(username).then((users)=>{
      if(!users.length){
        res.status(404).send({message: `No username with name: ${username}`})
      }else {
        res.status(200).send({users})
      }
   })
};