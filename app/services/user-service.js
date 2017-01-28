const mongoose = require('mongoose');

module.exports = function() {
    const User = mongoose.model('User');

    this.insertUser = function(user, callback) {
        user.save(callback);
    }
    return this;
}