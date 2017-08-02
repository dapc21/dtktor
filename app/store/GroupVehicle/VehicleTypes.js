/**
 * @class eborasvehicle.store.GroupVehicle.VehicleTypes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.VehicleTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.VehicleTypes',
    storeId    : 'storeVehicleTypesAtGroup',
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
