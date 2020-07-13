'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();


//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});


exports.sendEmail = functions.firestore.document('contacts/{contactId}').onCreate((snap, context) => {

        const mailOptions = {
            from: snap.data().email,
            to: gmailEmail,
            subject: 'Contact in Website',
            html: '<p>Name: ' + snap.data().name + '</p>'+
                  '<p>E-mail: ' + snap.data().email + '</p>'+
                  '<p>Message: ' + snap.data().message + '</p>'+
                  '<p>Date: ' + snap.data().date + '</p>'
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });
