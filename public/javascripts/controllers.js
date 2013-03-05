/*
 * mealPlanner Controllers
 * Contains all the AngularJS controllers for the mealPlanner app.
 * @copyright Daniel Berkompas, 2013
 */
define("controllers", ["jquery", "lodash", "angular", "routes"], function($, _) {
  var angular = window.angular;

  /*
   * NewGroupMealCtrl
   * Handles creating new group meals.
   */
  angular.module("mealPlanner").controller("NewGroupMealCtrl", function($scope, $location) {
    // Set up data, using localStorage if possible
    var storedMeal  = angular.fromJson(window.localStorage['newGroupMeal']) || {};
    $scope.name       = storedMeal.name;
    $scope.date       = storedMeal.date;
    $scope.location   = storedMeal.location;
    $scope.mealItems  = storedMeal.mealItems || [];
    $scope.emails     = storedMeal.emails || [];

    /*
     * Public: Add a meal item to the mealItems array.
     */
    $scope.addMealItem = function() {
      $scope.mealItems.push({
        name:     $scope.newItemName,
        quantity: $scope.newItemQuantity || 0,
        assigned: $scope.newItemAssigned
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
      var newList = _.reject($scope.mealItems, function(i) { return i.name == item.name });
      $scope.mealItems = newList;
      _focus("newItemName");
    };

    /*
     * Public: Add an email to the emails array.
     */
    $scope.addEmail = function() {
      $scope.emails.push($scope.newEmail);
      $scope.newEmail = null;
      _focus("newEmail");
    };

    /*
     * Public: Remove an email from the emails array.
     */
    $scope.removeEmail = function(email) {
      var newEmails = _.reject($scope.emails, function(e) { return e == email });
      $scope.emails = newEmails;
    }

    /*
     * Public: Convert new Group Meal to JSON.
     */
    $scope.toJson = function() {
      return angular.toJson({
        name:       $scope.name,
        date:       $scope.date,
        location:   $scope.location,
        mealItems:  $scope.mealItems,
        emails:     $scope.emails
      });
    };

    /*
     * Public: Save the group meal to the API.
     */
    $scope.save = function() {
      alert("I'm being saved!");
    };

    /*
     * Public: Clear local storage and go back to path "/".
     */
    $scope.cancel = function() {
      cancel = confirm("Are you sure you want to cancel and go back to the home page?  You have unsaved changes.")
      if(cancel) {      
        window.localStorage['newGroupMeal'] = null;
        $location.path("/");
      }
    };

    /*
     * Internal: Watch toJson() and update localStorage.
     */
    $scope.$watch("toJson()", function(result) {
      window.localStorage['newGroupMeal'] = result;
    });

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