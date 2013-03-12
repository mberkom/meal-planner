/*
 * Controllers Module
 * AngularJS controllers for mealPlanner module.
 * @copyright Daniel Berkompas, 2013
 */
define("controllers", [
  "jquery", 
  "lodash", 
  "bootbox",
  "socket.io", 
  "bootstrap", 
  "angular", 
  "services"
], function($, _, bootbox, io) {
  var angular = window.angular
    , bootbox = window.bootbox
    , socket  = io.connect("/");

  // Configure controller dependencies
  angular.module("controllers", ["services"]);

  /*
   * StartCtrl
   * Handles the home page.
   */
  angular.module("controllers").controller("StartCtrl", function($scope, Meal) {
    $scope.recentMeals = _.map(_recentMealIds(), function(mealId) {
      return Meal.get({id: mealId})
    });

    function _recentMealIds() {
      return angular.fromJson(window.localStorage['recentMeals']) || [];
    };
  });

  /*
   * NewGroupMealCtrl
   * Handles creating new group meals.
   */
  angular.module("controllers").controller("EditGroupMealCtrl", function($scope, $http, $location, $routeParams, Meal) {
    // Set up data, using localStorage if possible
    if ($routeParams.id) {
      $scope.existing = true;
      $scope.meal = Meal.get({id: $routeParams.id});
    } else {
      var structure = {
        mealItems: []
      };
      $scope.meal = angular.fromJson(window.localStorage['newGroupMeal']) || structure;
    }

    $scope.headerTitle = function() {
      if($scope.existing == true) {
        return "Edit " + $scope.meal.name;
      } else {
        return "Create a Group Meal";
      }
    };

    $scope.buttonText = function() {
      if($scope.existing == true) {
        return "Save Changes";
      } else {
        return "Create Meal";
      }
    };

    /*
     * Public: Add a meal item to the mealItems array.
     */
    $scope.addMealItem = function() {
      $scope.meal.mealItems.push({
        name:     $scope.newItemName,
        quantity: $scope.newItemQuantity || 0,
        assigned: $scope.newItemAssigned
      });
      _clearNewItemData();
      _focus("newItemQuantity");
    };

    /*
     * Public: Remove a meal from the mealItems array.
     *
     * item - The item Object to remove from the array.
     */
    $scope.removeMealItem = function(item) {
      var newList = _.reject($scope.meal.mealItems, function(i) { return i.name == item.name });
      $scope.meal.mealItems = newList;
      _focus("newItemQuantity");
    };

    /*
     * Public: Convert new Group Meal to JSON.
     */
    $scope.toJson = function() {
      return angular.toJson($scope.meal);
    };

    /*
     * Public: Save the group meal to the API.
     */
    $scope.save = function() {
      if ($scope.existing == true) {
        _saveExistingMeal();
      } else {
        _saveNewMeal();
      }
      _clearLocalStorage();
      $scope.existing = false;
    };

    /*
     * Public: Clear local storage and go back to path "/".
     */
    $scope.cancel = function(redirectTo) {
      var warningText = "Are you sure you want to cancel and go back?  You have unsaved changes.";
      bootbox.dialog(warningText, [{
        "label": "No",
        "callback": function() {}
      },{
        "label": "Yes",
        "class": "btn-plum",
        "callback": function() {
          _clearLocalStorage();
          if ($scope.existing !== true || redirectTo == "home") {
            $location.path("/").replace();
          } else {
            $location.path("/meals/" + $routeParams.id);
          }
          $scope.existing = false;
          $scope.$apply();
        }
      }]);
    };

    /*
     * Internal: Watch toJson() and update localStorage.
     */
    $scope.$watch("toJson()", function(result) {
      window.localStorage['newGroupMeal'] = result;
    });

    /*
     * Private: Save an existing meal.
     */
    function _saveExistingMeal() {
      $http.put("/api/meals/" + $routeParams.id + ".json", $scope.toJson());
      _saveOwner($routeParams.id);
      socket.emit('updatedMeal', $scope.meal);
      $location.path("/meals/" + $scope.meal._id);
    };

    /*
     * Private: Save a new meal.
     */
    function _saveNewMeal() {
      $http.post("/api/meals.json", { meal: $scope.toJson() }).success(function(response) {
        _clearLocalStorage();
        _saveOwner(response.meal._id);
        $location.path("/meals/" + response.meal._id);
      });
    };

    /*
     * Private: Save ownership of the meal.
     */
    function _saveOwner(id) {
      var ownedMeals = angular.fromJson(window.localStorage['ownedMeals']) || [];
      ownedMeals.push(id);
      window.localStorage['ownedMeals'] = angular.toJson(_.unique(ownedMeals));
    };

    /*
     * Private: Clear the new meal item data.
     */
    function _clearNewItemData() {
      $scope.newItemName     = null;
      $scope.newItemQuantity = null;
      $scope.newItemAssigned = null;
    };

    /*
     * Private: Clear Local Storage.
     */
    function _clearLocalStorage() {
      window.localStorage['newGroupMeal'] = null;
    };

    /*
     * Private: Focus on an element of the view.
     */
    function _focus(model_name) {
      $("[ng-model=" + model_name +"]").focus();
    };
  });

  /*
   * ShowMealCtrl
   * Displays meals based on an ID.
   */
  angular.module("controllers").controller("ShowMealCtrl", function($scope, $routeParams, $http, Meal) {
    $scope.meal     = _loadMeal();
    $scope.userName = window.localStorage['userName'] || null;

    socket.on('updatedMeal-' + $routeParams.id, function(meal) {
      $scope.meal = meal;
      _replaceCurrentItem();
      $scope.$apply();
    });

    /*
     * Public: Check whether user is owner of of meal or not.
     */
    $scope.isOwner = function() {
      var ownedMeals = angular.fromJson(window.localStorage['ownedMeals']);
      return _.contains(ownedMeals, $routeParams.id);
    };

    /*
     * Public: Check whether a meal has been loaded or not.
     */
    $scope.mealIsPresent = function() {
      return !_.isUndefined($scope.meal);
    };

    /*
     * Public: Start bringing an item.
     */
    $scope.startBringing = function(item) {
      $scope.currentItem = item;
      $scope.bringingQuantity = $scope.remainingQuantity(item);
      _openBringingInterface();
    };

    /*
     * Public: Abort bringing an item.
     */
    $scope.cancelBringing = function(item) {
      $scope.currentItem = null;
      _closeBringingInterface();
    };

    /*
     * Public: Store the fact that someone is bringing a 
     * quantity of an item.
     */
    $scope.bringCurrentItem = function() {
      var item = _.find($scope.meal.mealItems, { _id: $scope.currentItem._id });
      if(item.bringers == null) item.bringers = [];
      item.bringers.push({
        quantity: $scope.bringingQuantity,
        name:     $scope.userName,
      });
      $scope.currentItem = null;
      $scope.bringingQuantity = null;
      _saveMeal();
      _closeBringingInterface();
    };

    /*
     * Public: Determine remaining quantity for given item.
     *
     * item - An Object
     *
     * Returns a Number.
     */
    $scope.remainingQuantity = function(item) {
      if (item == null) return 0;
      return item.quantity - _broughtQuantity(item);
    };

    /*
     * Public: Determine total quantity for given item.
     *
     * item - An Object
     *
     * Returns a Number.
     */
    $scope.totalQuantity = function(item) {
      if (item.assigned !== null && !_.isUndefined(item.assigned)) {
        return item.quantity;
      } else {
        return _broughtQuantity(item);
      }
    };

    /*
     * Public: Check if an item has its full quantity claimed.
     *
     * item - mealItem to check quantity for.  Assumes that it
     *        contains a .bringers Array.
     *
     * Returns a Boolean.
     */
    $scope.isFilledUp = function(item) {
      if(typeof item === undefined || item == null) return false;
      return $scope.totalQuantity(item) >= item.quantity;
    };

    /*
     * Public: Remove a bringer from an item.
     */
    $scope.removeBringer = function(item, bringer) {
      var originalBringers = item.bringers;
      item.bringers = _.without(originalBringers, bringer);
      _saveMeal();
    };

    /*
     * Public: Convert the current meal to JSON.
     *
     * Returns a JSON string.
     */
    $scope.toJson = function() {
      return angular.toJson($scope.meal);
    };

    /*
     * Internal: Watch userName and update local storage.
     */
    $scope.$watch('userName', function(result) {
      window.localStorage['userName'] = result;
    });

    /*
     * Private: Load the meal. Automatically polls again after
     * 3 seconds to make sure the page stays updated.
     */
    function _loadMeal() {
      if($routeParams.id != null) {      
        return Meal.get({id: $routeParams.id}, function() {
          _replaceCurrentItem();
          _saveToRecents();
        });
      }
    };

    /*
     * Private: Save the meal.
     */
    function _saveMeal() {
      $http.put("/api/meals/" + $routeParams.id + ".json", $scope.toJson());
      socket.emit('updatedMeal', $scope.meal);
    };

    /*
     * Private: Replace currentItem with updated version
     */
    function _replaceCurrentItem() {
      var originalItem = $scope.currentItem;
      if(!_.isUndefined(originalItem) && originalItem !== null) {
        var newVersion = _.find($scope.meal.mealItems, function(i) { 
          return i._id == originalItem._id 
        });
        $scope.currentItem = newVersion;
      }
    };

    /*
     * Private: Save this meal to recents so when you come back
     * you can easily find it again.
     */
    function _saveToRecents() {
      var original = angular.fromJson(window.localStorage['recentMeals']) || [];
      original.push($scope.meal._id);
      window.localStorage['recentMeals'] = angular.toJson(_.compact(_.uniq(original)));
    };

    /*
     * Private: Open interface to say you're bringing an item.
     */
    function _openBringingInterface() {
      $("#bringItemModal").modal();
    };

    /*
     * Private: Close interface to say you're bringing an item.
     */
    function _closeBringingInterface() {
      $("#bringItemModal").modal('hide');
    };

    /*
     * Private: Calculate the brought total, and return it
     */
    function _broughtQuantity(item) {
      var broughtQuantity = 0;
      _.forEach(item.bringers, function(bringer) { broughtQuantity = broughtQuantity + bringer.quantity });
      return broughtQuantity;
    };
  });
});
