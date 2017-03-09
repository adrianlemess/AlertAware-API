// // ./test/test-helper.js

// import { mongo } from '../config/config'
// import * as mongoose from 'mongoose';
// import { Mockgoose } from 'mockgoose';

// let mockgoose = new Mockgoose(mongoose);
// /*
//  * Creates and/or connects to a mongo test database in memory
//  * @param {function} cb callback function
//  * @returns {void}
//  */
// module.exports.createDB = (cb) => {

//     // mockgoose.prepareStorage().then(() => {
//     //     mongoose.connect(mongo.uri);
//     //     mongoose.connection.on('connected', () => {
//     //         console.log('db connection is now open');
//     //     });
//     // });
//     mongoose.connect(mongo.uri, cb);
// };

// /*
//  * Disconnects from and destroys the mongo test database in memory
//  * @returns {void}
//  */
// module.exports.destroyDB = () => {
//     mongoose.disconnect();
// };