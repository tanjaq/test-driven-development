const createApp = require('./app')
const request = require('supertest')
const validatePassword = require('./validation/validatePassword')
const validateUsername = require('./validation/validateUsername')

const app = createApp(validatePassword, validateUsername)

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
    test('/users endpoint returns json', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Passw0rd123'
        })
        const contentType = response.get('Content-Type');
        expect(contentType).toBeDefined()
        expect(contentType).toContain("application/json")
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
    test('does not return userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'User',
            password: 'Pass'
        })
        expect(response.body.userId).not.toBeDefined()
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
    })

    //Aren't the vaidation tests already testing these? And I thought we should not be dependant on the validation service in these test suites

    // test missing username
    // test missing password
    // test missing username and password
    // test username and password values as nulls
})