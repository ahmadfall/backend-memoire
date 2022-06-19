var express = require('express');
var router = express.Router();
var { connection, db } = require('../database.js');
// console.log(connection)
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var randtoken = require('rand-token');
//send email
function sendEmail(email, token) {
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'servicetransport2222@gmail.com', // Your email id
            pass: '766475379' // Your password
        }
    });
    var mailOptions = {
        from: 'servicetransport2222@gmail.com',  //tutsmake@gmail.com
        to: email,
        subject: 'Reset Password Link -',
         html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=' + token + '">link</a> to reset your password</p>'
   
    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(1)
        } else {
            console.log(0)
        }
    });
}
//on se sert d1 requete get pour renseigner un info qui pointe le lien de la recuperation
/* home page */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Forget Password Page1 ou mot de pass oublie'
    });
});
/* send reset password link in email */
router.post('/reset-password-email', async function (req, res, next) {
   
    var email = req.body.email;
    console.log(email)

    findpersons = await db.getUserByEmail(email)
        .then((result) => {
            var token = randtoken.generate(20);
            var sent = sendEmail(email, token);
            if (sent != '0') {
                var data = {
                    token: token
                }
                connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function (err, result) {

                    if (err) {
                        return res.json('l\'email n\'existe pas')
                    }
                })

                return res.json('Un lien de modification vous a ete envoye par mail')
            } else {

                return res.json('Something goes to wrong. Please try again')
            }
        })
        .catch((err) => {
            return res.json('l\'email n\'existe pas')
        })

   
})
/* reset page */
//pour qu'il soit gobale
let token;
router.get('/reset-password', function (req, res, next) {
    res.render('reset-password', {
        title: 'Reset Password Page',
        token: req.query.token
    });
});
/* update password to database */
router.post('/update-password', function (req, res, next) {
    // var token = req.body.token;
    
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE token ="' + token + '"', function (err, result) {
        if (err) throw err;
        var type
        var msg
        if (result.length > 0) {
            var saltRounds = 10;
            // var hash = bcrypt.hash(password, saltRounds);
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    var data = {
                        password: hash
                    }
                    connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function (err, result) {
                        if (err) throw err
                    });
                });
            });
            type = 'success';
            msg = 'Your password has been updated successfully';
        } else {
            console.log('2');
            type = 'success';
            msg = 'Invalid link; please try again';
        }
        req.flash(type, msg);
        res.redirect('/auth/login');
    });
})
module.exports = router;