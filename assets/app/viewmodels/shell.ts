import ko = require('knockout');
import app = require('durandal/app');
import router = require('plugins/router');

export function activate() {
    router.makeRelative({moduleId: 'viewmodels'});
    router.map([
            { route: ['/', 'dashboard'], moduleId: 'dashboard', hash: '#/dashboard'},
            { route: 'stores(/:id)*details', moduleId: 'stores/index', hash: '#/stores', nav: true}
    ])
    .buildNavigationModel().mapUnknownRoutes('notfound', 'not-found');

    router.activate();
    // navigate to dashboard
    router.navigate('/dashboard');    
}