const Hapi = require('hapi');
const Inert = require('inert');
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

var url = 'mongodb://localhost:27017/myproject';

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(Inert, (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/script.js',
    handler: (request, reply) => {
      reply.file('script.js');
    }
  });
  
  server.route({
    method: 'GET',
    path: '/sendData/{data}',
    handler: (request, reply) => {
      const data = request.params.data

      const insertData = (db, cb) => {
        const collection = db.collection('documents');
        collection.insert({input: data}, (err, result) => {
          assert.equal(err, null);
          console.log('inserted input into database');
          cb(result);
        });
      }
      
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        console.log("Inserting data");
        insertData(db, res => {
          console.log(res)
          db.close();
        })
      });

      reply(true);
    }
  });

  server.route({
    method: 'GET',
    path: '/getData',
    handler: (request, reply) => {
      const getData = (db, cb) => {
        const collection = db.collection('documents');
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.dir(docs);
          cb(docs);
        });
      }
      
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        console.log('fetching data');
        getData(db, res => {
          reply(res);
          db.close();
        });
      });
    }
  });

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});
