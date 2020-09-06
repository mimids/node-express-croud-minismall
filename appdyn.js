var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require("fs");// for Dynamic

/* chargement configuration JSON des actions --> controleurs */
global.actions_json = JSON.parse(fs.readFileSync("./routes/config_actions.json", 'utf8'));// for Dynamic


var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function () {
  console.log('partials registered');
});
//-----------------------------------
// helper compare wo tsukutta


hbs.registerHelper('compare', function (lvalue, rvalue, options) {
   console.log("####### COMPARE lvalue :", lvalue, " et rvalue: ", rvalue);
 

  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  var operator = options.hash.operator || "==";

  var operators = {
    '==': function (l, r) {
      if(typeof(lvalue)=="object"){
        return  JSON.stringify(l)==JSON.stringify(r);
      }else{
        return l == r;
      }
    }
  }
  if (!operators[operator])
    throw new Error("'compare' doesn't know the operator " + operator);
  var result = operators[operator](lvalue, rvalue);
  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});



//-----------mongoose
global.schemas = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mini', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) {
    throw err;
  } else console.log('-----------------Connected mongoose-----------------');
});
// chargement des schémas depuis le fichier de configuration JSON dans une variable
var database_schemas = JSON.parse(fs.readFileSync("database_schemas.json", 'utf8'));
// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in database_schemas) {
  global.schemas[modelName] = mongoose.model(modelName,
    database_schemas[modelName].schema,
    database_schemas[modelName].collection);
}



//-----------------------------------
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./dynamicRouter')(app); // for Dynamic





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
