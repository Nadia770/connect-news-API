const dbConnection = require('../db/dbConnection')


exports.fetchTopics = ()=>{
    return dbConnection.select('slug', 'description').from('topics')
    .then((topics)=>{
        return topics
    })
}