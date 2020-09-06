/* ******************************************************
**  Module générique pour faire un "populate()" sans filtre *
** ******************************************************/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var path = "/" + req.originalUrl.split('/')[1];
    var type = req.method;
    var model = global.actions_json[type + path].modelName;
    var pop_ref = global.actions_json[type + path].pop_ref;

    global.schemas[model].find({}).populate(pop_ref).exec(function (err, result) {
        if (err) {
            console.log("error: ", err);
            return handleError(err);
        } else {
            console.log(result);
            if (result.length == 0) result = null;
            if (global.actions_json[type+path].return_type == null) {
                res.render(global.actions_json[type + path].view, { title: global.actions_json[type + path].title, data: result });
            } else {
                res.send(JSON.stringify(result));
            }

        }
    });
});

module.exports = router;