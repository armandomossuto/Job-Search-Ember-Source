import Route from '@ember/routing/route';

export default Route.extend({
	model(params) {
    return Ember.$.getJSON('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description='+params.search+'&location='+params.location).then((data) => {
       return data;
	})},

	setupController(controller,model) {
  		 this._super(controller,model);
   		controller.set('jobs',model);
 }
});
