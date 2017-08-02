/**
 * @class eborasvehicle.store.Account.ListAccount
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Account.ListAccount', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Account.ListAccount',
    storeId    : 'storeListAccount',
    autoLoad   : false,
    remoteSort : false,
    loadMask   : true,
    proxy      : {
        type   : 'memory',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters   : [{
        property  : 'mastName',
        direction : 'ASC'
    }]
});