import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on succesful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@example.com',
            password: 'password123'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testexample.com',
            password: 'password123'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@example.com',
            password: 'short'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@example.com',
            password: 'password123'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@example.com',
            password: 'assword1'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@example.com',
            password: 'password123'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
    // expect(response.get('Set-Cookie')).toEqual(expect.arrayContaining([expect.stringContaining('session=')]));
    
});