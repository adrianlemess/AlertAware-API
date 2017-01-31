import { stub } from 'sinon'
// import request from 'supertest-as-promised'
import * as userService from '../../app/services/user-service.js';
import * as redisService from '../../app/services/redis-service';
import api from '../server';
const request = require('supertest')(api);


let user
beforeEach(async() => {
    user = await userService.insertUser({ username: 'teste', password: '123456', email: "teste@gmail.com", nome: "Teste Testado" })
        .then(newUser => console.log(newUser))
})

test('Get /api 200', async() => {
    const { status } = request
        .get('/api')
    expect(status).toBe(200)
    expect(typeof body).toBe('string')
})


test('POST /signin 202', async() => {
    const { status, body } = await request
        .post('/api/auth/signin')
        .auth('teste', '123456')
    expect(status).toBe(202)
    expect(typeof body).toBe('object')
    expect(typeof body.token).toBe('string')
    expect(typeof body.user).toBe('object')
    expect(body.user._id).toBe(user._id)
    expect(await typeof(redisService.getToken(body.token))).toBe('string')
})

// test('POST /auth 400 (master) - invalid username', async() => {
//     const { status, body } = await request(app())
//         .post('/')
//         .query({ access_token: masterKey })
//         .auth('invalid', '123456')
//     expect(status).toBe(400)
//     expect(typeof body).toBe('object')
// })

// test('POST /auth 400 (master) - invalid password', async() => {
//     const { status, body } = await request(app())
//         .post('/')
//         .query({ access_token: masterKey })
//         .auth('teste@contoso.com', '123')
//     expect(status).toBe(400)
//     expect(typeof body).toBe('object')
// })

// test('POST /auth 401 (master) - user does not exist', async() => {
//     const { status } = await request(app())
//         .post('/')
//         .query({ access_token: masterKey })
//         .auth('b@b.com', '123456')
//     expect(status).toBe(401)
// })

// test('POST /auth 401 (master) - wrong password', async() => {
//     const { status } = await request(app())
//         .post('/')
//         .query({ access_token: masterKey })
//         .auth('teste@contoso.com', '654321')
//     expect(status).toBe(400)
// })

// test('POST /auth 401 (master) - missing access_token', async() => {
//     const { status } = await request(app())
//         .post('/')
//         .auth('teste@contoso.com', '123456')
//     expect(status).toBe(401)
// })

// test('POST /auth 401 (master) - missing auth', async() => {
//     const { status } = await request(app())
//         .post('/')
//         .query({ access_token: masterKey })
//     expect(status).toBe(401)
// })