import mainRouter = require('plugins/router');
import * as Q from 'q';

export let router = mainRouter.createChildRouter().makeRelative({
    moduleId: 'viewmodels',
    fromParent: true,
    dynamicHash: ':id'
}).map([
    {route: ['', 'details'], moduleId:'stores/details', title: "store details", nav: true, hash:'#'}
]).buildNavigationModel()
  .mapUnknownRoutes('notfound', 'not-found');

export function canActivate(storeIdStr:string) {
    const storeId = parseInt(storeIdStr, 10);

    // can put api check here ..
    return true; 
}

export function activate() {
    return true;
}

