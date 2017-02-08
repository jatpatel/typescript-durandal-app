
import * as jQuery from 'jquery';
import * as _ from 'underscore';
import * as Q from 'q';

import {default as Store} from 'models/store';


/* like wise.. all RESTful Apis can be initiated from service */
export function getStores():Q.Promise<any> {
  let storesDataRequest = jQuery.getJSON('app/sourceData/stores.json')
  
  return Q(storesDataRequest).then((result) => {
      return _.map(result, (storeData:any) => {
            return new Store(storeData.store_id, storeData.store, <IStoreSales[]>storeData.data);
      });
  });
}       
