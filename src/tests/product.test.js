const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
let token;
let categoryId;

beforeAll(async () => {
  const resToken = await request(app).post('/v1/user/token').send({
    email: 'user@mail.com',
    password: '123@123'
  });
  token = resToken.body.token;

  const resCategory = await request(app)
    .post('/v1/category')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Eletronics',
      slug: 'eletronics',
      use_in_menu: true
    });
  categoryId = 1;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product CRUD', () => {
  let productId;

  test('POST /v1/product - criar produto', async () => {
    const res = await request(app)
      .post('/v1/product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        enabled: true,
        name: 'Smartphone',
        slug: 'smartphone',
        stock: 5,
        description: 'Um smartphone top',
        price: 999.99,
        price_with_discount: 899.99,
        category_ids: [categoryId],
        images: [{ content: '/images/smartphone.png' }],
        options: [
          {
            title: 'Cor',
            shape: 'square',
            type: 'text',
            values: ['Preto', 'Azul']
          }
        ]
      });

    expect(res.statusCode).toBe(201);
  });

  test('GET /v1/product/search - buscar produtos', async () => {
    const res = await request(app).get('/v1/product/search');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    productId = res.body.data[0].id;
  });

  test('GET /v1/product/:id - pegar produto por id', async () => {
    const res = await request(app).get(`/v1/product/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Smartphone');
  });

  test('PUT /v1/product/:id - atualizar produto', async () => {
    const res = await request(app)
      .put(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        enabled: false,
        name: 'Smartphone Atualizado',
        slug: 'smartphone-atualizado',
        stock: 10,
        description: 'Descrição nova',
        price: 799.99,
        price_with_discount: 699.99,
        category_ids: [categoryId],
        images: [],
        options: []
      });
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /v1/product/:id - deletar produto', async () => {
    const res = await request(app)
      .delete(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
