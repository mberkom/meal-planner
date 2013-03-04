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
    .when("/group/new", { templateUrl: baseUrl + "group/new.html", controller: "NewGroupMealCtrl" })
    .when("/scheduled/new", { templateUrl: baseUrl + "scheduled/new.html", controller: "NewScheduledMealCtrl" })
    .otherwise({ redirectTo: "/", templateUrl: baseUrl + "start.html" })
    
  }]);
});