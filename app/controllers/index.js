import Controller from '@ember/controller';

export default Controller.extend({

	keywords:'',
	location:'',

	actions: {
		searchJobs() {
			if ((this.get('keywords')==='')&&(this.get('location')==='')) {
				alert("Please introduce a search term or location");
			} else {
				this.transitionToRoute('jobs', { queryParams: { search: this.get('keywords'), location: this.get('location') }});
				this.set('keywords', '');
				this.set('location', '');
			}
		}
	}
});
