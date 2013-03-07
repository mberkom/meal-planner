/*
 * Meal Model
 * Defines mongoose schema, returns Meal "class".
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

mongoose.connect('localhost', 'meal-planner');

var bringers = new Schema({
  name:     String,
  quantity: Number
});

var mealItems = new Schema({
  quantity: Number,
  name:     String,
  assigned: String,
  bringers: [bringers]
});

var mealSchema = new Schema({
  name:     String,
  date:     String,
  location: String,
  mealItems: [mealItems],
});

module.exports = mongoose.model('Meal', mealSchema);