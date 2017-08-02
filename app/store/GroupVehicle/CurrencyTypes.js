/**
 * @class eborasvehicle.store.GroupVehicle.CurrencyTypes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.CurrencyTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.CurrencyTypes',
    storeId    : 'storeCurrencyTypes',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbCurrencyType/rbListCurrencyType',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'currencyName',
        direction : 'ASC'
    }]
});
