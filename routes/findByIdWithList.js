var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


/* Composant générique findByIdWithList pour lire un enreg via son Id mongodb 
+ une liste d'une autre collection via la variable modelList dans config_actions.json */
/* GET data from _id into url  http://localhost:3000/formUser/5d2855f6181abe6e1b5f697c */
router.route('/:_id').get(function (req, res) {
    var path = "/" + req.originalUrl.split('/')[1];
    var type = req.method;

    global.schemas[actions_json[type+path].modelName].find({_id: new ObjectId(req.params._id)}, 
        function (err, result) {
            if (err) { throw err; }
            // console.log('data from id findByIdWithList : ', result);
            global.schemas[actions_json[type+path].modelList].find({}, function(err, list) {
    
                res.render(actions_json[type+path].view, {
                    title: actions_json[type+path].title,
                    libelle: actions_json[type+path].libelle,
                    form_action: actions_json[type+path].form_action,
                    data: result[0],
                    liste: list
                });
            });
            
        }
    );
});

module.exports = router;