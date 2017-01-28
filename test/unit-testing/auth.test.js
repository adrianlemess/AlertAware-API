import { stub } from 'sinon';
import request from 'supertest';
import { masterKey } from '../../config/config';
import UserController from '../../app/services/user-service.js';
import { verify } from '../../app/services/jwt-service';
import express from '../../config/express';
import routes from '../../config/routes';

const app = () => express(routes)

let user
beforeEach(async() => {
    user = await UserController.create({ username: 'teste', password: '123456', email: 'teste@contoso.com', 'name': 'Teste de Teste' })
})

test('POST /signin 201 (master)', async() => {
    const { status, body } = await request(app())
        .post('/')
        .query({ access_token: masterKey })
        .auth('teste', '123456')
    expect(status).toBe(201)
    expect(typeof body).toBe('object')
    expect(typeof body.token).toBe('string')
    expect(typeof body.user).toBe('object')
    expect(body.user._id).toBe(user._id)
    expect(await verify(body.token)).toBeTruthy()
})

test('POST /auth 400 (master) - invalid username', async() => {
    const { status, body } = await request(app())
        .post('/')
        .query({ access_token: masterKey })
        .auth('invalid', '123456')
    expect(status).toBe(400)
    expect(typeof body).toBe('object')
})

test('POST /auth 400 (master) - invalid password', async() => {
    const { status, body } = await request(app())
        .post('/')
        .query({ access_token: masterKey })
        .auth('teste@contoso.com', '123')
    expect(status).toBe(400)
    expect(typeof body).toBe('object')
})

test('POST /auth 401 (master) - user does not exist', async() => {
    const { status } = await request(app())
        .post('/')
        .query({ access_token: masterKey })
        .auth('b@b.com', '123456')
    expect(status).toBe(401)
})

test('POST /auth 401 (master) - wrong password', async() => {
    const { status } = await request(app())
        .post('/')
        .query({ access_token: masterKey })
        .auth('teste@contoso.com', '654321')
    expect(status).toBe(400)
})

test('POST /auth 401 (master) - missing access_token', async() => {
    const { status } = await request(app())
        .post('/')
        .auth('teste@contoso.com', '123456')
    expect(status).toBe(401)
})

test('POST /auth 401 (master) - missing auth', async() => {
    const { status } = await request(app())
        .post('/')
        .query({ access_token: masterKey })
    expect(status).toBe(401)
})