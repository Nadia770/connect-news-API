const {fetchUsersByUsername} = require('../Models/usersModel')


exports.getUsersByUsername =(req, res, next)=>{
    const username = req.params.username
    fetchUsersByUsername(username).then((users)=>{
      res.status(200).send({users})
  })
  .catch((err)=>{
    next(err)
  })
};

