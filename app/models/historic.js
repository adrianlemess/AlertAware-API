import User from './user';
import mongoose from 'mongoose';

const historicSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    subject: String,
    send_way: String,
    // priority: Number,
    // image: String,
    updated_at: Date,
    created_at: Date
});


historicSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

historicSchema.pre('update', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

const model = mongoose.model('Historic', historicSchema);
export const schema = model.schema
export default model