//Categories Collection
//Holds the details of the all the categories present in the application
MyApp.Categories = Backbone.Collection.extend({
  model: MyApp.Category
});

//MyEvents Collection
//Holds the details of the all the events present in a perticular Category.
MyApp.MyEvents = Backbone.Collection.extend({
  model: MyApp.MyEvent
});
