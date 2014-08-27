var controllers = require('../controllers/contacts.js');

module.exports = function (app) {
  // index
  app.get('/', controllers.index);
  
  // add
  app.get('/new', controllers.new);
  
  // show
  app.get('/:id', controllers.show);
  
  // create
  app.post('/create', controllers.create);
  
  // edit
  app.get('/:id/edit', controllers.edit);
  
  // update
  app.put('/:id', controllers.update);
  
  // delete
  app.get('/:id/del', controllers.destroy);
};