
exports.handle400s = (err, req, res, next)=>{
    if(err.code == '42P01'){
        res.status(400).send({message: 'Bad request'})
    }
};