'use strict';

var should = require('should'),
    request = require('supertest'),
    uuid = require('node-uuid');

var testUser = { firstName:'asdas' ,lastName:'asd' , email:'dsad@aasd.ua'};

describe('Rest server tests', function () {
    beforeEach(function () {
        this.request = request('http://localhost:5999')
    });

    afterEach(function () {
        this.request = null
    });

    describe('#routes/positive', function () {
        it('should return Object in response for get all request', function (done) {
            this.request.get('/users')
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.body.should.be.instanceof(Object);
                    done(null)
                });
        });

        it('should return text response for create user request', function (done) {
            this.request.post('/users')
                .send(testUser)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.body.should.have.property('id');
                    done(null)
                });
        });

        it('should return response 200 for get user by id request', function(done) {
            var agent = this.request;
            agent.post('/users/').send(testUser).end(function(err, response){
                agent.get('/users/'+response.body.id)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.be.instanceof(Object);
                        res.type.should.be.equal('application/json');
                        done(null);
                    });
            });
        });

        it('should return response 200 for update user by id request', function (done) {
            var agent = this.request;
            agent.post('/users/').send(testUser).end(function(err, response){
                agent.patch('/users/'+response.body.id)
                    .send({firstName:'asdbbb' ,lastName:'asdbbb' , email:'dsad@gmail.ua'  })
                    .expect(200)
                    .end(function(err, res) {
                        res.text.should.be.equal('No output for that operation');
                        done(null);
                    });
            });
        });

        it('should return response 200 for delete user by id request', function (done) {
            var agent = this.request;
            agent.post('/users/').send(testUser).end(function(err, response){
                agent.delete('/users/'+response.body.id)
                    .expect(200)
                    .end(function(err, res) {
                        res.text.should.be.equal('No output for that operation');
                        done(null);
                    });
            });
        });
    });

    describe('#routes/negative', function () {
        it('should return Object response for get all request', function (done) {
            this.request.get('/users')
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.body.should.not.be.instanceof(Number);
                    done(null)
                });
        });

        it('should return response 500 with error details for create user request with invalid post data', function (done) {
            this.request.post('/users')
                .send({ firstName:'asdas' })
                .expect(500)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.status.should.be.equal(500);
                    response.text.should.startWith('Error: Validation Error: check your data');
                    done(null)
                });
        });

        it('should return response 500 with error details for create user request with invalid post data', function (done) {
            this.request.post('/users')
                .send('hello')
                .expect(500)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.status.should.equal(500);
                    response.text.should.startWith('Error: Validation Error: check your data');
                    done(null)
                });
        });

        it('should return response 404 with error details for get user by invalid id request', function (done) {
            this.request.get('/users/test')
                .expect(404)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.text.should.startWith('Error: Validation Error');
                    response.type.should.be.equal('text/html');
                    done(null)
                });
        });

        it('should return response 200 with empty result message for get user by unused id request', function (done) {
            this.request.get('/users/'+uuid.v4())
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.text.should.be.equal('No document(s) found with defined criteria!');
                    done(null)
                });
        });

        it('should return response 404 for update user by invalid id request', function (done) {
            this.request.patch('/users/test')
                .send({firstName:'asd' ,lastName:'asd' , email:'dsad@aasd.ua'  })
                .expect(404)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.text.should.startWith('Error: Validation Error');
                    response.type.should.be.equal('text/html');
                    done(null)
                });
        });

        it('should return response 500 for update user by invalid id and invalid data request', function (done) {
            this.request.patch('/users/'+uuid.v4())
                .send({firstName:'asd' })
                .expect(500)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.text.should.startWith('Error: Validation Error');
                    response.type.should.be.equal('text/html');
                    done(null)
                });
        });

        it('should return response 404 for delete user by invalid id request', function (done) {
            this.request.delete('/users/test')
                .expect(404)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.text.should.startWith('Error: Validation Error: invalid uuid.');
                    done(null)
                });
        });
    })
});
