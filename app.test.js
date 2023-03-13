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

    test('return response content type as JSON', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('return success message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toEqual('User created successfully')
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

    test('return response does NOT contain userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.body.userId).toBeUndefined()
    })

    test('return error message for missing username', async () => {
        const response = await request(app).post('/users').send({
            password: 'Password123'
        })
        expect(response.body.message).toEqual('Missing username')
    })

    test('return error message for missing password', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username'
        })
        expect(response.body.message).toEqual('Missing password')
    })

    test('return error message for missing username and password', async () => {
        const response = await request(app).post('/users').send({})
        expect(response.body.message).toEqual('Missing username and password')
    })

    test('return error message for null username and password', async () => {
        const response = await request(app).post('/users').send({
            username: null,
            password: null
        })
        expect(response.body.message).toEqual('Invalid username or password')
    })
})