/**
 * @class eborasvehicle.store.Driver.DocTypes
 * @extends Ext.data.Store
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.store.Driver.CategoryTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Driver.CategoryTypes',
    storeId    : 'storeCategoryTypes',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbDriver/rbFindTypeCategoryLicense',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'tpclName',
        direction : 'ASC'
    }]
});
