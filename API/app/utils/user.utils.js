import * as tokenService from "../services/token-service";

export const removeSensitiveData = (user) => {
    user.password = undefined;
    user.salt = undefined;
    return user;
}

export const readAllListAndRemoveSensitiveData = (users) => {
    return users.map(user => {
        user.password = undefined;
        user.salt = undefined;
        return user;
    })
}