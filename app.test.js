process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('./app')
const dbConnection = require('./db/dbConnection')

afterAll(()=> dbConnection.destroy());

beforeEach(()=> dbConnection.seed.run());

describe('/api', ()=>{
    describe('/topics', ()=>{
        describe('GET', ()=>{
            it("status:200, return topics", ()=>{
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
        })
    })   
    describe('/users', ()=>{
      describe('/GET', ()=>{
        it("status:200, return specific user by username", ()=>{
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
          it("status 404: valid username which is not present ", ()=>{
              return request(app)
              .get('/api/users/reindeer')
              .expect(404)
              .then(({body: {msg}})=>{
                  expect(msg).toBe('username does not exist')
              })
           })
        })
       })
      })
      describe("/articles", ()=>{
        describe('GET', ()=>{
          it("status:200, return specific article by article_id", ()=>{
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
          })
          describe('PATCH', ()=>{
            it("Status 200: Increment the current article's vote property by 7 ", ()=>{
              return request(app)
              .patch('/api/articles/2')
              .send({inc_votes: 7})
              .expect(200)
              .then(({body})=>{
                expect(body.articles[0].votes).toBe(7)
              })
            })
            it("Status 200: Decrement the current article's vote property by 5 ", ()=>{
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
              it('status: 400, reject patch request if inc_votes key is invalid', ()=>{
                return request(app)
                .patch('/api/articles/3')
                .send({inc_votes: 'seven'})
                .expect(400)
                .then(({body: {msg}})=>{
                  expect(msg).toBe('Bad request')
               })
              })
            })
          })
      })
 })