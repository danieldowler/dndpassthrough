var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  res.json({message:"Hello"});
});

router.get('/races', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/races')
      .then(res => res.json())
      .then(races =>
        {
          races = races.map(race => {
            return Object.assign({}, race, {
              url: race.url.replace('http://www.dnd5eapi.co/api/races', 'https://dndpassthrough.herokuapp.com/dnd/races')
          })
          })
          response.json(races)
        })
      .catch(err=>{
        console.log(err);
        res.status(500).end();
      });
});

router.get('/skills', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/skills')
      .then(res => res.json())
      .then(skills => response.json(skills))
      .catch(err=>{
        console.log(err);
        res.status(500).end();
      });
});

router.get('/abilities', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/ability-scores')
      .then(res => res.json())
      .then(abilities => response.json(abilities))
      .catch(err=>{
        console.log(err);
        res.status(500).end();
      });
});

module.exports = router;
