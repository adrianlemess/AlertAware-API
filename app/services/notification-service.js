//sender email : alertawarenotify
import * as historicService from "../services/historic-service";
import * as nodeMailer from 'nodemailer';
import User from '../models/user';
import querystring from 'querystring';

const senderEmail = "alertawarenotify@gmail.com"

export const sendMessageByEmail = (userId, message, subject) => {
    return new Promise((resolve, reject) => {
        User.findById(userId)
            .then(user => {
                sendEmail(user.email, message, subject)
                    .then(result => {
                        historicService.saveHistoric(message, subject, user._id, "email");
                        resolve(result);
                    })
                    .catch(err => reject(err));
            })
    })
}

function sendEmail(email, message, subject) {
    const transport = createTransport();

    const mailOptions = {
        from: senderEmail, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: message //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    return transport.sendMail(mailOptions);
}

function createTransport() {
    return nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: senderEmail, // Your email id
            pass: 'adrx03101994ianx' // Your password
        }
    });
}

export const sendMessageByPushNotification = (userId, message, subject) => {
    return new Promise((resolve, reject) => {
        User.findById(userId)
            .then(user => {
                let values = preparePushCredentialsAndMessage(user.device.registrationId, message, subject)
                sendMessageByPush(values.notification, values.credentials)
                    .then(result => {
                        historicService.saveHistoric(message, subject, user._id, "push");
                        resolve(result);
                    })
                    .catch(err => reject(err));
            })
    })
}

function preparePushCredentialsAndMessage(registrationId, message, subject) {
    const credentials = {
        IonicApplicationID: "5660dc65",
        IonicApplicationAPItoken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNmE0NjE2OS04OTRhLTQxNGUtODM1Ny1mMzZiNTg0MDA0MmMifQ.KmkjwtquS6DoJTrBayiJ7sGoNkRB3eFub5thk31_Wqw"
    };

    const notification = {
        "tokens": registrationId,
        "profile": "test",
        "notification": {
            "title": subject,
            "message": message,
            "android": {
                "title": subject,
                "message": message
            },
            "ios": {
                "title": "Hello",
                "message": "Hello iOS!"
            }
        }
    };

    return {
        credentials: credentials,
        notification: notification
    };
}

function sendMessageByPush(notification, credentials) {
    const postData = querystring.stringify(notification);

    var options = {
        hostname: 'api.ionic.io',
        path: '/push/notifications',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + credentials.IonicApplicationAPItoken
        }
    };

    return new Promise((resolve, reject) => {
        //console.log("ionic token"+credentials.IonicApplicationAPItoken);
        var req = https.request(options, function(res) {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                //console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function(e) {
            reject("Falha ao enviar: " + e);
        });

        req.write(JSON.stringify(notification));
        req.end();
        resolve("Enviado com sucesso");
    })
}

exports.sendMessage = function(credentials, notification, callback) {


}