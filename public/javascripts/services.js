/*
 * Services Module
 * AngularJS services for mealPlanner module.
 * @copyright Daniel Berkompas, 2013
 */
define("services", ["angular", "angular-resource"], function() {
  var angular = window.angular;

  /*
   * Public: Provides resource for interacting with the Meal API.
   *
   * Examples:
   *
   *   angular.module("test").controller("TestCtrl", function($scope, $routeParams, Meal) {
   *     $scope.meal = Meal.get({_id: $routeParams.id});
   *   })
   *
   * Returns a $resource factory.
   */
  angular.module("services", ['ngResource']).factory('Meal', function($resource) {
    return $resource('/api/meals/:id.json');
  });
});