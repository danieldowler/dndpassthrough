var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:"Hello"});
});

router.get('/races', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/races')
      .then(res => res.json())
      .then(races => response.json(races))
      .catch(err=>{
        console.log(err);
        res.status(500).end();
      });
});

//add more endpoints

module.exports = router;
