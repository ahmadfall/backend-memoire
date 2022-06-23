
const { name } = require('ejs');
var express = require('express');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
var router = express.Router();
let { connection, db } = require('../database.js');
const { validate, linkSchema3 } = require('../validator/valid');






router.post('/register', async (req, res, next) => {

    const email = req.body.email;
    const name = req.body.name;
    let password = req.body.password;
    let username = req.body.username
    console.log(email,name,password,username)



    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    user = await db.insertUser(name, email, password, username,)
        .then((result) => {
            req.session.user = result
            console.log(req.session)

            return res.sendStatus(200)
        })
        .catch((err) => {
            return res.sendStatus(400)
        })
});





//authenticate user
router.post('/authentication', async function (req, res, next) {



    var email = req.body.email;
    var password = req.body.password;
    //console.log(email,password);

    user = await db.getUserByEmail(email)
        .then((result) => {

            const isValidPassword = compareSync(password, result.password)

            if (isValidPassword) {
                result.password = undefined;
                req.session.loggedin = true;
                req.session.name = email;
                req.session.name1 = result;
                console.log(req.session)

              // return res.sendStatus(200)
              return res.status(200).send(req.session);
               
            }
            return res.sendStatus(400)



        })
        .catch((err) => {
          
            return res.sendStatus(400)
        })


})




// Logout user
router.get('/logout', function (req, res) {
    req.session.destroy();

   
});

module.exports = router;