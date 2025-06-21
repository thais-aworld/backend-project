const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('123@123', 10);
  await User.create({
    firstname: 'Test',
    surname: 'User',
    email: 'user@mail.com',
    password: hashedPassword
  });

  const res = await request(app).post('/v1/user/token').send({
    email: 'user@mail.com',
    password: '123@123'
  });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('User CRUD', () => {
  let userId;

  test('POST /v1/user - criar usuário', async () => {
    const res = await request(app).post('/v1/user').send({
      firstname: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: '123456',
      confirmPassword: '123456'
    });
    expect(res.statusCode).toBe(201);
  });

  test('GET /v1/user/:id - pegar usuário', async () => {
    const user = await User.findOne({ where: { email: 'john@example.com' } });
    userId = user.id;

    const res = await request(app).get(`/v1/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('john@example.com');
  });

  test('PUT /v1/user/:id - atualizar usuário', async () => {
    const res = await request(app)
      .put(`/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'John Updated',
        surname: 'Doe',
        email: 'john.updated@example.com'
      });
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /v1/user/:id - deletar usuário', async () => {
    const res = await request(app)
      .delete(`/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
