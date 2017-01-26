import Promise from 'bluebird'
import mongoose from 'mongoose'
import { mongo } from './config'

export default function (callback) {
  
  Object.keys(mongo.options).forEach((key) => {
    mongoose.set(key, mongo.options[key])
  })

  mongoose.Promise = global.Promise;
  mongoose.connect(mongo.uri);
  // /* istanbul ignore next */
  // mongoose.Types.ObjectId.prototype.view = function () {
  //   return { id: this.toString() }
  // }

  /* istanbul ignore next */
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
  })

  // when successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + mongo.uri);
  });

  // when the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

  // when the connection is open
  mongoose.connection.once('open', function () {
    if (callback && typeof (callback) === 'function') { callback(); }
  });

  // if the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });
}

