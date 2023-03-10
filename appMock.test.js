const createApp = require('./app')
const request = require('supertest')

const mockPasswordValidation = jest.fn();
const mockUsernameValidation = jest.fn();
mockPasswordValidation.mockImplementation(password => password.length >= 10)
mockUsernameValidation.mockImplementation(username => username.length <= 30 && /^[a-zA-Z0-9.]+$/g.test(username))


const app = createApp(mockPasswordValidation,mockUsernameValidation)

describe('given correct username and password test', ()=> {
    test('return status 200', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
        expect(mockPasswordValidation).toHaveReturnedWith(true)
        expect(mockPasswordValidation).toHaveBeenCalled()
        expect(mockUsernameValidation).toHaveBeenCalled()
    })
    test('return userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password12345'
        })
        expect(response.body.userId).toBeDefined()
    })
    test('text only with periods numbers and letters', async () => {
        const response = await request(app).post('/users').send({
            username: 'Use.rname',
            password: 'Password12345'
        })
        expect(response.statusCode).toBe(200)
    })
})