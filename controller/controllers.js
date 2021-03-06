//My Controller
//This is the main contorller which controlles all the routing of this applcaition
MyApp.MyController =  Backbone.Marionette.Controller.extend( {

  categories: function(){ 
    var categoriesView = new MyApp.CategoriesView({
      collection: MyApp.categories
    });
    MyApp.layout.content.show(categoriesView);
  },

  event: function(categoryId){ 
    var eventsView = new MyApp.EventsView({
      collection: MyApp.myEvents,
      categoryId : categoryId
    });
    MyApp.layout.content.show(eventsView);
  },

  addCategory: function(){ 
    var addCategoryView = new MyApp.AddCategoryView({});
    MyApp.layout.content.show(addCategoryView);
  },

  addEvent: function(categoryId){ 
    var category =  MyApp.categories.get(categoryId);
    var addEventView = new MyApp.AddEventView({
      model  : new MyApp.MyEvent({eventType: category.get("category"), parentCId : categoryId }),
      editMode : false
    });
    MyApp.layout.content.show(addEventView);
  },

  editEvent: function(categoryId, eventId){ 
    var category =  MyApp.categories.get(categoryId);
    var eventModel = MyApp.myEvents.get(eventId);
    var addEventView = new MyApp.AddEventView({
      model  : eventModel,
      editMode : true
    });
    MyApp.layout.content.show(addEventView);
  }
});
