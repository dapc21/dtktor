/**
 * @class eborasvehicle.store.Vehicle.ProductCodes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Vehicle.ProductCodes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Vehicle.ProductCodes',
    storeId    : 'storeProductCodes',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleInfo/rbFreeCP',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'pkCpsId',
        direction : 'ASC'
    }]
});
