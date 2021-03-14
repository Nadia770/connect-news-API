const dbConnection = require('../db/dbConnection')

exports.updateCommentById = (comment_id, inc_votes)=>{
    if(!inc_votes) return Promise.reject({status: 400, msg: 'Bad request'})
      else {
      return dbConnection 
      .select('*').from('comments')
      .where('comment_id', comment_id)
      .increment('votes', inc_votes)
      .returning('*')
      .then((comment)=>{
        if(!comment.length) return Promise.reject({status: 404, msg: 'Comment does not exist'})
        else return comment
      })
      }
  };


  exports.removeCommentById = (comment_id)=>{
      return dbConnection 
      .select('*').from('comments')
      .where('comment_id', comment_id)
      .del()
      .then((deleteCount)=>{
        if(deleteCount == 0) return Promise.reject({status: 404, msg: 'Comment does not exist'})
      })
  };

