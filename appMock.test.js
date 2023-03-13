const createApp = require('./app')
const request = require('supertest')

const mockPasswordValidation = jest.fn();
mockPasswordValidation.mockImplementation(password => password.length >= 10)

const app = createApp(mockPasswordValidation)

// Mock implementation for username validation
const mockUsernameValidation = jest.fn();
mockUsernameValidation.mockImplementation(username => username.length >= 5)

describe('given correct username and password', () => {
    test('return status 200', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
        expect(mockPasswordValidation).toHaveReturnedWith(true)
        expect(mockPasswordValidation).toHaveBeenCalled()
        expect(mockUsernameValidation).toHaveReturnedWith(true)
        expect(mockUsernameValidation).toHaveBeenCalled()
    })

    test('return userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'qweasdqwezxc'
        })
        expect(response.body.userId).toBeDefined()
        expect(mockPasswordValidation).toHaveReturnedWith(true)
        expect(mockPasswordValidation).toHaveBeenCalled()
        expect(mockUsernameValidation).toHaveReturnedWith(true)
        expect(mockUsernameValidation).toHaveBeenCalled()
    })

    // test response content type
    test('return content type application/json', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.type).toBe('application/json')
    })

    // test response message
    test('return message "User created successfully"', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBe('User created successfully')
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
        expect(mockUsernameValidation).toHaveReturnedWith(true)
        expect(mockUsernameValidation).toHaveBeenCalled()
    })

    // test response does NOT contain userId
    test('return response without userId for incorrect password', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'asdqwe'
        })
        expect(response.body.userId).toBeUndefined()
    })

    // test response message
    test('return message "Invalid username or password"', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'asdqwe'
        })
        expect(response.body.message).toBe('Invalid username or password')
    })

    // test missing username
    test('return status 400 for missing username', async () => {
        const response = await request(app).post('/users').send({
            password: 'Password123'
        })
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).toHaveReturnedWith(true)
        expect(mockPasswordValidation).toHaveBeenCalled()
        expect(mockUsernameValidation).toHaveReturnedWith(false)
        expect(mockUsernameValidation).toHaveBeenCalled()
    })
    // test missing password
    test('return status 400 for missing password', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username'
        })
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).not.toHaveBeenCalled()
        expect(response.body.message).toBe('Password is required')
    })

    // test missing username and password
    test('return status 400 for missing username and password', async () => {
        const response = await request(app).post('/users').send({})
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).not.toHaveBeenCalled()
        expect(response.body.message).toBe('Username is required, Password is required')
    })

    // test username and password values as nulls
    test('return status 400 for null username and password', async () => {
        const response = await request(app).post('/users').send({
            username: null,
            password: null
        })
        expect(response.statusCode).toBe(400)
        expect(mockPasswordValidation).not.toHaveBeenCalled()
        expect(response.body.message).toBe('Username is required, Password is required')
    })
})