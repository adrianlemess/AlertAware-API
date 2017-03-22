import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const SALT_WORK_FACTOR = 10;
const authTypes = ['github', 'twitter', 'facebook', 'google'];

const validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill your name']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']

    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validateLocalStrategyProperty, 'Please fill your username'],
    },
    password: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    salt: {
        type: String
    },
    regId: String,
    updated_at: Date,
    created_at: Date,
    devices: [{
        deviceId: { type: String, index: { unique: false } },
        registrationId: { type: String, index: { unique: false } },
        celNumber: String
    }],
    role: String
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) { return next(); }

    // password changed so we need to hash it (generate a salt)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) { return next(err); }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) { return next(err); }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
userSchema
    .path('username')
    .validate(function(username) {
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return username.length;
    }, 'Username cannot be blank');

userSchema
    .path('password')
    .validate(function(password) {
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return password.length;
    }, 'Password cannot be blank');

userSchema
    .path('username')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({ username: value }, function(err, user) {
            if (err) throw err;
            if (user) {
                if (self.id === user.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified username is already in use.');

userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

userSchema.pre('update', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

userSchema.methods.comparePassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) reject(err);
            resolve(isMatch);
        });
    })

};

const model = mongoose.model('User', userSchema)
export const schema = model.schema
export default model