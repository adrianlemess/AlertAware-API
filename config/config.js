/* eslint-disable no-unused-vars */
import path from 'path'
import _ from 'lodash'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable')
    }
    return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv-safe')
    dotenv.load({
        path: path.join(__dirname, '../.env'),
        sample: path.join(__dirname, '../.env.example')
    })
}

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 4000,
        ip: process.env.IP || 'localhost',
        expiration: process.env.TOKEN_EXPIRATION || 60 * 60 * 24,
        defaultEmail: 'adrianlemess@gmail.com',
        masterKey: requireProcessEnv('MASTER_KEY'),
        jwtSecret: requireProcessEnv('JWT_SECRET'),
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: process.env.REDIS_PORT || 6379,
            options: {

            }
        },
        seedDB: false,
        mongo: {
            options: {
                db: {
                    safe: true
                }
            }
        }
    },
    test: {
        mongo: {
            uri: 'mongodb://localhost/alert-aware-test',
            options: {
                debug: false
            }
        }
    },
    development: {
        mongo: {
            uri: 'mongodb://localhost/alert-aware-dev',
            options: {
                debug: true
            }
        }
    },
    production: {
        ip: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 8080,
        mongo: {
            uri: process.env.MONGODB_URI || 'mongodb://localhost/alert-aware'
        }
    }
}

module.exports = _.merge(config.all, config[config.all.env])
export default module.exports
