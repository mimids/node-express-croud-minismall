var express = require('express');
var router = express.Router();

/* GET view page without to access to the database */
router.get('/', function(req, res, next) {
        var path = "/" + req.originalUrl.split('/')[1];
        var type = req.method;
        console.log("from getView ");
    res.render(global.actions_json[type+path].view, {
                    title: global.actions_json[type+path].title , 
                    stitle: global.actions_json[type+path].stitle , 
                    libelle: global.actions_json[type+path].libelle, 
                    form_action: global.actions_json[type+path].form_action
    });
});
module.exports = router;