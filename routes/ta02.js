//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

let names = ["Sam", "Steven"]

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    names: names,
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
  });
});

router.post('/addUser', (req, res, next) => {
  const user = req.body['add-user'];
  console.log(user);
  names.push(user);
  res.redirect('/ta02');
});

router.post('/removeUser', (req, res, next) => {
  const user = req.body['user'];
  console.log(user);
  
  if(names.indexOf(user) != -1){
    names.splice(names.indexOf(user), 1);
  }

  res.redirect('/ta02');
});



module.exports = router;
