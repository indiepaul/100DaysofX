var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var Goal = require('../models/Goal');

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://skrypt-goals.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://skrypt-goals.auth0.com/`,
  algorithms: ['RS256']
});

router.get('/', checkJwt, (req, res, next) => {
  Goal.find({ user: req.user.sub })
    .then(goals => res.json(goals))
});

router.post('/', checkJwt, function (req, res, next) {
  if (req.body.newGoal && (req.body.newGoal != "")) {
    const goal = new Goal();
    goal.goal = req.body.newGoal;
    goal.user = req.user.sub;
    goal.save()
      .then(() => res.json(goal))
      .catch((err) => next(err));
  }
  else {
    var err = new Error('Goal Not Set');
    err.status = 404;
    res.send(err);
  }
});

router.post('/:id/log', checkJwt, (req, res, next) => {
  Goal.findOneAndUpdate(
    { _id: req.params.id, user: req.user.sub },
    {
      $push: {
        logs: {
          details: req.body.details,
          link: req.body.link,
          day: req.body.day,
        }
      }
    },
    { new: true }
  )
    .then(goal => {
      res.json(goal.logs[goal.logs.length - 1])
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put('/:id/log', checkJwt, (req, res, next) => {
  Goal.update(
    { _id: req.params.id, user: req.user.sub, "logs.day": req.body.day - 1 },
    {
      $set: {
        "logs.$.details": req.body.details,
        "logs.$.link": req.body.link,
      }
    }
  )
    .then(result => {
      if (result.nModified > 0)
        res.json({ updated: true })
      else
        res.json({ updated: false })
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/:id', checkJwt, function (req, res, next) {
  Goal.findOneAndRemove({ _id: req.params.id, user: req.user.sub })
    .exec()
    .then((goal) => res.json(goal))
    .catch((err) => next(err));
});

module.exports = router;

function date_diff(day, start_date) {
  const dt1 = new Date(start_date)
  const dt2 = new Date(day)
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
}