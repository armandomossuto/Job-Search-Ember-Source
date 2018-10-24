'use strict';



;define('job-search-ember/app', ['exports', 'job-search-ember/resolver', 'ember-load-initializers', 'job-search-ember/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('job-search-ember/components/job-info', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
;define('job-search-ember/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('job-search-ember/controllers/index', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({

		keywords: '',
		location: '',

		actions: {
			searchJobs() {
				if (this.get('keywords') === '' && this.get('location') === '') {
					alert("Please introduce a search term or location");
				} else {
					this.transitionToRoute('jobs', { queryParams: { search: this.get('keywords'), location: this.get('location') } });
					this.set('keywords', '');
					this.set('location', '');
				}
			}
		}
	});
});
;define('job-search-ember/controllers/job-info', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({

		queryParams: ['job'],

		job: '',
		job_object: Ember.computed('job', function () {
			return JSON.parse(this.get('job'));
		})

	});
});
;define('job-search-ember/controllers/jobs', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    jobs: '',

    total_pages: Ember.computed('jobs', function () {
      return parseInt(this.get('jobs').length / 8);
    }),

    pages_array: Ember.computed('total_pages', function () {
      let array = [];
      for (let i = 0; i < this.get('total_pages'); i++) {
        array.push(i + 1);
      }
      return array;
    }),

    jobs_displayed: Ember.computed('jobs', 'page', function () {
      let page = this.get('page') - 1;
      return this.get('jobs').slice(page * 8, page * 8 + 8);
    }),

    queryParams: ['search', 'location', 'page'],
    search: '',
    location: '',
    page: 1,

    actions: {
      changePage(page_number) {
        this.set('page', page_number);
      },

      gotoJob(job_object) {
        this.transitionToRoute('job-info', { queryParams: { job: JSON.stringify(job_object) } });
      }
    }

  });
});
;define('job-search-ember/helpers/app-version', ['exports', 'job-search-ember/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('job-search-ember/helpers/is-current-page', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isCurrentPage = isCurrentPage;
  function isCurrentPage(params /*, hash*/) {
    let [arg1, arg2] = params;
    return arg1 === arg2;
  }

  exports.default = Ember.Helper.helper(isCurrentPage);
});
;define('job-search-ember/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('job-search-ember/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('job-search-ember/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'job-search-ember/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('job-search-ember/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('job-search-ember/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('job-search-ember/initializers/export-application-global', ['exports', 'job-search-ember/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('job-search-ember/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('job-search-ember/models/jobs', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({});
});
;define('job-search-ember/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('job-search-ember/router', ['exports', 'job-search-ember/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('jobs');
    this.route('profile');
    this.route('settings');
    this.route('job-info');
  });

  exports.default = Router;
});
;define('job-search-ember/routes/job-info', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('job-search-ember/routes/jobs', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return Ember.$.getJSON('https://jobs.github.com/positions.json?').then(data => {
        return data;
      });
    },

    setupController(controller, model) {
      this._super(controller, model);
      controller.set('jobs', model);
    }
  });
});
;define('job-search-ember/routes/profile', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('job-search-ember/routes/settings', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('job-search-ember/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("job-search-ember/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dp8XX/v4", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\"],[15,\"navbar\",[]],[0,\"\\n\\t\"],[10],[0,\"\\t\\n\\t\\t\"],[1,[21,\"outlet\"],false],[0,\"\\n\\n\\t\\t\"],[15,\"footbar\",[]],[0,\"\\n\\n\"],[10],[0,\"\\n\"]],\"hasEval\":true}", "meta": { "moduleName": "job-search-ember/templates/application.hbs" } });
});
;define("job-search-ember/templates/footbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "t+SpAlvV", "block": "{\"symbols\":[],\"statements\":[[7,\"footer\"],[11,\"class\",\"page-footer font-small\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"footer-copyright text-center py-3\"],[9],[0,\"© 2018 Armando Mossuto\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/footbar.hbs" } });
});
;define("job-search-ember/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BAQXpRFv", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"col-centered col-sm-5 text-center\"],[9],[0,\"\\n\\t\\t\"],[7,\"h2\"],[9],[0,\"Welcome to this Demo Job Search Website\"],[10],[0,\"\\n\\t\\t\"],[7,\"h3\"],[9],[0,\"The data is from Github Job Search free Api\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"search-box\"],[9],[0,\"\\n\\t\\t\\t\"],[1,[27,\"input\",null,[[\"value\",\"placeholder\"],[[23,[\"keywords\"]],\"Position, Job, Keywords ...\"]]],false],[0,\"\\n\\t\\t\\t\"],[1,[27,\"input\",null,[[\"value\",\"placeholder\"],[[23,[\"location\"]],\"Location\"]]],false],[0,\"\\n\\t\\t\\t\"],[7,\"button\"],[11,\"type\",\"submit\"],[3,\"action\",[[22,0,[]],\"searchJobs\"]],[9],[0,\" Search \"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/index.hbs" } });
});
;define("job-search-ember/templates/job-info", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oGENUff9", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"job-info\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"job_object\",\"company_logo\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"img\"],[12,\"src\",[23,[\"job_object\",\"company_logo\"]]],[9],[10],[0,\" \\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\"],[7,\"div\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"job-title\"],[9],[0,\" \"],[1,[23,[\"job_object\",\"title\"]],false],[0,\" \"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\" \\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[1,[23,[\"job_object\",\"company\"]],false],[0,\" \"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"img\"],[11,\"src\",\"location-icon.jpg\"],[9],[10],[0,\" \\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[1,[23,[\"job_object\",\"location\"]],false],[0,\" \"],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[1,[23,[\"job_object\",\"type\"]],false],[0,\" \"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\t\\n\\t\"],[7,\"div\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[1,[23,[\"job_object\",\"description\"]],true],[0,\" \"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[7,\"p\"],[11,\"class\",\"bold-text\"],[9],[0,\"How to apply:\"],[10],[0,\" \"],[1,[23,[\"job_object\",\"how_to_apply\"]],true],[0,\" \"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/job-info.hbs" } });
});
;define("job-search-ember/templates/jobs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GKyjh+Ed", "block": "{\"symbols\":[\"page_number\",\"job\"],\"statements\":[[0,\"  \"],[7,\"div\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"jobs_displayed\"]]],null,{\"statements\":[[0,\"  \\t\\t\"],[7,\"div\"],[11,\"class\",\"display-job\"],[3,\"action\",[[22,0,[]],\"gotoJob\",[22,2,[]]]],[9],[0,\"\\n\"],[4,\"if\",[[22,2,[\"company_logo\"]]],null,{\"statements\":[[0,\"          \"],[7,\"img\"],[12,\"src\",[22,2,[\"company_logo\"]]],[9],[10],[0,\" \\n\"]],\"parameters\":[]},null],[0,\"  \\t\\t\\t\"],[7,\"div\"],[9],[0,\" \\n  \\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"job-title\"],[9],[1,[22,2,[\"title\"]],false],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[1,[22,2,[\"company\"]],false],[0,\" \"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"img\"],[11,\"src\",\"location-icon.jpg\"],[9],[10],[0,\" \\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[9],[0,\" \"],[1,[22,2,[\"location\"]],false],[0,\" \"],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"  \\t\\n\\t\"],[7,\"nav\"],[11,\"aria-label\",\"Page navigation example\"],[9],[0,\"\\n  \\t\\t\"],[7,\"ul\"],[11,\"class\",\"pagination\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"pages_array\"]]],null,{\"statements\":[[4,\"if\",[[27,\"is-current-page\",[[22,1,[]],[23,[\"page\"]]],null]],null,{\"statements\":[[0,\"  \\t\\t\\t\\t\\t\"],[7,\"li\"],[11,\"class\",\"selected-page page-item\"],[9],[7,\"a\"],[11,\"class\",\"page-link\"],[9],[1,[22,1,[]],false],[10],[0,\" \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \\t\\t\\t\\t\\t\"],[7,\"li\"],[11,\"class\",\"page-item\"],[9],[7,\"a\"],[11,\"class\",\"page-link\"],[3,\"action\",[[22,0,[]],\"changePage\",[22,1,[]]]],[9],[1,[22,1,[]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[1]},null],[0,\"  \\t\\t\"],[10],[0,\"\\n  \\t\"],[10],[0,\"\\n  \\t\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/jobs.hbs" } });
});
;define("job-search-ember/templates/navbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FOAqTHM6", "block": "{\"symbols\":[],\"statements\":[[7,\"nav\"],[11,\"class\",\"navbar navbar-inverse navbar-static-top\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"collapse navbar-collapse\"],[11,\"id\",\"main-navbar\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[4,\"link-to\",[\"index\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"Home\"],[10]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\\t\"],[4,\"link-to\",[\"jobs\",[27,\"query-params\",null,[[\"search\",\"location\",\"page\"],[\"\",\"\",\"1\"]]]],[[\"tagName\"],[\"li\"]],{\"statements\":[[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"Jobs\"],[10]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\\t\"],[4,\"link-to\",[\"profile\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"Profile\"],[10]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\\t\"],[4,\"link-to\",[\"settings\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"Settings\"],[10]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/navbar.hbs" } });
});
;define("job-search-ember/templates/profile", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "b/H43lBj", "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[9],[0,\"Profile page\"],[10],[0,\"\\n\"],[7,\"p\"],[9],[0,\" This website is a demo for learning purposes. There is no profile page yet.\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/profile.hbs" } });
});
;define("job-search-ember/templates/settings", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Puy/iCce", "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[9],[0,\"Settings page\"],[10],[0,\"\\n\"],[7,\"p\"],[9],[0,\" This website is a demo for learning purposes. There is no settings page yet.\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "job-search-ember/templates/settings.hbs" } });
});
;

;define('job-search-ember/config/environment', [], function() {
  var prefix = 'job-search-ember';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("job-search-ember/app")["default"].create({"name":"job-search-ember","version":"0.0.0+e9532a7e"});
          }
        
//# sourceMappingURL=job-search-ember.map
