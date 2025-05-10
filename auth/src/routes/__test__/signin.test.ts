import request from 'supertest';
import {app} from '../../app';
import { Request, Response  } from 'supertest';

it('returns a 400 with an invalid email or password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'invalidemail.com',
            password: 'password123'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'validemail@gmail.com',
            password: ''
        })
        .expect(400);
});

it('fails when an email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'nonexistentemail@gmail.com',
            password: 'password123'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async ( ) => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'validemail@gmail.com',
            password: 'password123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'validemail@gmail.com',
            password: 'wrongpassword'
        })
        .expect(400)
    expect(response.body.errors[0].message).toEqual('Invalid credentials');
});

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'validemail@gmail.com',
            password: 'password123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'validemail@gmail.com',
            password: 'password123'
        }).expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});





