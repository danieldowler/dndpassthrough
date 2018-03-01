var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', function (req, res, next) {
  res.json({ message: "Hello" });
});

router.get('/races', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/races')
    .then(res => res.json())
    .then(races => {
      races = races.results.map(race => {
        return Object.assign({}, race, {
          url: race.url.replace('http://www.dnd5eapi.co/api/races', 'https://dndpassthrough.herokuapp.com/dnd/races')
        })
      })
      response.json(races)
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.get('/races/:id', (req, response) => {
  fetch(`http://www.dnd5eapi.co/api/races/${req.params.id}`)
    .then(res => res.json())
    .then(races => response.json(races))
      .catch(err=> res.status(500).json()
 )
});

router.get('/skills', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/skills')
    .then(res => res.json())
    .then(races => {
      races = races.results.map(race => {
        return Object.assign({}, race, {
          url: race.url.replace('http://www.dnd5eapi.co/api/skills', 'https://dndpassthrough.herokuapp.com/dnd/skills')
        })
      })
      response.json(races)
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.get('/skills/:id', (req, response) => {
  fetch(`http://www.dnd5eapi.co/api/skills/${req.params.id}`)
    .then(res => res.json())
    .then(skills => response.json(skills))
      .catch(err=> res.status(500).json()
 )
});

router.get('/abilities', (req, response) => {
  fetch('http://www.dnd5eapi.co/api/ability-scores')
    .then(res => res.json())
    .then(abilities => response.json(abilities))
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.get('/abilities/:id', (req, response) => {
  fetch(`http://www.dnd5eapi.co/api/ability-scores/${req.params.id}`)
    .then(res => res.json())
    .then(abilities => response.json(abilities))
      .catch(err=> res.status(500).json()
 )
});

module.exports = router;
