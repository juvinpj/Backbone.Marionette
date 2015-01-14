MyApp.Category = Backbone.Model.extend({
	defaults: {
		events: 0,
		category : ''
	}
});

MyApp.Event = Backbone.Model.extend({
	defaults: {
		eventName: '',
		eventDate: '',
		eventType:''
	}
});
