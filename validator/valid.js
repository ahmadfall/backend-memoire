const flash = require("express-flash");
const yup = require("yup");



exports.linkSchema = yup.object({
    body: yup.object({
        Name_Service: yup.string().trim().required("veuillez bien remplir le nom du service"),
        Prix_Service: yup.number().positive().integer().required("veuillez bien remplir le prix du service"),
        Description_Service: yup.string().trim().required("veuillez bien decrire le service")
    }),

});

exports.linkSchema2 = yup.object({
    body: yup.object({
        telephone: yup.number().positive().required("veuillez bien remplir votre numero de telephone"),
        nbre_de_place_reserve: yup.number().positive().integer().required("veuillez bien remplir le nombre de place reserve"),
        idService: yup.number().positive().required("renvoie moi d'identifiant du service")
    }),

});
exports.linkSchema3 = yup.object({
    body: yup.object({
        email: yup.string().email("veuillez renseignez un email valide").required(),
        name : yup.string().trim().lowercase().required("veuillez saisir votre nom "),
        password : yup.number().positive().required("veuillez saisir un mot de passe valide"),
        username: yup.string().trim().lowercase().required("veuillez saisir votre prenom"),
    }),

});



exports.validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body

        });
        return next();
    } catch (erre) {
        next(erre)
    }
};