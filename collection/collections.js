MyApp.Categories = Backbone.Collection.extend({
  model: MyApp.Category,
  initialize: function(categories){
    this.on('add', function(category){
      if( ! category.get('category') ){
        var error =  Error("Category must have a category name defined before being added to the collection");
        error.name = "NoRankError";
        throw error;
      } 
    }); 
  }
  
});

MyApp.Events = Backbone.Collection.extend({
  model: MyApp.Event,
  initialize: function(events){
    this.on('add', function(event){
      if( ! event.get('eventType') ){
        var error =  Error("Event must have a event Type  defined before being added to the collection");
        error.name = "NoRankError";
        throw error;
      }
    });
  }
});
