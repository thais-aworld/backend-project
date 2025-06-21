const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');
const sequelize = require('../src/config/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('123@123', 10);
  await User.create({
    firstname: 'Test',
    surname: 'User',
    email: 'user@mail.com',
    password: hashedPassword
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /v1/user/token', () => {
  test('Deve retornar um token JWT quando login for válido', async () => {
    const response = await request(app)
      .post('/v1/user/token')
      .send({
        email: 'user@mail.com',
        password: '123@123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('Deve retornar erro se o email ou senha estiverem errados', async () => {
    const response = await request(app)
      .post('/v1/user/token')
      .send({
        email: 'user@mail.com',
        password: 'senhaErrada'
      });

    expect(response.statusCode).toBe(400);
  });
});
