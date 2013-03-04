define(["angular"], function() {
  var angular = window.angular;

  // Routes
  angular.module("home", []).
        config(['$routeProvider', function($routeProvider) {
          $routeProvider.otherwise({redirectTo: "/"})
        }]);

  // Controllers
  angular.module("home").controller("BtnCtrl", function($scope) {
    $scope.createGroupMeal = function() {
      alert("You want to create a group meal!");
    };

    $scope.createMealSchedule = function() {
      alert("You want to create a meal schedule!");
    };
  });
});
