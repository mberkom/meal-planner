/*
 * mealPlanner Routes
 * AngularJS routes for the app mealPlanner.
 * @copyright Daniel Berkompas, 2013
 */
define("routes", ["angular"], function() {
  var baseUrl = "/javascripts/templates/";

  angular.module("mealPlanner", []).
  config(['$routeProvider', function($routeProvider) {

    // Configure the routes
    $routeProvider
    .when("/group/new", { templateUrl: baseUrl + "new_group.html", controller: "NewGroupMealCtrl" })
    .otherwise({ redirectTo: "/", templateUrl: baseUrl + "start.html" })
    
  }]);
});