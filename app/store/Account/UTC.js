/**
 * @class eborasvehicle.store.Account.UTC
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Account.UTC', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Account.UTC',
    storeId    : 'storeUTC',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbAccountVehicles/rbFindUtc',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'utcZone',
        direction : 'ASC'
    }]
});
