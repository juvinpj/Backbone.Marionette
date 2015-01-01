MyApp.myController = {
  categories: function(){ 
      var categoriesView = new MyApp.CategoriesView({
        collection: MyApp.categories
      });
      MyApp.mainRegion.show(categoriesView);
  },
  event: function(categoryId){ 
      var eventsView = new MyApp.EventsView({
        collection: MyApp.events,
        categoryId : categoryId
      });
      MyApp.mainRegion.show(eventsView);
  },
  addCategory: function(){ 
      var addCategoryView = new MyApp.AddCategoryView({});
      MyApp.mainRegion.show(addCategoryView);
  },
  addEvent: function(categoryId){ 
      var category =  MyApp.categories.get(categoryId);
      var addEventView = new MyApp.AddEventView({
        model  : new MyApp.Event({eventType: category.get("category"), parentCId : categoryId }),
        editMode : false
      });
      MyApp.mainRegion.show(addEventView);
  },
  editEvent: function(categoryId, eventId){ 
      var category =  MyApp.categories.get(categoryId);
      var eventModel = MyApp.events.get(eventId);
      var addEventView = new MyApp.AddEventView({
        model  : eventModel,
        editMode : true
      });
      MyApp.mainRegion.show(addEventView);
  }
};
