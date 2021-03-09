process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('./app')
const dbConnection = require('./db/dbConnection')

afterAll(()=>
    dbConnection.destroy()
)

beforeEach(()=>
    dbConnection.seed.run()
)

describe('/api', ()=>{
    describe('/topics', ()=>{
        describe('/GET', ()=>{
            it("status:200, return topics", ()=>{
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({body})=>{
                    expect(Array.isArray(body)).toBe(true)
                    expect(body[0]).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                })
            })
        })
    })
})