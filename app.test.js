const createApp = require('./app');
const request = require('supertest');
const validatePassword = require('./validation/validatePassword');
const validateUsername = require('./validation/validateUsername');
const app = createApp(validatePassword,validateUsername);

jest.setTimeout(10000);

describe('given correct username and password', () => {
  test('return status 200', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: 'Password123',
      });
    expect(response.statusCode).toBe(200);
  });

  test('return userId', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: 'Password123',
      });
    expect(response.body.userId).toBeDefined();
  });

  test('content-type is json', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: 'Password123',
      });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test('response message is Valid User', async () => {
    const response = await request(app).post("/users").send({
        username: 'Username',
        password: 'Password123',
      });
    expect(response.body.message).toEqual('Valid User');
  });
});

describe('given incorrect or missing username and password', () => {
  test('return status 400', async () => {
    const response = await request(app).post('/users').send({
        username: 'user',
        password: 'qwerty',
      });
    expect(response.statusCode).toBe(400);
  });

  test('return userId', async () => {
    const response = await request(app).post("/users").send({
        username: 'user',
        password: 'qwerty',
      });
    expect(response.body.userId).not.toBeDefined();
  });

  test('content-type is json', async () => {
    const response = await request(app).post('/users').send({
        username: 'user',
        password: 'qwerty',
      });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test('response message', async () => {
    const response = await request(app).post('/users').send({
        username: 'user',
        password: 'qwerty',
      });
    expect(response.body.message).not.toBeDefined();
  });
  
  test('error message', async () => {
    const response = await request(app).post('/users').send({
        username: 'user',
        password: 'qwerty',
      });
    expect(response.body.error).toBeDefined();
  });

  test('missing username', async () => {
    const response = await request(app).post("/users").send({
        username: '',
        password: 'qwerty',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual('Invalid User');
  });

  test('missing password', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: '',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual('Invalid User');
  });

  test('missing username and password', async () => {
    const response = await request(app).post('/users').send({
        username: '',
        password: '',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual('Invalid User');
  });
});