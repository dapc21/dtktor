/**
 * @class eborasvehicle.store.Account.Cities
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Account.Cities', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Account.Cities',
    storeId    : 'storeCities',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbAccountVehicles/rbFindCity',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'cityName',
        direction : 'ASC'
    }]
});