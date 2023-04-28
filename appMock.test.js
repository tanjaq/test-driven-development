const createApp = require('./app');
const request = require('supertest');

const mockUsernameValidation = jest.fn();
mockUsernameValidation.mockImplementation(
    (username) => username.lenght >= 6 && username.lenght <= 30);

const mockPasswordValidation = jest.fn();
mockPasswordValidation.mockImplementation(
    (password) => password.lenght >= 10);

const app = createApp(mockPasswordValidation, mockUsernameValidation);

describe('given correct username and password', () => {
    test('return status 200', async () => {
        const response = await request(app).post("/users").send({
            username: 'Username',
            password: 'Password123'
        });
        expect(response.statusCode).toBe(200)
        expect(mockPasswordValidation).toHaveReturnedWith(true);
        expect(mockPasswordValidation).toHaveBeenCalled();
  });

  test('return userId', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'Username',
        password: 'qwertyuiopas'
    });
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(true);
    });

  test('content-type is json', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: 'Password123'
    });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(true);
    });

  test('response message is Valid User', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: 'Password123'
      });
    expect(response.body.message).toEqual('Valid User');
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(true);
  });
});

describe('given incorrect username and password', () => {
  test('return status 400 for incorrect password', async () => {
    const response = await request(app).post('/users').send({
        username: 'Username',
        password: 'asdfg'
      });
    expect(response.statusCode).toBe(400);
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(false);
  });

  test('return status 400 for incorrect username', async () => {
    const response = await request(app).post('/users').send({
        username: 'vbn',
        password: 'Hfkto223'
      });
    expect(response.statusCode).toBe(400);
    expect(mockUsernameValidation).toHaveBeenCalled();
    expect(mockUsernameValidation).toHaveReturnedWith(false);
  });

  test('return status 400 for missing username and password', async () => {
    const response = await request(app).post('/users').send({
        username: '',
        password: ''
      });
    expect(response.statusCode).toBe(400);
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(false);
    expect(mockUsernameValidation).toHaveBeenCalled();
    expect(mockUsernameValidation).toHaveReturnedWith(false);
  });

  test('content-type is json', async () => {
    const response = await request(app).post('/users').send({
        username: '',
        password: ''
      });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(false);
    expect(mockUsernameValidation).toHaveBeenCalled();
    expect(mockUsernameValidation).toHaveReturnedWith(false);
  });

  test('response message is Invalid User', async () => {
    const response = await request(app).post('/users').send({
        username: '',
        password: ''
      });
    expect(response.body.error).toEqual('Invalid User');
    expect(mockPasswordValidation).toHaveBeenCalled();
    expect(mockPasswordValidation).toHaveReturnedWith(false);
    expect(mockUsernameValidation).toHaveBeenCalled();
    expect(mockUsernameValidation).toHaveReturnedWith(false);
  });
});