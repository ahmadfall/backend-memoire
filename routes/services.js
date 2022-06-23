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

        //callBack(null, file.fieldname + '-' + Date.now() )
    }

})

var upload = multer({
    storage: storage

});
//, validate(linkSchema)
router.post('/service', upload.single('image'), async (req, res) => {

    //
    let { Name_Service, Description_Service, Prix_Service, heure_depart, nbre_place } = req.body;


    // console.log(heure_depart, req.session)

    // const image = req.file.filename;
    const image = req.file;
    console.log(Name_Service, image)
    // enregistrement = await db.insertService(Name_Service, Prix_Service, Description_Service, image, heure_depart, nbre_place)
    //   .then((result) => {
    //     res.sendStatus(200)
    // })
    //.catch((err) => {
    //    res.sendStatus(400)
    //})





});
/**verifySession */

router.get('/service', async (req, res, next) => {
    //  const token = req.headers['authorization'];
    // const token = req.headers.authorization;
    // let obj = JSON.parse(token)


    // console.log(obj.name)
    liste_service = await db.allService()
        .then((result) => {
            return res.json(result)
        }).catch((error) => {
            res.sendStatus(400)
        })

})



router.put('/:id', upload.single('image'), async (req, res, next) => {
    // res.render('miseajour');
    let idService = req.body.idService
    // let idService = req.params.id
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

router.delete('/delete/:id', async,verifySession, (req, res, next) => {

    //let idService = req.params.id;
    let idService = req.body.idService

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









router.get('/temoignage',  async (req, res, next) => {



    const info = await db.AllTemoignage()
        .then((result) => {

            return res.json(result)

        })
        .catch((err) => {
            return console.log(err)
        })


})


async function verifySession(req, res, next) {

    const token = req.headers.authorization;
    let obj = JSON.parse(token)

    let user = obj.name;
    // const session = obj.loggedin;

    //console.log(session, user)

    if (user) {
        next()
        // let user = req.session.name;
        userfound = await db.getUserByEmail(user)
            .then((result) => {
                console.log(result[0].role)
                if (result[0].role === "admin") {
                    console.log(result[0].role)
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