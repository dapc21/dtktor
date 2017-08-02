/**
 * @class eborasvehicle.store.GroupVehicle.AssignedPlates
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.AvailablePlates', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.AvailablePlates',
    storeId    : 'storeAvailablePlates',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleInfo/rbFindAvailableVehiclesByType',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'pkVhclId',
        direction : 'DESC'
    }]
});
