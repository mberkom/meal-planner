/*
 * mealPlanner Controllers
 * Contains all the AngularJS controllers for the mealPlanner app.
 * @copyright Daniel Berkompas, 2013
 */
define("controllers", ["jquery", "angular", "routes"], function($) {
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
        name:     $scope.newItemName,
        quantity: $scope.newItemQuantity || 0,
        assigned: $scope.newItemAssigned,
        isEditing: false
      });
      _clearNewItemData();
      _focus("newItemName");
    };

    /*
     * Public: Remove a meal from the mealItems array.
     *
     * item - The item Object to remove from the array.
     */
    $scope.removeMealItem = function(item) {
      $scope.mealItems.push.apply($scope.mealItems.splice($scope.mealItems.indexOf(item), $scope.mealItems.length));
      _focus("newItemName");
    }

    /*
     * Public: Save the group meal to the API.
     */
    $scope.save = function() {
      alert("I'm being saved!");
    };

    /*
     * Private: Clear the new meal item data.
     */
    function _clearNewItemData() {
      $scope.newItemName     = null;
      $scope.newItemQuantity = null;
      $scope.newItemAssigned = null;
    }

    /*
     * Private: Focus on an element of the view.
     */
    function _focus(model_name) {
      $("[ng-model=" + model_name +"]").focus();
    }
  });

  /*
   * NewScheduledMealCtrl
   * Handles creating new scheduled meals.
   */
  angular.module("mealPlanner").controller("NewScheduledMealCtrl", function($scope) {

  });
});