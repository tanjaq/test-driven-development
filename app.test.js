const createApp = require('./app')
const request = require('supertest')
const validatePassword = require('./validatePassword')
const validaUsername = require('./validUsername')
const app = createApp(validatePassword, validaUsername)

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
})

describe('given incorrect or missing username and password', () => {
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'name',
            password: 'pass'
        })
        expect(response.statusCode).toBe(400)
    })
    test('missing username', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: 'Password123',
        })
        expect(response.body.error).toBe("Invalid User")
    })
    test('missing password', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: '',
        })
        expect(response.body.error).toBe("Invalid User")
    })
    test('missing password', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: ''
        })
        expect(response.statusCode).toBe(400)
    })
    test('response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBe("Valid User")
    })

})