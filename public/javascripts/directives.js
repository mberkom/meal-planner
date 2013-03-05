/*
 * Directives Module
 * AngularJS directives for mealPlanner module.
 * @copyright Daniel Berkompas, 2013
 */
define("directives", ["angular"], function() {
  var angular = window.angular;

  // Create directives module
  angular.module("directives", []);
  var module = angular.module("directives");
  
  /*
   * Public: Datepicker Directive
   * Binds a jQuery UI datepicker to the given element.
   *
   * Examples:
   *   <input type="text" datepicker ng-model="date" />
   */
  module.directive('datepicker', function($parse) {
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