define("services", ["angular", "angular-resource"], function() {
  var angular = window.angular;

  angular.module("services", ['ngResource']).factory('Meal', function($resource) {
    return $resource('/api/meals/:id.json');
  });
});