/*
 * mealPlanner Controllers
 * Contains all the AngularJS controllers for the mealPlanner app.
 * @copyright Daniel Berkompas, 2013
 */
define("controllers", ["angular", "routes"], function() {
  var angular = window.angular;

  /*
   * NewGroupMealCtrl
   * Handles creating new group meals.
   */
  angular.module("mealPlanner").controller("NewGroupMealCtrl", function($scope) {
    $scope.mealItems = [];

    /*
     * Public: Add a meal item to the mealItems array.
     */
    $scope.addMealItem = function() {
      $scope.mealItems.push({
        name: "Caviar",
        who_name: "Another Dude",
        who_email: "another@dude.com"
      });
    };

    /*
     * Public: Save the group meal to the API.
     */
    $scope.save = function() {
      alert("I'm being saved!");
    };
  });

  /*
   * NewScheduledMealCtrl
   * Handles creating new scheduled meals.
   */
  angular.module("mealPlanner").controller("NewScheduledMealCtrl", function($scope) {

  });
});