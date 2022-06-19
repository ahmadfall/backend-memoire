var express = require('express');
const { db } = require('../database');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
var router = express.Router();
async function verifySession(req, res, next) {

    const session = req.session.loggedin;


    if (session === undefined) {

        // res.sendStatus(400)
        return res.json("veuilez bien vous connecter d'abord");
    } else {
        return next()




    }
}

router.get('/monprofil', verifySession, async (req, res, next) => {

    const email = req.session.name;

    user = await db.getUserByEmail(email)
        .then((result) => {

            return res.json(result)

        })
        .catch((err) => {
            return console.log(err)
        })


})

let password;
router.put('/modifiePassword', verifySession, async (req, res, next) => {
    //l'idee on dmd de saisir l'ancien mot d pass,puis on verifie la base s'il est conforme 
    //si oui on le redirige vers un nouveau page ,on l'invite a saisir un nouveau mot de passe
    //enfin ,on met a jour et le notifie ca new password

 
    const email = req.session.name;
    let ancienPassword = req.body.ancien;// mot d pass a saisir avant de modifier
    const salt = genSaltSync(10);
    let crypt = hashSync(ancienPassword, salt)

    let newPassword = req.body.changePassword;
    user = await db.getUserByEmail(email)
        .then((result) => {
            let checkPassword = compareSync(crypt, result.password)
            if (checkPassword) {
                // const salt = genSaltSync(10);
                // password = hashSync(newPassword, salt);
        //   return  res.redirect('http://localhost:4000/profil/newPassword') 
        res.render('login', {
            title: 'login',
            token: req.query.token
        });  
        res.redirect('/auth/login')
            }
//  console.log(password)
            

        })
        // .then((result) => {
        //     updatePassword = db.modifyPassword(password)
        //         .then(() => {
        //             res.send(password)
        //         })
        // })
        .catch((err) => {
            return console.log(err)
        })


})
router.put('/newPassword', verifySession, async (req, res, next) => {
    //l'idee on dmd de saisir l'ancien mot d pass,puis on verifie la base s'il est conforme 
    //si oui on le redirige vers un nouveau page ,on l'invite a saisir un nouveau mot de passe
    //enfin ,on met a jour et le notifie ca new password
    const email = req.session.name;
    let ancienPassword = req.body.ancien;// mot d pass a saisir avant de modifier
   
    let newPassword = req.body.changePassword;
  
    const salt = genSaltSync(10);
    let crypt = hashSync(newPassword, salt)
    
            updatePassword = db.modifyPassword(newPassword)
            .then((result)=>{
                 res.json(result)
            })
            .catch(()=>{

            })
        
        


})


router.get('/mescommande', verifySession, async (req, res, next) => {

    const email = req.session.name;


    let idClient;
    user = await db.getUserByEmail(email)
        .then((result) => {
            return idClient = result.id

        })
        .then((result) => {
            command = db.transaction(idClient)
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => {
                    return res.json(err)
                })

        }).catch((err) => {
            console.log(err)
        })
        .catch((err) => {
            return console.log(err)
        })

})

router.post('/temoignage', verifySession, async (req, res, next) => {

    const email = req.session.name;
    let description = req.body.description;
    let username, name, id;

    user = await db.getUserByEmail(email)
        .then((result) => {
            username = result.username;
            name = result.name;
            id = result.id;
            return result

        })
        .then((result) => {
            user = db.inserTemoignage(description, id)
                .then((result) => {
                    res.sendStatus(200)
                })
        })
        .catch((err) => {
            return console.log(err)
        })


})




module.exports = router;