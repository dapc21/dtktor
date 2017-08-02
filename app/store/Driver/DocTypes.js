/**
 * @class eborasvehicle.store.Driver.DocTypes
 * @extends Ext.data.Store
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.store.Driver.DocTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Driver.DocTypes',
    storeId    : 'storeDocTypes',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbDriver/rbFindTypeDocument',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'docuName',
        direction : 'ASC'
    }]
});
