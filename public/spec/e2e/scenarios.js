'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

var addMealItem = function(quantity, name) {
  input("newItemQuantity").enter(quantity);
  input("newItemName").enter(name);
  element("#addBtn").click();
};

describe('meal-planner', function() {

  describe('creating a meal', function() {
    beforeEach(function() {
      window.localStorage.clear();
      browser().navigateTo("/");
      browser().navigateTo("/#/group/new");
      sleep(0.2);
    });

    it('the header should display "Create a Group Meal"', function() {
      expect(element("h1").html()).toEqual("Create a Group Meal");
    });

    it('the button should say "Create Meal"', function() {
      expect(element("a.btn.btn-cupid-green").html()).toEqual("Create Meal");
    });

    it('lets you create a meal', function() {
      input("meal.name").enter("Test Meal");
      input("meal.date").enter("09/21/2020");
      input("meal.location").enter("Somewhere cool");

      // Add items
      addMealItem("5", "Barrels of Salad Dressing");
      addMealItem("10", "Bowls of Salad");     
      expect(repeater(".items").count()).toBe(2);

      // Test the resulting page
      element("#saveBtn").click();
      expect(element("h1").text()).toMatch(/Test Meal/);
      expect(repeater(".items").count()).toBe(2);
    });
  });

  // describe('Phone list view', function() {

  //   beforeEach(function() {
  //     browser().navigateTo('../../app/index.html#/phones');
  //   });


  //   it('should filter the phone list as user types into the search box', function() {
  //     expect(repeater('.phones li').count()).toBe(20);

  //     input('query').enter('nexus');
  //     expect(repeater('.phones li').count()).toBe(1);

  //     input('query').enter('motorola');
  //     expect(repeater('.phones li').count()).toBe(8);
  //   });


  //   it('should be possible to control phone order via the drop down select box', function() {
  //     input('query').enter('tablet'); //let's narrow the dataset to make the test assertions shorter

  //     expect(repeater('.phones li', 'Phone List').column('phone.name')).
  //         toEqual(["Motorola XOOM\u2122 with Wi-Fi",
  //                  "MOTOROLA XOOM\u2122"]);

  //     select('orderProp').option('Alphabetical');

  //     expect(repeater('.phones li', 'Phone List').column('phone.name')).
  //         toEqual(["MOTOROLA XOOM\u2122",
  //                  "Motorola XOOM\u2122 with Wi-Fi"]);
  //   });


  //   it('should render phone specific links', function() {
  //     input('query').enter('nexus');
  //     element('.phones li a').click();
  //     expect(browser().location().url()).toBe('/phones/nexus-s');
  //   });
  // });


  // describe('Phone detail view', function() {

  //   beforeEach(function() {
  //     browser().navigateTo('../../app/index.html#/phones/nexus-s');
  //   });


  //   it('should display nexus-s page', function() {
  //     expect(binding('phone.name')).toBe('Nexus S');
  //   });


  //   it('should display the first phone image as the main phone image', function() {
  //     expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.0.jpg');
  //   });


  //   it('should swap main image if a thumbnail image is clicked on', function() {
  //     element('.phone-thumbs li:nth-child(3) img').click();
  //     expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.2.jpg');

  //     element('.phone-thumbs li:nth-child(1) img').click();
  //     expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.0.jpg');
  //   });
  // });
});
