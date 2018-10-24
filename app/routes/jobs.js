import Route from '@ember/routing/route';

export default Route.extend({
	model() {
    return Ember.$.getJSON('http://cors.io/?u=https://jobs.github.com/positions.json?').then((data) => {
       return data;
	})},

	setupController(controller,model) {
  		 this._super(controller,model);
   		controller.set('jobs',model);
 }
});


/*  default Route.extend({
	 model() {
    return this.store.findAll('jobs');
	}
}); */ 