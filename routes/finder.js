var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var path = "/" + req.originalUrl.split('/')[1];
    var type = req.method;
    global.schemas[actions_json[type+path].modelName].find({}, function (err, result) {
        if (err) {
            throw err;
        }
        // console.log("connexion depuis Finder : ", result);
     //   if (actions_json[type + path].return_type == null) {
            if (actions_json[type + path].modelList != null) {
                // Si modelList défini dans le config_actions.json pour l'action encours alors on fait la requête 
                // et on renvoie la liste des données du model modelList
                global.schemas[actions_json[type+path].modelList].find({}, function (err, result2) {
                    res.render(actions_json[type + path].view, {
                        stitle: actions_json[type + path].stitle,
                        title: actions_json[type + path].title,
                        form_action: actions_json[type + path].form_action,
                        data: result,  // Attention a renvoyer une variable avec un nom generique
                        liste: result2   // utiliser pour liste déroulante de ressources dans formulaire
                    });
                });
            } else {
                res.render(actions_json[type + path].view, {
                    stitle: actions_json[type + path].stitle,
                    title: actions_json[type + path].title,
                    form_action: actions_json[type + path].form_action,
                    data: result  // Attention a renvoyer une variable avec un nom generique
                });
            }
                
        // } else {
        //     res.setHeader('content-type', 'application/json');
        //     res.send(result);
        // }
    });
});

module.exports = router;