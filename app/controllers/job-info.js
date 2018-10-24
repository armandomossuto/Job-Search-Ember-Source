import Controller from '@ember/controller';

export default Controller.extend({

	queryParams: ['job'],

	job: '',
	job_object: Ember.computed('job', function() {
		return JSON.parse(this.get('job'));
	})

});
