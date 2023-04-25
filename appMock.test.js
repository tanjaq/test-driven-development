const createApp = require('./app')
const request = require('supertest')

const mockPasswordValidation = jest.fn();
mockPasswordValidation.mockImplementation(password => password.length >= 10)

const app = createApp(mockPasswordValidation)

//todo add mock implementation to username

describe('given correct username and password', () => {
    test('return status 200', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
        expect(mockPasswordValidation).toHaveReturnedWith(true)
        expect(mockPasswordValidation).toHaveBeenCalled()
    })
    test('return userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'qweasdqwezxc'
        })
        expect(response.body.userId).toBeDefined()
    })
    // add more tests here
    test('return response content type', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(mockPasswordValidation).toHaveBeenCalled();
        expect(mockPasswordValidation).toHaveReturnedWith(true);
    })
    test('return response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBe('Valid User')
        expect(mockPasswordValidation).toHaveBeenCalled();
        expect(mockPasswordValidation).toHaveReturnedWith(true);
    })
})

describe('given incorrect username and password', () => {
    test('return status 400 for incorrect password', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'asdqwe'
        })
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).toHaveReturnedWith(false)
        expect(mockPasswordValidation).toHaveBeenCalled()
    })
    // add more tests here
})