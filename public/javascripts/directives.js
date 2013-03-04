/*
 * mealPlanner Directives
 * Contains all the AngularJS directives for the mealPlanner app.
 * @copyright Daniel Berkompas, 2013
 */
define("directives", ["jquery", "jquery-ui", "angular"], function($) {
  var angular = window.angular;
  directives = angular.module("mealPlanner");

  // Datepicker Directive
  directives.directive('datepicker', function($parse) {
    return function (scope, element, attrs, controller) {
      var ngModel = $parse(attrs.ngModel);
      $(function(){
        $(element).datepicker({
          onSelect: function (dateText, inst) {
            scope.$apply(function(scope){
              // Change binded variable
              ngModel.assign(scope, dateText);
            });
          }
        });
      });
    }
  });
});