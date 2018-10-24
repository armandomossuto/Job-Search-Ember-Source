import Controller from '@ember/controller';



export default Controller.extend({

  	jobs: '',

  	total_pages: Ember.computed('jobs', function() {
  		return parseInt((this.get('jobs').length)/8);
  		}),

  	pages_array: Ember.computed('total_pages', function() {
  		let array = [];
  		for(let i=0;i<this.get('total_pages');i++) {
  			array.push(i+1);
  		}
  		return array;
  		}),

  	jobs_displayed: Ember.computed('jobs', 'page', function() {
  		let page = this.get('page')-1;
  		return this.get('jobs').slice((page*8),(page*8)+8);
  		}),

	queryParams: ['search','location', 'page'],
	search:'',
	location:'',
	page: 1,

	actions: {
		changePage(page_number) {
			this.set('page', page_number);
		},

		gotoJob(job_object) {
			this.transitionToRoute('job-info', { queryParams: { job: JSON.stringify(job_object) }});
		}
	}



});
