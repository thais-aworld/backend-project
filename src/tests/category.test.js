const request = require('supertest');
const app = require('../src/app');
let token;

beforeAll(async () => {
  const res = await request(app).post('/v1/user/token').send({
    email: 'user@mail.com',
    password: '123@123'
  });
  token = res.body.token;
});

describe('Category CRUD', () => {
  let categoryId;

  test('POST /v1/category - criar categoria', async () => {
    const res = await request(app)
      .post('/v1/category')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Shoes',
        slug: 'shoes',
        use_in_menu: true
      });
    expect(res.statusCode).toBe(201);
  });

  test('GET /v1/category/search - buscar categorias', async () => {
    const res = await request(app).get('/v1/category/search');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /v1/category/:id - pegar categoria', async () => {
    const res = await request(app).get('/v1/category/1');
    expect(res.statusCode).toBe(200);
    categoryId = res.body.id;
  });

  test('PUT /v1/category/:id - atualizar categoria', async () => {
    const res = await request(app)
      .put(`/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Shoes',
        slug: 'updated-shoes',
        use_in_menu: false
      });
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /v1/category/:id - deletar categoria', async () => {
    const res = await request(app)
      .delete(`/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
