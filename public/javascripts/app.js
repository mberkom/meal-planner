/* Main Module
 * AngularJS App
 * @copyright Daniel Berkompas, 2013
 */
define("app", ["jquery", "lodash", "jquery-ui", "angular", "controllers", "directives"], function($, _) {
  var angular = window.angular,
      appName = "mealPlanner",
      baseUrl = "/javascripts/templates/";

  // -------------------------------------------
  // Configure Application/Routes
  // -------------------------------------------
  angular.module(appName, ["services", "controllers", "directives"]).
  config(function($routeProvider) {
    $routeProvider.
    when("/group/new",     { templateUrl: baseUrl + "group/new.html", controller: "NewGroupMealCtrl" }).
    when("/scheduled/new", { templateUrl: baseUrl + "scheduled/new.html", controller: "NewScheduledMealCtrl" }).
    when("/meals/:id",     { templateUrl: baseUrl + "group/show.html", controller: "ShowMealCtrl" }).
    otherwise({ redirectTo: "/", templateUrl: baseUrl + "start.html", controller: "StartCtrl" })
  });

  // Bootstrap the app
  angular.bootstrap(document, [appName]);
});
