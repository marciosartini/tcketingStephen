import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 on error email signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'sddsdsdsddd',
        password: 'password'
      })
      .expect(400);
  });

  it('returns a 400 on error password signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'pa'
      })
      .expect(400);
  });

  it('returns a 400 missing password and e-mail', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({email: 'test@test.com'})
    .expect(400);

    await request(app)
      .post('/api/users/signup')
      .send({password: '123456'})
      .expect(400);
  });

  it('dissalaus duplic email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

      await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
  });

  it('set as cookie after sussesful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

      expect(response.get('Set-Cookie')).toBeDefined();

  });