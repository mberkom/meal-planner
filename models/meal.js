/*
 * Meal Model
 * Defines mongoose schema, returns Meal "class".
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('localhost', 'meal-planner');

var mealSchema = new Schema({
  name:     String,
  date:     String,
  location: String,
  mealItems: [{
    quantity: Number,
    name:     String,
    assigned: String
  }],
});

module.exports = mongoose.model('Meal', mealSchema);