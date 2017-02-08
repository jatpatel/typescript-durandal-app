import * as ko from 'knockout';
import router = require('plugins/router');
// services
import * as storeApi from 'services/storesApi';
// models
import {default as Store} from 'models/store';

class dashboard {
    // attributes shared by views
    public stores:KnockoutObservableArray<Store>;

    public constructor() {
        this.stores = ko.observableArray([]);
    }

    public activate() {
        return true;
    }

    public binding() {
        this.loadStores();
    }

    public goToStore(aStore:Store) {
        router.navigate('#/stores/' + aStore.getStoreId());
    }

    // private 
    private loadStores() {
        storeApi.getStores().then((allStores) => {
            this.stores(allStores);
        });
    }
}

export = dashboard;