const createApp = require('./app')
const request = require('supertest')
const validatePassword = require('./validation/validatePassword')

const app = createApp(validatePassword)

describe('given correct username and password', () => {
    test('return status 200', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
    })
    test('return userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.userId).toBeDefined()
    })
    // test response content type?? 
    // test response message
})

describe('given incorrect or missing username and password', () => {
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.statusCode).toBe(400)
    })////////////////////////////////////////////////
    // test response does NOT contain userId
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.body.userId).toBeUndefined()
    })
    // test response message
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.body.error).toBe("Invalid User")
    })
    // test missing username
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(400)
    })
    // test missing password
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
    // test missing username and password
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
    // test username and password values as nulls
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'null',
            password: 'null'
        })
        expect(response.statusCode).toBe(400)
    })
})