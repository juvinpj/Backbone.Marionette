
// add backbone.marionette into the window
require("./main");

MyApp = new Backbone.Marionette.Application();

require("./view/views");
require("./model/models");
require("./collection/collections");
require("./controller/controllers");

MyApp.myController = new MyApp.MyController();

myAppRouter  = Backbone.Marionette.AppRouter.extend({
    controller: MyApp.myController,
    appRoutes: {
      "": "categories",
      "categories": "categories",
      "event/:event": "event",
      "addCategory": "addCategory",
      "addEvent/:categoryId": "addEvent",
      "editEvent/:categoryId/:eventId": "editEvent"
    }
});


MyApp.on("start", function(options){
   var categoriesView = new MyApp.CategoriesView({
    collection: MyApp.categories
  });
  MyApp.layout = new MyApp.AppLayout();
  Backbone.$('body').append(MyApp.layout.render().el);
  MyApp.myRouter = new myAppRouter();

  if (Backbone.history){
    Backbone.history.start();
  }
});

Backbone.$(function(){
  MyApp.categories  = new MyApp.Categories([
      new MyApp.Category({ category: 'Birthdays', events: 0 }),
      new MyApp.Category({ category: 'Anniversaries', events: 0 }),
      new MyApp.Category({ category: 'Holidays', events: 0 })
  ]);

  MyApp.events = new MyApp.Events();
  MyApp.start();
});
