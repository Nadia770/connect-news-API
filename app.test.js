process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('./app')
const dbConnection = require('./db/dbConnection')

afterAll(()=>
    dbConnection.destroy()
);

beforeEach(()=>
    dbConnection.seed.run()
);

describe('/api', ()=>{
    describe('/topics', ()=>{
        describe('/GET', ()=>{
            it("status:200, return topics", ()=>{
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
          it("status 404: Endpoint doesn't exist ", ()=>{
              return request(app)
              .get('/api/users/reindeer')
              .expect(404)
              .then(({body: {message, req}})=>{
                  expect(message).toBe('No username with name: reindeer')
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
                console.log(body.articles)
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
      })
    
 })
     
        