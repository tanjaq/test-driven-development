const createApp = require('./app')
const request = require('supertest')

const mockPasswordValidation = jest.fn();
mockPasswordValidation.mockImplementation(password => password.length >= 10)

const mockUsernameValidation = jest.fn();
mockUsernameValidation.mockImplementation(username => username.length >= 6 && username.length <=30)

const app = createApp(mockPasswordValidation, mockUsernameValidation)

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
    // test response content type?? 
    test('/users endpoint returns json', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Passw0rd123'
        })
        const contentType = response.get('Content-Type');
        expect(contentType).toBeDefined()
        expect(contentType).toContain("application/json")
        expect(mockPasswordValidation).toHaveBeenCalled();
        expect(mockPasswordValidation).toHaveReturnedWith(true);
    })
    // test response message
    test('/users endpoint returns success message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Passw0rd123'
        })
        const message = response.body.message;
        expect(message).toBeDefined()
        expect(message).toBe("Valid User")
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
    // test response does NOT contain userId
    test('does not return userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'User',
            password: 'Pass'
        })
        expect(response.body.userId).not.toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).toHaveReturnedWith(false)
        expect(mockPasswordValidation).toHaveBeenCalled()
    })
    // test response message
    test('/users endpoint returns error message', async () => {
        const response = await request(app).post('/users').send({
            username: 'User',
            password: 'Pass'
        })
        const error = response.body.error;
        expect(error).toBeDefined()
        expect(error).toBe("Invalid User")
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).toHaveReturnedWith(false)
        expect(mockPasswordValidation).toHaveBeenCalled()
    })
})