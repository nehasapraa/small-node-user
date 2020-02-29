const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get(['/','/users'], async (req, res, next) => {
  await req.app.get('db').users.find({}, {
        order: [{field: 'created_at', direction: 'desc'}]
  }).then(function(users) {
    res.status(200).json({status:'success', users});
  }).catch(err => next(err));
});

router.post('/users', async(req, res, next) => {
  bcrypt.hash(req.body.password_digest, saltRounds, function (err, hash) {
    req.app.get('db').users.insert({username: req.body.username,
                                    email: req.body.email,
                                    password_digest: hash,
                                    is_admin: (req.body.is_admin) ? req.body.is_admin:false})
    .then(function(data) {
          res.status(200).json({status:'success', message:'User add',user:data});
    }).catch(err => next(err));
  });
});

router.delete('/user/:id', async(req, res, next) => {
  req.app.get('db').users.destroy({id:req.params.id}).then(data =>  {
    res.status(200).json({status:'success', message:'User Deleted', user:data});
  }).catch(err => next(err));
});

router.get('/user/:name', async(req, res, next) => {
  await req.app.get('db').users.find({username:req.params.name}, {
                order: [{field: 'created_at', direction: 'desc'}]
  }).then(function(users) {
        res.status(200).json({status:'success', users});
  }).catch(err => next(err));
});

module.exports = router;