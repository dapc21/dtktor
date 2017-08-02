/**
 * @class eborasvehicle.store.Driver.ListIdButton
 * @extends Ext.data.Store
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.store.Driver.ListIdButton', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Driver.ListIdButton',
    storeId    : 'storeListIdButton',
    autoLoad   : true,
    remoteSort : false,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbDriver/rbFindAvailableIdButtons',
        extraParams:{
            idbuCode : ''
        },
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'pkIdbuId',
        direction : 'Asc'
    }]
});
