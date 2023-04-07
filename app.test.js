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
    test('return correct message', async () => {
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
    test('dont contain userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.body.userId).not.toBeDefined()
    })
    test('missing username', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(400)
    })
    test('missing password', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
    test('missing username and password', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
})