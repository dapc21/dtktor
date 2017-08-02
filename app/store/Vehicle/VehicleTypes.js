/**
 * @class eborasvehicle.store.Vehicle.VehicleTypes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Vehicle.VehicleTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Vehicle.VehicleTypes',
    storeId    : 'storeVehicleTypes',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleInfo/rbFindTypeVehicle',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'tpvhName',
        direction : 'ASC'
    }]
});
