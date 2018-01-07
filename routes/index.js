'use strict';

var router = express.Router();

const error = require('./error.js');

/* GET home page. */
const index = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




export default app => {
  app.use('/', index);
  app.use(error);
}