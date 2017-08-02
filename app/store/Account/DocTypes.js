/**
 * @class eborasvehicle.store.Account.DocTypes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Account.DocTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Account.DocTypes',
    storeId    : 'storeDocumentTypes',
    autoLoad   : true,
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
