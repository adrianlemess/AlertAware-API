import Historic from '../models/historic';
import * as userService from './user-service';

export const getHistoric = (historicId) => {
    return Historic.findOne({ _id: historicId });
}

export const getListUserHistoric = (userId) => {
    return userService.getUserById(userId)
        .then(User => Historic.find({ user: userId }));
}

export const saveHistoric = (message, subject, userId, send_way) => {
    let historic = {
        user: userId,
        message: message,
        subject: subject,
        send_way: send_way
    }
    const historictosave = new Historic(historic);
    return historictosave.save();
}