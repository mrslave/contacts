var Contact = require('../models/contacts.js');

// get all contacts
exports.index = function (req, res) {
  Contact.find({}, function(err, docs) {    
	res.render('index', {title : 'Contacts', contacts : docs});
  });
};

// print form for new contact
exports.new = function (req, res) {  
  var filePath = require('path').normalize(__dirname + '/../public/new.html')
  res.sendfile(filePath);
};

// add contact
exports.create = function (req, res) {
  var randomHash = (function () {
    var letters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    return function (keylen) {
      var result = '';	  
      for (var j=0; j < keylen; j++) {
        result += letters[Math.floor(Math.random() * letters.length)];		
      };	  
      return result;
    };
  })();
  var rh = randomHash(20);
  var contact = {    
	id : rh,
	name : req.body.contactname,
	email : req.body.contactemail,
	phone : req.body.contactphone,
	address : req.body.contactaddress,	
	birth : req.body.contactbirth,
	desc : req.body.contactdesc};  
  var contactObj = new Contact(contact);
  contactObj.save(function(err, data) {
    if (err) {
	  console.log('error in add contact: ' + err)
	  res.send(err);
	} else {	  
	  res.redirect('/');
	}
  });
};

// show contact
exports.show = function (req, res) {
  var id = req.params.id;
  Contact.findOne({id : id}, function (err, doc) {
    if (err) {
	  console.log('error in show contact: ' + err);
	  res.send(err);
	}
	else {	  
	  res.render('show', {title : 'Show contact', contact : doc});
	}
  });  
};

// delete contact
exports.destroy = function (req, res) {
  var id = req.params.id;
  Contact.remove({id : id}, function(err){
    if (err) {
	  console.log('error in delete contact: ' + err);
	  res.send(err);
	} else {	  
	  res.redirect('/');
	}
  });
};

// print edit form
exports.edit = function (req, res) {
  var id = req.params.id;
  Contact.findOne( {id : id}, function(err, doc) {    
	if (err) {
	  console.log('error in print edit form: ' + err);
	  res.send(err);
	}
	else {
	  res.render('edit', {title : 'Edit contact', contact : doc});
	}
  });
};

// update contact
exports.update = function (req, res) {
  var id = req.params.id;
  var contact = {
    id : id,	
	name : req.body.contactname,
	email : req.body.contactemail,
	phone : req.body.contactphone,
	address : req.body.contactaddress,	
	birth : req.body.contactbirth,
	desc : req.body.contactdesc};	
  Contact.update({id : id}, contact, function(err){
    if (err) {
	  res.send('error in update contact' + err);
	}
	else {
	  res.redirect('/');	  
	}
  });
};