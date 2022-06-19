var express = require('express');
var router = express.Router();
var { connection, db } = require('../database.js');
const multer = require('multer')
const path = require('path');
const { validate, linkSchema } = require('../validator/valid');
const { ELOOP } = require('constants');
const { response } = require('express');
const { info } = require('console');
const { verify } = require('crypto');




//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

})

var upload = multer({
    storage: storage

});

router.post('/service', verifySession, upload.single('image'), validate(linkSchema), async (req, res) => {
  

    let { Name_Service, Description_Service, Prix_Service, heure_depart, nbre_place } = req.body;


     console.log(heure_depart, req.session)

    const image = req.file.filename;

    enregistrement = await db.insertService(Name_Service, Prix_Service, Description_Service, image, heure_depart, nbre_place)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.sendStatus(400)
        })





});
/**verifySession */

router.get('/service', async (req, res, next) => {
    console.log(req.session)
    liste_service = await db.allService()
        .then((result) => {
            return res.json(result)
        }).catch((error) => {
            res.sendStatus(400)
        })

})



router.put('/:id', verifySession, upload.single('image'), async (req, res, next) => {
    // res.render('miseajour');
    let idService = req.params.id
    const image = req.file.filename;
    let { Name_Service, Prix_Service, Description_Service, heure_depart, nbre_place } = req.body;


    exist = await db.getOne(idService)
        .then((result) => {


            liste_service = db.updateService(Name_Service, Prix_Service, image, Description_Service, heure_depart, nbre_place, result)
                .then((response) => {
                    res.sendStatus(200)
                })
        }).catch((err) => {
            console.log(err)
        })



})

router.delete('/delete/:id', verifySession, async (req, res, next) => {

    let idService = req.params.id;


    let cool = await db.getOneService(idService)

        .then((result) => {

            supprimer = db.deleteService(result).then((response) => {
                res.json(response)
            })

        })

        .catch((err) => {

            res.json(err)



        });







})


router.post('/apropos', verifySession, upload.single('image'), async (req, res) => {
    // res.render('service');

    let { description } = req.body;




    const image = req.file.filename;

    enregistrement = await db.insertPropo(description, image)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.sendStatus(400)
        })





});
router.get('/apropos', verifySession, async (req, res, next) => {

    const email = req.session.name;

    const info = await db.Apropos()
        .then((result) => {

            return res.json(result)

        })
        .catch((err) => {
            return console.log(err)
        })


})

router.get('/temoignage', verifySession, async (req, res, next) => {

    const email = req.session.name;

    const info = await db.AllTemoignage()
        .then((result) => {

            return res.json(result)

        })
        .catch((err) => {
            return console.log(err)
        })


})


async function verifySession(req, res, next) {

    const session = req.session.loggedin;


    if (session === undefined) {


        return res.json("veuilez bien vous connecter d'abord");
    } else {
        let user = req.session.name;
        userfound = await db.getUserByEmail(user)
            .then((result) => {
                if (result.role === "admin") {
                    next()
                } else {
                    res.json('vous n\'etes pas un administrateur')
                }
            }).catch((err) => {
                return err
            })




    }
}


module.exports = router;