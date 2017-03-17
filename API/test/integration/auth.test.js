import mongoose from '../../config/mongoose';
import User from '../../app/models/user';

describe('Auth tests', function() {

    it('should be invalid if name is empty', function(done) {
        var newUser = new User({
            name: 'Adrian Lemes',
            email: 'adrianlemess@gmail.com',
            username: 'adrianlemess',
            password: '123asd'
        });

        beforeEach(done => {
            User
                .remove({ where: {} })
                .then(() => newUser.save())
                .then(() => done());

        });

        describe('Route GET /', () => {
            it('should return a helloworld', done => {
                request
                    .get('/')
                    .end((err, res) => {
                        expect(res.body).to.be.eql(defaultBook.id)
                        done(err);

                    })
            })
        })
    });
})