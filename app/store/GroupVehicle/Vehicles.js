/**
 * @class eborasvehicle.store.GroupVehicle.Vehicles
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.Vehicles', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.Vehicles',
    storeId    : 'storeGroupVehicleVehicles',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        //url    : 'http://' + spagoService + '/api/...',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'name',
        direction : 'ASC'
    }]
});
