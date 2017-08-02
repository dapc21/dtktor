/**
 * @class eborasvehicle.store.GroupVehicle.AssignedPlates
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.AssignedPlates', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.AssignedPlates',
    storeId    : 'storeAssignedPlates',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        //url    : 'http://' + restService + '/rbVehicleGroup/rbFindPlatesByGroup',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'id',
        direction : 'DESC'
    }]
});
