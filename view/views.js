
MyApp.AddCategoryView = Backbone.Marionette.ItemView.extend({
  tagName: "table",
  id: "add-category",
  className: "table-striped table-bordered main_table",
  template: "#add-category",

  events: {
    'click .save img': 'saveCategory',
    'click .back img': 'cancel'
  },
  saveCategory : function () {
    var value =this.$('#new-category').val();
    if(value){
      MyApp.categories.add({ category: this.$('#new-category').val(), events: 0 });
      MyApp.myRouter.navigate('#categories', true);
    }else {
      return;
    }
    
  },
  cancel : function() {
    MyApp.myRouter.navigate('#categories', true);
  }
  
});



MyApp.CategoryView = Backbone.Marionette.ItemView.extend({
  template: "#category-template",
  tagName: 'tr',
  className: 'angry_cat category',
  
  events: {
    'click .edit img': 'editCategory',
    'click .delete img': 'deleteCategory'
  },
  
  initialize: function(){
    // this.listenTo(this.model, "change:events", this.render);
  },

  editCategory: function(){
    MyApp.myRouter.navigate('#event/'+this.model.cid, true);
  },
  
  deleteCategory: function(){
    this.model.destroy();
  }
});

MyApp.CategoriesView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "category_view",
  className: "table-striped table-bordered main_table",
  template: "#categories-template",
  itemView: MyApp.CategoryView,

  events: {
    'click .add_category img' : 'addCategory'
  },
  
  addCategory: function(){
    MyApp.myRouter.navigate('#addCategory', true);
  },

  initialize: function(){
    // this.listenTo(this.collection, "sort", this.renderCollection);
  },
  
  appendHtml: function(collectionView, itemView){
    collectionView.$("tbody").append(itemView.el);
  }
});

MyApp.EventView = Backbone.Marionette.ItemView.extend({
  template: "#event-template",
  tagName: 'tr',
  className: 'angry_cat event_item',
  
  events: {
    'click .edit img': 'editEvent',
    'click .delete img': 'deleteEvent'
  },
  
  initialize: function(){
    // this.listenTo(this.model, "change:events", this.render);
  },

  editEvent: function(){
     MyApp.myRouter.navigate('#editEvent/'+this.model.get("parentCId")+'/'+this.model.cid, true);
  },
  
  deleteEvent: function(){
    var category =  MyApp.categories.get(this.model.get("parentCId"));
    category.set('events', category.get('events') - 1);
     this.model.destroy();
     }
});

MyApp.EventsView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "events_view",
  className: "table-striped table-bordered main_table",
  template: "#events-template",
  itemView: MyApp.EventView,
  templateHelpers: function() {
    var category =  MyApp.categories.get(this.options.categoryId);
    return { category: category.get('category') };
  },
  events: {
    'click .add_event img' : 'addEvent',
    'click .cancel img': 'cancel'
  },
  
  addEvent: function(){
    MyApp.myRouter.navigate('#addEvent/'+this.options.categoryId, true);
  },

  initialize: function(){
    // this.listenTo(this.collection, "sort", this.renderCollection);
  },
  
  appendHtml: function(collectionView, itemView){
    if(itemView && itemView.model.get('parentCId') === collectionView.options.categoryId){
      collectionView.$("tbody").append(itemView.el);
    }
    
  },
  cancel : function() {
    MyApp.myRouter.navigate('#categories', true);
  }
});


MyApp.AddEventView = Backbone.Marionette.ItemView.extend({
  tagName: "table",
  id: "add-event",
  className: "table-striped table-bordered main_table",
  template: "#add-event",

 events: {
    'click .save img': 'saveEvent',
    'click .cancel img': 'cancel'
  },
  saveEvent : function () {
    var value =this.$('#new-event').val();
    var date = this.$("#datepicker").val();
    var category =  MyApp.categories.get(this.model.get("parentCId"));
    if(value && date){
      this.model.set("eventName",value);
      this.model.set("eventDate",date);
      if(!this.options.editMode){
        category.set('events', category.get('events') + 1);
      }
      MyApp.events.add(this.model);
      MyApp.myRouter.navigate('#event/'+this.model.get("parentCId"), true);
    }else {
      return;
    }
    
  },
  cancel : function() {
     MyApp.myRouter.navigate('#event/'+this.model.get("parentCId"), true);
  },
  onRender: function(){
    this.$( "#datepicker" ).datepicker();
  }
  
});
