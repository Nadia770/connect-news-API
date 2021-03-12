process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('./app')
const dbConnection = require('./db/dbConnection')

afterAll(()=> dbConnection.destroy());
//close connection to db once the tests are over


beforeEach(()=> dbConnection.seed.run());

describe('/api', ()=>{
    describe('/topics', ()=>{
        describe('GET', ()=>{
            it("status: 200, return topics", ()=>{
              //process is asyc, return is written to inform jest
              //to perform assertions after the promise is resolved
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({body})=>{
                    expect(Array.isArray(body.topics)).toBe(true)
                    expect(body.topics[0]).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                })
            })
            describe('Error', ()=>{
              it("status: 405, rejects invalid methods", ()=>{
                const invalidMethods = ['patch', 'put', 'delete']
                //creating an array of pending promises
                const methodPromises = invalidMethods.map((method)=>{
                  return request(app)
                  [method]('/api/topics')
                  .expect(405)
                  .then(({body:{msg}})=>{
                    expect(msg).toBe("Invalid method")
                  })
              })
              //Promise { <pending> }
              return Promise.all(methodPromises)
              //allows the handling of multiple asynchronous processes
              //resolution of promise must be returned
            })
        })
    })   
    describe('/users', ()=>{
      describe('/GET', ()=>{
        it("status: 200, return specific user by username", ()=>{
            return request(app)
            .get('/api/users/lurker')
            .expect(200)
            .then(({body})=>{
                expect(Array.isArray(body.users)).toBe(true)
                expect(body.users[0]).toMatchObject({
                    username: expect.any(String),
                    avatar_url: expect.any(String),
                    name: expect.any(String)
                })

            })
        })
        describe('Error', ()=>{
          it("status: 404, valid username which is not present ", ()=>{
              return request(app)
              .get('/api/users/reindeer')
              .expect(404)
              .then(({body: {msg}})=>{
                  expect(msg).toBe('username does not exist')
              })
           })
           it("status: 405, rejects invalid methods", ()=>{
            const invalidMethods = ['patch', 'put', 'delete']
            const methodPromises = invalidMethods.map((method)=>{
              return request(app)
              [method]('/api/users/lurkers')
              .expect(405)
              .then(({body:{msg}})=>{
                expect(msg).toBe("Invalid method")
              })
             })
          return Promise.all(methodPromises)
            })
          })
       })
      })
      describe("/articles", ()=>{
        describe('GET', ()=>{
          it("status: 200, return specific article by article_id", ()=>{
              return request(app)
              .get('/api/articles/1')
              .expect(200)
              .then(({body})=>{
                  expect(Array.isArray(body.articles)).toBe(true)
                  expect(body.articles[0]).toMatchObject({
                      author: expect.any(String),
                      title: expect.any(String),
                      article_id: expect.any(Number),
                      body: expect.any(String),
                      topic: expect.any(String),
                      created_at: expect.any(String),
                      votes: expect.any(Number),
                      comment_count: expect.any(String)
                  })
                })
              })
              
          })
          describe('Error', ()=>{
            it('status: 404, valid article_Id which is not present ', ()=>{
              return request(app)
              .get('/api/articles/999')
              .expect(404)
              .then(({body: {msg}})=>{
                expect(msg).toBe('Article does not exist')
             })
            })
            it('status: 400, invalid article_Id  ', ()=>{
              return request(app)
              .get('/api/articles/$$$')
              .expect(400)
              .then(({body: {msg}})=>{
                expect(msg).toBe('Bad request')
             })
            })
            it("status: 405, rejects invalid methods", ()=>{
              const invalidMethods = ['put', 'delete']
              const methodPromises = invalidMethods.map((method)=>{
                return request(app)
                [method]('/api/articles/2')
                .expect(405)
                .then(({body:{msg}})=>{
                  expect(msg).toBe("Invalid method")
                })
               })
                return Promise.all(methodPromises)
            })
          })
          describe('PATCH', ()=>{
            it("Status: 200, Increment the current article's vote property by 7 ", ()=>{
              return request(app)
              .patch('/api/articles/2')
              .send({inc_votes: 7})
              .expect(200)
              .then(({body})=>{
                expect(body.articles[0].votes).toBe(7)
              })
            })
            it("Status: 200, Decrement the current article's vote property by 5 ", ()=>{
              return request(app)
              .patch('/api/articles/3')
              .send({inc_votes: -5})
              .expect(200)
              .then(({body})=>{
                expect(body.articles[0].votes).toBe(-5)
              })
            })
            describe('Error', ()=>{
              it('status: 404, reject patch request when article_id is valid but not present ', ()=>{
                return request(app)
                .patch('/api/articles/999')
                .send({inc_votes: 8})
                .expect(404)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Article does not exist')
               })
              })
             it('status: 400, reject patch request article_id is invalid', ()=>{
                return request(app)
                .patch('/api/articles/$$$')
                .send({inc_votes: 10})
                .expect(400)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
              it('status: 400, reject patch request if inc_votes key is an invalid data type', ()=>{
                return request(app)
                .patch('/api/articles/3')
                .send({inc_votes: 'seven'})
                .expect(400)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
              it('status: 400, rejects malformed body', ()=>{
                return request(app)
                .patch('/api/articles/1')
                .send({incorrect_property: 4})
                .expect(400)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
              it("status: 405, rejects invalid methods", ()=>{
                const invalidMethods = ['put', 'delete']
                const methodPromises = invalidMethods.map((method)=>{
                  return request(app)
                  [method]('/api/articles/2')
                  .expect(405)
                  .then(({body:{msg}})=>{
                    expect(msg).toBe("Invalid method")
                  })
                 })
                  return Promise.all(methodPromises)
              })
            })
          })
          describe('POST', ()=>{
            it('status: 201 responds with created comment', ()=>{
              return request(app)
              .post('/api/articles/2/comments')
              .send({username:'shortbread fanatic', body:'coffee without shortbread?!'})
              .expect(201)
              .then(({body})=>{
                expect(Array.isArray(body.articles)).toBe(true)
                expect(body.articles[0]).toMatchObject({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                })

              })
            })
            describe('Error', ()=>{
              it('status: 404, reject post request when article_id is valid but not present ', ()=>{
                return request(app)
                .post('/api/articles/999/comments')
                .send({username:'butter_bridge', body:'coffee without shortbread?!'})
                .expect(404)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Article does not exist')
               })
              })
              it('status: 400, reject post request article_id is invalid', ()=>{
                return request(app)
                .post('/api/articles/two/comments')
                .send({username:'butter_bridge', body:'coffee without shortbread?!'})
                .expect(400)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
              it('status: 405, reject invalid method', ()=>{
                return request(app)
                .delete('/api/articles/3/comments')
                .send({username:'butter_bridge', body:'coffee without shortbread?!'})
                .expect(405)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Invalid method')
               })
              })
              it('status: 400, rejects malformed body', ()=>{
                return request(app)
                .post('/api/articles/2/comments')
                .send({incorrect_property:'butter_bridge' , incorrect_property:'coffee without shortbread?!'})
                .expect(400)
                .then(({body:{msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
            })
         })
      })
    })
    describe("/articles", ()=>{
      describe("/:article_id", ()=>{
        describe('/comments', ()=>{
          describe("GET", ()=>{
            it('status: 200, return an array of comments by article_id', () =>{
              return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({body})=>{
                expect(Array.isArray(body.comments)).toBe(true)
                expect(body.comments[0]).toMatchObject({
                  author: expect.any(String),
                  comment_id: expect.any(Number),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number)
                })
              })
            })
            it('status: 200, returns articles with no comments', () =>{
                return request(app)
                .get('/api/articles/2/comments')
                .expect(200)
                .then(({body})=>{
                  expect(body.comments).toHaveLength(0)
                })
            })
            it('status: 200, sorts comments by created_at property in descending order by default', () =>{
              return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({body})=>{
                console.log(body.comments)
                expect(Array.isArray(body.comments)).toBe(true)
                expect(body.comments).toBeSortedBy('created_at', {descending:true})
              })
            })
            describe('Error', ()=>{
              it('status: 404, rejects valid but non-existent article_id', ()=>{
                return request(app)
                .get('/api/articles/76/comments')
                .expect(404)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Article does not exist')
               })
              })
              it('status: 400, reject get request if article_id is invalid', ()=>{
                return request(app)
                .get('/api/articles/two/comments')
                .expect(400)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
            })
          })
        })
      })
    })
 })