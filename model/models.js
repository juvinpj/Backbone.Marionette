//Category model
//This model holds the details of a category
MyApp.Category = Backbone.Model.extend({
	defaults: {
		events: 0,
		category : ''
	}
});

//MyEvent model
//This model holds the details of a event
MyApp.MyEvent = Backbone.Model.extend({
	defaults: {
		eventName: '',
		eventDate: '',
		eventType:''
	}
});
