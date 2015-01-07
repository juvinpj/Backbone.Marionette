
MyApp.AppLayout = Backbone.Marionette.LayoutView.extend({
    template: "#layout-template",
    regions: {
        content: "#content"
    }
});
MyApp.AddCategoryView = Backbone.Marionette.ItemView.extend({
  tagName: "table",
  id: "add-category",
  className: "main_table",
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
  template: '#category-template',
  tagName: 'tr',
  className: 'category',
  
  events: {
    'click .edit img': 'editCategory',
    'click .delete img': 'deleteCategory'
  },

  editCategory: function(){
    MyApp.myRouter.navigate('#event/'+this.model.cid, true);
  },
  
  deleteCategory: function(){
    this.model.destroy();
  }
});

MyApp.CategoriesView = Backbone.Marionette.CompositeView.extend({
  id: "category_view",
  tagName: "table",
  className: "main_table",
  template: "#categories-template",
  childView: MyApp.CategoryView,
  childViewContainer: "tbody",

  events: {
    'click .add_category img' : 'addCategory'
  },
  
  addCategory: function(){
    MyApp.myRouter.navigate('#addCategory', true);
  }
});

MyApp.EventView = Backbone.Marionette.ItemView.extend({
  template: "#event-template",
  tagName: 'tr',
  className: 'event_item',
  
  events: {
    'click .edit img': 'editEvent',
    'click .delete img': 'deleteEvent'
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
  className: "main_table",
  template: "#events-template",
  childView: MyApp.EventView,
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

  attachHtml: function(collectionView, childView, index){
    if(childView && childView.model.get('parentCId') === collectionView.options.categoryId){
      collectionView.$("tbody").append(childView.el);
    }
  },
 
  cancel : function() {
    MyApp.myRouter.navigate('#categories', true);
  }
});


MyApp.AddEventView = Backbone.Marionette.ItemView.extend({
  tagName: "table",
  id: "add-event",
  className: "main_table",
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
