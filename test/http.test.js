'use strict';

var should = require('should'),
    request = require('supertest'),
    correctId = '6b8d7b1b-806c-4fad-86d0-e11bea0972b0',
    incorrectId = '1f68fd17-0eac-49c5-8958-99094d3b02c0';



describe('Rest server tests', function () {
    beforeEach(function () {
        this.request = request('http://localhost:5999')
    });

    afterEach(function () {
        this.request = null
    });

    describe('#routes/positive', function () {
        it('should return response 200 for get all request', function (done) {
            this.request.get('/users')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        });

        it('should return response 200 for create user request', function (done) {
            this.request.post('/users/')
                .send({firstName:'asdas' ,lastName:'asd' , email:'dsad@aasd.ua'  })
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        });

        it('should return response 200 for get user by id request', function (done) {
            this.request.get('/users/'+correctId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        });

        it('should return response 200 for update user by id request', function (done) {
            this.request.patch('/users/'+correctId)
                .send({firstName:'asd' ,lastName:'asd' , email:'dsad@aasd.ua'  })
                //.expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        });

        it('should return response 200 for delete user by id request', function (done) {
            this.request.delete('/users/42b21c03-7859-4725-8696-1d74ae69e3dc')
                //.send({firstName:'asdas' ,lastName:'asd' , email:'dsad@aasd.ua'  })
                //.expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        });
    });

    describe('#routes/negative', function () {
        it('should return response 200 for get all request', function (done) {
            this.request.get('/users')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.body.should.not.be.instanceof(Number);
                    done(null)
                });
        });

        it('should return response 500 for create user request with invalid post data', function (done) {
            this.request.post('/users')
                .send({ firstName:'asdas' })
                .expect(500)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.status.should.be.equal(500);
                    done(null)
                });
        });

        it('should return response 500 for create user request with invalid post data', function (done) {
            this.request.post('/users')
                .send('hello')
                .expect(500)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    response.status.should.equal(500);
                    done(null)
                });
        });

        it('should return response 404 for get user by invalid id request', function (done) {
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

        it('should return response 200 with error message for get user by unused id request', function (done) {
            this.request.get('/users/'+incorrectId)
                //.expect('Content-Type', /json/)
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
                //.expect('Content-Type', /json/)
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
            this.request.patch('/users/'+incorrectId)
                .send({firstName:'asd' })
                //.expect('Content-Type', /json/)
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
            this.request.delete('/users/42b21c03-7859')
                //.send({firstName:'asdas' ,lastName:'asd' , email:'dsad@aasd.ua'  })
                //.expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }
                    done(null)
                });
        });

        //couldn't figure out additional incorrect test for delete endpoint
    })
});
