const request = require('supertest');
const server = require('../index');
const db = require('../database/dbConfig.js');
let token;
describe('server', () => {
    beforeEach(async () => {
      // guarantees that the table is cleaned out before any of the tests run
      await db('users').truncate();
    });

describe('POST /register', () => {
    it('should insert a user into the db', () => {
      // insert one
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'gaffer',
          password: 'pass'
        })
        .then(res => {
          // check there there is one hobbit in the table
          expect(res.body.length).toBe(1);
        });
    });

    it('should be a success', () => {
        // insert one
        return request(server)
          .post('/api/auth/register')
          .send({
            username: 'gaffer1',
            password: 'pass'
          })
          .then(res => {
            // check there there is one hobbit in the table
            expect(res.status).toBe(201);
          });
      });
});




})

describe('Routes', async () => {
    describe('GET /api/auth/login', () => {
      it('should be a success', () => {
        return request(server)
          .post('/api/auth/login')
          .send({
              username: "gaffer1",
              password: "pass"
          })
          .then(response => {
            expect(response.status).toBe(200);
          })
      });
    });
    it('returns JSON', () => {
        return request(server)
          .post('/api/auth/login')
          .send({
                username: "gaffer1",
                password: "pass"
          })
          .then(res => {
            // matching on regular expression
            console.log("Token HERE", res.body.token)
            token = res.body.token
            expect(res.type).toMatch(/json/);
          });
      });

    describe('GET /api/jokes', () => {
      it('should send a status code code 200', () => {
        return request(server)
          .get('/api/jokes')
        //   .send({ token: 'Chaz' })
            .set('token', token)
          .then(response => {
            expect(response).toHaveProperty('status', 200);
          })
      });
    });
    describe('GET /api/jokes', () => {
        it('should send a status code code 400', () => {
          return request(server)
            .get('/api/jokes')
          //   .send({ token: 'Chaz' })
              .set('token', "badtoken")
            .then(response => {
              expect(response).toHaveProperty('status', 401);
            })
        });
      });

  });