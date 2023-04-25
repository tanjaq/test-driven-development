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
    test('return response content type', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
    })
    // test response message
    test('return response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBe('Valid User')
    })
})

describe('given incorrect or missing username and password', () => {
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.statusCode).toBe(400)
    })
    // test response does NOT contain userId
    test('userId not contain', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.body.userId).toBeUndefined()
    })
    // test response message
    test('return response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.body.message).toBe(undefined)
    })
    // test missing username
    test('missing username', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: 'pass'
        })
        expect(response.statusCode).toBe(400)
    })
    // test missing password
    test('missing password', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
    // test missing username and password
    test('missing username and password', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
    // test username and password values as nulls
    test('username and password values as nulls', async () => {
        const response = await request(app).post('/users').send({
            username: null,
            password: null
        })
        expect(response.statusCode).toBe(400)
    })
})