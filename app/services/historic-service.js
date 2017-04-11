import Historic from '../models/historic';
import userService from './user-service';

export const getHistoric = (historicId) => {
    return Historic.findOne({ _id: historicId });
}

export const getListUserHistoric = (userId) => {
    return userService.getUserById(userId)
        .then(User => Historic.find({ users: { $in: [user._id] } }));
}

export const saveHistoric = (historic) => {
    console.log(historic)
    if (typeof historic == Historic) {
        return historic.save();
    } else {
        const historictosave = new Historic(historic);
        return historictosave.save();
    }
}