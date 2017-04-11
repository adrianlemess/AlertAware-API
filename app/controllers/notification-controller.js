import * as notificationService from '../services/notification-service';

export const sendEmail = (req, res, next) => {
    const userId = req.params.userId || '';
    const message = req.body.message || '';
    const subject = req.body.subject || 'Email Alert Aware'

    if (userId == '' || message == '') {
        return res.sendStatus(400);
    }

    notificationService.sendMessageByEmail(userId, message, subject)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err))
}

export const sendPushNotification = (req, res, next) => {
    const userId = req.params.userId || '';
    const message = req.body.message || '';
    const subject = req.body.subject || 'Notificação Alert Aware'

    if (userId == '' || message == '') {
        return res.sendStatus(400);
    }

    notificationService.sendMessageByPushNotification(userId, message, subject)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err))
}