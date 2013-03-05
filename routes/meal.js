var Meal = require("../models/meal");

/*
 * GET meals listing.
 */
exports.list = function(req, res) {
  Meal.find({}, function(err, meals) {
    res.json(200, meals);
  });
};

/*
 * GET a particular meal.
 */ 
exports.show = function(req, res) {
  Meal.find({_id: req.params.id}, function(err, meals) {
    if(err) res.json(404, { status: 404, message: "Meal not found." });
    res.json(200, meals[0]);
  });
};

/*
 * Create a new meal.
 */
exports.create = function(req, res) {
  var json = JSON.parse(req.body.meal),
      meal = new Meal(json);

  meal.save(function(err) {
    if(err) req.json(500, { status: 500, message: "Could not save meal." });
    res.json(200, { status: 200, message: "Meal successfully saved.", meal: meal });
  });
};